"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

interface Feature {
  number: string;
  tag: string;
  headline: string;
  body: string[];
  visual: React.ReactNode;
}

// Visual components for each feature
function FeatureImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-surface-1 rounded-[20px] border border-hairline overflow-hidden card-hover">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className="w-full h-auto"
      />
    </div>
  );
}

// Gradient spotlight card variant for featured features
function SpotlightFeatureImage({
  src,
  alt,
  variant = "violet",
}: {
  src: string;
  alt: string;
  variant?: "violet" | "magenta" | "coral" | "orange";
}) {
  const gradientClasses = {
    violet: "spotlight-card-violet",
    magenta: "spotlight-card-magenta",
    coral: "spotlight-card-coral",
    orange: "spotlight-card-orange",
  };

  return (
    <div
      className={`spotlight-card spotlight-animated ${gradientClasses[variant]} card-hover`}
    >
      <div className="rounded-[20px] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={500}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}

function MultiPaneVisual() {
  return (
    <FeatureImage
      src="/multi-pane-workspace.png"
      alt="Multi-pane workspace showing multiple agents working in parallel"
    />
  );
}

function WorkersTabVisual() {
  return (
    <FeatureImage
      src="/workers-tab.png"
      alt="Workers tab showing agents and CLI tools"
    />
  );
}

function FlowVisual() {
  return (
    <FeatureImage
      src="/flow.png"
      alt="Flow canvas showing agent pipeline workflow"
    />
  );
}

function DiffReviewVisual() {
  return (
    <FeatureImage
      src="/diff-review.png"
      alt="Diff review interface with side-by-side comparison"
    />
  );
}

function LeadModeVisual() {
  return (
    <FeatureImage
      src="/lead-mode.png"
      alt="Lead mode with orchestrator agent managing subagents"
    />
  );
}

function VoiceVisual() {
  return (
    <FeatureImage
      src="/voice.png"
      alt="Voice interface for controlling agents"
    />
  );
}

function MissionControlVisual() {
  return (
    <FeatureImage
      src="/mission-control.png"
      alt="Mission Control showing all projects and agents"
    />
  );
}

function LocalFirstVisual() {
  return (
    <div className="bg-surface-1 rounded-[20px] border border-hairline overflow-hidden p-6 card-hover">
      <div className="flex flex-col items-center">
        {/* MacBook */}
        <div className="w-16 h-10 bg-surface-2 rounded-[10px] border border-hairline flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-ink-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
            />
          </svg>
        </div>
        {/* Connections */}
        <div className="flex gap-8 micro text-ink-muted">
          <div className="text-center">
            <div className="w-8 h-0.5 bg-hairline mb-2 mx-auto" />
            <span>Anthropic</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-0.5 bg-hairline mb-2 mx-auto opacity-50" />
            <span className="opacity-50">ElevenLabs</span>
          </div>
          <div className="text-center">
            <div className="w-8 h-0.5 bg-hairline mb-2 mx-auto" />
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

function FeatureText({ feature }: { feature: Feature }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="font-mono caption text-accent">{feature.number}</span>
        <span className="text-ink-muted caption">/</span>
        <span className="font-mono caption text-ink-muted">{feature.tag}</span>
      </div>
      <h3 className="font-display display-lg text-ink">
        {feature.headline}
      </h3>
      <div className="space-y-3">
        {feature.body.map((paragraph, idx) => (
          <p key={idx} className="body text-ink-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}

function FeatureBlock({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  const isImageRight = index % 2 === 0;

  if (isImageRight) {
    // Text left, Image right
    return (
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-12 items-center">
        <ScrollReveal direction="left">
          <FeatureText feature={feature} />
        </ScrollReveal>
        <ScrollReveal direction="right" delay={0.2}>
          {feature.visual}
        </ScrollReveal>
      </div>
    );
  }

  // Image left, Text right
  return (
    <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-center">
      <ScrollReveal direction="left" delay={0.2}>
        {feature.visual}
      </ScrollReveal>
      <ScrollReveal direction="right">
        <FeatureText feature={feature} />
      </ScrollReveal>
    </div>
  );
}

export default function Features() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 space-y-24 lg:space-y-32">
        {features.map((feature, index) => (
          <FeatureBlock key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
