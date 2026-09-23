"use client";

import { useEffect, useState } from "react";

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="flex min-w-[64px] flex-col items-center justify-center rounded-xl px-3 py-2"
      style={{ background: "var(--color-danger-light)" }}
    >
      <span className="font-mono text-[22px] font-extrabold leading-none tabular-nums text-danger">{value}</span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-wide text-danger">{label}</span>
    </div>
  );
}

export function Countdown({ initialSeconds = 900 }: { initialSeconds?: number }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-2">
      <TimeBox value={mm} label="min" />
      <span className="text-[20px] font-extrabold text-danger">:</span>
      <TimeBox value={ss} label="seg" />
    </div>
  );
}
