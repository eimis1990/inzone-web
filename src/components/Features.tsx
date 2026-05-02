"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Feature {
  number: string;
  tag: string;
  headline: string;
  body: string[];
  visual: React.ReactNode;
}

// Visual components for each feature
function MultiPaneVisual() {
  const panes = [
    { emoji: "🎨", name: "frontend", color: "#E4D947" },
    { emoji: "⚙️", name: "backend", color: "#B78AFF" },
    { emoji: "🌐", name: "browser", color: "#3DDC97" },
    { emoji: "👑", name: "lead", color: "#E4D947" },
  ];

  return (
    <div className="bg-bg-elev rounded-xl border border-border overflow-hidden">
      {/* Title bar */}
      <div className="h-6 bg-bg-elev-2 border-b border-border flex items-center px-3 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-danger/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-accent/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-ok/80" />
      </div>
      {/* Panes */}
      <div className="grid grid-cols-2 gap-2 p-2">
        {panes.map((pane, idx) => (
          <motion.div
            key={idx}
            className="bg-bg rounded-lg border border-border p-3 h-24"
            initial={{ borderColor: "var(--border)" }}
            whileHover={{ borderColor: pane.color }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-sm">{pane.emoji}</span>
              <span className="text-xs font-mono text-muted">{pane.name}</span>
            </div>
            <div className="space-y-1">
              <div className="h-2 bg-bg-elev-2 rounded w-full" />
              <div className="h-2 bg-bg-elev-2 rounded w-3/4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function WorkersTabVisual() {
  const agents = [
    { emoji: "🎨", name: "frontend-developer" },
    { emoji: "⚙️", name: "backend-developer" },
    { emoji: "👑", name: "lead-agent" },
  ];
  const tools = [
    { icon: "◆", name: "Claude Code" },
    { icon: "▲", name: "Aider" },
    { icon: "●", name: "Shell" },
  ];

  return (
    <div className="bg-bg-elev rounded-xl border border-border overflow-hidden">
      <div className="p-4 space-y-4">
        <div>
          <div className="text-xs font-mono text-accent mb-2 uppercase tracking-wider">
            Agents
          </div>
          <div className="space-y-2">
            {agents.map((agent, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-lg bg-bg border border-border hover:border-accent/50 transition-colors cursor-pointer"
                whileHover={{ x: 4 }}
              >
                <span>{agent.emoji}</span>
                <span className="text-sm text-text-dim">{agent.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-mono text-accent-2 mb-2 uppercase tracking-wider">
            CLI Tools
          </div>
          <div className="space-y-2">
            {tools.map((tool, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-lg bg-bg border border-border hover:border-accent-2/50 transition-colors cursor-pointer"
                whileHover={{ x: 4 }}
              >
                <span className="text-accent-2">{tool.icon}</span>
                <span className="text-sm text-text-dim">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="bg-bg-elev rounded-xl border border-border overflow-hidden p-6"
    >
      <div className="relative flex items-center justify-between">
        {/* Cards */}
        {["Extract", "Transform", "Load"].map((label, idx) => (
          <motion.div
            key={idx}
            className="relative z-10 w-24 p-3 bg-bg rounded-lg border border-border text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: idx * 0.2, duration: 0.4 }}
          >
            <div className="text-xs font-mono text-muted mb-1">0{idx + 1}</div>
            <div className="text-sm text-text">{label}</div>
            {idx < 2 && (
              <motion.div
                className="absolute -right-10 top-1/2 w-8 h-0.5 bg-accent"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5 + idx * 0.3, duration: 0.3 }}
                style={{ originX: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-4 flex justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 }}
      >
        <div className="px-3 py-1.5 rounded-full bg-ok/20 text-ok text-xs font-mono">
          ▶ Run Flow
        </div>
      </motion.div>
    </div>
  );
}

function DiffReviewVisual() {
  return (
    <div className="bg-bg-elev rounded-xl border border-border overflow-hidden">
      <div className="p-4 font-mono text-xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-muted">src/components/Button.tsx</span>
        </div>
        <div className="space-y-1">
          <div className="flex">
            <span className="w-8 text-muted text-right pr-2">12</span>
            <span className="flex-1 bg-danger/10 text-danger px-2 rounded-l">
              - const Button = (props) =&gt; {"{"}
            </span>
          </div>
          <div className="flex">
            <span className="w-8 text-muted text-right pr-2">12</span>
            <span className="flex-1 bg-ok/10 text-ok px-2 rounded-l">
              + const Button: FC&lt;Props&gt; = ({"{"} label {"}"}) =&gt; {"{"}
            </span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="px-3 py-1 rounded bg-ok/20 text-ok text-xs">
            Accept
          </button>
          <button className="px-3 py-1 rounded bg-danger/20 text-danger text-xs">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

function LeadModeVisual() {
  return (
    <div className="bg-bg-elev rounded-xl border border-border overflow-hidden">
      <div className="p-4">
        {/* Lead pane */}
        <div className="mb-3 p-3 bg-bg rounded-lg border-2 border-accent">
          <div className="flex items-center gap-2 mb-2">
            <span>👑</span>
            <span className="text-sm font-mono text-accent">lead-agent</span>
          </div>
          <div className="text-xs text-text-dim">
            Coordinating 3 subagents...
          </div>
        </div>
        {/* Subagent panes */}
        <div className="grid grid-cols-3 gap-2">
          {["🎨", "⚙️", "🧪"].map((emoji, idx) => (
            <div
              key={idx}
              className="p-2 bg-bg rounded border border-border text-center"
            >
              <span>{emoji}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-ok mx-auto mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoiceVisual() {
  return (
    <div className="bg-bg-elev rounded-xl border border-border overflow-hidden p-6 flex flex-col items-center">
      <motion.div
        className="w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center orb-pulse"
        animate={{
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 20px rgba(228, 217, 71, 0.3)",
            "0 0 40px rgba(228, 217, 71, 0.5)",
            "0 0 20px rgba(228, 217, 71, 0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-2xl">🎙</span>
      </motion.div>
      <div className="mt-4 text-sm text-text-dim text-center">
        &quot;Spin up a frontend agent on this folder&quot;
      </div>
    </div>
  );
}

function MissionControlVisual() {
  const projects = [
    { name: "web-app", agents: 3, status: "active" },
    { name: "api-server", agents: 2, status: "idle" },
  ];

  return (
    <div className="bg-bg-elev rounded-xl border border-border overflow-hidden p-4">
      <div className="text-xs font-mono text-muted mb-3">
        ⌘⇧M Mission Control
      </div>
      <div className="space-y-2">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            className="p-3 bg-bg rounded-lg border border-border cursor-pointer"
            whileHover={{ borderColor: "var(--accent)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-text">{project.name}</span>
              <span
                className={`text-xs ${project.status === "active" ? "text-ok" : "text-muted"}`}
              >
                {project.agents} agents
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LocalFirstVisual() {
  return (
    <div className="bg-bg-elev rounded-xl border border-border overflow-hidden p-6">
      <div className="flex flex-col items-center">
        {/* MacBook */}
        <div className="w-16 h-10 bg-bg-elev-2 rounded-lg border border-border flex items-center justify-center mb-4">
          <span className="text-xl">💻</span>
        </div>
        {/* Connections */}
        <div className="flex gap-8 text-xs text-muted">
          <div className="text-center">
            <div className="w-8 h-0.5 bg-border mb-2 mx-auto" />
            <span>Anthropic</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-0.5 bg-border mb-2 mx-auto opacity-50" />
            <span className="opacity-50">ElevenLabs</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-0.5 bg-border mb-2 mx-auto" />
            <span>Your MCPs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const features: Feature[] = [
  {
    number: "01",
    tag: "Multi-pane workspace",
    headline: "Several agents. One window. Zero context-switching.",
    body: [
      "Split your project view into independent panes, each with its own agent and conversation. Agents run in parallel, see the same project folder, and can hand off work to each other through lightweight file conventions.",
      "No more juggling six Claude tabs.",
    ],
    visual: <MultiPaneVisual />,
  },
  {
    number: "02",
    tag: "Workers tab",
    headline: "Agents and CLI tools share one shelf.",
    body: [
      "Drop a Claude agent on a pane to chat with it; drop Claude Code, Codex CLI, Aider, Gemini CLI, or a plain shell on a pane to embed that tool right in the layout.",
      "Same drag, same surface — choose the right tool for each task.",
    ],
    visual: <WorkersTabVisual />,
  },
  {
    number: "03",
    tag: "Flow",
    headline: "Chain your agents into pipelines.",
    body: [
      "Build a sequential workflow on a free-form canvas. Each card is a pane with its own prompt; outputs flow forward via {previous}. Hit Run Flow and walk away.",
      "Live logs surface in a side panel. n8n for AI agents, but the agents are real Claude SDK sessions doing real work.",
    ],
    visual: <FlowVisual />,
  },
  {
    number: "04",
    tag: "Worktrees + Diff Review + PR",
    headline: "Branch, build, review, ship — without leaving the app.",
    body: [
      "Spin up a git worktree off any branch from the sidebar. Several agents can work in parallel branches without stepping on each other.",
      "When the work is ready, the Review tab shows a side-by-side diff with per-hunk approve/reject. One click opens a PR via the gh CLI, and INZONE cleans up the worktree afterwards.",
    ],
    visual: <DiffReviewVisual />,
  },
  {
    number: "05",
    tag: "Lead mode",
    headline: "One orchestrator. Many subagents.",
    body: [
      "Switch a project into Lead mode and a top pane becomes the orchestrator agent. It can spawn subagents, message them by name, watch their progress, and hand off tasks.",
      "The same lightweight pattern Anthropic uses internally — without any of the plumbing.",
    ],
    visual: <LeadModeVisual />,
  },
  {
    number: "06",
    tag: "Voice",
    headline: "Talk to your fleet.",
    body: [
      'Connect an ElevenLabs Conversational AI agent and drive INZONE by voice. "Spin up a frontend agent on this folder." "Tell the backend agent to add the auth endpoint."',
      "Bring your own ElevenLabs account; INZONE doesn't take a cut.",
    ],
    visual: <VoiceVisual />,
  },
  {
    number: "07",
    tag: "Mission Control",
    headline: "Every agent. Every project. One glance.",
    body: [
      "⌘⇧M opens a full-screen overview of every project across your active workspace — agents, status, current tool, cost, last activity.",
      "Click a pane to jump to it. The closest thing to a process monitor for AI agents.",
    ],
    visual: <MissionControlVisual />,
  },
  {
    number: "08",
    tag: "Local-first",
    headline: "Your code never leaves your laptop.",
    body: [
      "All transcripts, agent definitions, MCP configs, OAuth tokens (encrypted via macOS keychain), and pipeline state live on your machine.",
      "The only data that leaves: the prompts you send to Anthropic (your subscription), Voice prompts to ElevenLabs (if you enable it), and the MCP server endpoints you explicitly add.",
    ],
    visual: <LocalFirstVisual />,
  },
];

function FeatureBlock({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
    >
      {/* Text */}
      <ScrollReveal
        className={`space-y-6 ${!isEven ? "lg:order-2" : ""}`}
        direction={isEven ? "left" : "right"}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm text-accent">
            {feature.number}
          </span>
          <span className="text-muted">/</span>
          <span className="font-mono text-sm text-muted">{feature.tag}</span>
        </div>
        <h3 className="font-display text-3xl lg:text-4xl xl:text-5xl text-text">
          {feature.headline}
        </h3>
        <div className="space-y-4">
          {feature.body.map((paragraph, idx) => (
            <p key={idx} className="text-text-dim leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </ScrollReveal>

      {/* Visual */}
      <ScrollReveal
        className={!isEven ? "lg:order-1" : ""}
        direction={isEven ? "right" : "left"}
        delay={0.2}
      >
        {feature.visual}
      </ScrollReveal>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-24 lg:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 space-y-24 lg:space-y-32">
        {features.map((feature, index) => (
          <FeatureBlock key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
