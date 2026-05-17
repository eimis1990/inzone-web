# Landing page refactor — port Vite design into Next.js App Router

**Status**: accepted
**Date**: 2026-05-16
**Supersedes**: (none — replaces ad-hoc landing built on `Hero.tsx`, `ValueProp.tsx`, etc.)

## Context

A reference landing page existed as a standalone Vite/React project under `public/inzone-landing-page/` (kept bundled in the repo for reference). The live Next.js site, however, used an older composition of components (`Hero`, `ValueProp`, `Features`, `HowItWorks`, `Comparison`, `FinalCTA`, `Footer`, `ShaderBackground`, `AnimatedPaneMock`, `DownloadButton`, `ScrollReveal`) that did not match the Vite design.

The task was a pixel-faithful port of the Vite design into the existing Next.js App Router site, with:

- API routes (`./src/app/api/`) untouched.
- No new project — refactor in place.
- Framework adaptations where Vite-only APIs differ from Next.js.

## Decision

1. **Single client component for the whole landing page.** All sections live inside `src/components/LandingClient.tsx` (`"use client"`). `src/app/page.tsx` is a thin Server Component that imports and renders it.
   - Rationale: theme state, Lenis init, dark-class effect, and `ElasticDotGrid` props all need to share state. Splitting into multiple client components would force a context provider or prop drilling without any payoff — there is no static content above the fold that benefits from server rendering.
2. **`framer-motion` replaces `motion/react`.** The Vite design uses Motion's newer namespace; Next.js project pins `framer-motion@^12`. APIs are call-compatible for `motion.div`, `AnimatePresence`, etc.
3. **`next/font/google` for Inter + JetBrains_Mono.** Replaces Vite's stylesheet imports. Variables `--font-inter` and `--font-jetbrains-mono` are wired through Tailwind v4 `@theme` tokens in `globals.css`.
4. **GSAP `useGSAP({ scope })` for the pinned features section.** The interactive features section uses ScrollTrigger pinning. Wrapping the timeline in `useGSAP` with a `scope` ref ensures correct cleanup across React strict-mode double-mounts and re-renders.
5. **Lenis raf loop in a `useEffect`.** Returns a cleanup that calls `lenis.destroy()`.
6. **Custom Tailwind utilities ported verbatim** into `globals.css` (`glass-panel`, `shimmer`, `orb-glow`, `stat-line`, `inner-shimmer`, `glow-shadow`, `monochrome-gradient`, `animate-blob`) plus the `@custom-variant dark` declaration for class-based dark mode.
7. **Legacy landing components stay on disk but unimported.** Tree-shaken from the build. Safe to delete in a follow-up commit; left for review.
8. **`tsconfig.json` excludes `public/**`.** Prevents `tsc` from following the Vite reference design's `motion/react` imports and failing the Next.js typecheck.

## Consequences

- The Next.js site visually matches the Vite reference design.
- `pnpm build` is green (Turbopack, 1708ms compile).
- New runtime dependencies: `lenis`, `@gsap/react`, `lucide-react@^0.546.0`. (See [[gotchas]] for the lucide-react version trap.)
- Legacy components are dead code until explicitly removed.
- The Vite source under `public/inzone-landing-page/` remains the canonical visual reference but is no longer part of the TS build graph.

## Sources

- src/components/LandingClient.tsx (1-660)
- src/components/ElasticDotGrid.tsx (1-176)
- src/app/page.tsx (1-5)
- src/app/layout.tsx (1-118)
- src/app/globals.css (1-95)
- tsconfig.json
- public/inzone-landing-page/src/App.tsx (reference)
- public/inzone-landing-page/src/index.css (reference)
- Wiki: [[architecture]], [[gotchas]]
