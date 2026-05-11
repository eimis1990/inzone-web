"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import AnimatedPaneMock from "./AnimatedPaneMock";
import DownloadButton from "./DownloadButton";

// Dynamic import to avoid SSR issues with WebGL
const ShaderBackground = dynamic(() => import("./ShaderBackground"), {
  ssr: false,
});

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
      className="relative h-screen flex items-center bg-canvas"
    >
      {/* WebGL Shader Background */}
      <ShaderBackground />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 lg:py-20"
        style={{ opacity, y }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Text - shifted up */}
          <div className="space-y-6 lg:-mt-24">
            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-1 border border-hairline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <span className="caption uppercase tracking-[0.1em] text-[#E4D947]">
                INZONE · V1.0
              </span>
            </motion.div>

            {/* Headline - display-xxl with aggressive tracking */}
            <motion.h1
              className="font-display display-xxl text-ink"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              Run a fleet of
              <br />
              AI agents.
              <br />
              <span className="text-ink">From one window.</span>
            </motion.h1>

            {/* Subheadline - body-lg with ink-muted */}
            <motion.p
              className="body-lg text-ink-muted max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.16,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              A macOS cockpit for orchestrating multiple Claude Agent SDK
              sessions side-by-side. Multi-pane workspace, Flow pipelines,
              voice control, in-app PR.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.24,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <DownloadButton />
            </motion.div>
          </div>

          {/* Right column - Animated Mock */}
          <motion.div
            className="relative lg:pl-8"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.32,
              ease: [0.22, 0.61, 0.36, 1],
            }}
          >
            <AnimatedPaneMock />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
