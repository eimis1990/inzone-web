import type { MetadataRoute } from "next";

const SITE_URL = "https://inzone.app";

// LLM / AI crawlers we explicitly allow. These bots decide whether INZONE
// content shows up in ChatGPT, Perplexity, Claude, Gemini, Apple Intelligence,
// and Common Crawl-derived corpora. Listing each one explicitly (rather than
// just relying on `*`) makes the intent legible to anyone auditing robots.txt.
const LLM_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "FacebookBot",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "YouBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default policy — all reputable crawlers welcome on every path.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicit per-LLM allow rules. Redundant with `*` today but defends
      // against an upstream policy flip from "indexable by default" to
      // "opt-in" — several of these agents now require an explicit rule.
      ...LLM_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
