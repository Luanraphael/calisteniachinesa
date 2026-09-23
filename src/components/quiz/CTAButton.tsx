"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  showArrow?: boolean;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  pulse?: boolean;
}

export function CTAButton({
  label,
  onClick,
  showArrow = true,
  variant = "primary",
  disabled,
  className,
  type = "button",
  pulse = false,
}: CTAButtonProps) {
  const base =
    "w-full select-none rounded-2xl px-6 py-4 text-[15px] font-bold tracking-tight transition-transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2";
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_10px_26px_rgba(52,168,83,0.28)] bg-success hover:bg-success-strong"
      : "text-pink-strong bg-pink-mist border border-border-strong";

  // Guards against a step being skipped when an animated/settling button receives two rapid clicks
  // (e.g. a fast double-tap, or a test harness retrying a click on a still-animating element).
  const firedRef = useRef(false);

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      animate={pulse && !disabled ? { scale: [1, 1.035, 1] } : undefined}
      transition={pulse && !disabled ? { duration: 1.7, repeat: Infinity, ease: "easeInOut" } : undefined}
      type={type}
      disabled={disabled}
      onClick={() => {
        if (firedRef.current) return;
        firedRef.current = true;
        onClick?.();
      }}
      className={`${base} ${styles} ${className ?? ""}`}
    >
      {label}
      {showArrow && <ArrowRight size={18} strokeWidth={2.5} />}
    </motion.button>
  );
}
