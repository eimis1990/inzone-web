"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedPaneMock from "./AnimatedPaneMock";
import DownloadButton from "./DownloadButton";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Gradient glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-accent/[0.06] blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32"
        style={{ opacity, y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text */}
          <div className="space-y-5">
            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-elev border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="text-[11px] uppercase tracking-[0.1em] font-semibold text-accent">
                MacOS · v1.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-display text-5xl sm:text-6xl lg:text-6xl xl:text-7xl text-text leading-[1.1]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              Run a fleet of AI agents.{" "}
              <span className="text-accent">From one window.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-base lg:text-lg text-text-dim max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              INZONE is a macOS app for orchestrating multiple Claude Agent SDK
              sessions in a single window. Split panes, sequential pipelines,
              voice control, in-app diff review and PR — designed for people who
              want to delegate to several agents at once.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="pt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <DownloadButton />
            </motion.div>
          </div>

          {/* Right column - Animated Mock */}
          <motion.div
            className="relative lg:pl-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <AnimatedPaneMock />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.div
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-bg-elev/50 backdrop-blur border border-border text-muted text-sm"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>↓</span>
          <span>Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
