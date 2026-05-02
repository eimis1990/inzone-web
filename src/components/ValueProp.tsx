"use client";

import ScrollReveal, { StaggerContainer } from "./ScrollReveal";

const stats = [
  { value: "5+", label: "starter agents bundled" },
  { value: "8", label: "starter skills bundled" },
  { value: "4", label: "CLI tools as workers" },
  { value: "0", label: "telemetry, accounts, lock-in" },
];

export default function ValueProp() {
  return (
    <section className="relative py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-bg-elev/50 border border-border card-hover"
            >
              <div className="font-display text-5xl lg:text-6xl text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-dim">{stat.label}</div>
            </div>
          ))}
        </StaggerContainer>

        {/* Central message */}
        <ScrollReveal className="max-w-3xl mx-auto text-center" delay={0.2}>
          <p className="text-2xl lg:text-3xl text-text leading-relaxed">
            Built for developers who use Claude as a teammate, not a tab. Run
            several agents in parallel, chain them into pipelines, review their
            diffs in-app, ship with one click.{" "}
            <span className="text-accent">
              Your folder, your subscription, your machine.
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
