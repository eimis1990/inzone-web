# SEO + LLM discoverability

How INZONE-web is wired for traditional search engines AND for LLM answer
engines (ChatGPT, Perplexity, Claude, Gemini, Apple Intelligence). All of
this is plain Next.js App Router file-conventions and static metadata —
no third-party SEO plugin, no SSR-time generation outside the standard
`generateMetadata`-less single-page setup.

## Favicon + app icons (file-convention based)

Next.js auto-detects icons placed inside `src/app/` and emits the right
`<link>` tags. We deliberately **do not** declare `metadata.icons` in
`src/app/layout.tsx` any more — letting the file convention own this avoids
the conflict where an explicit `/favicon.ico` reference overrode the
auto-emitted asset and pointed at a missing file.

Layout:

- `src/app/icon.png` — 32×32 PNG. Becomes `/icon.png` and `<link rel="icon">`.
- `src/app/apple-icon.png` — 180×180 PNG. Becomes `/apple-icon.png` and `<link rel="apple-touch-icon">`.
- `public/favicon.ico` — multi-size ICO (16/32/48). Served at `/favicon.ico` for any browser/scraper that still hits the legacy path directly.
- `public/apple-touch-icon.png` — 180×180 mirror at the legacy public path.
- `public/icon-192.png`, `public/icon-512.png` — PWA-manifest icons.

**Source.** All five PNGs are derived from `public/inzone-logo-light.png`
(the orange compass-star variant — better contrast than the yellow dark
variant against the white/light tab bars in Safari, Chrome, and Edge).
Regenerate with ImageMagick:

```sh
magick public/inzone-logo-light.png -background none -resize 32x32 src/app/icon.png
magick public/inzone-logo-light.png -background none -resize 180x180 src/app/apple-icon.png
magick public/inzone-logo-light.png -background none -resize 192x192 public/icon-192.png
magick public/inzone-logo-light.png -background none -resize 512x512 public/icon-512.png
magick public/inzone-logo-light.png -background none -resize 180x180 public/apple-touch-icon.png
magick public/inzone-logo-light.png -background none \
  \( -clone 0 -resize 16x16 \) \
  \( -clone 0 -resize 32x32 \) \
  \( -clone 0 -resize 48x48 \) \
  -delete 0 public/favicon.ico
```

**The old `src/app/favicon.ico` was removed.** It was the unmodified
Next.js create-template Vercel favicon (`MS Windows icon resource - 4 icons,
16x16 32bit, 32x32 32bit`) — 25 KB of Vercel-logo bytes that survived from
the initial `create-next-app` scaffold. Browsers were rendering it (so the
tab wasn't "blank" in every case) but it was the wrong brand. Deleting it
forces resolution to `public/favicon.ico` (our brand icon) and lets the
`src/app/icon.png` file-convention own the modern `<link rel="icon">`.

## Web App Manifest

`public/manifest.json` declares the PWA-style manifest:

- `name`, `short_name`, `description` — match the site copy.
- `theme_color` / `background_color` — `#0d0d0d` (matches the dark UI).
- `display: "standalone"`, `start_url: "/"`.
- `icons[]` — points at `/icon-192.png`, `/icon-512.png`, `/apple-touch-icon.png`.

Referenced from `metadata.manifest = "/manifest.json"` in
`src/app/layout.tsx`.

## Metadata in `src/app/layout.tsx`

Key fields:

- `metadataBase: new URL("https://inzone.app")` — makes relative OG/Twitter image URLs resolve absolutely.
- `title: { default, template }` — child pages can ship a bare title and get `"<Title> | INZONE"` for free.
- `description` — under 160 chars, leads with "INZONE is a macOS multi-agent workspace for Claude Code".
- `keywords[]` — ~20 entries spanning brand, category, comparison, and feature keywords.
- `category: "developer tools"`.
- `formatDetection` — disables auto-link of email/phone/address (irrelevant for a dev-tool site, prevents iOS Safari from rewriting copy).
- `alternates.canonical: "/"` — single canonical for the single page.
- `robots` — explicit `index/follow` with Google-bot `max-image-preview: large` so rich previews can use the full hero / OG image.
- OpenGraph + Twitter mirror the same title/description, with `/og-image.png` 1200×630.
- `verification` is **commented out** with a TODO. We intentionally do NOT ship placeholder verification tokens — those render as broken `<meta name="google-site-verification" content="REPLACE...">` tags in production HTML, which is worse than missing them. Uncomment + paste the real token once a property is verified.

## JSON-LD structured data

One `<script type="application/ld+json">` injected from
`src/app/layout.tsx` containing a `@graph` of four blocks:

- **Organization** — name, url, logo (`/inzone-logo-light.png`), `sameAs: []` (TODO once socials exist).
- **WebSite** — points at the homepage, publisher → Organization.
- **SoftwareApplication** — `applicationCategory: "DeveloperApplication"`, `operatingSystem: "macOS 13+"`, `softwareRequirements: "macOS 13+"`, `softwareVersion: "1.0-alpha"`, `offers: { price: "0", priceCurrency: "USD" }`, `downloadUrl` + `installUrl` → GitHub releases, `featureList[]` (15 bullets pulled from `src/components/LandingClient.tsx` `ALL_FEATURES` + `POWER_FEATURES`), `screenshot` → `/og-image.png`, `license` → MIT. **No `aggregateRating`** until real user reviews exist — fabricated ratings are a Google rich-result violation.
- **FAQPage** — 6 Q&A pairs ("What is INZONE?", "How does INZONE work with Claude Code?", "Is INZONE free?", "What platforms does INZONE support?", "How is INZONE different from Cursor or the Claude Code CLI?", "Where is my data stored?"). Each answer ≤300 chars, plain text only (Google FAQ rich-result rule).

## `robots.txt` — `src/app/robots.ts`

Next.js Metadata Route emits a synthesized `robots.txt`. Two rule blocks:

1. `User-agent: *` → allow `/`, disallow `/api/`.
2. One explicit allow block per LLM crawler: `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot`, `Applebot-Extended`, `CCBot`, `Bytespider`, `Amazonbot`, `FacebookBot`, `Meta-ExternalAgent`, `DuckAssistBot`, `YouBot`, `cohere-ai`.

Redundant with `*` today, but defends against an upstream policy flip
from "indexable by default" to "opt-in" — several of these agents now
require an explicit allow rule to ingest. Sitemap URL is included.

## `sitemap.xml` — `src/app/sitemap.ts`

Single entry: homepage, `changeFrequency: "weekly"`, `priority: 1.0`,
`lastModified: new Date()`. Section anchors (`#features`, `#power-features`,
`#compare`, `#philosophy`) live inside `/` and are not separate URLs, so
no extra entries.

## `llms.txt` — `public/llms.txt`

Follows the proposed [llmstxt.org](https://llmstxt.org) convention so
LLM crawlers can ingest a hand-curated summary instead of having to scrape
the full landing. Structure:

- `# INZONE` heading.
- One-paragraph `> quote` summary.
- Bullet list of core concepts (15 features).
- Platform, license, pricing line.
- `## Docs` — homepage, GitHub repo, releases, contributors.
- `## Optional` — alpha disclaimer, Claude Code config compatibility, comparison context, network egress policy.

Served as a plain static file from `public/`, so it's reachable at
`https://inzone.app/llms.txt`.

## Semantic HTML

Audited `src/components/LandingClient.tsx` 2026-05-17 — clean:

- Exactly one `<h1>` (hero, `:389`).
- `<main>` wraps page content (`:376`).
- `<header>` (`:300`) and `<footer>` (`:580`) used correctly.
- Section headings are `<h2>` with `<h3>` for feature-row titles — clean h1 → h2 → h3 hierarchy.
- Hero copy is real text (no headline-in-image).
- All interactive elements are real `<button>` / `<a>` (no clickable `<div>`s on the main flow).

No changes were needed.

## What's NOT done (TODOs)

- `metadata.verification` — left commented out. Paste Google Search Console + Bing Webmaster tokens when those properties are claimed.
- `Organization.sameAs[]` — empty array. Populate once Twitter/X, LinkedIn, etc. exist.
- `twitter.creator` — not set. Add once an X handle exists.
- `aggregateRating` on `SoftwareApplication` — intentionally absent. Add only when real ratings exist; fabricated ratings violate Google rich-result policy.
- A dedicated dynamic `opengraph-image.tsx` would be nicer than the static `public/og-image.png` (the current PNG is a centre-crop of `hero_image_dark.png`). Skipped for now — static is fine for one page.

## Sources

- src/app/layout.tsx (1-279)
- src/app/robots.ts (1-50)
- src/app/sitemap.ts (1-22)
- public/manifest.json
- public/llms.txt
- public/favicon.ico, public/apple-touch-icon.png, public/icon-192.png, public/icon-512.png, public/og-image.png
- src/app/icon.png, src/app/apple-icon.png
- src/components/LandingClient.tsx (270-660, 51-250 for feature data)
- Build verified clean 2026-05-17: `rm -rf .next && NODE_ENV=production pnpm build` → 9 routes, 0 errors.
- Wiki: [[architecture]], [[gotchas]]
