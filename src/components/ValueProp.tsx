"use client";

import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";

const stats = [
  { value: "5+", label: "STARTER AGENTS BUNDLED" },
  { value: "8", label: "STARTER SKILLS BUNDLED" },
  { value: "4", label: "CLI TOOLS AS WORKERS" },
  { value: "0", label: "TELEMETRY, ACCOUNTS, LOCK-IN" },
];

export function StatsBar() {
  return (
    <motion.div
      className="relative z-20 max-w-5xl mx-auto px-6 -mt-[50px]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="flex items-stretch rounded-2xl bg-surface-1/80 backdrop-blur-xl border border-hairline overflow-hidden">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`flex-1 py-6 px-6 lg:px-8 text-center ${
              index !== stats.length - 1 ? "border-r border-hairline" : ""
            }`}
          >
            <div className="font-display text-2xl lg:text-3xl font-medium text-ink tracking-tight mb-1">
              {stat.value}
            </div>
            <div className="caption uppercase tracking-[0.12em] text-ink-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ValueProp() {
  return (
    <section className="relative pt-16 pb-24 lg:pt-20 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Central message - manifesto paragraph */}
        <ScrollReveal className="max-w-[720px] mx-auto text-center" delay={0.2}>
          <p className="subhead text-ink-muted leading-relaxed">
            Built for developers who use Claude as a teammate, not a tab. Run
            several agents in parallel, chain them into pipelines, review their
            diffs in-app, ship with one click.{" "}
            <span className="text-ink">
              Your folder, your subscription, your machine.
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
