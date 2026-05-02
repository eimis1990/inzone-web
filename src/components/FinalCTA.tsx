"use client";

import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import DownloadButton from "./DownloadButton";

export default function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.04] blur-[100px] rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <motion.h2
            className="font-display text-4xl lg:text-5xl xl:text-6xl text-text mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to ship faster?
          </motion.h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-text-dim mb-10 max-w-xl mx-auto">
            Free for personal and commercial use. No account required.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <DownloadButton />
          </div>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>MIT Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Signed & Notarized</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                <path d="M10 6a1 1 0 011 1v3.586l2.707 2.707a1 1 0 01-1.414 1.414l-3-3A1 1 0 019 11V7a1 1 0 011-1z" />
              </svg>
              <span>No telemetry</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
