"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DownloadButton from "./DownloadButton";
import { usePlatform } from "@/lib/usePlatform";
import {
  Github,
  Sun,
  Moon,
  Terminal,
  Columns,
  Workflow,
  BrainCircuit,
  Users,
  GitBranch,
  GitPullRequest,
  Boxes,
  Play,
  Zap,
  Monitor,
  Puzzle,
  BarChart3,
  Mic,
  Lock,
  BookOpen,
  Keyboard,
  MessageSquare,
  Paperclip,
  RefreshCw,
  FolderOpen,
  Layers,
  Shield,
  ListChecks,
  Check,
  X,
  Minus,
  Hash,
  PanelRight,
  Sparkles,
} from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ElasticDotGrid } from "./ElasticDotGrid";

gsap.registerPlugin(ScrollTrigger);

const ALL_FEATURES = [
  {
    topic: "MULTI-PANE WORKSPACE",
    title: "Several Agents. One Window.",
    description:
      "Each pane is its own conversation and SDK session. Run Claude, Codex, or any CLI agent side-by-side. Zero context switching, zero juggling tabs.",
    icon: <Columns />,
  },
  {
    topic: "LEAD MODE",
    title: "One Orchestrator. Many Sub-Agents.",
    description:
      "A top-pane Lead Agent delegates tasks to sub-agents below via a built-in messaging protocol. One agent plans, the others execute in parallel.",
    icon: <Users />,
  },
  {
    topic: "FLOW PIPELINES",
    title: "Chain Agents. Walk Away.",
    description:
      "Build sequential agent workflows on a free-form canvas. Outputs flow forward via {previous}. Hit Run — plan, build, review, and ship without touching a keyboard between stages.",
    icon: <Workflow />,
  },
  {
    topic: "TASKS",
    title: "One-Click Workflow Recipes.",
    description:
      "Nine pre-wired templates — Bug Fix, Code Review, Greenfield, Mobile Feature, Website Redesign, and more. Run them instantly or save your current session as a custom template.",
    icon: <ListChecks />,
  },
  {
    topic: "WORKTREES",
    title: "Parallel Branches. Zero Interference.",
    description:
      "Spin up a git worktree off any branch from the sidebar. Multiple agents work parallel branches simultaneously without touching each other's work.",
    icon: <GitBranch />,
  },
  {
    topic: "DIFF REVIEW + PR",
    title: "Review, Revise, Ship.",
    description:
      "Per-hunk approve/reject with a send-back loop for revisions. AI drafts the PR title and body. One click opens it via gh CLI — full GitHub flow without leaving the app.",
    icon: <GitPullRequest />,
  },
  {
    topic: "MISSION CONTROL",
    title: "Every Project. One Glance.",
    description:
      "⌘⇧M opens a dashboard of every project, every agent. Live status, current tool, per-session cost, and time-since-activity — all in one place.",
    icon: <Layers />,
  },
  {
    topic: "PREVIEW PANE",
    title: "Browser-Grade Preview. Built In.",
    description:
      "Inline pane-swap with a real browser toolbar. 375px mobile-viewport simulator, ⌘+/⌘−/⌘0 zoom, reload-on-save via file watcher, inline DevTools, open-externally button. Never leave the app.",
    icon: <Monitor />,
  },
  {
    topic: "BUILT-IN TERMINAL",
    title: "Real Shell. GPU-Accelerated.",
    description:
      "Full PTY shell with WebGL-accelerated rendering, custom shortcut buttons, and persistence across panel open/close. Your processes keep running even when the pane is hidden.",
    icon: <Terminal />,
  },
  {
    topic: "PROJECT WIKI",
    title: "Memory That Stays Current.",
    description:
      "Markdown wiki at .inzone/wiki/ that agents read, edit, and cite. The bundled Wiki Protocol auto-injects into every agent prompt — agents are forced to keep it updated after every code-touching task.",
    icon: <BrainCircuit />,
  },
  {
    topic: "VOICE CONTROL",
    title: "Drive the Fleet by Voice.",
    description:
      "Powered by ElevenLabs. Spin up agents, message panes, switch modes, and ask wiki-grounded project questions — all hands-free while your hands stay on the keyboard or away from it entirely.",
    icon: <Mic />,
  },
  {
    topic: "PLUGINS + MARKETPLACES",
    title: "One Shelf. Every Tool.",
    description:
      "Browse, install, and toggle Claude Code plugins — agents, skills, commands, MCPs, hooks — from inside the app. Anthropic's official marketplace plus any third-party one, all in one place.",
    icon: <Puzzle />,
  },
  {
    topic: "SLASH COMMANDS",
    title: "Every Command, Picker-Ready.",
    description:
      "/ opens a picker with project + user + plugin + built-in commands — /plan, /think, /review, /explain, /test. Argument templates included. Discover, don't memorise.",
    icon: <Hash />,
  },
  {
    topic: "WORKERS TAB",
    title: "One Shelf. All Tools.",
    description:
      "Claude Code, Codex, Aider, Gemini, plain shell — every CLI agent and worker lives on one shared toolbar. Drag-and-drop any tool onto any pane. No menu diving, no per-pane config — just grab and go.",
    icon: <Boxes />,
  },
  {
    topic: "AGENT EDITOR",
    title: "In-App Agent + Skill Editor.",
    description:
      "Wide CodeMirror Markdown drawer for editing every agent and skill in place. Per-agent tool, skill, and MCP allowlists. 12-color identity palette. AI-generated system-prompt button. No leaving the app to tweak a prompt.",
    icon: <MessageSquare />,
  },
];

const POWER_FEATURES = [
  {
    icon: <Boxes />,
    topic: "MCP SERVERS",
    title: "13 One-Click Integrations",
    desc: "Linear, Atlassian, Notion, Stripe, Brave, Playwright — OAuth via local callback. Per-agent opt-in. Tokens encrypted in the macOS keychain.",
  },
  {
    icon: <Columns />,
    topic: "LAYOUTS",
    title: "Instant 1–10 Pane Grids",
    desc: "One-click 1/2/4/6/8/10-pane layouts. Save and restore custom shapes. Switch without losing pane state.",
  },
  {
    icon: <FolderOpen />,
    topic: "WORKSPACES",
    title: "Multi-Project Workspaces",
    desc: "Group related projects; switch the whole context with one click. Inactive projects keep streaming in the background.",
  },
  {
    icon: <PanelRight />,
    topic: "PANE FOCUS",
    title: "Fullscreen Any Pane",
    desc: "⌘F fullscreens the active pane. Others stay alive invisibly and keep working.",
  },
  {
    icon: <BookOpen />,
    topic: "CLAUDE.MD MEMORY",
    title: "Per-project + Global Memory",
    desc: "Memory files injected into every agent's system prompt. Scope picker lets you control what each agent sees.",
  },
  {
    icon: <Sparkles />,
    topic: "RECOMMENDED SKILLS",
    title: "One-Click Skill Installs",
    desc: "VoltAgent Awesome Design, Printing Press, Slack, Linear, Stripe, Notion, Figma, Firecrawl, and more. Setup guides for keys-required skills.",
  },
  {
    icon: <Lock />,
    topic: "LOCAL-FIRST",
    title: "Your Machine. Your Data.",
    desc: "Transcripts, agent definitions, MCP configs, OAuth tokens, voice settings — all local. Only outbound: Anthropic, optional ElevenLabs, and MCPs you add.",
  },
  {
    icon: <BarChart3 />,
    topic: "COST & USAGE",
    title: "Live Per-Pane Cost Counters",
    desc: "Real-time per-pane, per-project, and global cost. Settings → Usage breaks totals down by day, agent, and model.",
  },
  {
    icon: <MessageSquare />,
    topic: "STRUCTURED Q&A",
    title: "AskUserQuestion",
    desc: "Agents render structured multi-choice forms to you instead of guessing or rambling in prose.",
  },
  {
    icon: <Zap />,
    topic: "CAVEMAN MODE",
    title: "Caveman Mode™",
    desc: "~65–75% fewer natural-language tokens in assistant replies. Code, paths, and identifiers preserved verbatim. Good for your bill.",
  },
  {
    icon: <Sun />,
    topic: "THEMES",
    title: "Light & Dark Themes",
    desc: "Warm paper-and-ink light. Deep slate + amber dark. Live toggle in the workspace bar.",
  },
  {
    icon: <Keyboard />,
    topic: "VIM MODE",
    title: "Modal Editing Everywhere",
    desc: "Settings → Editor enables Vim keybindings across every CodeMirror surface — composer, wiki, CLAUDE.md, MCP JSON. Synced across windows.",
  },
  {
    icon: <Paperclip />,
    topic: "IMAGE ATTACHMENTS",
    title: "Drop, Paste, or Attach",
    desc: "PNG/JPEG/WEBP/GIF in the composer. Vision-capable models see them as part of the user turn.",
  },
  {
    icon: <RefreshCw />,
    topic: "KEYBOARD POLISH",
    title: "Shortcuts, Scroll, Collapse",
    desc: "Settings → Shortcuts reference with platform-aware glyphs. Auto-scroll pin with Jump to Latest pill. Collapsing tool-call rows.",
  },
  {
    icon: <Shield />,
    topic: "COMPATIBILITY",
    title: "Claude Code Config Just Works",
    desc: "Reads ~/.claude/agents/, skills, .claude.json, .mcp.json, project CLAUDE.md, and plugin install state — everything you've already set up keeps working.",
  },
];

type CompareCell = "yes" | "no" | "partial";

const COMPARISON_ROWS: {
  feature: string;
  inzone: CompareCell;
  claudeCode: CompareCell;
  cursor: CompareCell;
}[] = [
  { feature: "Multi-pane agent workspace", inzone: "yes", claudeCode: "partial", cursor: "partial" },
  { feature: "Lead mode orchestration", inzone: "yes", claudeCode: "no", cursor: "no" },
  { feature: "Visual flow pipelines", inzone: "yes", claudeCode: "no", cursor: "no" },
  { feature: "Project Wiki + Protocol", inzone: "yes", claudeCode: "no", cursor: "no" },
  { feature: "Hands-free voice commands", inzone: "yes", claudeCode: "partial", cursor: "partial" },
  { feature: "Multi-project workspaces", inzone: "yes", claudeCode: "no", cursor: "yes" },
  { feature: "Live cost telemetry", inzone: "yes", claudeCode: "partial", cursor: "partial" },
  { feature: "Built-in preview + DevTools", inzone: "yes", claudeCode: "partial", cursor: "no" },
];

export default function LandingClient() {
  const [isDark, setIsDark] = useState(true);
  const { platform } = usePlatform();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-50 dark:selection:bg-neutral-500 dark:selection:text-neutral-50 bg-[#fafafa] dark:bg-[#0d0d0d] text-[#111] dark:text-[#e0e0e0] transition-colors overflow-x-hidden relative">
      <ElasticDotGrid theme={isDark ? "dark" : "light"} />

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-neutral-300 dark:border-[#222] bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="relative w-8 h-8">
              <Image
                src="/inzone-logo-light.png"
                alt="Inzone24 logo"
                fill
                className="object-contain dark:hidden"
                priority
              />
              <Image
                src="/inzone-logo-dark.png"
                alt="Inzone24 logo"
                fill
                className="object-contain hidden dark:block"
                priority
              />
            </div>
            <span className="font-display text-2xl text-neutral-900 dark:text-[#e0e0e0]" style={{ letterSpacing: "0.06em" }}>
              INZONE<span className="text-[#B6552B] dark:text-[#E4D947]">24</span>
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="#features"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors hidden sm:block"
            >
              Features
            </a>
            <a
              href="#power-features"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors hidden md:block"
            >
              Capabilities
            </a>
            <a
              href="#compare"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors hidden md:block"
            >
              Compare
            </a>
            <a
              href="#philosophy"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors hidden sm:block"
            >
              Philosophy
            </a>

            <div className="h-4 w-px bg-neutral-300 dark:bg-[#222] hidden sm:block"></div>

            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors rounded-md"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <a
              href="https://github.com/eimis1990/inzone"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 dark:text-[#777] dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 text-center flex flex-col justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 dark:bg-neutral-800 text-[10px] font-mono tracking-[0.4em] uppercase font-bold text-neutral-600 dark:text-[#666] mb-6 border border-transparent dark:border-[#333]">
                <Zap className="w-3 h-3" />
                <span>vLatest Alpha</span>
              </span>
              <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-neutral-900 dark:text-[#e0e0e0] mb-6">
                THE MULTI-AGENT
                <br />
                <span className="text-[#777] italic font-mono lowercase tracking-tight block mt-2 font-normal">
                  workspace
                </span>
              </h1>
              <p className="max-w-md mx-auto text-sm leading-relaxed text-neutral-600 dark:text-[#999] mb-10">
                Delegate, don&apos;t micromanage. INZONE orchestrates fleets of
                Claude agents — pipelines, worktrees, wiki, voice, plugins, and
                built-in diff reviews — all in one window.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <DownloadButton />
                {platform !== "mac" && (
                  <a
                    href="#features"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 border border-neutral-300 dark:border-[#444] bg-neutral-100 dark:bg-[#222] text-neutral-900 dark:text-[#fff] px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-neutral-200 dark:hover:bg-[#333] transition-all transform hover:-translate-y-1"
                  >
                    Explore Capabilities
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Abstract Visualization */}
        <section className="py-12 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto relative flex items-center justify-center">
            <div className="absolute w-[450px] h-[450px] border border-neutral-200 dark:border-[#222] rounded-full opacity-50 pointer-events-none"></div>
            <div className="absolute w-[350px] h-[350px] border border-neutral-300 dark:border-[#333] rounded-full pointer-events-none"></div>
            <div className="absolute w-[250px] h-[250px] border border-neutral-400 dark:border-[#444] rounded-full orb-glow pointer-events-none hidden sm:block"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full rounded-xl overflow-hidden border border-neutral-300 dark:border-[#2a2a2a] bg-neutral-200 dark:bg-[#141414] shadow-2xl z-10"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-300 dark:border-[#222] bg-neutral-100 dark:bg-[#0e0e0e]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                </div>
                <div className="ml-auto flex gap-2">
                  <div className="h-6 px-2 bg-neutral-200/50 dark:bg-[#222]/50 rounded text-[10px] font-mono flex items-center text-neutral-500 dark:text-[#666]">
                    ~/projects/inzone
                  </div>
                </div>
              </div>

              <div className="aspect-[16/10] relative bg-neutral-100 dark:bg-[#0a0a0a] overflow-hidden">
                <Image
                  src="/hero_image_light.png"
                  alt="INZONE workspace preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover dark:hidden"
                  priority
                />
                <Image
                  src="/hero_image_dark.png"
                  alt="INZONE workspace preview"
                  fill
                  sizes="(max-width: 768px) 100vw, 1200px"
                  className="object-cover hidden dark:block"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Interactive Features Section */}
        <InteractiveFeaturesSection />

        {/* Demo Video Section */}
        <DemoVideoSection />

        {/* Power Features grid */}
        <PowerFeaturesSection />

        {/* Comparison table */}
        <ComparisonSection />

        {/* CTO Philosophy Block */}
        <section id="philosophy" className="py-32 px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-neutral-500 dark:text-[#666] mb-8">
              Design Philosophy
            </h2>
            <blockquote className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-[#e0e0e0] leading-[1.1] mb-8 tracking-tighter uppercase">
              &quot;We don&apos;t need simply more chatbots. We need environments
              that orchestrate them.
              <br />
              <span className="text-neutral-500 dark:text-[#666]">
                Process, structure, and parallel paths over raw inference.
              </span>
              &quot;
            </blockquote>
            <div className="stat-line mb-4"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-800 dark:text-[#e0e0e0]">
              INZONE Architecture
            </p>
          </div>
        </section>

        {/* Quick Start / Terminal Block */}
        <section className="py-24 px-6 relative z-10 bg-neutral-100 dark:bg-[#111] border-t border-neutral-200 dark:border-[#222]">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="text-[10px] font-mono text-neutral-500 dark:text-[#666] tracking-[0.4em] uppercase mb-4 block">
                Get Started
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.1] mb-4">
                Initialize Your Flow
              </h2>
              <p className="text-neutral-600 dark:text-[#999] text-sm leading-relaxed font-mono max-w-sm mx-auto md:mx-0">
                Deploy INZONE globally and start orchestrating sequential agent
                environments right from your CLI in minutes.
              </p>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="rounded-lg overflow-hidden border border-neutral-300 dark:border-[#333] shadow-2xl glass-panel relative">
                <div className="bg-neutral-200 dark:bg-[#1a1a1a] px-4 py-2 flex items-center gap-2 border-b border-neutral-300 dark:border-[#333]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                  </div>
                  <div className="ml-auto text-[10px] font-mono text-neutral-500 font-bold uppercase tracking-widest">
                    终端 bash
                  </div>
                </div>
                <div className="bg-neutral-50 dark:bg-black p-6 font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 space-y-3">
                  <div className="flex">
                    <span className="text-blue-500 mr-2">❯</span>
                    <span>npm install -g inzone-core</span>
                  </div>
                  <div className="flex text-neutral-500 dark:text-[#666] opacity-70">
                    <span>added 42 packages in 1.2s</span>
                  </div>
                  <div className="flex">
                    <span className="text-blue-500 mr-2">❯</span>
                    <span>inzone init --workspace=&quot;./project&quot;</span>
                  </div>
                  <div className="flex text-green-500">
                    <span>✔ Environment orchestrated successfully.</span>
                  </div>
                  <div className="flex animate-pulse">
                    <span className="text-blue-500 mr-2">❯</span>
                    <span className="w-2 h-4 bg-neutral-400 dark:bg-[#fff] inline-block"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 px-6 relative z-10 bg-neutral-900 dark:bg-black text-white text-center border-t border-neutral-800 dark:border-[#222]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[1.1] mb-6">
              Ready to orchestrate?
            </h2>
            <p className="text-neutral-400 font-mono text-sm max-w-xl mx-auto mb-10">
              Join the alpha. Start running multi-agent workflows out of the box
              and stop babysitting your processes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/eimis1990/inzone"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all transform hover:-translate-y-1"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="w-full flex flex-col md:flex-row items-center px-12 py-8 border-t border-neutral-200 dark:border-[#222] z-20 gap-8 lg:gap-12 bg-white dark:bg-[#0d0d0d] relative">
        <div className="absolute top-0 left-0 w-full h-1 shimmer pointer-events-none"></div>

        <div className="flex items-center gap-1 lg:mr-auto">
          <div className="relative w-8 h-8">
            <Image
              src="/inzone-logo-light.png"
              alt="Inzone24 logo"
              fill
              className="object-contain dark:hidden"
            />
            <Image
              src="/inzone-logo-dark.png"
              alt="Inzone24 logo"
              fill
              className="object-contain hidden dark:block"
            />
          </div>
          <span className="font-display text-2xl text-neutral-900 dark:text-[#e0e0e0]" style={{ letterSpacing: "0.06em" }}>
            INZONE<span className="text-[#B6552B] dark:text-[#E4D947]">24</span>
          </span>
        </div>

        <div className="flex flex-col gap-1 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-[#555] tracking-widest">
            Links
          </span>
          <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
            <a
              href="https://github.com/eimis1990/inzone"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-[#777] hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Repo
            </a>
            <a
              href="https://github.com/eimis1990/inzone/releases"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-[#777] hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Releases
            </a>
            <a
              href="https://github.com/eimis1990/inzone/graphs/contributors"
              className="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-[#777] hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Contributors
            </a>
          </div>
        </div>

        <div className="w-px h-10 bg-neutral-200 dark:bg-[#222] hidden md:block"></div>

        <div className="flex flex-col gap-1 items-center md:items-start">
          <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-[#555] tracking-widest">
            License
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black uppercase text-neutral-900 dark:text-white">
              MIT
            </span>
            <span className="text-[10px] text-neutral-500 dark:text-[#444] font-mono">
              Open Source
            </span>
          </div>
        </div>

        <div className="w-px h-10 bg-neutral-200 dark:bg-[#222] hidden lg:block"></div>

        <div className="flex flex-col items-center md:items-end">
          <span className="text-[10px] uppercase font-bold text-neutral-500 dark:text-[#555] tracking-widest">
            System Status
          </span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 bg-neutral-400 dark:bg-[#fff] rounded-full animate-pulse"></div>
            <span className="text-[11px] text-neutral-600 dark:text-[#aaa] font-mono uppercase">
              All Nodes Operational
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function InteractiveFeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".feat-row");

      rows.forEach((row, i) => {
        const isEven = i % 2 === 0;
        const imageCard = row.querySelector<HTMLElement>(".feat-image-card");
        const imageInner = row.querySelector<HTMLElement>(".feat-image-inner");
        const text = row.querySelector<HTMLElement>(".feat-text");
        const line = row.querySelector<HTMLElement>(".feat-line");

        if (!imageCard || !text || !line) return;

        gsap.set(imageCard, {
          autoAlpha: 0,
          x: isEven ? 90 : -90,
          y: 36,
          rotateY: isEven ? -22 : 22,
          rotateX: 7,
          rotateZ: isEven ? -4 : 4,
          scale: 0.92,
          transformPerspective: 1400,
          filter: "blur(3px)",
        });
        gsap.set(text, {
          autoAlpha: 0,
          y: 18,
          x: isEven ? -16 : 16,
          filter: "blur(3px)",
        });
        if (imageInner) gsap.set(imageInner, { scale: 1.06 });
        gsap.set(line, {
          scaleX: 0,
          transformOrigin: isEven ? "left center" : "right center",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 82%",
            end: "center 50%",
            scrub: 0.75,
          },
        });

        tl.to(
          imageCard,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotateY: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          0
        );
        if (imageInner)
          tl.to(imageInner, { scale: 1, duration: 1.2, ease: "power2.out" }, 0);
        tl.to(
          text,
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          0.15
        );
        tl.to(line, { scaleX: 1, duration: 0.6, ease: "power2.out" }, 0.3);
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full z-10 bg-neutral-100 dark:bg-[#111] border-y border-neutral-300 dark:border-[#222] py-24 md:py-32"
    >
      <div className="text-center mb-16 md:mb-24 px-6">
        <h2 className="text-[10px] font-mono tracking-[0.5em] text-neutral-500 dark:text-[#888] uppercase font-bold mb-4">
          Core Capabilities
        </h2>
        <p className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.1]">
          Built for agent work.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-32 md:space-y-40">
        {ALL_FEATURES.map((feature, i) => {
          const isEven = i % 2 === 0;
          const num = String(i + 1).padStart(2, "0");

          return (
            <div
              key={i}
              className={`feat-row flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 md:gap-16 border-t border-neutral-200 dark:border-white/[0.08] pt-12`}
            >
              <div className="relative flex-1 w-full">
                <div className="feat-image-card relative w-full rounded-2xl overflow-hidden border border-neutral-300 dark:border-[#2a2a2a] bg-neutral-200 dark:bg-[#141414]">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-300 dark:border-[#222] bg-neutral-100 dark:bg-[#0e0e0e]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-5 rounded bg-neutral-200 dark:bg-[#1a1a1a] w-full max-w-[200px] mx-auto" />
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400 dark:text-[#555] uppercase tracking-widest">
                      Preview
                    </span>
                  </div>

                  <div className="feat-image-inner aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-[#0a0a0a] relative">
                    <Image
                      src={`/features/feature_${i + 1}_light.png`}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover dark:hidden"
                      priority={i < 2}
                    />
                    <Image
                      src={`/features/feature_${i + 1}_dark.png`}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover hidden dark:block"
                      priority={i < 2}
                    />
                  </div>
                </div>
              </div>

              <div
                className={`feat-text flex-1 w-full flex flex-col ${
                  isEven ? "md:items-start" : "md:items-end md:text-right"
                }`}
              >
                <span className="text-[10px] font-mono text-neutral-400 dark:text-[#555] tracking-[0.4em] uppercase mb-3">
                  {num} — {feature.topic}
                </span>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.05] mb-5">
                  {feature.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed text-neutral-600 dark:text-[#999] max-w-sm ${
                    isEven ? "" : "md:ml-auto"
                  }`}
                >
                  {feature.description}
                </p>
                <div
                  className={`feat-line mt-8 h-px w-full max-w-[200px] bg-neutral-900 dark:bg-[#e0e0e0] ${
                    isEven ? "" : "md:ml-auto"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DemoVideoSection() {
  return (
    <section
      id="demo"
      className="py-32 px-6 relative z-10 bg-white dark:bg-[#0a0a0a] border-b border-neutral-200 dark:border-[#222] min-h-screen flex items-center"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-24">
          <span className="text-[10px] font-mono text-neutral-500 dark:text-[#666] tracking-[0.4em] uppercase mb-4 block">
            Quick Demo
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.1]">
            See Inzone in Action
          </h2>
        </div>

        <div className="relative w-full aspect-[16/10] md:aspect-video rounded-3xl border border-neutral-200 dark:border-[#333] shadow-2xl glass-panel flex items-center justify-center overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-3xl hover:border-neutral-300 dark:hover:border-[#444]">
          <div className="absolute inset-0 bg-neutral-100 dark:bg-[#111] inner-shimmer"></div>
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-300 via-transparent to-transparent dark:from-white dark:via-transparent dark:to-transparent"></div>

          <div className="absolute top-0 left-0 right-0 h-10 border-b border-neutral-200 dark:border-[#222] bg-white/50 dark:bg-black/50 backdrop-blur-md flex items-center px-4 gap-2 z-10">
            <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-[#444]"></div>
            <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-[#444]"></div>
            <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-[#444]"></div>
          </div>

          <div className="relative z-20 w-20 h-20 md:w-28 md:h-28 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-2xl transform transition-transform duration-500 group-hover:scale-110">
            <Play
              className="w-8 h-8 md:w-12 md:h-12 ml-1 md:ml-2"
              fill="currentColor"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TaskNode({
  title,
  icon,
  active = false,
}: {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`border rounded-md p-3 flex items-center gap-4 border-neutral-300 dark:border-[#444] ${
        active
          ? "bg-neutral-900 dark:bg-[#333] text-neutral-50 dark:text-[#fff]"
          : "bg-white/50 dark:bg-transparent text-neutral-700 dark:text-[#999]"
      }`}
    >
      <div
        className={`flex-shrink-0 opacity-80 ${
          active ? "dark:text-[#fff]" : "dark:text-[#666]"
        }`}
      >
        {icon}
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wider">
        {title}
      </span>
      {active && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="ml-auto w-2 h-2 rounded-full bg-neutral-400 dark:bg-[#fff]"
        />
      )}
    </motion.div>
  );
}

function ConnectionLine() {
  return (
    <div className="flex justify-center my-[-8px] relative z-0">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "32px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-px bg-neutral-400 dark:bg-[#444]"
      />
    </div>
  );
}

function PowerFeaturesSection() {
  return (
    <section
      id="power-features"
      className="py-32 px-6 relative z-10 bg-white dark:bg-[#0a0a0a] border-t border-neutral-200 dark:border-[#222]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-mono text-neutral-500 dark:text-[#666] tracking-[0.4em] uppercase mb-4 block">
            Everything Else
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.1]">
            Built for Power Users
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POWER_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.04, duration: 0.4, ease: "easeOut" }}
              className="border border-neutral-200 dark:border-[#222] bg-white/50 dark:bg-[#111]/50 rounded-xl p-5 hover:border-neutral-400 dark:hover:border-[#444] transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neutral-100 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-[#222] flex items-center justify-center text-neutral-700 dark:text-[#bbb] group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                  {React.cloneElement(
                    f.icon as React.ReactElement<{ className?: string }>,
                    { className: "w-5 h-5" }
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-mono text-neutral-500 dark:text-[#666] tracking-[0.3em] uppercase mb-1.5 block">
                    {f.topic}
                  </span>
                  <h3 className="text-sm font-black tracking-tight text-neutral-900 dark:text-[#e0e0e0] uppercase mb-2 leading-tight">
                    {f.title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-[#999] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompareCellRender({ value }: { value: CompareCell }) {
  if (value === "yes") {
    return (
      <Check className="w-4 h-4 text-green-500 mx-auto" strokeWidth={3} />
    );
  }
  if (value === "partial") {
    return <Minus className="w-4 h-4 text-amber-500 mx-auto" strokeWidth={3} />;
  }
  return (
    <X
      className="w-4 h-4 text-neutral-400 dark:text-neutral-600 mx-auto"
      strokeWidth={2.5}
    />
  );
}

function ComparisonSection() {
  return (
    <section
      id="compare"
      className="py-32 px-6 relative z-10 bg-neutral-50 dark:bg-[#0d0d0d] border-t border-neutral-200 dark:border-[#222]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-[10px] font-mono text-neutral-500 dark:text-[#666] tracking-[0.4em] uppercase mb-4 block">
            VS the Alternatives
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-neutral-900 dark:text-[#e0e0e0] uppercase leading-[1.1]">
            Why Not Just Use Claude Code?
          </h2>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-[#222] overflow-hidden bg-white dark:bg-[#0a0a0a] shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-neutral-100 dark:bg-[#111] border-b border-neutral-200 dark:border-[#222]">
                  <th className="text-left px-5 py-4 sticky left-0 bg-neutral-100 dark:bg-[#111] z-10 text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500 dark:text-[#666] font-bold">
                    Feature
                  </th>
                  <th className="px-5 py-4 text-center ring-1 ring-inset ring-neutral-900/10 dark:ring-white/10 bg-neutral-200/60 dark:bg-[#161616]">
                    <span className="text-xs font-black uppercase tracking-widest text-neutral-900 dark:text-white">
                      INZONE
                    </span>
                  </th>
                  <th className="px-5 py-4 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-[#666] font-bold">
                    Claude Code
                  </th>
                  <th className="px-5 py-4 text-center text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-[#666] font-bold">
                    Cursor
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-neutral-200 dark:border-[#1c1c1c] last:border-b-0 ${
                      i % 2 === 1
                        ? "bg-neutral-50/60 dark:bg-[#0c0c0c]"
                        : ""
                    }`}
                  >
                    <td
                      className={`px-5 py-3.5 sticky left-0 text-neutral-800 dark:text-[#ddd] font-medium z-10 ${
                        i % 2 === 1
                          ? "bg-neutral-50/95 dark:bg-[#0c0c0c]"
                          : "bg-white/95 dark:bg-[#0a0a0a]"
                      }`}
                    >
                      {row.feature}
                    </td>
                    <td className="px-5 py-3.5 ring-1 ring-inset ring-neutral-900/10 dark:ring-white/10 bg-neutral-100/40 dark:bg-[#141414]">
                      <CompareCellRender value={row.inzone} />
                    </td>
                    <td className="px-5 py-3.5">
                      <CompareCellRender value={row.claudeCode} />
                    </td>
                    <td className="px-5 py-3.5">
                      <CompareCellRender value={row.cursor} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 dark:text-[#666]">
          <span className="inline-flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-green-500" strokeWidth={3} />
            Yes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Minus className="w-3.5 h-3.5 text-amber-500" strokeWidth={3} />
            Partial
          </span>
          <span className="inline-flex items-center gap-1.5">
            <X
              className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-600"
              strokeWidth={2.5}
            />
            No
          </span>
        </div>
      </div>
    </section>
  );
}
