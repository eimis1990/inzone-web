// inzone-web — hidden telemetry dashboard.
// Access is gated by src/middleware.ts (Basic Auth via STATS_USER /
// STATS_PASSWORD). This is a server component: the queries run on the
// server, so the DB connection never reaches the browser.
//
// Requires POSTGRES_URL (auto-set by the Vercel Postgres / Neon store).

import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

async function getStats() {
  // Distinct installs + app opens in the last 30 days.
  const installs = await sql`
    select count(distinct install_id)::int as installs,
           count(*)::int as opens
    from telemetry_events
    where event = 'app_launched' and created_at > now() - interval '30 days'
  `;

  // Most-used models (from session starts, all time).
  const models = await sql`
    select coalesce(props->>'model', 'unknown') as model, count(*)::int as n
    from telemetry_events
    where event = 'session_started'
    group by 1 order by 2 desc limit 20
  `;

  // Mode split (multi vs lead).
  const modes = await sql`
    select coalesce(props->>'mode', 'unknown') as mode, count(*)::int as n
    from telemetry_events
    where event = 'session_started'
    group by 1 order by 2 desc
  `;

  // Platform split (latest launch per install).
  const platforms = await sql`
    with latest as (
      select distinct on (install_id) install_id, platform
      from telemetry_events
      where event = 'app_launched'
      order by install_id, created_at desc
    )
    select coalesce(platform, 'unknown') as platform, count(*)::int as n
    from latest group by 1 order by 2 desc
  `;

  // API key vs subscription (latest launch per install).
  const auth = await sql`
    with latest as (
      select distinct on (install_id) install_id, props->>'auth_method' as auth_method
      from telemetry_events
      where event = 'app_launched'
      order by install_id, created_at desc
    )
    select coalesce(auth_method, 'unknown') as auth_method, count(*)::int as n
    from latest group by 1 order by 2 desc
  `;

  // Averages across installs (latest launch per install).
  const avgs = await sql`
    with latest as (
      select distinct on (install_id) install_id, props
      from telemetry_events
      where event = 'app_launched'
      order by install_id, created_at desc
    )
    select
      round(avg((props->>'agents')::numeric), 1)            as avg_agents,
      round(avg((props->>'skills')::numeric), 1)            as avg_skills,
      round(avg((props->>'plugins_enabled')::numeric), 1)   as avg_plugins,
      round(avg((props->>'mcp_servers')::numeric), 1)       as avg_mcp,
      round(avg((props->>'saved_projects')::numeric), 1)    as avg_projects
    from latest
  `;

  return {
    installs: installs.rows[0] ?? { installs: 0, opens: 0 },
    models: models.rows,
    modes: modes.rows,
    platforms: platforms.rows,
    auth: auth.rows,
    avgs: avgs.rows[0] ?? {},
  };
}

export default async function StatsPage() {
  let data: Awaited<ReturnType<typeof getStats>> | null = null;
  let error: string | null = null;
  try {
    data = await getStats();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  if (error || !data) {
    return (
      <main style={{ fontFamily: 'system-ui', padding: 32 }}>
        <h1>INZONE stats</h1>
        <p style={{ color: 'crimson' }}>
          Couldn&apos;t load stats: {error ?? 'no data'}. Check that
          POSTGRES_URL is set and the schema was created.
        </p>
      </main>
    );
  }

  const card: React.CSSProperties = {
    border: '1px solid #ddd',
    borderRadius: 10,
    padding: 16,
    minWidth: 160,
  };

  return (
    <main
      style={{
        fontFamily: 'system-ui',
        padding: 32,
        maxWidth: 880,
        margin: '0 auto',
      }}
    >
      <h1>INZONE stats</h1>
      <p style={{ color: '#666' }}>Anonymous, aggregate. Last 30 days where noted.</p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '20px 0' }}>
        <div style={card}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {data.installs.installs}
          </div>
          <div style={{ color: '#666' }}>Distinct installs (30d)</div>
        </div>
        <div style={card}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            {data.installs.opens}
          </div>
          <div style={{ color: '#666' }}>App opens (30d)</div>
        </div>
      </div>

      <h2>Averages per install</h2>
      <ul>
        <li>Agents: {String(data.avgs.avg_agents ?? '—')}</li>
        <li>Skills: {String(data.avgs.avg_skills ?? '—')}</li>
        <li>Enabled plugins: {String(data.avgs.avg_plugins ?? '—')}</li>
        <li>MCP servers: {String(data.avgs.avg_mcp ?? '—')}</li>
        <li>Saved projects: {String(data.avgs.avg_projects ?? '—')}</li>
      </ul>

      <Table title="Auth method" rows={data.auth.map((r) => [r.auth_method, r.n])} />
      <Table title="Platforms" rows={data.platforms.map((r) => [r.platform, r.n])} />
      <Table title="Modes" rows={data.modes.map((r) => [r.mode, r.n])} />
      <Table title="Top models" rows={data.models.map((r) => [r.model, r.n])} />
    </main>
  );
}

function Table({
  title,
  rows,
}: {
  title: string;
  rows: Array<[unknown, unknown]>;
}) {
  return (
    <section style={{ margin: '24px 0' }}>
      <h2>{title}</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td style={{ color: '#999', padding: '6px 0' }}>No data yet</td>
            </tr>
          )}
          {rows.map(([label, n], i) => (
            <tr key={i} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: '6px 0' }}>{String(label)}</td>
              <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>
                {String(n)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
