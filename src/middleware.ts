// inzone-web — gate the /stats page behind a password (Basic Auth).
//
// Set these env vars in Vercel (Project → Settings → Environment Variables):
//   STATS_USER     = whatever-username
//   STATS_PASSWORD = a-long-random-password
//
// Then visit https://your-site/stats and the browser prompts for the
// credentials. Only requests under /stats are affected.

import { NextResponse, type NextRequest } from 'next/server';

export const config = { matcher: ['/stats/:path*'] };

export function middleware(req: NextRequest): NextResponse {
  const user = process.env.STATS_USER ?? '';
  const pass = process.env.STATS_PASSWORD ?? '';

  // If the env vars aren't set, fail closed (deny) rather than
  // accidentally exposing the page.
  if (!user || !pass) {
    return new NextResponse('Stats auth not configured', { status: 503 });
  }

  const header = req.headers.get('authorization') ?? '';
  const expected = 'Basic ' + btoa(`${user}:${pass}`);
  if (header !== expected) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="INZONE stats"' },
    });
  }
  return NextResponse.next();
}
