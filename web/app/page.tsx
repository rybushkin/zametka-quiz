"use client";

import { useState, useCallback } from "react";
import ScreenLayout from "@/components/ScreenLayout";
import QuestionCard from "@/components/QuestionCard";
import OptionButton from "@/components/OptionButton";
import Progress from "@/components/Progress";
import Toast from "@/components/Toast";
import { QUESTION_ORDER } from "@/lib/types";
import type { Screen, Answers, Outcome } from "@/lib/types";
import { getOutcome, computeScores } from "@/lib/scoring";
import {
  getProfileName,
  getResultBullets,
  getReasons,
  getSealedNoteDisplay,
  ROUTE_WALES,
  ROUTE_SOUTH,
} from "@/lib/copy";
import {
  QUESTIONS,
  Q9_PLACEHOLDER,
  Q9_MAX_LENGTH,
  Q10_EQUATION,
} from "@/lib/questions";

export default function QuizPage() {
  const [screen, setScreen] = useState<Screen>("cover");
  const [answers, setAnswers] = useState<Answers>({});
  const [sealedNote, setSealedNote] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [routeView, setRouteView] = useState<"main" | "other">("main");

  const setAnswer = useCallback((q: keyof Answers, value: number | string) => {
    setAnswers((prev) => ({ ...prev, [q]: value }));
  }, []);

  const currentIndex = QUESTION_ORDER.indexOf(screen);
  const progressCurrent = currentIndex + 1;
  const outcome: Outcome = currentIndex >= 9 ? getOutcome(answers) : "south";

  const goNext = useCallback(() => {
    if (screen === "cover") {
      setScreen("q1");
      return;
    }
    if (screen === "q10") {
      setScreen("result1");
      return;
    }
    if (screen === "result1") {
      setScreen("result2");
      return;
    }
    if (screen === "result2") {
      setRouteView("main");
      setScreen("route");
      return;
    }
    const idx = QUESTION_ORDER.indexOf(screen);
    if (idx >= 0 && idx < QUESTION_ORDER.length - 1) {
      setScreen(QUESTION_ORDER[idx + 1]);
    }
  }, [screen]);

  const goBack = useCallback(() => {
    if (screen === "q1") {
      setScreen("cover");
      return;
    }
    if (screen === "result1") {
      setScreen("q10");
      return;
    }
    if (screen === "result2") {
      setScreen("result1");
      return;
    }
    if (screen === "route") {
      setScreen("result2");
      return;
    }
    const idx = QUESTION_ORDER.indexOf(screen);
    if (idx > 0) setScreen(QUESTION_ORDER[idx - 1]);
  }, [screen]);

  const handleOptionSelect = useCallback(
    (qNum: number, opt: number) => {
      setAnswer(qNum as keyof Answers, opt);
      if (qNum === 1 && opt === 3) setToast("Limited edition only. Noted.");
      if (qNum === 4 && (opt === 0 || opt === 3)) setToast("Wind-proof hair plan: required.");
      if (qNum === 5 && opt === 1) setToast("Dessert fine activated.");
      if (qNum === 8 && opt === 3) setToast("You are brave. I am scared.");
    },
    [setAnswer]
  );

  // ---- Cover (whole image clickable, no separate button) ----
  if (screen === "cover") {
    return (
      <button
        type="button"
        onClick={goNext}
        style={{
          position: "relative",
          width: "100vw",
          height: "100svh",
          maxHeight: "100dvh",
          overflow: "hidden",
          padding: 0,
          border: "none",
          background: "none",
          cursor: "pointer",
          display: "block",
          textAlign: "left",
        }}
        aria-label="Start quiz"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cover.png?v=3"
          alt="Zametka B-Day Quiz — ten questions, no spoilers. Click to start."
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            maxHeight: "100%",
            objectFit: "contain",
            objectPosition: "center",
            display: "block",
          }}
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </button>
    );
  }

  // ---- Questions 1–8, 10 ----
  if (
    screen !== "q9" &&
    screen !== "result1" &&
    screen !== "result2" &&
    screen !== "route"
  ) {
    const qNum = parseInt(screen.replace("q", ""), 10);
    const q = QUESTIONS[qNum];
    const selected = answers[qNum as keyof Answers];
    const isQ10 = qNum === 10;

    const questionImage = qNum <= 9 ? `/0${qNum}.png` : "/10.png";

    return (
      <>
        <ScreenLayout
          footer={
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <Progress current={progressCurrent} total={10} />
              <div className="z-actions">
                <button type="button" onClick={goBack} className="z-btn z-btnGhost">
                  Back
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={selected === undefined}
                  className="z-btn z-btnPrimary"
                >
                  Next
                </button>
              </div>
            </div>
          }
        >
          <QuestionCard
            title={q.title}
            helper={q.helper}
            imageSrc={questionImage}
            extra={
              isQ10 ? (
                <p
                  className="z-quote"
                  style={{ marginTop: "var(--gap-2)", marginBottom: 0, fontFamily: "var(--font-body)" }}
                  aria-hidden
                >
                  {Q10_EQUATION}
                </p>
              ) : undefined
            }
          >
            {q.options?.map((opt, i) => (
              <OptionButton
                key={i}
                label={opt}
                selected={selected === i}
                onSelect={() => handleOptionSelect(qNum, i)}
              />
            ))}
          </QuestionCard>
        </ScreenLayout>
        {toast && <Toast message={toast} onClose={() => setToast(null)} />}
      </>
    );
  }

  // ---- Q9 Sealed note (input + footer) ----
  if (screen === "q9") {
    const q = QUESTIONS[9];
    return (
      <ScreenLayout
        footer={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <Progress current={9} total={10} />
            <div className="z-actions">
              <button type="button" onClick={goBack} className="z-btn z-btnGhost">
                Back
              </button>
              <button type="button" onClick={goNext} className="z-btn z-btnPrimary">
                Next
              </button>
            </div>
          </div>
        }
      >
        <div style={{ width: "100%", maxWidth: 900 }}>
          <div style={{ width: "100%", aspectRatio: "21/9", overflow: "hidden", flexShrink: 0, background: "rgba(26,36,51,0.08)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/09.png"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              loading="eager"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
          <div style={{ textAlign: "center", padding: "clamp(16px, 2.5vw, 28px) 0" }}>
            <h2 className="z-title z-title--question" style={{ marginBottom: "var(--gap-1)" }}>{q.title}</h2>
            <p className="z-helper" style={{ marginBottom: "var(--gap-2)" }}>{q.helper}</p>
            <div className="z-noteWrap">
              <textarea
                value={sealedNote}
                onChange={(e) =>
                  setSealedNote(e.target.value.slice(0, Q9_MAX_LENGTH))
                }
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && goNext()}
                placeholder={Q9_PLACEHOLDER}
                maxLength={Q9_MAX_LENGTH}
                rows={4}
                className="z-noteInput"
              />
              <p style={{ marginTop: 6, fontSize: 12, color: "rgba(26,36,51,0.6)" }}>
                {sealedNote.length}/{Q9_MAX_LENGTH}
              </p>
            </div>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  // ---- Result 1 Profile ----
  if (screen === "result1") {
    const profileName = getProfileName(outcome);
    const bullets = getResultBullets(answers);
    const noteDisplay = getSealedNoteDisplay(sealedNote, answers[9]);
    const { scoreWales, scoreSouth } = computeScores(answers);
    const showDebug = process.env.NODE_ENV !== "production";

    return (
      <ScreenLayout fullPageScroll>
        <div className="z-card">
          <div className="z-cardInner">
            <h1 className="z-title z-title--question">
              Katerina, your Zametka Profile is…
            </h1>
            <p className="z-sub" style={{ marginTop: 8 }}>{profileName}</p>
            <div className="z-profileCard">
              <ul className="z-bullets">
                {bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className="z-quote">{noteDisplay}</div>
            </div>
            {showDebug && (
              <p style={{ marginTop: 12, fontSize: 12, color: "rgba(26,36,51,0.5)" }}>
                [dev] Wales: {scoreWales} · South: {scoreSouth}
              </p>
            )}
            <div className="z-actions">
              <button type="button" onClick={goBack} className="z-btn z-btnGhost">
                Back
              </button>
              <button type="button" onClick={goNext} className="z-btn z-btnPrimary">
                Unlock the next part
              </button>
            </div>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  // ---- Result 2 Reveal ----
  if (screen === "result2") {
    const isWales = outcome === "wales";
    const routeLabel = isWales ? "Wales" : "South of England";
    const reasons = getReasons(outcome, answers);

    return (
      <ScreenLayout fullPageScroll>
        <div className="z-card">
          <div className="z-cardInner">
            <h1 className="z-title z-title--question">
              This profile points to a place
            </h1>
            <p className="z-sub">Not booked. Not fixed. Just… very you.</p>
            <div className="z-reveal">
              <p className="z-revealLabel">Route revealed</p>
              <p className="z-revealValue">{routeLabel}</p>
              <p className="z-helper" style={{ marginTop: 12 }}>
                Because you chose… {reasons.join("; ")}
              </p>
            </div>
            <div className="z-actions">
              <button type="button" onClick={goBack} className="z-btn z-btnGhost">
                Back
              </button>
              <button type="button" onClick={goNext} className="z-btn z-btnPrimary">
                Open your route
              </button>
              <button
                type="button"
                onClick={() => {
                  setRouteView("other");
                  setScreen("route");
                }}
                className="z-btn z-btnPaper"
              >
                Show the other route
              </button>
            </div>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  // ---- Route Preview ----
  if (screen === "route") {
    const showOutcome: Outcome =
      routeView === "other" ? (outcome === "wales" ? "south" : "wales") : outcome;
    const route = showOutcome === "wales" ? ROUTE_WALES : ROUTE_SOUTH;

    return (
      <ScreenLayout fullPageScroll>
        <div className="z-card">
          <div className="z-cardInner">
            <h1 className="z-title z-title--question">{route.title}</h1>
            <p className="z-sub mt-2 mb-4 opacity-90">What you love</p>
            <div className="z-profileCard">
              <p className="z-revealLabel">Stay</p>
              <p className="z-sub">{route.stay}</p>
            </div>
            <div className="z-profileCard">
              <p className="z-revealLabel">Eat</p>
              <p className="z-sub">{route.eat}</p>
            </div>
            <div className="z-profileCard">
              <p className="z-revealLabel">Wander</p>
              <p className="z-sub">{route.wander}</p>
            </div>
            <div className="z-profileCard">
              <p className="z-revealLabel">Signature day</p>
              <p className="z-sub">{route.signature}</p>
            </div>
            <div className="z-actions">
              <button type="button" onClick={goBack} className="z-btn z-btnGhost">
                Back
              </button>
            </div>
          </div>
        </div>
      </ScreenLayout>
    );
  }

  return null;
}
