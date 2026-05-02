"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Pane {
  id: number;
  emoji: string;
  name: string;
  color: string;
  content: string[];
}

const panes: Pane[] = [
  {
    id: 0,
    emoji: "🎨",
    name: "frontend",
    color: "#E4D947",
    content: [
      "Analyzing component structure...",
      "Creating responsive layout with CSS Grid",
      "Adding hover animations with Framer Motion",
      "Implementing dark mode toggle",
    ],
  },
  {
    id: 1,
    emoji: "⚙️",
    name: "backend",
    color: "#B78AFF",
    content: [
      "Setting up API routes...",
      "Adding authentication middleware",
      "Connecting to PostgreSQL database",
      "Implementing rate limiting",
    ],
  },
  {
    id: 2,
    emoji: "🌐",
    name: "browser",
    color: "#3DDC97",
    content: [
      "Opening browser session...",
      "Navigating to test environment",
      "Running E2E test suite",
      "Capturing screenshots",
    ],
  },
  {
    id: 3,
    emoji: "👑",
    name: "lead",
    color: "#E4D947",
    content: [
      "Coordinating agent tasks...",
      "Reviewing frontend progress",
      "Assigning backend integration",
      "Monitoring test results",
    ],
  },
];

function TypewriterText({ text, isActive }: { text: string; isActive: boolean }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayText("");
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, isActive]);

  return (
    <span>
      {displayText}
      {isActive && currentIndex < text.length && (
        <span className="cursor-blink">▊</span>
      )}
    </span>
  );
}

function PaneContent({ pane, isActive }: { pane: Pane; isActive: boolean }) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setLineIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setLineIndex((prev) => (prev + 1) % pane.content.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive, pane.content.length]);

  return (
    <div className="space-y-1.5">
      {pane.content.slice(0, lineIndex + 1).map((line, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2 text-xs font-mono"
          style={{ opacity: idx === lineIndex && isActive ? 1 : 0.5 }}
        >
          <span className="text-accent shrink-0">❯</span>
          <span className="text-text-dim">
            {idx === lineIndex && isActive ? (
              <TypewriterText text={line} isActive={true} />
            ) : (
              line
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AnimatedPaneMock() {
  const [activePane, setActivePane] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Transform mouse position to subtle parallax
  const rotateX = useTransform(y, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-2, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePane((prev) => (prev + 1) % panes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full max-w-2xl aspect-[4/3] perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Window chrome */}
      <div className="absolute inset-0 bg-bg-elev rounded-xl border border-border overflow-hidden shadow-2xl">
        {/* Title bar */}
        <div className="h-8 bg-bg-elev-2 border-b border-border flex items-center px-3 gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger/80" />
            <div className="w-3 h-3 rounded-full bg-accent/80" />
            <div className="w-3 h-3 rounded-full bg-ok/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs font-mono text-muted">INZONE — my-project</span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="absolute left-0 top-8 bottom-0 w-12 bg-bg-elev-2 border-r border-border flex flex-col items-center py-3 gap-3">
          <div className="w-7 h-7 rounded-lg bg-accent/20 flex items-center justify-center">
            <span className="text-xs">📁</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-bg-elev flex items-center justify-center">
            <span className="text-xs">🤖</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-bg-elev flex items-center justify-center">
            <span className="text-xs">🔀</span>
          </div>
          <div className="w-7 h-7 rounded-lg bg-bg-elev flex items-center justify-center">
            <span className="text-xs">⚡</span>
          </div>
        </div>

        {/* Workspace bar */}
        <div className="absolute left-12 top-8 right-0 h-10 bg-bg border-b border-border flex items-center px-3 gap-2">
          <div className="px-3 py-1 rounded bg-bg-elev text-xs text-text-dim flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-ok" />
            <span>my-project</span>
          </div>
        </div>

        {/* Panes grid */}
        <div className="absolute left-12 top-[72px] right-0 bottom-0 p-2 grid grid-cols-2 grid-rows-2 gap-2">
          {panes.map((pane, idx) => (
            <motion.div
              key={pane.id}
              className="relative bg-bg rounded-lg border overflow-hidden"
              animate={{
                borderColor: activePane === idx ? pane.color : "var(--border)",
                boxShadow:
                  activePane === idx
                    ? `0 0 20px ${pane.color}20, inset 0 1px 0 ${pane.color}10`
                    : "none",
              }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {/* Pane header */}
              <div
                className="h-6 border-b border-border flex items-center px-2 gap-1.5"
                style={{
                  borderTopColor: activePane === idx ? pane.color : "transparent",
                  borderTopWidth: activePane === idx ? 2 : 0,
                }}
              >
                <span className="text-xs">{pane.emoji}</span>
                <span className="text-[10px] font-mono text-muted">{pane.name}</span>
                {activePane === idx && (
                  <motion.div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: pane.color }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Pane content */}
              <div className="p-2 h-[calc(100%-24px)] overflow-hidden">
                <PaneContent pane={pane} isActive={activePane === idx} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-20 bg-accent/[0.06] blur-3xl rounded-full pointer-events-none" />
    </motion.div>
  );
}
