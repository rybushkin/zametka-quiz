# Zametka Quiz — Handoff for Next Session

## What this is

Next.js quiz microsite: 10 questions → profile result → reveal (Wales or South of England). For Katerina; no travel spoilers until the unlock screen. Page title: **Zametka B-Day Quiz**.

## Where everything is

- **App**: `web/` (Next.js 16, App Router, TypeScript, Tailwind)
- **Brief (full spec)**: `brief.md`
- **Run**: `cd web && npm run dev` → http://localhost:3000

## Current state (this session)

### Cover
- Fullscreen image `public/cover.png` (via `/img/cover.png?v=3`). Whole image is a button: click anywhere to start.
- No separate “Start” button. Image: `height: 100svh`, `maxHeight: 100dvh`, `object-fit: cover`, absolutely positioned inside button so it doesn’t overflow.

### Questions (Q1–Q10)
- **Layout**: No card; plain layout. Order: logo (top) → image 21:9 → title, helper, options → footer.
- **Progress**: “Question X of 10” at **bottom left**, next to Back/Next (bottom right).
- **Images**: From `web/public/`: `01.png` … `10.png`. Served by route `app/img/[...path]/route.ts` (path `/img/01.png` etc.). Aspect ratio 21:9.
- **Flow**: User selects an option, then clicks **Next** (no auto-advance).
- **Q9**: Input (max 120 chars) + 4 style options (Clean, Messy, Cute, Confidential). “Seal the note” enabled when a style is chosen; then Next.

### Results & route
- **Result 1 (profile)** and **Result 2 (reveal)** and **Route** use `ScreenLayout` with `fullPageScroll`: no inner frame scroll; whole page scrolls. Card has **no box-shadow** (light border only).
- **Logo** in header: **56px** height (2× previous).

### Theme
- **Light everywhere**: `body` background `var(--paper-cream)`, text `var(--navy-ink)`. Progress, ghost button, badges use dark tones. Toast: centered horizontally, vertically aligned with button row (`bottom: clamp(20px, 6vh, 72px)`).

### Assets
- **Location**: `web/public/` (root of public, not in a subfolder).
- **Files**: `cover.png`, `logo.png`, `01.png` … `10.png`. Cover cache-bust: `?v=3` in `page.tsx`; bump (e.g. `?v=4`) when cover is updated to avoid cache.

### Spec alignment
- 10 questions, **4 options each**. Q9: input + 4 style options; store both note text and style index.
- Scoring: rebalanced for Wales/South; tie-break by Q4 (A/C/D → Wales, else South). Toasts on Q1 D, Q4 A/D, Q5 B, Q8 D, and after “Seal the note” on Q9.
- Result 1: sealed note shown with style label via `getSealedNoteDisplay()`. Dev-only: scoreWales/scoreSouth shown when `NODE_ENV !== 'production'`.

## Key paths in code

| What | Where |
|------|--------|
| Screen flow, cover, questions, results, route | `web/app/page.tsx` |
| Layout (logo, stage, footer), `noScroll`, `fullPageScroll` | `web/components/ScreenLayout.tsx` |
| Question block (image 21:9 + content, no card) | `web/components/QuestionCard.tsx` |
| Option select + toasts | `handleOptionSelect` in `page.tsx` |
| Scoring + tie-break | `web/lib/scoring.ts` |
| Questions (4 options each), Q9 styles, Q10 equation | `web/lib/questions.ts` |
| Profile name, bullets, reasons, sealed note text, routes | `web/lib/copy.ts` |
| Theme (light, z-* classes, toast position) | `web/app/styles/zametka-katerina.css` |
| Image serving from public | `web/app/img/[...path]/route.ts` |

## Likely next steps

1. **Cover**: After replacing `public/cover.png`, bump query in `page.tsx` to e.g. `?v=4` so the new image loads without cache.
2. **Deploy**: `cd web && npm run build && npm start`, or deploy to Vercel/Netlify.
3. Optional: further copy or scoring tweaks per `brief.md`.
