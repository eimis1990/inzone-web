// inzone-web — telemetry ingest endpoint
// The INZONE desktop app POSTs { events: [...] } here. We validate
// minimally, cap the batch, and insert into Postgres. No secret from the
// app is trusted as auth — the optional x-inzone-key is just a light
// spam deterrent. Real protection is server-side: schema validation +
// the batch cap here, and (recommended) Vercel's built-in rate limiting.
//
// Requires env var POSTGRES_URL (set automatically when you attach a
// Vercel Postgres / Neon store to the project). Optional: INZONE_TELEMETRY_KEY.

import { sql } from '@vercel/postgres';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface IncomingEvent {
  install_id?: unknown;
  event?: unknown;
  app_version?: unknown;
  platform?: unknown;
  props?: unknown;
}

export async function POST(req: Request): Promise<Response> {
  // Optional shared key. Ships in the client, so treat as "raises the
  // bar", not real auth. Skip the check entirely if you don't set it.
  const expectedKey = process.env.INZONE_TELEMETRY_KEY;
  if (expectedKey && req.headers.get('x-inzone-key') !== expectedKey) {
    return new Response('forbidden', { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response('bad json', { status: 400 });
  }

  const events: IncomingEvent[] = Array.isArray(
    (body as { events?: unknown })?.events,
  )
    ? ((body as { events: IncomingEvent[] }).events ?? [])
    : [];

  // Cap the batch and keep only well-formed rows. Anything missing the
  // two required string fields is dropped silently.
  const rows = events
    .slice(0, 100)
    .filter(
      (e) =>
        e &&
        typeof e.install_id === 'string' &&
        typeof e.event === 'string',
    );

  let inserted = 0;
  for (const e of rows) {
    try {
      await sql`
        insert into telemetry_events (install_id, event, app_version, platform, props)
        values (
          ${e.install_id as string},
          ${e.event as string},
          ${typeof e.app_version === 'string' ? e.app_version : null},
          ${typeof e.platform === 'string' ? e.platform : null},
          ${JSON.stringify(
            e.props && typeof e.props === 'object' ? e.props : {},
          )}::jsonb
        )
      `;
      inserted++;
    } catch {
      // Skip a bad row rather than failing the whole batch.
    }
  }

  return Response.json({ ok: true, inserted });
}

// Health check / sanity ping.
export function GET(): Response {
  return Response.json({ ok: true });
}
