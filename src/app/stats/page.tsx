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
      <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
        <div className="mx-auto max-w-3xl px-6 md:px-12 py-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            01 — Telemetry
          </p>
          <h1 className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">
            INZONE stats
          </h1>
          <div className="mt-10 glass-panel glow-shadow rounded-2xl p-8">
            <p className="font-mono text-xs uppercase tracking-wider text-red-500 dark:text-red-400">
              Error
            </p>
            <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-300">
              Couldn&apos;t load stats: {error ?? 'no data'}.
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Check that POSTGRES_URL is set and the schema was created.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans">
      {/* Background gradient orbs — subtle brand atmosphere */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 h-[480px] w-[480px] rounded-full bg-neutral-300/20 dark:bg-neutral-700/10 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[480px] w-[480px] rounded-full bg-neutral-300/20 dark:bg-neutral-700/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            01 — Telemetry
          </p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
            INZONE stats
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base text-neutral-600 dark:text-neutral-400">
            Anonymous, aggregate. Last 30 days where noted.
          </p>
          <div className="stat-line mt-8" />
        </header>

        {/* Hero KPI strip — installs + opens */}
        <section aria-labelledby="hero-kpi" className="mb-16 md:mb-20">
          <h2 id="hero-kpi" className="sr-only">
            Headline metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <KpiCard
              label="Distinct installs · 30d"
              value={data.installs.installs}
              size="lg"
            />
            <KpiCard
              label="App opens · 30d"
              value={data.installs.opens}
              size="lg"
            />
          </div>
        </section>

        {/* Averages per install — 5-up row */}
        <section aria-labelledby="averages" className="mb-16 md:mb-20">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2
              id="averages"
              className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400"
            >
              02 — Averages per install
            </h2>
            <div className="hidden md:block h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            <KpiCard label="Agents" value={data.avgs.avg_agents} />
            <KpiCard label="Skills" value={data.avgs.avg_skills} />
            <KpiCard label="Enabled plugins" value={data.avgs.avg_plugins} />
            <KpiCard label="MCP servers" value={data.avgs.avg_mcp} />
            <KpiCard label="Saved projects" value={data.avgs.avg_projects} />
          </div>
        </section>

        {/* Breakdown grid — 2x2 of tables */}
        <section aria-labelledby="breakdown" className="mb-12">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2
              id="breakdown"
              className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400"
            >
              03 — Breakdown
            </h2>
            <div className="hidden md:block h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <StatTable
              title="Auth method"
              caption="Latest launch per install"
              labelHeader="Method"
              rows={data.auth.map((r) => ({
                label: String(r.auth_method),
                n: Number(r.n),
              }))}
            />
            <StatTable
              title="Platforms"
              caption="Latest launch per install"
              labelHeader="Platform"
              rows={data.platforms.map((r) => ({
                label: String(r.platform),
                n: Number(r.n),
              }))}
            />
            <StatTable
              title="Modes"
              caption="Session starts"
              labelHeader="Mode"
              rows={data.modes.map((r) => ({
                label: String(r.mode),
                n: Number(r.n),
              }))}
            />
            <StatTable
              title="Top models"
              caption="Session starts · all time"
              labelHeader="Model"
              rows={data.models.map((r) => ({
                label: String(r.model),
                n: Number(r.n),
              }))}
            />
          </div>
        </section>

        <footer className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-600">
            INZONE · internal telemetry · anonymous
          </p>
        </footer>
      </div>
    </main>
  );
}

function KpiCard({
  label,
  value,
  size = 'md',
}: {
  label: string;
  value: number | string | null | undefined;
  size?: 'md' | 'lg';
}) {
  const display = value === null || value === undefined ? '—' : String(value);
  return (
    <div className="group relative overflow-hidden rounded-2xl glass-panel glow-shadow p-5 md:p-6 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700">
      <div className="inner-shimmer pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
          {label}
        </div>
        <div
          className={
            'mt-3 font-display tabular-nums text-neutral-900 dark:text-neutral-50 ' +
            (size === 'lg'
              ? 'text-5xl md:text-7xl leading-none'
              : 'text-3xl md:text-4xl leading-none')
          }
        >
          {display}
        </div>
      </div>
    </div>
  );
}

function StatTable({
  title,
  caption,
  labelHeader,
  rows,
}: {
  title: string;
  caption: string;
  labelHeader: string;
  rows: Array<{ label: string; n: number }>;
}) {
  const max = rows.reduce((m, r) => (r.n > m ? r.n : m), 0);
  const total = rows.reduce((s, r) => s + r.n, 0);

  return (
    <section className="relative overflow-hidden rounded-2xl glass-panel glow-shadow flex flex-col">
      <header className="px-6 pt-6 pb-4 border-b border-neutral-200/60 dark:border-neutral-800/60">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-lg md:text-xl font-semibold tracking-tight">
            {title}
          </h3>
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 tabular-nums">
            {total.toLocaleString()} total
          </span>
        </div>
        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          {caption}
        </p>
      </header>

      <table className="w-full table-fixed">
        <thead>
          <tr className="text-left">
            <th
              scope="col"
              className="px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 font-normal w-1/2"
            >
              {labelHeader}
            </th>
            <th
              scope="col"
              className="px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 font-normal"
            >
              Share
            </th>
            <th
              scope="col"
              className="px-6 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500 font-normal text-right w-20"
            >
              Count
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-8 text-center text-sm text-neutral-400 dark:text-neutral-600 font-mono uppercase tracking-wider text-xs"
              >
                No data yet
              </td>
            </tr>
          )}
          {rows.map((r) => (
            <ProgressRow key={r.label} label={r.label} n={r.n} max={max} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function ProgressRow({
  label,
  n,
  max,
}: {
  label: string;
  n: number;
  max: number;
}) {
  const pct = max > 0 ? Math.max(2, Math.round((n / max) * 100)) : 0;
  return (
    <tr className="border-t border-neutral-200/50 dark:border-neutral-800/50 transition-colors hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40">
      <td className="px-6 py-3 text-sm text-neutral-800 dark:text-neutral-200 truncate">
        {label}
      </td>
      <td className="px-6 py-3">
        <div className="relative h-1.5 w-full rounded-full bg-neutral-200/60 dark:bg-neutral-800/60 overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
            style={{ width: `${pct}%` }}
            aria-hidden="true"
          />
        </div>
      </td>
      <td className="px-6 py-3 text-right font-mono text-sm tabular-nums text-neutral-900 dark:text-neutral-100">
        {n.toLocaleString()}
      </td>
    </tr>
  );
}
