"use client";

import ScrollReveal from "./ScrollReveal";

interface ComparisonRow {
  feature: string;
  inzone: "none" | "supported" | "shines";
  claudeCode: "none" | "supported" | "shines";
  cursor: "none" | "supported" | "shines";
}

const comparisons: ComparisonRow[] = [
  {
    feature: "Single agent, fast feedback loop",
    inzone: "supported",
    claudeCode: "shines",
    cursor: "shines",
  },
  {
    feature: "Multiple agents in parallel",
    inzone: "shines",
    claudeCode: "none",
    cursor: "none",
  },
  {
    feature: "Sequential pipelines (Flow)",
    inzone: "shines",
    claudeCode: "none",
    cursor: "none",
  },
  {
    feature: "Voice control",
    inzone: "shines",
    claudeCode: "none",
    cursor: "none",
  },
  {
    feature: "Built-in IDE features (lints, etc.)",
    inzone: "none",
    claudeCode: "none",
    cursor: "shines",
  },
];

function StatusCell({ status }: { status: "none" | "supported" | "shines" }) {
  if (status === "none") {
    return <span className="text-ink-muted">—</span>;
  }
  if (status === "supported") {
    return <span className="text-success">✓</span>;
  }
  return <span className="text-accent font-bold">✓✓</span>;
}

export default function Comparison() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display display-xl text-ink mb-4">
            Honest comparison
          </h2>
          <p className="body-lg text-ink-muted max-w-xl mx-auto">
            Different tools excel at different things. Here&apos;s where INZONE
            fits.
          </p>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={0.2}>
          <div className="overflow-hidden rounded-[20px] bg-surface-1">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-hairline">
                    <th className="text-left py-4 px-5 headline text-ink-muted font-normal">
                      Use case
                    </th>
                    <th className="py-4 px-5 text-center">
                      <span className="font-display headline text-ink">
                        INZONE
                      </span>
                    </th>
                    <th className="py-4 px-5 text-center">
                      <span className="font-mono body-sm text-ink-muted">
                        Claude Code
                      </span>
                    </th>
                    <th className="py-4 px-5 text-center">
                      <span className="font-mono body-sm text-ink-muted">
                        Cursor
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-hairline-soft last:border-b-0 hover:bg-surface-2 transition-colors"
                    >
                      <td className="py-4 px-5 body-sm text-ink-muted">
                        {row.feature}
                      </td>
                      <td className="py-4 px-5 text-center text-lg">
                        <StatusCell status={row.inzone} />
                      </td>
                      <td className="py-4 px-5 text-center text-lg">
                        <StatusCell status={row.claudeCode} />
                      </td>
                      <td className="py-4 px-5 text-center text-lg">
                        <StatusCell status={row.cursor} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend - smaller inline badges */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 micro text-ink-muted">
              <span>—</span>
              <span>not really</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 micro text-ink-muted">
              <span className="text-success">✓</span>
              <span>supported</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-1 micro text-ink-muted">
              <span className="text-accent font-bold">✓✓</span>
              <span>shines here</span>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
