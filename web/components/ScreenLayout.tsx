"use client";

import type { ReactNode } from "react";

const LOGO_PATH = "/img/logo.png";

type Props = {
  children: ReactNode;
  footer?: ReactNode;
  /** When true, stage does not scroll (content must fit viewport). */
  noScroll?: boolean;
  /** When true, layout grows with content and the page scrolls (no inner frame scroll). */
  fullPageScroll?: boolean;
};

export default function ScreenLayout({ children, footer, noScroll = false, fullPageScroll = false }: Props) {
  const content = (
    <div
      className="z-root"
      style={{
        minHeight: fullPageScroll ? "100svh" : "100svh",
        height: fullPageScroll ? "auto" : "100svh",
        maxHeight: fullPageScroll ? "none" : "100svh",
        overflow: fullPageScroll ? "visible" : "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(18px, 3vw, 44px)",
      }}
    >
      <div
        className="z-shell"
        style={{
          width: "100%",
          maxWidth: 900,
          flex: fullPageScroll ? "0 1 auto" : 1,
          minHeight: fullPageScroll ? "auto" : 0,
          display: "flex",
          flexDirection: "column",
          overflow: fullPageScroll ? "visible" : "hidden",
        }}
      >
        <div className="z-topbar" style={{ justifyContent: "center", alignItems: "center", flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO_PATH}
            alt="Zametka"
            style={{ height: 56, width: "auto", objectFit: "contain", flexShrink: 0 }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        </div>
        <div
          className="z-stage z-fadeIn"
          style={{
            flex: fullPageScroll ? "0 1 auto" : 1,
            minHeight: fullPageScroll ? "auto" : 0,
            overflowY: fullPageScroll ? "visible" : noScroll ? "hidden" : "auto",
            overflowX: "hidden",
            WebkitOverflowScrolling: fullPageScroll ? "auto" : noScroll ? "auto" : "touch",
            paddingBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {children}
        </div>
        {footer && <div style={{ flexShrink: 0, paddingTop: 8 }}>{footer}</div>}
      </div>
    </div>
  );

  if (fullPageScroll) {
    return (
      <div style={{ height: "100svh", overflowY: "auto", overflowX: "hidden" }}>
        {content}
      </div>
    );
  }
  return content;
}
