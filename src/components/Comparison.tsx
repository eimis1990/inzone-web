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
    return <span className="text-muted">—</span>;
  }
  if (status === "supported") {
    return <span className="text-ok">✓</span>;
  }
  return <span className="text-accent font-bold">✓✓</span>;
}

export default function Comparison() {
  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-12">
          <h2 className="font-display text-4xl lg:text-5xl text-text mb-4">
            Honest comparison
          </h2>
          <p className="text-text-dim max-w-xl mx-auto">
            Different tools excel at different things. Here&apos;s where INZONE
            fits.
          </p>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={0.2}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-text-dim font-normal text-sm">
                    Use case
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="font-display text-xl text-accent">
                      INZONE
                    </span>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="font-mono text-sm text-text-dim">
                      Claude Code
                    </span>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <span className="font-mono text-sm text-text-dim">
                      Cursor
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-border/50 hover:bg-bg-elev/30 transition-colors"
                  >
                    <td className="py-4 px-4 text-text-dim text-sm">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-center text-lg">
                      <StatusCell status={row.inzone} />
                    </td>
                    <td className="py-4 px-4 text-center text-lg">
                      <StatusCell status={row.claudeCode} />
                    </td>
                    <td className="py-4 px-4 text-center text-lg">
                      <StatusCell status={row.cursor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div className="mt-6 flex justify-center gap-8 text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-muted">—</span>
              <span>not really</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-ok">✓</span>
              <span>supported</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent font-bold">✓✓</span>
              <span>shines here</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
