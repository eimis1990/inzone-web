"use client";

import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer } from "./ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Download",
    description: "DMG for Apple Silicon or Intel. Drag to Applications.",
  },
  {
    number: "2",
    title: "Sign in to Claude",
    description: "Paste your API key or run `claude login`. Either works.",
  },
  {
    number: "3",
    title: "Open a project",
    description:
      "Pick a folder, split into panes, drop agents in, start working.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <h2 className="font-display display-xl text-ink mb-4">
            Get started in three steps
          </h2>
          <p className="body-lg text-ink-muted max-w-xl mx-auto">
            From download to your first agent conversation in under a minute.
          </p>
        </ScrollReveal>

        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative p-8 bg-surface-1 rounded-[20px] border border-hairline card-hover"
              whileHover={{ y: -2 }}
            >
              {/* Step number - white pill badge */}
              <div className="absolute -top-4 left-8 px-4 py-1.5 bg-ink text-canvas font-display text-lg rounded-full">
                {step.number}
              </div>

              {/* Content - no emoji icons */}
              <h3 className="font-display display-md text-ink mb-3 mt-4">
                {step.title}
              </h3>
              <p className="body text-ink-muted">
                {step.description}
              </p>

              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 w-8 lg:w-12 h-px bg-hairline" />
              )}
            </motion.div>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
