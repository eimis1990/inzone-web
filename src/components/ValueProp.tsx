"use client";

import { useEffect, useRef } from "react";
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

const MANIFESTO_TEXT =
  "Built for developers who use Claude as a teammate, not a tab. Run several agents in parallel, chain them into pipelines, review their diffs in-app, ship with one click. Your folder, your subscription, your machine.";

export default function ValueProp() {
  const paraRef = useRef<HTMLParagraphElement>(null);

  const words = MANIFESTO_TEXT.split(" ");

  useEffect(() => {
    const paraEl = paraRef.current;
    if (!paraEl) return;

    const wordEls = Array.from(
      paraEl.querySelectorAll<HTMLSpanElement>("[data-word]")
    );

    // Respect prefers-reduced-motion: skip the scrub animation and show
    // the final state immediately.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      wordEls.forEach((el) => {
        el.style.color = "#ffffff";
        el.style.opacity = "1";
      });
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(wordEls, {
          color: "#ffffff",
          opacity: 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: paraEl,
            start: "top 75%",
            end: "bottom 40%",
            scrub: true,
          },
        });
      }, paraEl);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Central message - manifesto paragraph */}
        <div className="max-w-[1100px] mx-auto text-center">
          <p
            ref={paraRef}
            className="display-lg leading-[1.1] tracking-tight"
          >
            {words.map((word, i) => (
              <span
                key={i}
                data-word
                style={{
                  color: "#555555",
                  opacity: 0.35,
                  display: "inline-block",
                  marginRight: "0.25em",
                  willChange: "color, opacity",
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
