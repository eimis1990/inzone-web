# INZONE Landing Page — Framer-Inspired Redesign Brief

- Source: Current production codebase at `./src/`
- Reference: Framer design system (`design-md/framer/DESIGN.md`)
- Drafted: 2026-05-11

---

## Direction

Transform INZONE's landing page from a conventional dark SaaS layout with accent-yellow cards and rounded-lg buttons into a **confident, poster-grade dark canvas** inspired by Framer's marketing site. The page should feel like an artboard: near-black surfaces, oversized white display type with aggressive negative tracking, pill-shaped CTAs, and one or two vibrant gradient atmosphere cards that break the monochrome rhythm. The current yellow accent (`#E4D947`) is retired in favour of a monochrome base (white ink on black canvas) with INZONE's identity carried by a **single signal accent** (electric blue `#0099FF`) and a family of gradient spotlight cards (violet, magenta, coral) that showcase features.

### What the current site does well
- Dark theme is already established — no light-mode migration needed.
- Component structure is clean: Hero, ValueProp, Features, HowItWorks, Comparison, FinalCTA, Footer — good separation.
- Framer Motion is already in use for scroll reveals and micro-interactions.
- Product screenshots are real (not stock) — exactly what Framer's philosophy demands.
- The animated pane mock in the hero is distinctive and should be preserved.

### What needs to change
- **Typography is generic.** Squada One for display + Inter for body is functional but lacks the poster-grade punch of Framer's approach. Squada One is too narrow and rigid; it doesn't compress elegantly at large sizes.
- **The yellow accent (`#E4D947`) fights the dark canvas.** It's warm and playful where the product is technical and precise. It also creates contrast issues on dark backgrounds at small sizes.
- **Buttons are rounded-lg rectangles**, not pills. The CTA vocabulary feels safe.
- **Letter-spacing is barely negative (-0.01em).** The headlines don't command the viewport the way Framer's -5% tracking does.
- **Surface hierarchy is flat.** Only two surface tones (`--bg-elev`, `--bg-elev-2`) and they're close together. No gradient spotlight cards break the monotony.
- **Section separators are 1px borders.** Framer uses long stretches of black void between content bands — no visible dividers.
- **Card radii are too uniform.** Everything is `rounded-xl`. Framer uses a wider scale (10px inputs, 15px template cards, 20px pricing cards, 30px spotlight cards, pill CTAs).
- **Stat cards use emojis and centered text.** The ValueProp section reads like a dashboard, not a marketing statement.

---

## Type System

### Display font: Geist (open-source substitute for GT Walsheim)

Since GT Walsheim is a licensed commercial font, use **Geist** (by Vercel, open-source, available via `next/font/local` or `@fontsource/geist-sans`) as the display face. Geist is geometric, slightly humanist, confident at large sizes — the closest open substitute for Framer's display voice.

If Geist is unavailable or undesirable, **Mona Sans** (by GitHub, variable, open-source) is the next best option.

### Body font: Inter Variable (keep current)

Keep Inter as the body typeface. Enable OpenType character variants to match Framer's bespoke body voice:

```css
font-feature-settings: "cv01", "cv05", "cv09", "cv11", "ss03", "ss07", "dlig";
```

### Mono font: JetBrains Mono (keep current)

No change needed — JetBrains Mono is excellent for code snippets and the pane mock.

### Type Scale

| Token              | Size   | Weight | Line Height | Letter Spacing | Use                                |
| ------------------ | ------ | ------ | ----------- | -------------- | ---------------------------------- |
| `display-xxl`      | 96px   | 600    | 0.88        | -4.8px         | Hero headline only                 |
| `display-xl`       | 72px   | 600    | 0.92        | -3.6px         | Section openers (Features, CTA)    |
| `display-lg`       | 56px   | 600    | 0.96        | -2.8px         | Sub-section headlines              |
| `display-md`       | 32px   | 600    | 1.1         | -1.0px         | Card titles, stat values           |
| `headline`         | 22px   | 700    | 1.2         | -0.8px         | Feature tag labels, table headers  |
| `subhead`          | 24px   | 400    | 1.3         | -0.01px        | Lead paragraphs, spotlight cards   |
| `body-lg`          | 18px   | 400    | 1.35        | -0.18px        | Hero subhead, ValueProp statement  |
| `body`             | 15px   | 400    | 1.4         | -0.15px        | Default body, feature descriptions |
| `body-sm`          | 14px   | 500    | 1.4         | -0.14px        | Comparison rows, dense data        |
| `caption`          | 13px   | 500    | 1.2         | -0.13px        | Eyebrows, footer, meta labels      |
| `micro`            | 12px   | 400    | 1.2         | -0.12px        | Disclaimer, footnote               |
| `button`           | 14px   | 500    | 1.0         | -0.14px        | Pill buttons                       |

### Key principles
- Letter-spacing scales aggressively with size: ~5% of font size at display-xxl, ~1% at body.
- Weight stays narrow: 600 for display, 400 for body, 500 for small/dense. Hierarchy is SIZE + TRACKING, not bold ramps.
- Line-heights are tight throughout — this is editorial, not docs.
- On mobile, `display-xxl` scales to `display-lg` (56px), preserving the tracking percentage.

---

## Color System

| Token           | CSS Variable        | Hex       | Use                                        |
| --------------- | ------------------- | --------- | ------------------------------------------ |
| Canvas          | `--canvas`          | `#090909` | Page background (near-black, faint warmth)  |
| Surface 1       | `--surface-1`       | `#141414` | Cards, inputs, secondary buttons            |
| Surface 2       | `--surface-2`       | `#1c1c1c` | Featured cards, selected tabs, elevated UI  |
| Hairline        | `--hairline`        | `#262626` | 1px borders on inputs, table dividers       |
| Hairline Soft   | `--hairline-soft`   | `#1a1a1a` | Subtle separators (FAQ rows, footer rules)  |
| Ink             | `--ink`             | `#ffffff` | Headlines, emphasized body text             |
| Ink Muted       | `--ink-muted`       | `#999999` | Secondary text, meta info, footer links     |
| Accent Blue     | `--accent`          | `#0099FF` | Hyperlinks, focus rings, selection states    |
| Gradient Violet | `--grad-violet`     | `#6A4CF5` | Spotlight card variant (most common)        |
| Gradient Magenta| `--grad-magenta`    | `#D44DF0` | Spotlight card variant                      |
| Gradient Coral  | `--grad-coral`      | `#FF5577` | Spotlight card variant                      |
| Gradient Orange | `--grad-orange`     | `#FF7A3D` | Spotlight card variant                      |
| Success         | `--success`         | `#22C55E` | Comparison checkmarks, positive states      |
| Warning         | `--warning`         | `#F59E0B` | SmartScreen notice                          |
| Error           | `--error`           | `#EF4444` | Window close dots, error states             |

### Migration from current palette

| Current              | New                    | Rationale                                        |
| -------------------- | ---------------------- | ------------------------------------------------ |
| `--bg: #0C0E12`      | `--canvas: #090909`    | Darker, warmer — more Framer                     |
| `--bg-elev: #14171C` | `--surface-1: #141414` | Neutral gray instead of blue-tinted              |
| `--bg-elev-2: #23252E`| `--surface-2: #1c1c1c`| Tighter surface steps — hierarchy through lift   |
| `--text: #E6E8EE`    | `--ink: #ffffff`       | Pure white — the Framer way                      |
| `--text-dim: #99A1B3` | `--ink-muted: #999999`| Neutral gray, no blue tint                       |
| `--accent: #E4D947`  | `--accent: #0099FF`    | Signal blue replaces yellow — reserved for links/focus |
| `--accent-2: #B78AFF`| `--grad-violet: #6A4CF5`| Promoted to gradient spotlight role              |
| `--ok: #3DDC97`      | `--success: #22C55E`   | Standard green                                   |
| `--danger: #F26D7A`  | `--error: #EF4444`     | Standard red                                     |

### Contrast check (heuristic)
- `--ink` (#FFF) on `--canvas` (#090909): ~19.5:1 (AAA)
- `--ink-muted` (#999) on `--canvas` (#090909): ~6.7:1 (AA+)
- `--ink` (#FFF) on `--surface-1` (#141414): ~15.4:1 (AAA)
- `--ink` (#FFF) on `--grad-violet` (#6A4CF5): ~4.6:1 (AA for large text)
- `--accent` (#0099FF) on `--canvas` (#090909): ~5.2:1 (AA)

---

## Spacing + Radii

### Spacing (following Framer's 5-base increments + key system stops)

```
4px | 8px | 12px | 16px | 20px | 24px | 32px | 40px | 48px | 64px | 96px
```

- Card interior padding: 20–24px
- Spotlight card padding: 32px
- Section vertical padding: 96px (desktop), 64px (tablet), 48px (mobile)
- Pill button padding: 12px 20px (primary), 10px 16px (secondary)

### Border Radii

| Token    | Value  | Use                                  |
| -------- | ------ | ------------------------------------ |
| `xs`     | 4px    | Utility chips, small badges          |
| `sm`     | 6px    | Tags, inline badges                  |
| `md`     | 10px   | Inputs, list items                   |
| `lg`     | 16px   | Feature cards, template cards        |
| `xl`     | 20px   | Pricing/product cards, mockup tiles  |
| `xxl`    | 30px   | Gradient spotlight cards             |
| `pill`   | 100px  | All CTA buttons                      |
| `full`   | 9999px | Circular icon buttons, avatars       |

---

## Components

### Button — Primary
- **Background:** `--ink` (#FFF) — white pill on dark canvas
- **Text:** `--canvas` (#090909) — black text on white
- **Typography:** `button` token (14px, 500, -0.14px tracking)
- **Padding:** 12px 20px
- **Radius:** `pill` (100px)
- **States:** Hover = scale(1.02) + subtle shadow; Active = scale(0.97) transform-shrink; Focus = 2px `--accent` ring offset 2px; Disabled = 50% opacity
- **Accessibility:** Minimum 44px touch target height. Focus-visible ring mandatory.
- **Implementation hint:** Replace current `bg-accent text-accent-on rounded-lg` with `bg-white text-black rounded-full`. The press effect already exists (`btn-press` class) — keep it but change the scale from 0.98 to 0.97 for a snappier feel.

### Button — Secondary
- **Background:** `--surface-1` (#141414)
- **Text:** `--ink` (#FFF)
- **Typography:** `button` token
- **Padding:** 12px 20px
- **Radius:** `pill` (100px)
- **States:** Hover = surface-2 background; Active = scale(0.97)
- **Accessibility:** Same 44px target. Never use bordered/ghost — Framer vocabulary is fill pills only.
- **Implementation hint:** Replace current `bg-bg-elev text-text border border-border rounded-lg` with `bg-[--surface-1] text-white rounded-full border-0`.

### Button — Translucent
- **Background:** `--surface-2` (#1c1c1c) at ~80% opacity with backdrop-blur
- **Text:** `--ink` (#FFF)
- **Radius:** `xxl` (30px)
- **Use:** On top of gradient spotlight cards or busy backgrounds

### Eyebrow Badge
- **Background:** `--surface-1`
- **Text:** `--ink-muted` for label, `--accent` for version/status
- **Typography:** `caption` token, uppercase, tracking 0.1em
- **Radius:** `pill`
- **Border:** 1px `--hairline`

### Card — Feature
- **Background:** `--surface-1`
- **Text:** `--ink` for headlines, `--ink-muted` for body
- **Radius:** `xl` (20px)
- **Padding:** 24px
- **Border:** 1px `--hairline`
- **Hover:** Subtle y-translate(-2px) + shadow `0 8px 30px rgba(0,0,0,0.4)`
- **Accessibility:** If card is clickable, wrap in `<a>` or `<button>` with focus ring.
- **Implementation hint:** Replace current `bg-bg-elev rounded-xl border-border` with `bg-[--surface-1] rounded-[20px] border-[--hairline]`.

### Card — Gradient Spotlight (Signature)
- **Background:** One of `--grad-violet`, `--grad-magenta`, `--grad-coral`, `--grad-orange` as a radial or linear gradient base
- **Text:** `--ink` (#FFF)
- **Typography:** `subhead` token for card title
- **Radius:** `xxl` (30px)
- **Padding:** 32px
- **Use:** Drop 1–2 into the Features section to break the monochrome rhythm. Each one wraps a product screenshot or feature highlight. The gradient is the atmosphere device — it replaces section backgrounds and colored accents.
- **Accessibility:** Ensure text contrast meets WCAG AA (min 4.5:1). On violet/magenta bases, white text passes. On lighter orange, consider a darker overlay or text-shadow.
- **Implementation hint:** New component — doesn't exist in current codebase. Create as a variant wrapper around feature screenshots. Apply the gradient as a CSS background with a subtle radial spotlight centered on the card.

### Card — Stat
- **Background:** `--surface-1`
- **Text:** `--ink` for the number, `--ink-muted` for the label
- **Typography:** `display-md` for the value, `body-sm` for the label
- **Radius:** `xl` (20px)
- **Padding:** 24px
- **Implementation hint:** Replace current centered text + emoji with left-aligned poster layout. No emoji icons — numbers speak for themselves.

### Comparison Table
- **Header row:** `--canvas` background, `--ink` text (headline token)
- **Data rows:** `--canvas` background, `--ink-muted` text (body-sm token), 1px `--hairline-soft` underlines
- **Checkmarks:** `--success` (#22C55E) for supported; `--accent` (#0099FF) + bold for "shines"
- **Hover:** Row highlight with `--surface-1` background
- **Radius:** Table container gets `xl` (20px) with overflow hidden

### Step Card (HowItWorks)
- **Background:** `--surface-1`
- **Number badge:** `--ink` (#FFF) background, `--canvas` text, `pill` radius
- **Radius:** `xl` (20px)
- **Connector:** 1px `--hairline` horizontal line between cards (desktop only)
- **Implementation hint:** Replace current accent-yellow number badges with white pill badges. Remove emoji icons — use the step number itself as the dominant visual.

### Footer
- **Background:** `--canvas` (same as page — no elevation change)
- **Text:** `--ink-muted` for links, `--ink` for logo
- **Typography:** `caption` token
- **Padding:** 64px top/bottom, 32px sides
- **No top border.** The void between FinalCTA and Footer IS the separator.

### Animated Pane Mock (Hero)
- **Keep as-is** structurally. Update colors:
  - Window chrome: `--surface-1` background
  - Title bar: `--surface-2` background
  - Traffic lights: Keep but use `--error`, `--warning` (amber), `--success`
  - Active pane border: Use gradient colors (`--grad-violet`, `--grad-magenta`, etc.) instead of the current yellow/purple/green
  - Glow effect: Swap `--accent/[0.06]` from yellow to the active pane's gradient color

---

## Page Layouts

### Home (single-page)

1. **Hero** — Full-viewport height. Black canvas, no visible grid background (remove `bg-grid`). Left column: eyebrow badge, display-xxl headline ("Run a fleet of AI agents. From one window." — second sentence in `--ink`, not colored accent), body-lg subhead in `--ink-muted`, white pill CTA. Right column: Animated pane mock. Subtle radial gradient glow (violet or magenta, very low opacity) behind the mock. Remove the scroll cue — it's unnecessary; the content below the fold is the pull.

2. **Value Proposition** — Remove section border. 4-column stat grid with `display-md` numbers in pure white (not accent-colored). Below: the manifesto paragraph at `body-lg` or `subhead` size, centered, max-width 720px. The final sentence ("Your folder, your subscription, your machine.") renders in white while the rest is `--ink-muted`.

3. **Features** — Remove section border. Alternating text/image blocks (keep current structure). Feature number labels in `caption` token with `--ink-muted`. Headline in `display-lg`. Body in `body` token, `--ink-muted`.
   - **Spotlight cards:** Wrap 2 of the 8 feature screenshots in gradient spotlight cards (suggested: Flow = violet, Lead mode = magenta). The rest sit in standard `--surface-1` cards.
   - The screenshots themselves should have `xl` (20px) border radius and sit inside the card with 16px interior padding.

4. **How It Works** — Remove section border and background tint. Keep 3-column step cards. Step numbers as white pill badges, not yellow boxes. Remove emoji icons. Section headline in `display-xl`, centered.

5. **Comparison** — Remove section border. Table container gets `--surface-1` background, `xl` radius. Clean up the legend — use smaller inline badges instead of the current flex row.

6. **Final CTA** — Remove section border. Black canvas with a very subtle radial gradient glow (violet, ultra-low opacity) behind the headline. Headline in `display-xl`. Subhead in `body-lg`, `--ink-muted`. White pill CTA. Trust badges in `caption` token, `--ink-muted`.

7. **Footer** — Minimal. Logo + copyright. `--canvas` background (no elevation). `caption` token. No top border.

---

## Motion + Interactions

### Scroll reveals (keep, tune)
- Current `ScrollReveal` component is good. Adjust: reduce travel distance from 30px to 20px. Keep the `[0.22, 0.61, 0.36, 1]` easing.
- Stagger delay: 80ms between siblings (currently 100ms).

### Button hover
- Primary pill: `scale(1.02)` + `box-shadow: 0 4px 20px rgba(255,255,255,0.1)`.
- Active: `scale(0.97)` — snappier than current 0.98.

### Card hover
- Subtle `translateY(-2px)` + shadow deepening. Keep current `card-hover` class, but update the shadow color from black to a subtle surface glow.

### Gradient spotlight cards
- Subtle inner glow animation: the radial gradient center drifts slowly (CSS `@keyframes` or Framer Motion `animate`). Duration: 8–12s. This makes the cards feel alive without being distracting.

### Animated pane mock
- Keep current typewriter + cycling behavior. Update the pane border glow to use gradient colors.
- Keep parallax mouse-follow — it's a strong detail.

### Reduced motion
- Current `prefers-reduced-motion` handling is good. Keep it.

### Transition defaults
- Duration: 0.2s for micro (hover, active); 0.4s for element state changes; 0.6s for scroll reveals.
- Easing: `cubic-bezier(0.22, 0.61, 0.36, 1)` (already in use as `--ease-out`).

---

## Accessibility Notes

- **Contrast:** Every text-on-surface pair documented above meets WCAG AA (>=4.5:1). The gradient spotlight cards are the tightest — white on violet is ~4.6:1, which passes for large text (>=18px or 14px bold). Body text on spotlight cards should use `subhead` (24px) or larger.
- **Focus rings:** 2px outline in `--accent` (#0099FF), 4px offset. Applied via `focus-visible` (not `focus`) to avoid cluttering mouse interactions.
- **Reduced motion:** Already respected via `prefers-reduced-motion: reduce`. The gradient drift animation on spotlight cards should also respect this.
- **Semantic structure:** Hero = `<section>` with `<h1>`. Each subsequent section uses `<h2>`. Feature blocks use `<h3>`. This hierarchy is already correct in the current code.
- **Touch targets:** All pill buttons maintain minimum 44px tap height. The download buttons already meet this.
- **Colour-only indicators:** The comparison table uses checkmarks (glyphs), not colour alone, to indicate status. Good — keep it.

---

## Implementation Notes for Frontend Developer

### Font setup (layout.tsx)
Replace `Squada_One` import with Geist. Geist is available as a local font or via `@fontsource/geist-sans`:

```
// Option A: next/font/local with Geist variable font files
// Option B: Use Geist from geist package (npm i geist)
import { GeistSans } from 'geist/font/sans';
```

Update the CSS variable from `--font-squada-one` / `--font-display` to `--font-display: GeistSans`.

### CSS variables (globals.css)
Replace the current `:root` block with the new color tokens. Update the `@theme inline` block to expose the new tokens to Tailwind. Add the Inter OpenType feature settings to the body rule.

### Section borders
Remove all `border-t border-border` classes from section roots. The dark canvas void between sections IS the separator.

### Tailwind class mapping (quick reference)

| Current class               | New class                                    |
| --------------------------- | -------------------------------------------- |
| `bg-bg`                     | `bg-[--canvas]`                              |
| `bg-bg-elev`                | `bg-[--surface-1]`                           |
| `bg-bg-elev-2`              | `bg-[--surface-2]`                           |
| `text-text`                 | `text-[--ink]`                               |
| `text-text-dim`             | `text-[--ink-muted]`                         |
| `text-muted`                | `text-[--ink-muted]`                         |
| `text-accent`               | `text-[--accent]`                            |
| `border-border`             | `border-[--hairline]`                        |
| `bg-accent text-accent-on`  | `bg-white text-black`                        |
| `rounded-lg` / `rounded-xl` | `rounded-[20px]` for cards, `rounded-full` for pills |
| `font-display` (Squada One) | `font-display` (Geist)                       |

### Priority order for implementation
1. **globals.css** — swap color tokens, font setup, remove grid background
2. **layout.tsx** — swap font import
3. **Hero** — biggest visual impact, test the new type scale
4. **Features** — add gradient spotlight card variants for 2 features
5. **DownloadButton** — white pill CTA
6. **ValueProp** — stat cards, manifesto paragraph
7. **HowItWorks** — step cards with white pill numbers
8. **Comparison** — table restyling
9. **FinalCTA** — gradient glow + white pill
10. **Footer** — minimal cleanup

---

## Open Decisions for User

1. **Display font choice:** Geist (recommended, matches Framer feel) vs Mona Sans (more geometric, slightly wider) vs keeping Inter at weight 600 with manual tight tracking (simpler, fewer font files). Which do you prefer?

2. **Gradient spotlight features:** The brief suggests wrapping Flow and Lead Mode screenshots in gradient cards. Would you prefer different features highlighted, or a different count?

3. **Accent color:** The brief proposes `#0099FF` (Framer's exact blue) as the signal accent. If you want to keep a unique INZONE identity colour (perhaps a different blue or the current purple `#B78AFF`), flag it before implementation.
