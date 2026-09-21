"use client";

import { motion } from "framer-motion";

/**
 * Stylised female silhouette used for the "antes / depois" comparison.
 * Illustrative infographic art — not a photo — so it never misrepresents a
 * real before/after result.
 */
export function BodySilhouette({
  variant,
  label,
  delay = 0,
}: {
  variant: "before" | "after";
  label: string;
  delay?: number;
}) {
  const tone = variant === "before" ? "var(--color-text-tertiary)" : "var(--color-pink-strong)";
  const glow = variant === "after";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.45, ease: "easeOut" }}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="flex h-32 w-24 items-center justify-center rounded-2xl"
        style={{ background: glow ? "var(--color-pink-mist)" : "#f5f2f4" }}
      >
        <svg width="54" height="104" viewBox="0 0 54 104" fill="none">
          <ellipse cx="27" cy="12" rx="10" ry="11" fill={tone} opacity={0.9} />
          <path
            d={
              variant === "before"
                ? "M14 28c-2 6-3 14-2 22 1 6 4 10 3 16-1 8-4 14-4 22h10c1-8 2-16 4-22 1 6 2 14 4 22h10c0-8-3-14-4-22-1-6 2-10 3-16 1-8 0-16-2-22-5-4-17-4-22 0Z"
                : "M17 28c-1 6-2 13-1 18 1 5 3 7 3 13 0 8-2 16-2 25h9c1-9 2-17 3-24 1 7 2 15 3 24h9c0-9-2-17-2-25 0-6 2-8 3-13 1-5 0-12-1-18-4-3-15-3-24 0Z"
            }
            fill={tone}
            opacity={0.85}
          />
        </svg>
      </div>
      <span
        className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-wide ${
          variant === "before" ? "bg-[#f2eef0] text-text-secondary" : "bg-pink-strong text-white"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}
