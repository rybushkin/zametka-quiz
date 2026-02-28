You are building a premium interactive quiz microsite called “Zametka”.
This is a personal, playful, secretive quiz addressed to Katerina.
IMPORTANT: The quiz must NOT reveal what it leads to. It must feel like “ten weird questions, one good outcome”.
Do not mention travel, trip, destination, Wales, South of England, week, or summer anywhere before the final reveal screen.

## Stack
Use Next.js (App Router) + React + TypeScript + Tailwind.
No external UI libraries required (keep it light).
Use subtle animations (CSS transitions). No heavy motion libs unless necessary.

## Product requirements
- Single-page app-like flow (one route is fine), with smooth transitions between “screens”.
- Progress indicator: “Question X of 10”.
- Answers are stored in state.
- Some questions affect scoring, some do not (see scoring rules below).
- Include one free-text input question (“sealed note”) that will be shown on the result screen (but does not affect scoring).
- Result flow is 2-step:
  1) Profile screen (no reveal)
  2) Unlock screen (reveal the hidden outcome, and ONLY here mention Wales / South of England)

## Visual style
- Premium editorial feel, lots of negative space.
- Warm off-white background, deep navy/charcoal text, muted blue accents.
- Clean typography hierarchy. Calm, modern, slightly nostalgic travel-brand energy, but subtle.
- No cheesy romance visuals, no hearts, no booking UI.

## Copy rules
- All UI copy must be in English.
- Address the user as “Katerina” on the cover and on results.
- Keep tone warm, witty, understated.

## Screen 0 — Cover (no spoilers)
Title: Zametka
To-line: Katerina
Subtitle: Ten questions. One good outcome.
Body:
No hints. No spoilers.
Answer fast. Overthinking is cancelled.
CTA: Start

## Questions (10 total)
Implement each as its own “screen” with:
- Title
- Helper line
- Options (radio-style single select) OR input field
- Next button disabled until answered (except where it makes sense)
- Back button

### Q1 (scored) Conversation steering wheel
Title: What should our conversations be made of?
Helper: Pick what you want more of.
Options:
1) Wine / restaurants / travel stories
2) Life, jokes, people-watching
3) Gentle deep talks
4) Tech / AI (limited edition only)

### Q2 (unscored) Seriousness level
Title: How serious are we being today?
Helper: This affects nothing. Obviously.
Options:
1) Minimal seriousness
2) Medium seriousness
3) Absolutely no seriousness

### Q3 (scored) Soundtrack temperature
Title: Pick a soundtrack for your next mood
Helper: Not an artist. A temperature.
Options:
1) Sparkly / bold / big chorus energy
2) Warm electronic / late-night calm
3) Both, depending on weather and snacks

### Q4 (scored) Landscape pull
Title: If you opened the curtains, what would you want to see?
Helper: Choose the view you’d keep staring at.
Options:
1) Wild coast, wind, cliffs
2) Soft towns, harbours, pretty streets
3) Green hills, long horizons

### Q5 (unscored) No AI monologues policy
Title: The “No AI Monologues” policy
Helper: Choose the law of the land.
Options:
1) Soft ban (just don’t start)
2) Hard ban (one mention = dessert fine)
3) Museum mode (only if asked first)

### Q6 (scored) Food gravity
Title: Choose your non-negotiable pleasure
Helper: The thing you’d happily repeat.
Options:
1) Seafood + salty air energy
2) Bakeries + coffee rituals
3) Wine + long dinners
4) Dessert later than planned

### Q7 (scored) Pace
Title: What pace feels right?
Helper: This is not training.
Options:
1) Slow and spacious (room for nothing)
2) Calm, but a little adventurous
3) No plan, we follow the day

### Q8 (scored) Day activity (with go-karting)
Title: Pick a day activity
Helper: Choose what sounds fun. One option is clearly written by a menace.
Options:
1) Coastal walk + long lunch (low effort, high happiness)
2) A cozy wine bar + people-watching (dessert-compatible)
3) A 5-hour masterclass on music app UI (with Andrey’s unsolicited critique)
4) Go-karting on narrow English country lanes (what could possibly go wrong)
Optional toast if option 4 selected:
“You are brave. I am scared.”

### Q9 (unscored) Sealed note input
Title: Leave a note for Future You
Helper: One sentence. No pressure. This will be sealed and revealed later.
Input:
- single-line text input (max 120 chars)
Placeholder:
“More sea air, less rushing.”
Button text (instead of Next):
Seal the note
After sealing, enable Next.
Optional toast:
“Noted. Filed under: good ideas.”

### Q10 (lightly scored) Quantum final boss
Title: Final boss: quantum question
Helper: Choose the correct answer with full confidence.
Display equation:
|ψ⟩ = α|0⟩ + β|1⟩
Options:
1) It means dessert exists in multiple states
2) It means the outcome is unknown until observed
3) It means Andrey owes Katerina a glass of wine
4) All of the above (obviously)

## Scoring
Maintain two scores: scoreWales and scoreSouth.
Only scored questions affect them: Q1, Q3, Q4, Q6, Q7, Q8, Q10.
Unscored questions: Q2, Q5, Q9 affect only UI.

Suggested scoring rules:
- Q4:
  - Wild coast -> +2 Wales
  - Soft towns -> +2 South
  - Green hills -> +1 Wales
- Q6:
  - Seafood -> +1 Wales
  - Wine + long dinners -> +2 South
  - Bakeries -> +1 South
  - Dessert later -> +1 South
- Q7:
  - Adventurous -> +2 Wales
  - Slow and spacious -> +2 South
  - No plan -> +1 Wales, +1 South
- Q8:
  - Go-karting -> +2 Wales
  - Wine bar -> +2 South
  - Coastal walk + long lunch -> +1 South
  - UI masterclass -> +0 (mostly a joke)
- Q3:
  - Sparkly big chorus -> +1 South
  - Warm electronic -> +1 Wales
  - Both -> +1 Wales, +1 South
- Q1:
  - Wine/restaurants/travel stories -> +2 South
  - People-watching/jokes -> +1 South
  - Gentle deep talks -> +1 Wales, +1 South
  - Tech/AI -> +1 Wales (but do not shame user)
- Q10:
  - Option 2 -> +1 Wales
  - Option 3 -> +1 South
  - Option 4 -> +1 Wales
  - Option 1 -> +0

Final outcome:
If scoreWales > scoreSouth -> outcome is Wales
Else -> outcome is South of England

## Results (two-step, no spoilers until step 2)
### Result Screen 1 — Profile (NO Wales/South mention)
Title: Katerina, your Zametka Profile is…
Choose one of these profile names based on the outcome, but do NOT name places:
- If Wales outcome: “Afterglow & Big Skies”
- If South outcome: “Cinematic Light & Long Lunch”
Body:
Show 4 bullets summarizing the choices (derive from answers).
Include the sealed note:
Your sealed note: “{text}” (or a witty fallback if empty)
CTA: Unlock the next part

### Result Screen 2 — Reveal (FIRST time mentioning Wales/South)
Title: This profile points to a place
Body:
Not booked. Not fixed. Just… very you.
Reveal line:
Route revealed: Wales   OR   Route revealed: South of England
Add “Because you chose…” 3 short reasons.
Buttons:
- Open your route
- Show the other route (optional)

### Route Preview (after “Open your route”)
Keep it short, editorial, and not like an itinerary.
For Wales:
- Stay / Eat / Wander / Signature day (short paragraphs)
For South:
- Same structure, different copy

## Engineering requirements
- Clean component structure: ScreenLayout, QuestionCard, OptionButton, Progress, Toast.
- Keyboard support: arrows / enter optional.
- Mobile-first responsive.
- No external APIs.

## Deliverable
Generate the full Next.js project code (key files), focusing on:
- app/page.tsx
- components/
- styles via Tailwind
- scoring logic
- state management
- smooth navigation between screens

Do not include any explanation outside code unless absolutely necessary.