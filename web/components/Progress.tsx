"use client";

export default function Progress({ current, total }: { current: number; total: number }) {
  return (
    <div className="z-progress" aria-live="polite">
      <span>Question {current} of {total}</span>
      <span className="z-progressLine" aria-hidden />
    </div>
  );
}
