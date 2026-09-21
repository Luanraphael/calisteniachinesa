"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function Countdown({ initialSeconds = 600 }: { initialSeconds?: number }) {
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
    <div className="flex items-center justify-center gap-2 rounded-xl bg-text px-4 py-2.5 text-white">
      <Clock size={15} className="text-pink-soft" />
      <span className="text-[13px] font-semibold">Oferta reservada por</span>
      <span className="font-mono text-[15px] font-extrabold tabular-nums text-pink-soft">
        {mm}:{ss}
      </span>
    </div>
  );
}
