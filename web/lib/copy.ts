import type { Answers, Outcome } from "./types";
import { Q9_STYLE_LABELS } from "./questions";

const WALES_PROFILE = "Afterglow & Big Skies";
const SOUTH_PROFILE = "Cinematic Light & Long Lunch";

export function getProfileName(outcome: Outcome): string {
  return outcome === "wales" ? WALES_PROFILE : SOUTH_PROFILE;
}

export function getResultBullets(answers: Answers): string[] {
  const bullets: string[] = [];
  const q = QUESTIONS_SUMMARY;
  if (answers[1] !== undefined && q[1][answers[1]]) bullets.push(q[1][answers[1]]);
  if (answers[3] !== undefined && q[3][answers[3]]) bullets.push(q[3][answers[3]]);
  if (answers[4] !== undefined && q[4][answers[4]]) bullets.push(q[4][answers[4]]);
  if (answers[6] !== undefined && q[6][answers[6]]) bullets.push(q[6][answers[6]]);
  if (answers[7] !== undefined && q[7][answers[7]]) bullets.push(q[7][answers[7]]);
  return bullets.slice(0, 4);
}

const QUESTIONS_SUMMARY: Record<number, Record<number, string>> = {
  1: {
    0: "Conversations built on wine, restaurants, and stories.",
    1: "More life, jokes, and people-watching.",
    2: "Gentle deep talks.",
    3: "Tech and AI, in small doses.",
  },
  3: {
    0: "Sparkly, bold, big chorus energy.",
    1: "Warm electronic, late-night calm.",
    2: "Acoustic and soft, window seat mood.",
    3: "Both, depending on weather and snacks.",
  },
  4: {
    0: "Wild coast, wind, and cliffs.",
    1: "Soft towns, harbours, pretty streets.",
    2: "Green hills and long horizons.",
    3: "A view like a movie trailer—big sky, bigger feelings.",
  },
  6: {
    0: "Seafood and salty air.",
    1: "Bakeries and coffee rituals.",
    2: "Wine and long dinners.",
    3: "Dessert later than planned.",
  },
  7: {
    0: "Slow and spacious.",
    1: "Calm, but a little adventurous.",
    2: "No plan—following the day.",
    3: "Slightly feral (in a cute way).",
  },
};

export function getSealedNoteDisplay(
  noteText: string,
  noteStyle: number | undefined
): string {
  const styleLabel =
    noteStyle !== undefined && Q9_STYLE_LABELS[noteStyle]
      ? Q9_STYLE_LABELS[noteStyle]
      : "sealed";
  const text = noteText.trim();
  if (!text) return "Your sealed note (" + styleLabel + "): (Nothing sealed. Future You is fine with that.)";
  return "Your sealed note (" + styleLabel + "): \"" + text + "\"";
}

export function getReasons(outcome: Outcome, answers: Answers): string[] {
  const reasons: string[] = [];
  if (answers[4] !== undefined) {
    if (outcome === "wales" && (answers[4] === 0 || answers[4] === 2 || answers[4] === 3))
      reasons.push("you chose the view you wanted");
    if (outcome === "south" && answers[4] === 1)
      reasons.push("you chose soft towns and harbours");
  }
  if (answers[6] !== undefined) {
    if (outcome === "wales" && answers[6] === 0)
      reasons.push("you wanted seafood and salty air");
    if (outcome === "south" && (answers[6] === 1 || answers[6] === 2 || answers[6] === 3))
      reasons.push("you chose bakeries, wine, or dessert");
  }
  if (answers[7] !== undefined) {
    if (outcome === "wales" && (answers[7] === 1 || answers[7] === 3))
      reasons.push("you wanted that pace");
    if (outcome === "south" && answers[7] === 0)
      reasons.push("you wanted slow and spacious");
  }
  return reasons.slice(0, 3);
}

export const ROUTE_WALES = {
  title: "Wales",
  stay: "Somewhere with a view of the water or the hills. A place that feels like a pause.",
  eat: "Seafood when it's right, something warm when it's not. No rush.",
  wander: "Coastal paths, small harbours, and the kind of roads that make you slow down.",
  signature: "One long day outside—wind, sky, and a late lunch you'll remember.",
};

export const ROUTE_SOUTH = {
  title: "South of England",
  stay: "A base in a pretty town or by the coast. Easy to wake up and choose the day.",
  eat: "Long lunches, good wine, and the kind of dinners that stretch into the evening.",
  wander: "Harbours, villages, and stretches of coast that feel like a film.",
  signature: "A day with no plan—just good food, good light, and room for nothing.",
};
