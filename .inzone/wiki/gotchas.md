# Gotchas

Landmines, surprises, things that bit us. Each gotchabit is a short section: what happened, why it bit, how to avoid.

## `lucide-react` resolves to a hijacked / legacy `1.16.0` if unpinned

**What happened.** `pnpm add lucide-react` (no version) installed `lucide-react@1.16.0`. The build then failed:

```
Export Github doesn't exist in target module ... Did you mean to import Gift?
```

**Why it bit.** `1.16.0` is an old, unrelated package living at the same npm name; it does not have the modern named icon exports (`Github`, `Workflow`, `Layers`, etc.). The maintained package is in the `0.x` line.

**How to avoid.** Pin explicitly: `pnpm add lucide-react@^0.546.0` (or whatever current `0.x` the reference design uses). Check `public/inzone-landing-page/package.json` for the source-of-truth version.

## `tsc` follows the Vite reference design under `public/` and fails

**What happened.** `pnpm build` failed with:

```
./public/inzone-landing-page/src/App.tsx:7:35 Type error: Cannot find module 'motion/react'
```

**Why it bit.** The Vite reference design lives at `public/inzone-landing-page/` so it ships untouched as a static reference. Without an explicit exclusion, `tsc`'s `include: ["**/*.ts", "**/*.tsx"]` happily picks it up and tries to resolve its Vite-only dependencies (`motion/react`).

**How to avoid.** `tsconfig.json` excludes `public/**`. Do not remove that exclude unless the reference design is also removed from the repo.

## Stale `.next/` cache poisoned by an earlier non-standard `NODE_ENV` run

**What happened.** `pnpm build` failed during prerender of `/_global-error` with `TypeError: Cannot read properties of null (reading 'useContext')` and emitted "You are using a non-standard NODE_ENV" — even though the current shell's `NODE_ENV` was empty. Source code compiled successfully (`✓ Compiled successfully`) so the failure was not in the user code.

**Why it bit.** A prior build had run with a non-standard `NODE_ENV` value (e.g. `NODE_ENV=development` while running `next build`, or a stray export elsewhere). Turbopack's `.next/` cache retained chunks compiled against that environment. On the next build the worker tried to prerender `/_global-error` using those poisoned chunks, where React internals (`useContext`) were null because dev/prod React bundles were mixed.

**How to avoid.** When you see the "non-standard NODE_ENV" warning, treat the `.next/` cache as suspect. Wipe and retry: `rm -rf .next && NODE_ENV=production pnpm build`. Don't `unset NODE_ENV` and re-build on top of a poisoned cache — the cache wins.

## `useGSAP` + ScrollTrigger needs a `scope` ref

**What happened.** During development, ScrollTrigger pinning misbehaved on hot reload and React strict-mode double mounts (animations stacking, stale triggers).

**Why it bit.** `gsap.context` cleanup is what associates GSAP tweens/triggers with a React lifecycle. Calling raw `gsap.to(...)` inside `useEffect` does not register them with a context.

**How to avoid.** Wrap timelines in `useGSAP(() => { /* ... */ }, { scope: containerRef })`. The `scope` ref bounds the cleanup to the section's DOM subtree. See `src/components/LandingClient.tsx` `InteractiveFeaturesSection`.

## Lenis needs explicit `destroy()` on unmount

**What happened.** Without cleanup, navigating away from / hot-reloading the page leaks the raf loop and accumulates scroll listeners.

**How to avoid.** Always pair `new Lenis()` with `return () => lenis.destroy();` in the same `useEffect`.

## Sources

- src/components/LandingClient.tsx
- tsconfig.json
- public/inzone-landing-page/package.json
- pnpm-lock.yaml
- Wiki: [[architecture]], [[decisions/landing-refactor-2026-05]]
