export const QUESTIONS: Record<
  number,
  { title: string; helper: string; options?: string[] }
> = {
  1: {
    title: "What should our conversations be made of?",
    helper: "Pick what you want more of.",
    options: [
      "Wine / restaurants / travel stories",
      "Life, jokes, people-watching",
      "Gentle deep talks",
      "Tech / AI (limited edition only)",
    ],
  },
  2: {
    title: "How serious are we being today?",
    helper: "This affects nothing. Obviously.",
    options: [
      "Minimal seriousness",
      "Medium seriousness",
      "Very serious (suspicious)",
      "Absolutely no seriousness",
    ],
  },
  3: {
    title: "Pick a soundtrack for your next mood",
    helper: "Not an artist. A temperature.",
    options: [
      "Sparkly / bold / big chorus energy",
      "Warm electronic / late-night calm",
      "Acoustic and soft (window seat mood)",
      "Both, depending on weather and snacks",
    ],
  },
  4: {
    title: "If you opened the curtains, what would you want to see?",
    helper: "Choose the view you'd keep staring at.",
    options: [
      "Wild coast, wind, cliffs",
      "Soft towns, harbours, pretty streets",
      "Green hills, long horizons",
      "A view that looks like a movie trailer (big sky, bigger feelings)",
    ],
  },
  5: {
    title: 'The "No AI Monologues" policy',
    helper: "Choose the law of the land.",
    options: [
      "Soft ban (just don't start)",
      "Hard ban (one mention = dessert fine)",
      "Museum mode (only if asked first)",
      "Dealer's choice (she controls the mute button)",
    ],
  },
  6: {
    title: "Choose your non-negotiable pleasure",
    helper: "The thing you'd happily repeat.",
    options: [
      "Seafood + salty air energy",
      "Bakeries + coffee rituals",
      "Wine + long dinners",
      "Dessert later than planned",
    ],
  },
  7: {
    title: "What pace feels right?",
    helper: "This is not training.",
    options: [
      "Slow and spacious (room for nothing)",
      "Calm, but a little adventurous",
      "No plan, we follow the day",
      "Slightly feral (in a cute way)",
    ],
  },
  8: {
    title: "Pick a day activity",
    helper: "Choose what sounds fun. One option is clearly written by a menace.",
    options: [
      "Coastal walk + long lunch (low effort, high happiness)",
      "A cozy wine bar + people-watching (dessert-compatible)",
      "A 5-hour masterclass on music app UI (with Andrey's unsolicited critique)",
      "Go-karting on narrow English country lanes (what could possibly go wrong)",
    ],
  },
  9: {
    title: "Leave a note for Future You",
    helper: "One sentence. Then choose how it should look.",
    options: [
      "Clean (minimal)",
      "Messy (marker scribble)",
      "Cute (stickers everywhere)",
      "Confidential (stamped \"SEALED\")",
    ],
  },
  10: {
    title: "Final boss: quantum question",
    helper: "Choose the correct answer with full confidence.",
    options: [
      "It means dessert exists in multiple states",
      "It means the outcome is unknown until observed",
      "It means Andrey owes Katerina a glass of wine",
      "All of the above (obviously)",
    ],
  },
};

export const Q9_PLACEHOLDER = "More sea air, less rushing.";
export const Q9_MAX_LENGTH = 120;

export const Q10_EQUATION = "|ψ⟩ = α|0⟩ + β|1⟩";

export const Q9_STYLE_LABELS: Record<number, string> = {
  0: "Clean",
  1: "Messy",
  2: "Cute",
  3: "Confidential",
};
