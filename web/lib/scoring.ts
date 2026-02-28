import type { Answers, Outcome } from "./types";

export function computeScores(
  answers: Answers
): { scoreWales: number; scoreSouth: number } {
  let scoreWales = 0;
  let scoreSouth = 0;

  // Q1
  if (answers[1] !== undefined) {
    if (answers[1] === 0) scoreSouth += 2;
    if (answers[1] === 1) scoreSouth += 1;
    if (answers[1] === 2) {
      scoreWales += 1;
      scoreSouth += 1;
    }
    if (answers[1] === 3) scoreWales += 2;
  }

  // Q3
  if (answers[3] !== undefined) {
    if (answers[3] === 0) scoreSouth += 1;
    if (answers[3] === 1) scoreWales += 2;
    if (answers[3] === 2) scoreSouth += 1;
    if (answers[3] === 3) {
      scoreWales += 1;
      scoreSouth += 1;
    }
  }

  // Q4
  if (answers[4] !== undefined) {
    if (answers[4] === 0) scoreWales += 3;
    if (answers[4] === 1) scoreSouth += 3;
    if (answers[4] === 2) scoreWales += 2;
    if (answers[4] === 3) scoreWales += 4;
  }

  // Q6
  if (answers[6] !== undefined) {
    if (answers[6] === 0) scoreWales += 2;
    if (answers[6] === 1) scoreSouth += 1;
    if (answers[6] === 2) scoreSouth += 2;
    if (answers[6] === 3) scoreSouth += 1;
  }

  // Q7
  if (answers[7] !== undefined) {
    if (answers[7] === 0) scoreSouth += 3;
    if (answers[7] === 1) scoreWales += 3;
    if (answers[7] === 2) {
      scoreWales += 2;
      scoreSouth += 1;
    }
    if (answers[7] === 3) scoreWales += 4;
  }

  // Q8
  if (answers[8] !== undefined) {
    if (answers[8] === 0) scoreSouth += 2;
    if (answers[8] === 1) scoreSouth += 3;
    if (answers[8] === 2) scoreWales += 1;
    if (answers[8] === 3) scoreWales += 4;
  }

  // Q10
  if (answers[10] !== undefined) {
    if (answers[10] === 0) scoreWales += 0;
    if (answers[10] === 1) scoreWales += 2;
    if (answers[10] === 2) scoreSouth += 2;
    if (answers[10] === 3) scoreWales += 1;
  }

  return { scoreWales, scoreSouth };
}

export function getOutcome(answers: Answers): Outcome {
  const { scoreWales, scoreSouth } = computeScores(answers);
  if (scoreWales > scoreSouth) return "wales";
  if (scoreSouth > scoreWales) return "south";
  // Tie-break: use Q4 — A/C/D -> Wales, else South
  const q4 = answers[4];
  if (q4 === 0 || q4 === 2 || q4 === 3) return "wales";
  return "south";
}
