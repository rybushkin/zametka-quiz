# Zametka Quiz — Handoff for Next Session

## What this is

Next.js quiz microsite: 10 questions → profile result → reveal (Wales or South of England). For Katerina; no travel spoilers until the unlock screen. Page title: **Zametka B-Day Quiz**.

## Where everything is

- **App**: `web/` (Next.js 16, App Router, TypeScript, Tailwind)
- **Brief (full spec)**: `brief.md`
- **Run**: `cd web && npm run dev` → http://localhost:3000 (or 3001 if 3000 is in use)

## Current state (after last session)

### Build & deploy
- **Static export**: `next.config.ts` has `output: "export"`. Build produces `web/out/`.
- **Build command**: `npm run build` (uses `next build --webpack` in package.json for font compatibility).
- **No** `app/img/[...path]/route.ts` — removed; images are served from `public/` at root paths: `/cover.png`, `/01.png` … `/10.png`, `/logo.png`.
- **GitHub Pages**: Workflow `.github/workflows/deploy-pages.yml` — on push to master/main: build in `web/`, deploy `web/out` to branch **gh-pages** via peaceiris/actions-gh-pages. Permissions: `contents: write`, `pages: write`.
- **Pages setup**: Settings → Pages → Source **Deploy from a branch** → branch **gh-pages**, folder / (root). Site for **custom domain** (paths from root, no basePath): e.g. **zametka.pics**. If using rybushkin.github.io/zametka-quiz, would need path prefix (currently not applied).
- **Repos**: `origin` = zametka-quiz; remote `zametka` = rybushkin/zametka. Both pushed.

### Cover
- Fullscreen image from `/cover.png?v=3`. Whole image is a button: click to start.
- **object-fit: contain** (so image fits vertically on desktop). No separate Start button.

### Questions (Q1–Q10)
- **Layout**: Logo (top) → image 21:9 → title, helper, options → footer (Progress + Back / Next).
- **Images**: From `web/public/`, paths `/01.png` … `/10.png`, `/logo.png` (no `/img/` prefix).
- **Q9 (sealed note)**: **Textarea only** (max 120 chars), helper "One sentence.", no style options. Footer: Progress, Back, Next. Enter in field → go next. Paths in code: `/09.png`, `/cover.png`, etc.

### Results & route
- Result 1 (profile), Result 2 (reveal), Route: `ScreenLayout` with `fullPageScroll`. Sealed note text via `getSealedNoteDisplay(sealedNote, answers[9])`; style label fallback when no style chosen.

### Theme & assets
- **Theme**: `web/app/styles/zametka-katerina.css` (z-* classes, toast position).
- **Assets**: `web/public/` — cover.png, logo.png, 01.png … 10.png. Bump `?v=3` in page.tsx when cover changes.

## Key paths in code

| What | Where |
|------|--------|
| Screen flow, cover, questions, results, route | `web/app/page.tsx` |
| Layout (logo, stage, footer) | `web/components/ScreenLayout.tsx` |
| Question block (image 21:9 + content) | `web/components/QuestionCard.tsx` |
| Scoring + tie-break | `web/lib/scoring.ts` |
| Questions, Q9 placeholder/max length | `web/lib/questions.ts` |
| Profile name, bullets, sealed note display, routes | `web/lib/copy.ts` |
| Static export config | `web/next.config.ts` |
| GitHub Pages deploy | `.github/workflows/deploy-pages.yml` |

## Docs in repo

- **DEPLOY.md** — как включить Pages (Deploy from branch gh-pages), про кастомный домен.
- **DEPLOY 2.md** — копия/альт инструкции.
- **GIT.md** — пуши, теги, релизы.

## Next actions (for next session)

1. **Если 404 на zametka.pics / github.io**: проверить Actions — зелёный ли workflow, создалась ли ветка gh-pages с index.html в корне. Проверить Settings → Pages: Source = Deploy from branch, branch = gh-pages.
2. **Пуш последнего состояния**: при необходимости `git push origin master` (и при желании `git push zametka master:main`).
3. Дальнейшие правки по `brief.md` или деплой/домен — по запросу.
