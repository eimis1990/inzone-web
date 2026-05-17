import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Squada_One } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const squadaOne = Squada_One({
  variable: "--font-squada-one",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://inzone.app";
const SITE_NAME = "INZONE";
const PRIMARY_DESCRIPTION =
  "INZONE is a macOS multi-agent workspace for Claude Code. Orchestrate sequential agent pipelines, worktrees, voice control, plugins, and visual diff reviews in one window.";

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "INZONE — The Multi-Agent Workspace for Claude Code",
    template: "%s | INZONE",
  },
  description: PRIMARY_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "developer tools",
  keywords: [
    "INZONE",
    "Claude Code",
    "Claude Code orchestration",
    "Claude Agent SDK GUI",
    "multi-agent IDE",
    "multi-agent workspace",
    "AI pair programming macOS",
    "AI coding agent",
    "agent pipeline",
    "agent orchestration",
    "AI worktree manager",
    "Claude desktop app",
    "Anthropic Claude",
    "developer tools macOS",
    "AI IDE",
    "Cursor alternative",
    "git worktree GUI",
    "AI agent voice control",
    "MCP client",
    "sequential agent workflow",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "INZONE — The Multi-Agent Workspace for Claude Code",
    description: PRIMARY_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "INZONE — The Multi-Agent Workspace",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INZONE — The Multi-Agent Workspace for Claude Code",
    description: PRIMARY_DESCRIPTION,
    images: ["/og-image.png"],
    // TODO: add `creator: "@handle"` once Twitter/X account exists.
  },
  manifest: "/manifest.json",
  // TODO: populate `verification` once Search Console / Bing Webmaster property is claimed.
  //   verification: {
  //     google: "<google-site-verification-token>",
  //     other: { "msvalidate.01": "<bing-token>" },
  //   },
};

const FEATURE_LIST = [
  "Multi-pane Claude Code workspace",
  "Lead-mode agent orchestration",
  "Visual flow pipelines on a free-form canvas",
  "Built-in git worktree management",
  "Per-hunk diff review with GitHub PR drafting",
  "Mission Control dashboard across every project",
  "Inline browser preview pane with DevTools",
  "GPU-accelerated built-in terminal (PTY)",
  "Project wiki with auto-injected protocol",
  "Hands-free voice control (ElevenLabs)",
  "One-click MCP server integrations",
  "Slash command picker across project, user, plugin scopes",
  "In-app agent and skill editor",
  "Live per-pane cost and usage telemetry",
  "Local-first data storage in the macOS keychain",
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/inzone-logo-light.png`,
        width: 1024,
        height: 1024,
      },
      // TODO: populate with real social profile URLs once accounts exist.
      sameAs: [] as string[],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: PRIMARY_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: SITE_NAME,
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "IDE",
      operatingSystem: "macOS 13+",
      softwareRequirements: "macOS 13+",
      description:
        "INZONE is a macOS app for orchestrating multiple Claude Agent SDK sessions in a single window — multi-pane workspaces, lead-mode orchestration, flow pipelines, worktrees, project wiki, voice, and diff reviews.",
      url: SITE_URL,
      downloadUrl: "https://github.com/eimis1990/inzone/releases",
      installUrl: "https://github.com/eimis1990/inzone/releases",
      softwareVersion: "1.0-alpha",
      screenshot: `${SITE_URL}/og-image.png`,
      image: `${SITE_URL}/og-image.png`,
      featureList: FEATURE_LIST,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      license: "https://opensource.org/licenses/MIT",
      // TODO: add `aggregateRating` ONLY when real user ratings exist — never fabricate.
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is INZONE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "INZONE is a macOS multi-agent workspace for Claude Code. It lets you run multiple Claude Agent SDK sessions side-by-side in a single window, orchestrate them with a Lead agent, chain them into sequential flow pipelines, and review their work with built-in diff and PR tooling.",
          },
        },
        {
          "@type": "Question",
          name: "How does INZONE work with Claude Code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "INZONE reads your existing Claude Code configuration — ~/.claude/agents/, skills, .claude.json, .mcp.json, project CLAUDE.md, and plugin install state — and runs each pane as a real Claude Agent SDK session. Anything you've already set up in Claude Code keeps working inside INZONE.",
          },
        },
        {
          "@type": "Question",
          name: "Is INZONE free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "INZONE itself is free and open source under the MIT license. You bring your own Anthropic API key (or Claude subscription) — token usage is billed by Anthropic, not by INZONE. Live per-pane and per-project cost counters are built in.",
          },
        },
        {
          "@type": "Question",
          name: "What platforms does INZONE support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "INZONE is a native macOS app targeting macOS 13 or later. Linux and Windows are not currently supported.",
          },
        },
        {
          "@type": "Question",
          name: "How is INZONE different from Cursor or the Claude Code CLI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Cursor is a single-agent IDE; the Claude Code CLI is a single-pane terminal. INZONE is purpose-built for running fleets of agents in parallel: multi-pane workspaces, a Lead orchestrator that delegates to sub-agents, visual flow pipelines, git worktrees, a project wiki that all agents share, voice control, and per-hunk diff review with PR drafting — all in one window.",
          },
        },
        {
          "@type": "Question",
          name: "Where is my data stored?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Local-first. Transcripts, agent definitions, MCP configs, OAuth tokens, and voice settings stay on your machine. The only outbound traffic is to Anthropic, optionally ElevenLabs (for voice), and any MCP servers you explicitly add. Tokens are encrypted in the macOS keychain.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${squadaOne.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
