# Architecture

INZONE web is a **Next.js 16 (App Router) marketing site** for the INZONE multi-agent macOS workspace product. Single landing page plus two API routes.

## Top-level shape

- **`src/app/`** — Next.js App Router root.
  - `layout.tsx` — root HTML shell. Loads `Inter` and `JetBrains_Mono` via `next/font/google`, seeds `class="dark"` on `<html>`, injects JSON-LD `SoftwareApplication` schema, mounts Vercel `Analytics`. (Ko-fi widget removed 2026-05-16.) See `src/app/layout.tsx`.
  - `page.tsx` — Server Component. Trivial — renders the single client component `LandingClient`. See `src/app/page.tsx:1-5`.
  - `globals.css` — Tailwind v4 entry. Declares `@custom-variant dark (&:where(.dark, .dark *))` for class-based dark mode, plus design utility classes (`glass-panel`, `shimmer`, `orb-glow`, `stat-line`, `inner-shimmer`, `glow-shadow`, `monochrome-gradient`, `animate-blob`). See `src/app/globals.css:1-95`.
  - `api/download/`, `api/version/` — server-rendered API endpoints (untouched by the landing refactor).
  - `global-error.tsx` — error boundary.
- **`src/components/`**
  - `LandingClient.tsx` — the entire landing page as one `"use client"` component. Owns the `isDark` state, Lenis smooth-scroll init, dark-class toggle, hero, abstract viz, `InteractiveFeaturesSection` (15 scroll-reveal feature rows with 3D tilt entry, header "Core Capabilities" + subtitle "Built for agent work."), `DemoVideoSection`, `PowerFeaturesSection` (15-card grid `#power-features`), `ComparisonSection` (INZONE vs Claude Code vs Cursor `#compare`), philosophy block, terminal CTA, final CTA, footer. Inline subcomponents: `InteractiveFeaturesSection`, `DemoVideoSection`, `PowerFeaturesSection`, `ComparisonSection`, `CompareCellRender`, `TaskNode`, `ConnectionLine`. Module-level data: `ALL_FEATURES` (15), `POWER_FEATURES` (15), `COMPARISON_ROWS` (16) + `CompareCell` type. **Features section (current — scroll-reveal rows)**: pinned carousel was replaced 2026-05-16. Now a vertical stack inside `max-w-7xl mx-auto px-6 md:px-12 space-y-32 md:space-y-40` of 15 `.feat-row`s with alternating `md:flex-row` / `md:flex-row-reverse`. Each row contains an `.feat-image-card` (rounded-2xl card with browser-chrome header — three macOS dots, URL-bar placeholder, "Preview" label — wrapping a 16:10 `.feat-image-inner` panel that hosts the per-feature screenshots — paired `next/image` `<Image fill>` components for light and dark variants from `public/features/feature_${i + 1}_{light|dark}.png`, toggled purely via Tailwind `dark:hidden` / `hidden dark:block` against the `.dark` class on `<html>` (no JS theme detection, hydration-safe). First two rows use `priority`; rest lazy. `sizes="(max-width: 768px) 100vw, 50vw"` matches the two-column layout) and a `.feat-text` column (`NN — TOPIC` numbering, title, description, 200px `.feat-line` underline). `.feat-shadow` is an absolute blur layer behind each card. **Animation**: per-row `useGSAP({ scope: sectionRef })` timeline, `scrollTrigger: { trigger: row, start: "top 82%", end: "center 50%", scrub: 0.75 }`. No pin, no snap. Card enters with 3D tilt — `{ autoAlpha: 0, x: ±90, y: 36, rotateY: ∓22, rotateX: 7, rotateZ: ∓4, scale: 0.92, transformPerspective: 1400, filter: "blur(3px)" }` → resolved. Image inner `scale: 1.06 → 1`, text `x/y/blur` reset at offset `0.15`, shadow fades to `autoAlpha: 0.6`, underline `scaleX: 0 → 1` from `transformOrigin: left/right center` matching row side. Description `<p>` and `.feat-line` get `md:ml-auto` on odd rows so they anchor to the right edge of right-aligned text columns. Nav has anchors `#features`, `#power-features`, `#compare`, `#philosophy`.
  - `ElasticDotGrid.tsx` — canvas-based animated dot grid background, runs a spring/friction physics simulation that reacts to mouse + scroll. Mounted inside `LandingClient`. `"use client"`. See `src/components/ElasticDotGrid.tsx:1-176`.
  - `KofiWidget.tsx` — Ko-fi floating widget. **Not imported anywhere after 2026-05-16** — file kept on disk but unmounted.
  - **Legacy components** (`Hero.tsx`, `ValueProp.tsx`, `Features.tsx`, `HowItWorks.tsx`, `Comparison.tsx`, `FinalCTA.tsx`, `Footer.tsx`, `ShaderBackground.tsx`, `AnimatedPaneMock.tsx`, `DownloadButton.tsx`, `ScrollReveal.tsx`) — from the previous landing design. **Not imported anywhere after the 2026-05-16 refactor** — tree-shaken out of the build. Kept on disk for reference; safe to delete.

## Animation / interaction stack

- **Lenis** — smooth scroll. Initialised in `LandingClient` `useEffect` with a `requestAnimationFrame` loop.
- **GSAP + ScrollTrigger + `@gsap/react`** — drives the pinned features section. `useGSAP({ scope: containerRef })` builds a timeline that cross-fades each feature card on scroll, syncing the progress-dot indicator.
- **framer-motion** — replaces the Vite source's `motion/react` import. Used for hero entry animation, abstract-viz reveal, task-node slide-ins, and the connection-line height tween. See [[decisions/landing-refactor-2026-05]].
- **`ElasticDotGrid`** — pure canvas 2D, no framework. Renders a 24px grid of dots that repel from the mouse and wrap vertically on scroll.

## Build / tooling

- Package manager: **pnpm** (lockfile `pnpm-lock.yaml`). The Next.js project root has `pnpm-lock.yaml`; the bundled Vite reference design under `public/inzone-landing-page/` has its own `package-lock.json` but is excluded from TS compilation via `tsconfig.json` `exclude: ["node_modules", "public/**"]`.
- `pnpm build` runs `next build` with Turbopack. Verified green 2026-05-16.
- TypeScript strict, `moduleResolution: "bundler"`, `paths: { "@/*": ["./src/*"] }`.

## Sources

- src/app/layout.tsx (1-118)
- src/app/page.tsx (1-5)
- src/app/globals.css (1-95)
- src/components/LandingClient.tsx (1-660)
- src/components/ElasticDotGrid.tsx (1-176)
- tsconfig.json
- package.json
- pnpm-lock.yaml
- Wiki: [[gotchas]], [[decisions/landing-refactor-2026-05]]
