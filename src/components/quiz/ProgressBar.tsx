"use client";

import { motion } from "framer-motion";

export function ProgressBar({ pct }: { pct: number }) {
  return (
    <div
      className="h-1.5 w-full rounded-full bg-pink-light overflow-hidden"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, var(--color-pink-soft), var(--color-pink-strong))",
        }}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      />
    </div>
  );
}
