# Log

Append-only chronological journal. Each entry starts with a
parseable header: `## [YYYY-MM-DD] <type> | <short title>`.

See [[wiki-schema]] for the full format.

## [2026-05-17] edit | favicon source PNG swapped to in-zone-logo.png

Regenerated every icon asset (`src/app/icon.png`, `src/app/apple-icon.png`,
`public/favicon.ico`, `public/favicon.png`, `public/apple-touch-icon.png`,
`public/icon-192.png`, `public/icon-512.png`) from `public/in-zone-logo.png`
instead of the previous `public/inzone-logo-light.png`. New source is 710×722
(non-square), so the pipeline now pads to a 722×722 transparent canvas
(`magick -gravity center -extent 722x722`) before downscaling — otherwise
the favicon would be horizontally squashed. Added `public/favicon.png`
(32×32) as a PNG mirror of the ICO. Updated [[seo]] regen commands +
file layout. Build verified clean: 9 routes, 1.85s compile.

## [2026-05-17] edit | brand favicon + manifest + world-class SEO/LLM discoverability pass

**Favicon fix.** Deleted `src/app/favicon.ico` (it was the unmodified Next.js create-template Vercel-logo ICO, 25 KB, surviving from the initial scaffold — that's why the tab "showed no icon" / showed the wrong one). Regenerated brand icons from `public/inzone-logo-light.png` (orange compass-star variant — best contrast on the white/light tab bars used by Safari/Chrome/Edge) via ImageMagick: `src/app/icon.png` (32×32), `src/app/apple-icon.png` (180×180), `public/favicon.ico` (multi-size 16/32/48), `public/apple-touch-icon.png` (180), `public/icon-192.png`, `public/icon-512.png`. Removed `metadata.icons` from `src/app/layout.tsx` and let the Next.js file convention own the emitted `<link>` tags — the previous explicit `/favicon.ico` + `/apple-touch-icon.png` override pointed at files that didn't exist in `public/`. Created `public/manifest.json` (name, short_name, theme_color #0d0d0d, background_color, display standalone, start_url /, icons array). Created `public/og-image.png` (1200×630 centre-crop of `hero_image_dark.png`).

**SEO metadata.** Rewrote `src/app/layout.tsx`. Added `metadataBase: new URL("https://inzone.app")` so relative OG/Twitter image URLs absolutise. Added `title.default` + `title.template = "%s | INZONE"`. Expanded `description` to a single sub-160-char sentence leading with the primary keyword. Bumped `keywords[]` to ~20 entries (INZONE, Claude Code, Claude Code orchestration, multi-agent IDE, Claude Agent SDK GUI, AI worktree manager, Cursor alternative, MCP client, sequential agent workflow, etc.). Added `category: "developer tools"`, `formatDetection: { email/address/telephone: false }`, `alternates.canonical: "/"`, granular `robots.googleBot` with `max-image-preview: large`. `verification` left commented out with a TODO — shipping `REPLACE_WITH_*` placeholder tokens would render broken `<meta name="google-site-verification">` tags, worse than absent.

**Structured data.** Replaced the single `SoftwareApplication` block with a `@graph` of four nodes: **Organization** (with `logo` ImageObject and TODO `sameAs: []`), **WebSite** (publisher → Organization), enriched **SoftwareApplication** (`operatingSystem: "macOS 13+"`, `softwareRequirements`, `downloadUrl` + `installUrl` → GitHub releases, `featureList` of 15 bullets pulled from `ALL_FEATURES`/`POWER_FEATURES` in `src/components/LandingClient.tsx`, `screenshot` → `/og-image.png`, MIT `license`, NO `aggregateRating` — would violate Google policy without real ratings), and **FAQPage** (6 plain-text Q&A pairs answering "What is INZONE", "How does it work with Claude Code", "Is it free", "What platforms", "How is it different from Cursor/Claude Code CLI", "Where is my data stored").

**LLM discoverability.** Created `src/app/robots.ts` (Next.js MetadataRoute) emitting `/robots.txt` with one `User-agent: *` block + nineteen explicit allow rules for `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`, `Applebot`, `Applebot-Extended`, `CCBot`, `Bytespider`, `Amazonbot`, `FacebookBot`, `Meta-ExternalAgent`, `DuckAssistBot`, `YouBot`, `cohere-ai` — defends against an upstream policy flip from indexable-by-default to opt-in. Sitemap URL referenced. Created `src/app/sitemap.ts` emitting `/sitemap.xml` with homepage entry (changeFrequency weekly, priority 1.0). Created `public/llms.txt` following the [llmstxt.org](https://llmstxt.org) convention — `# INZONE` heading, one-paragraph `> quote` summary, 15-bullet feature list, `## Docs` linking homepage/GitHub/releases/contributors, `## Optional` with alpha disclaimer and Claude Code config compatibility note.

**Semantic HTML audit.** Audited `src/components/LandingClient.tsx`: one `<h1>` (`:389`), `<main>` wraps content (`:376`), `<header>`/`<footer>` correct, clean h1 → h2 → h3 hierarchy, hero copy is real text, all CTAs are real `<button>`/`<a>`. No changes needed.

**Validation.** `rm -rf .next && NODE_ENV=production pnpm build` clean — 9 routes including the new `/icon.png`, `/apple-icon.png`, `/robots.txt`, `/sitemap.xml`. Typecheck green.

Files touched: `src/app/layout.tsx` (rewritten), `src/app/icon.png` (new), `src/app/apple-icon.png` (new), `src/app/favicon.ico` (deleted), `src/app/robots.ts` (new), `src/app/sitemap.ts` (new), `public/favicon.ico` (new), `public/apple-touch-icon.png` (new), `public/icon-192.png` (new), `public/icon-512.png` (new), `public/og-image.png` (new), `public/manifest.json` (new), `public/llms.txt` (new). Wiki: new [[seo]] page documents everything; [[index]] updated.

## [2026-05-16] edit | accent `24` digits in wordmark (orange light / yellow dark)

Split the `INZONE24` text in both wordmark spans of `src/components/LandingClient.tsx` (header `:320`, footer `:599`) so the `24` digits render in an accent colour while `INZONE` keeps the existing neutral text. Wrapped `24` in an inner `<span className="text-[#B6552B] dark:text-[#E4D947]">` — burnt orange in light theme (matches the warm logo accent), warm yellow in dark theme. Outer span (font, size, letterSpacing, colour for `INZONE`) untouched. Clean `rm -rf .next && pnpm build` green (6/6 static).

## [2026-05-16] edit | uppercase wordmark + tighter logo gap in header + footer

Wordmark text in both `src/components/LandingClient.tsx` instances changed from "Inzone24" to "INZONE24" (header span `:320`, footer span `:599`). Logo-to-text gap tightened: header wrapper `:302` `gap-3` → `gap-1.5`, footer wrapper `:583` `gap-2` → `gap-1`. Squada One renders both as caps; tighter gap reads more like a single wordmark unit. Image alt text left as "Inzone24 logo" (decorative-ish, no need to churn alts). Clean `rm -rf .next && pnpm build` green (6/6 static).

## [2026-05-16] edit | Inzone24 wordmark + theme-swapped logo PNGs in header + footer

Replaced the CSS-drawn `IN`-tile + "Zone" wordmark in the header (`src/components/LandingClient.tsx:303-310`) and the dot-in-square + "Inzone" wordmark in the footer (`:583-589`) with paired `<Image fill>` components pointing at `public/inzone-logo-light.png` (light theme) and `public/inzone-logo-dark.png` (dark theme), gated by `dark:hidden` / `hidden dark:block` exactly like the hero + feature screenshots — no JS theme detection, hydration-safe. Header logos carry `priority` (LCP candidates); footer logos do not. Wordmark text changed to literal "Inzone24" in both spots, rendered in **Squada One** at `text-2xl` with inline `letter-spacing: 0.06em`. Squada One wired via `next/font/google` in `src/app/layout.tsx` (added `Squada_One` to the named import group, registered `squadaOne` font instance with `variable: "--font-squada-one"`, `weight: "400"`, `subsets: ["latin"]`, `display: "swap"`, and appended `${squadaOne.variable}` to the `<html className>` template literal). Exposed as the `font-display` Tailwind utility by adding `--font-display: var(--font-squada-one), system-ui, sans-serif;` to the `@theme` block in `src/app/globals.css:5-9`. Verified via grep: `/inzone-logo-light.png` and `/inzone-logo-dark.png` each appear twice in `LandingClient.tsx` (lines 305+586 light, 312+592 dark); `font-display` appears twice (lines 319 + 598). Clean `rm -rf .next && pnpm build` green (typecheck 1914ms, 6/6 static).

## [2026-05-16] edit | trim `COMPARISON_ROWS` from 16 → 8 rows

`src/components/LandingClient.tsx:260-275` had a 16-entry `COMPARISON_ROWS` array. Replaced with 8 rows reflecting the 2026 competitive landscape — many of the original claims are no longer differentiating because CC Desktop's April 14 2026 redesign and Cursor 3's Agents Window both shipped agent-pane workflows, plugin/skill marketplaces, MCP one-click, image attachments, etc. Kept rows where INZONE still has a clear edge or where rivals are only partial: multi-pane agent workspace (CC + Cursor now `partial` since both have multi-agent panes but neither is free-form draggable), lead mode orchestration, visual flow pipelines (renamed from "Flow pipelines" to sharpen vs CC hooks / Cursor multitask), Project Wiki + Protocol, hands-free voice commands (renamed from "Voice control" — both CC + Cursor ship dictation `partial` but not commands), multi-project workspaces, live cost telemetry (both rivals now `partial` — CC `/cost`, Cursor context breakdown), built-in preview + DevTools. Deleted 8 rows that are now baseline: built-in diff+PR, git worktrees, plugin+skill marketplace, slash commands picker, local-first no telemetry, MCP servers, image attachments, vim mode. Renderer at `LandingClient.tsx:1030` is a generic `.map` — no JSX changes needed. Clean `rm -rf .next && pnpm build` green (typecheck 1848ms, 6/6 static).

## [2026-05-16] edit | square download buttons + grey secondary state + shared `usePlatform` hook

Three coordinated changes. (1) Dropped `rounded-full` from all four CTA buttons in `src/components/DownloadButton.tsx` (Windows `:114`, Linux `:187`, mac Apple Silicon `:210`, mac Intel `:229`) — buttons now render at 0 border-radius like the hero CTA. (2) Secondary branches of the macOS ternaries (`!isAppleSilicon` for Apple Silicon button, `isAppleSilicon` for Intel button) now carry `bg-neutral-100 dark:bg-[#222]` resting fill with `hover:bg-neutral-200 dark:hover:bg-[#333]` so the non-recommended Mac variant is visible at rest, not just on hover. (3) Extracted platform detection into a shared `src/lib/usePlatform.ts` hook (new file, 33 lines) — preserves the existing `DownloadButton` UA-sniff behaviour verbatim (Win → Linux → Mac order, `isAppleSilicon` defaults to `true`, `/Macintosh.*Apple/` regex + `navigator.userAgentData?.platform === "macOS"` fallback). `DownloadButton.tsx` now calls `const { platform, isAppleSilicon } = usePlatform()` and keeps only its version-fetch `useEffect`. `src/components/LandingClient.tsx` imports the hook via the `@/lib/...` alias (matching `@/lib/analytics` convention) and gates the "Explore Capabilities" anchor with `{platform !== "mac" && (...)}` so it's hidden when the visitor already sees two download CTAs (Apple Silicon + Intel). The anchor itself now mirrors the new secondary style — added `bg-neutral-100 dark:bg-[#222]` and changed hover to `hover:bg-neutral-200 dark:hover:bg-[#333]`. Verified: `grep rounded-full` against `DownloadButton.tsx` returns 0 matches; `usePlatform` referenced in `LandingClient.tsx`, `DownloadButton.tsx`, and `lib/usePlatform.ts`. Clean `rm -rf .next && pnpm build` green (compile 1871ms, typecheck 1656ms, 6/6 static).

## [2026-05-16] edit | replace undefined `btn-primary`/`btn-secondary` + `warning` tokens in DownloadButton

`src/components/DownloadButton.tsx` referenced four CSS tokens that don't exist anywhere in the project (`btn-primary`, `btn-secondary`, `bg-warning`, `text-warning`, `border-warning`) — confirmed via grep against the whole repo and `src/app/globals.css`. That left the OS-detecting download CTA visually unstyled. Replaced with concrete Tailwind utilities matching the hero's "Install & Contribute" / "Explore Capabilities" CTA pair: primary = `bg-neutral-900 dark:bg-[#fff] text-neutral-50 dark:text-[#0d0d0d] hover:bg-neutral-800 dark:hover:bg-[#ccc]`, secondary = `border border-neutral-300 dark:border-[#444] text-neutral-900 dark:text-[#fff] hover:bg-neutral-100 dark:hover:bg-[#222]`. All four buttons get pill shape (`rounded-full`) per the requested visual. Warning panel `warning` tokens swapped to `yellow-500/10` bg, `yellow-500/30` border, `yellow-600` icon + heading, `yellow-700` body emphasis. Touched: Windows button (`DownloadButton.tsx:114`), Linux button (`DownloadButton.tsx:187`), mac Apple Silicon + Intel buttons (`DownloadButton.tsx:210-214` and `DownloadButton.tsx:229-233`), warning panel chrome (`DownloadButton.tsx:130`, `:138`, `:152`, `:170`). Out of scope: `body-sm`, `text-ink-muted`, `text-accent` are also undefined tokens still present inside the warning panel — Tailwind v4 silently drops unknown classes so no build break, but the warning body text + small "open-source" link colour render with default browser styling. Clean `rm -rf .next && pnpm build` green (compile 1877ms, typecheck 1898ms, 6/6 static).

## [2026-05-16] edit | restore OS-detecting DownloadButton in hero CTA

Hero "Install & Contribute" GitHub anchor at `src/components/LandingClient.tsx:398-406` replaced with `<DownloadButton />` (existing component, unchanged). Added `import DownloadButton from "./DownloadButton"` at line 6. Dropped now-unused `Download` from the `lucide-react` import group (was only referenced by the replaced anchor — verified via grep on `<Download`). Sibling "Explore Capabilities" anchor left untouched. `DownloadButton` reuses `/api/download` + `/api/version` + `@/lib/analytics`, all still wired. Clean `rm -rf .next && pnpm build` green (compile 1807ms, typecheck 1708ms, 6/6 static).

## [2026-05-11] init | wiki initialised

Starter pages created. Awaiting first ingest.

## [2026-05-16] decide | port Vite landing design into Next.js App Router

Refactored `src/app/page.tsx` + new `src/components/LandingClient.tsx` + new `src/components/ElasticDotGrid.tsx`, rewrote `src/app/globals.css` and `src/app/layout.tsx`, excluded `public/**` from TS. Replaced `motion/react` with `framer-motion`, wired Inter + JetBrains_Mono via `next/font/google`. Pinned `lucide-react@^0.546.0` (the unpinned default resolved to legacy `1.16.0`). Legacy landing components left on disk, unimported. `pnpm build` green. See [[architecture]], [[decisions/landing-refactor-2026-05]], [[gotchas]].

## [2026-05-16] edit | landing content expansion

Updated `src/components/LandingClient.tsx` content (visual design untouched). Expanded `ALL_FEATURES` from 7 to 10 entries covering Orchestration, Pipelines, Git & Shipping, Preview, Plugins & Marketplace, Wiki + Auto-Protocol, Slash Commands, Cost Telemetry, Voice & Q&A, Local-first. Added `PowerFeaturesSection` (14-card grid at `#power-features`) and `ComparisonSection` (INZONE vs Claude Code vs Cursor at `#compare`) between `DemoVideoSection` and Philosophy. Added nav links Capabilities + Compare. Added lucide-react imports: `Monitor`, `Puzzle`, `BarChart3`, `Mic`, `Lock`, `BookOpen`, `Keyboard`, `MessageSquare`, `Paperclip`, `RefreshCw`, `FolderOpen`, `Layers`, `Shield`, `ListChecks`, `Check`, `X`, `Minus`. Hero subtitle reworded to mention pipelines/worktrees/wiki/voice/plugins. `pnpm build` green (1791ms). See [[architecture]].

## [2026-05-16] edit | feature copy refresh + scroll-snap fix

Updated `src/components/LandingClient.tsx`. `ALL_FEATURES` now 15 entries (was 10): MULTI-PANE WORKSPACE, LEAD MODE, FLOW PIPELINES, TASKS, WORKTREES, DIFF REVIEW + PR, MISSION CONTROL, PREVIEW PANE, BUILT-IN TERMINAL, PROJECT WIKI, VOICE CONTROL, PLUGINS + MARKETPLACES, SLASH COMMANDS (`Hash` icon), MCP SERVERS, LOCAL-FIRST. `POWER_FEATURES` rewritten to 15 entries (was 14): WORKERS TAB, LAYOUTS, WORKSPACES, PANE FOCUS (`PanelRight`), CLAUDE.MD MEMORY, RECOMMENDED SKILLS (`Sparkles`), AGENT EDITOR, COST & USAGE, STRUCTURED Q&A, CAVEMAN MODE, THEMES, VIM MODE, IMAGE ATTACHMENTS, KEYBOARD POLISH, COMPATIBILITY. Added lucide imports `Hash`, `PanelRight`, `Sparkles`. Fixed GSAP mid-transition pause in `InteractiveFeaturesSection`: `scrub: 1` → `scrub: 0.6` plus a `snap` block (`snapTo: 1/(cards.length-1)`, `duration: { min: 0.3, max: 0.6 }`, `ease: "power2.inOut"`, `delay: 0.05`) so the scroll-pinned section can no longer rest on a half-faded cross-dissolve. Renamed section header "Inzone Fleet Capabilities" → "Core Capabilities". `pnpm build` green (3.0s compile, 4.3s typecheck). See [[architecture]], [[gotchas]].

## [2026-05-16] edit | 16:10 aspect ratio on feature-image panel

Minimal layout fix in `src/components/LandingClient.tsx` `InteractiveFeaturesSection`. Only the `.feature-image` div and its parent grid wrapper touched; GSAP code untouched. Parent grid wrapper gained `overflow-hidden` (clips the constrained image to the card on mobile too). `.feature-image` swapped `h-full` for `aspect-[16/10] overflow-hidden` — image panel is now a fixed 16:10 box that fills its grid column width rather than stretching to arbitrary card height. Text column left as-is; parent's `items-center` already vertically centres it against the shorter image column. Mobile (single column) stacks image-above-text with the 16:10 ratio preserved.

`pnpm build` green (2.2s typecheck, 529ms static gen). See [[architecture]].

## [2026-05-16] edit | atomic-card crossfade rewrite of feature carousel

Rewrote `InteractiveFeaturesSection` in `src/components/LandingClient.tsx`. Root causes addressed: outgoing image and incoming text were x-sliding through the same space (overlap); scrub + many competing `tl.to()` on per-element targets made scrubbing jerky.

**GSAP rewrite.** Each card is now treated as an atomic unit. Removed all per-element (`.feature-image`, `.feature-text`) x-slide tweens. Initial state: card 0 `{ autoAlpha: 1, yPercent: 0, zIndex: 10 }`; all others `{ autoAlpha: 0, yPercent: 8, zIndex: 0 }`. Per-step transition: `tl.addLabel(\`card-${i}\`)` → fade prev out with `yPercent: -8` (`duration: 1`, `"+=0.3"` lead-in) → `tl.set(prev, { zIndex: 0 })` → fade `card` in with `yPercent: 0, zIndex: 10` (`duration: 1`, `"<0.2"`) → dot opacity swaps. Tail `tl.to({}, { duration: 0.5 })` holds the last card. ScrollTrigger tuned: `end: \`+=${cards.length * 250}%\`` (2.5× budget), `scrub: 1.5` (smoother), `snap: { snapTo: "labels", duration: { min: 0.2, max: 0.6 }, ease: "power2.inOut", delay: 0.08 }`. Two cards are never partially visible at the same time.

**Card layout rewrite.** `.feature-card` container is `absolute inset-0 w-full h-full` (kept) but now hosts a `grid-cols-1 md:grid-cols-2 items-center` 50/50 split with `md:order-1`/`md:order-2` alternating. `.feature-image` lost its rounded/border/shadow wrap so the image panel is now flush with the card (still has `inner-shimmer` + radial gradient overlay); icon bumped to `w-16 h-16 md:w-28 md:h-28`. `.feature-text` column now has its own padding `p-8 md:p-12 lg:p-16` plus `max-w-[480px] mx-auto`. Description `<p>` changed from `font-mono text-[10px] uppercase tracking-tight` to `text-sm leading-relaxed text-neutral-300 dark:text-[#aaa]` — readable body copy.

`pnpm build` green (3.3s compile, 3.3s typecheck). See [[architecture]].

## [2026-05-16] edit | label-based GSAP snap + feature-text padding

Two fixes in `src/components/LandingClient.tsx` `InteractiveFeaturesSection`.

**Fix 1 — label-based snap.** Replaced fractional snap with timeline labels. ScrollTrigger config changed: `scrub: 0.6` → `scrub: 1`, `snapTo: 1/(cards.length-1)` → `snapTo: "labels"` (GSAP types reject `"labelsOrSections"` — only `"labels"` / `"labelsDirectional"` accepted by installed `@types`; behaviour equivalent here since we have no sections), `duration: { min: 0.3, max: 0.6 }` → `{ min: 0.3, max: 0.8 }`, `delay: 0.05` → `0.1`. Inside `cards.forEach`, added `tl.addLabel(\`card-${i}\`)` immediately after `const prevSign = ...` line and before the first `tl.to(prevImg, ...)` call — leaves every existing animation tween untouched. Snap now lands on exact label positions where transitions begin, removing the scrub-lag-vs-snap race that left half-faded card cross-dissolves visible.

**Fix 2 — feature-text padding.** The `.feature-text` column previously inherited only the parent grid's `p-6 md:p-12 lg:p-16` and gave its `<p>` a `max-w-lg`, causing text to push against the dark card's inner edge on narrower viewports. Added column-level `px-4 md:px-6 lg:px-8` plus `max-w-[420px] mx-auto md:mx-0`, removed the now-redundant `max-w-lg`/`mx-auto md:mx-0` on the `<p>`, and added `md:ml-auto` when `i % 2 !== 0` so right-aligned (odd-index) cards anchor flush to the right rather than centring inside the column.

`pnpm build` green (1897ms compile, 2.0s typecheck). See [[architecture]].

## [2026-05-16] edit | card height self-sized to 16:10 image

Removed empty black bar below image in pinned `InteractiveFeaturesSection`. Section wrapper lost `h-screen` (now flows in document height). Middle container lost `flex-1 max-h-[700px] min-h-[400px] flex items-center justify-center` — now plain `relative w-full max-w-7xl my-8 xl:px-12 pointer-events-none`. Dark rounded card switched from `absolute inset-x-4 md:inset-x-8 xl:inset-x-12 inset-y-0 ... overflow-hidden shadow-2xl` to `relative mx-4 md:mx-8 xl:mx-12 aspect-[16/10] overflow-hidden rounded-3xl border border-neutral-800 dark:border-[#222] bg-neutral-900 dark:bg-black pointer-events-auto shadow-2xl` — card height now derived from 16:10 aspect ratio so it sits flush against the image. `.feature-card` stays `absolute inset-0 w-full h-full` (cards stack inside the now self-sized container, no GSAP change required). Progress dots row gained `mt-4` for spacing now that `justify-between`/`flex-1` no longer separate it from the card. GSAP block (lines 696–731) untouched. `pnpm build` green (1943ms compile, 1771ms typecheck). See [[architecture]].

## [2026-05-16] edit | replace hero mock viz with real hero screenshot

In `src/components/LandingClient.tsx`, the "Abstract Visualization" section's inner `<motion.div>` (was lines 425–486) had its className and full body replaced. Outer `<section>` (line 419), the centering wrapper (line 420), the three concentric rings (lines 421–423), and the `<motion.div>` entry animation (`initial`/`whileInView`/`viewport`/`transition`) all preserved untouched.

**className change**: `w-full aspect-video glass-panel rounded-xl p-2 sm:p-4 shadow-2xl relative z-10` → `relative w-full rounded-xl overflow-hidden border border-neutral-300 dark:border-[#2a2a2a] bg-neutral-200 dark:bg-[#141414] shadow-2xl z-10`. Card now mirrors `.feat-image-card`: chrome header on top + image area below, height driven by chrome + `aspect-[16/10]`, no fixed `aspect-video` ratio for the whole frame.

**Body**: removed the empty-ring macOS dots, the inner 3-column grid (left: progress-bar stack with 5 `motion.div` width tweens; right: `TaskNode`/`ConnectionLine` chain with BrainCircuit/Workflow/Columns icons, "Target" rounded-bl label). Replaced with browser-chrome header (three filled macOS dots `bg-red-400/80 / bg-yellow-400/80 / bg-green-400/80` + `~/projects/inzone` tab on the right) and a single `aspect-[16/10] relative bg-neutral-100 dark:bg-[#0a0a0a] overflow-hidden` panel containing paired `<Image fill>` components — `/hero_image_light.png` with `dark:hidden`, `/hero_image_dark.png` with `hidden dark:block`. Both `priority`. `sizes="(max-width: 768px) 100vw, 1200px"`.

`TaskNode` and `ConnectionLine` definitions kept on disk per user instruction (still referenced elsewhere). Lucide imports `BrainCircuit, Workflow, Columns` untouched in this turn (used by `ALL_FEATURES`/`POWER_FEATURES`). `next/image` was already imported from the prior task.

`rm -rf .next && NODE_ENV=production pnpm build` green — 1903ms compile, 1796ms typecheck, 6/6 static pages.

## [2026-05-16] edit | wire 15 feature screenshots into scroll-reveal section

Replaced icon placeholder inside `.feat-image-inner` with paired `next/image` `<Image fill>` components for light and dark variants. Added `import Image from "next/image"` at the top of `src/components/LandingClient.tsx` (line 4). Removed the radial gradient overlay div and the `React.cloneElement(feature.icon, ...)` block from `.feat-image-inner` only — `feature.icon` remains in the `ALL_FEATURES` data and is still consumed elsewhere (PowerFeatures grid, Comparison section). The icon is no longer rendered inside the features scroll-reveal cards.

**Asset path correction**: user spec said files were at `public/feature_{N}_{theme}.png` but they actually live at `public/features/feature_{N}_{theme}.png` (subdirectory). Verified all 30 files present via `ls public/features/`. Used `/features/feature_${i + 1}_{theme}.png` as the public path.

**Theme toggle**: no JS theme detection — Tailwind `dark:hidden` on the light variant and `hidden dark:block` on the dark variant. The existing `.dark` class on `<html>` (toggled in `LandingClient.tsx:277-298`) drives visibility. Hydration-safe.

**Performance**: `priority={i < 2}` preloads the first two rows for LCP; rows 3–15 lazy. `sizes="(max-width: 768px) 100vw, 50vw"` matches the two-column layout above the `md` breakpoint. `object-cover` + parent `aspect-[16/10] overflow-hidden` preserves the GSAP `scale: 1.06 → 1` clip. Fallback bg lightened from `bg-neutral-800` to `bg-neutral-100` so light-mode flicker stays light.

`rm -rf .next && NODE_ENV=production pnpm build` green — 2.2s compile, 2.4s typecheck, 6/6 static pages.

## [2026-05-16] edit | swap two entries between ALL_FEATURES and POWER_FEATURES

In `src/components/LandingClient.tsx`:
- `ALL_FEATURES[13]` (lines 141–147): was "MCP SERVERS / 13 One-Click Integrations." (Boxes) → now "WORKERS TAB / One Shelf. All Tools." (Boxes) with long-form description matching siblings.
- `ALL_FEATURES[14]` (lines 148–154): was "LOCAL-FIRST / Your Machine. Your Data." (Lock) → now "AGENT EDITOR / In-App Agent + Skill Editor." (MessageSquare) with long-form description.
- `POWER_FEATURES[0]` (lines 158–163): was "WORKERS TAB / One Shelf. All Tools." (Boxes) → now "MCP SERVERS / 13 One-Click Integrations" (Boxes) with short `desc`.
- `POWER_FEATURES[6]` (lines 194–199): was "AGENT EDITOR / In-App Agent + Skill Editor" (MessageSquare) → now "LOCAL-FIRST / Your Machine. Your Data." (Lock) with short `desc`.

Schema preserved per array (`description` long form in ALL_FEATURES, `desc` short form in POWER_FEATURES). All four icons already imported — no new imports.

**Build incident**: first `pnpm build` failed during prerender of `/_global-error` with `TypeError: Cannot read properties of null (reading 'useContext')` while the source itself compiled cleanly. Root cause was a poisoned `.next/` cache from an earlier run that had used a non-standard `NODE_ENV`; the new build emitted the "non-standard NODE_ENV" warning even though current shell `NODE_ENV` was empty. `rm -rf .next && NODE_ENV=production pnpm build` recovered. New entry added to [[gotchas]] under "Stale `.next/` cache poisoned by an earlier non-standard `NODE_ENV` run".

Final: compile 2.8s, typecheck 3.1s, all 6 static pages generated.

## [2026-05-16] edit | code review: Instrument Serif + manifesto + unstaged rewrite

Code review of commit `c3973ac` plus unstaged working-tree changes.

**Committed findings:**
- `layout.tsx` missing `dark` class on `<html>` in the committed HEAD — initial SSR dark mode relies on it.
- `KofiWidget` still imported/rendered in committed `layout.tsx` despite being dormant; removed in unstaged changes.
- `pnpm build` fails on committed HEAD: tsc error from `public/inzone-landing-page/src/App.tsx` despite `exclude: ["public/**"]` in `tsconfig.json` — Next.js TS pass bypasses the exclude. Documented in [[gotchas]].

**Unstaged findings:**
- `globals.css` strips entire design token system — breaks `LandingClient` class references.
- `layout.tsx` removes `Instrument_Serif` variable, which the committed `.manifesto` CSS class depends on.
- Build is broken in both states.

**Nits filed:** `willChange` on all 35 word spans is excessive; `ITALIC_WORDS` matching is punctuation-dependent and fragile; `.font-serif` utility is dead on arrival.

See [[architecture]], [[gotchas]].

## [2026-05-16] edit | replace pinned carousel with 3D scroll-reveal rows

Rewrote `InteractiveFeaturesSection` in `src/components/LandingClient.tsx` (was lines 675–801, now 675–862). Removed pinned GSAP carousel (single absolute card stack, label snap, progress dots). New design renders all 15 `ALL_FEATURES` as a vertical stack of alternating `md:flex-row` / `md:flex-row-reverse` rows inside `max-w-7xl mx-auto px-6 md:px-12 space-y-32 md:space-y-40`. Each row has two children: an `.feat-image-card` (rounded-2xl card with browser-chrome header — three macOS dots, URL-bar placeholder, "Preview" mono label — wrapping a `.feat-image-inner` 16:10 icon panel) and a `.feat-text` column. Behind every card is an absolutely positioned `.feat-shadow` blur layer (`bg-black/30 dark:bg-black/50 blur-2xl`). Text column shows `NN — TOPIC` numbering, large title, description, and a `.feat-line` underline (200px wide, animates from `scaleX: 0` along `transformOrigin` left-or-right depending on side). Section header expanded with subtitle "Built for agent work."

**Animation**: per-row `useGSAP({ scope: sectionRef })` timeline with `scrollTrigger: { trigger: row, start: "top 82%", end: "center 50%", scrub: 0.75 }`. No pin, no snap. Card enters with cinematic 3D tilt — initial `{ autoAlpha: 0, x: ±90, y: 36, rotateY: ∓22, rotateX: 7, rotateZ: ∓4, scale: 0.92, transformPerspective: 1400, filter: "blur(3px)" }` → resolved state at row center. Image inner scales `1.06 → 1` over 1.2s. Text slides in `x: ±16, y: 18, blur(3px)` → 0 at offset `0.15`. Shadow fades to `autoAlpha: 0.6` at offset `0`. Underline `scaleX: 0 → 1` at offset `0.3` from origin matching row side.

**Note compliance**: used `useGSAP({ scope: sectionRef })` instead of raw `useEffect` (auto-scoped cleanup — satisfies user's note 1 and note 2 in one stroke). `.feat-line` and description `<p>` both get `md:ml-auto` on odd rows so they anchor to the right edge of the right-aligned text column (note 3, note 4). Right-side rows (`isEven === false`) get `md:items-end md:text-right` on the text container so labels/titles also right-align. `transformOrigin` on `.feat-line` is `left center` for even rows, `right center` for odd rows — line grows outward from the column edge.

**Removed**: `containerRef` → renamed `sectionRef`; `cards`/`dots` arrays; pin/snap/`addLabel` logic; `.feature-card`/`.feature-image`/`.feature-text`/`.progress-dot` class names (no other code in the file uses them). React.cloneElement icon sizing bumped from `w-16 h-16 md:w-28 md:h-28` to `w-20 h-20 md:w-32 md:h-32`.

`pnpm build` green (1992ms compile, 1873ms typecheck). See [[architecture]].

## [2026-05-16] edit | remove Ko-fi widget + double scroll distance

Removed `KofiWidget` import + JSX mount from `src/app/layout.tsx` (component file `src/components/KofiWidget.tsx` left on disk, now unimported). Doubled scroll distance per pinned feature card in `src/components/LandingClient.tsx` `InteractiveFeaturesSection`: ScrollTrigger `end: \`+=${cards.length * 100}%\`` → `+=${cards.length * 200}%` — each card boundary now requires twice the wheel travel, preventing a single mouse-wheel tick from advancing past a card. `pnpm build` green (1632ms compile, 1812ms typecheck). See [[architecture]].

