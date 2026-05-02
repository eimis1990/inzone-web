"use client";

import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer } from "./ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Download",
    description: "DMG for Apple Silicon or Intel. Drag to Applications.",
    icon: "📥",
  },
  {
    number: "2",
    title: "Sign in to Claude",
    description: "Paste your API key or run `claude login`. Either works.",
    icon: "🔑",
  },
  {
    number: "3",
    title: "Open a project",
    description:
      "Pick a folder, split into panes, drop agents in, start working.",
    icon: "🚀",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 border-t border-border bg-bg-elev/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-5xl text-text mb-4">
            Get started in three steps
          </h2>
          <p className="text-text-dim max-w-xl mx-auto">
            From download to your first agent conversation in under a minute.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative p-8 bg-bg rounded-xl border border-border card-hover"
              whileHover={{ y: -4 }}
            >
              {/* Step number */}
              <div className="absolute -top-4 left-8 px-3 py-1 bg-accent text-accent-on font-display text-2xl rounded">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4 mt-2">{step.icon}</div>

              {/* Content */}
              <h3 className="font-display text-2xl text-text mb-2">
                {step.title}
              </h3>
              <p className="text-text-dim text-sm leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 w-8 lg:w-12 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Demo video placeholder */}
        <ScrollReveal delay={0.3}>
          <div className="relative max-w-4xl mx-auto aspect-video rounded-xl overflow-hidden border border-border bg-bg-elev">
            {/* Placeholder for demo video */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-0 h-0 border-l-[20px] border-l-accent border-y-[12px] border-y-transparent ml-1" />
              </motion.div>
              <p className="mt-4 text-text-dim text-sm">
                Watch the 30-second setup walkthrough
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-danger/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-ok/60" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
