"use client";

import type { ReactNode } from "react";

type Props = {
  title: string;
  helper: string;
  children: ReactNode;
  extra?: ReactNode;
  imageSrc?: string;
};

export default function QuestionCard({ title, helper, children, extra, imageSrc }: Props) {
  return (
    <div style={{ width: "100%", maxWidth: 900 }}>
      {imageSrc && (
        <div style={{ width: "100%", aspectRatio: "21/9", overflow: "hidden", flexShrink: 0, background: "rgba(26,36,51,0.08)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
            loading="eager"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
      )}
      <div style={{ textAlign: "center", padding: "clamp(16px, 2.5vw, 28px) 0" }}>
        <h2 className="z-title z-title--question" style={{ marginBottom: "var(--gap-1)" }}>{title}</h2>
        <p className="z-helper" style={{ marginBottom: "var(--gap-2)" }}>{helper}</p>
        {extra}
        <div className="z-options">{children}</div>
      </div>
    </div>
  );
}
