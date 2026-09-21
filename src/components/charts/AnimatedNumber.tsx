"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  durationSec = 1.1,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  durationSec?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: durationSec,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [value, durationSec]);

  return (
    <span>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
