# Zametka Quiz

Single-page quiz microsite (Next.js, TypeScript, Tailwind). Mobile-first, warm editorial style.

## Run

**Важно:** запускай из папки `web` и открывай в браузере по адресу (не как файл).

```bash
cd web
npm run dev
```

Открой в браузере: [http://localhost:3000](http://localhost:3000) (или порт, который покажет терминал).
Картинки грузятся через маршрут `/img/...` только когда приложение запущено так.

## Build

```bash
npm run build
npm start
```

## Structure

- `app/page.tsx` — quiz flow (cover → Q1–Q10 → result profile → reveal → route preview)
- `components/` — ScreenLayout, Progress, QuestionCard, OptionButton, Toast
- `lib/scoring.ts` — Wales vs South scoring
- `lib/questions.ts` — question copy
- `lib/copy.ts` — result bullets, reasons, route copy
- `app/styles/zametka-katerina.css` — theme (z-* classes)

## Assets

Картинки в **`web/public/`** (раздаются по маршруту `/img/...`):

- `public/cover.png` — обложка главного экрана (целиком кликабельна)
- `public/logo.png` — лого в шапке на экранах вопросов/результатов
- `public/01.png` … `public/10.png` — картинки к вопросам 1–10

## Handoff

See `../SESSION-HANDOFF.md` and `knowledge/projects/zametka-quiz.md` for session context and next actions.
