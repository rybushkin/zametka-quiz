"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function Toast({ message, onClose, duration = 4000 }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [onClose, duration]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="z-toast z-toast--show"
    >
      <p className="z-toastText">{message}</p>
    </div>
  );
}
