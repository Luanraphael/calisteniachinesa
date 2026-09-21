"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ChoiceOption } from "@/lib/quizTypes";

export function ChoiceCard({
  option,
  selected,
  multi,
  onSelect,
  index,
}: {
  option: ChoiceOption;
  selected: boolean;
  multi: boolean;
  onSelect: () => void;
  index: number;
}) {
  const Icon = option.icon;
  const emoji = option.emoji;
  const neutralIdle = option.neutral && !selected;
  return (
    <motion.button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onSelect}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3), ease: "easeOut" }}
      whileTap={{ scale: 0.98 }}
      className="group flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-colors duration-200"
      style={{
        borderColor: selected ? "var(--color-pink)" : neutralIdle ? "var(--color-border)" : "var(--color-pink-wash-border)",
        background: selected ? "var(--color-pink-mist)" : neutralIdle ? "#ffffff" : "var(--color-pink-wash)",
        boxShadow: selected ? "0 4px 16px rgba(236,63,134,0.14)" : undefined,
      }}
    >
      {emoji && (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center text-[22px] leading-none" aria-hidden>
          {emoji}
        </span>
      )}
      {!emoji && Icon && (
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
            selected ? "bg-white text-pink-strong" : "bg-white/70 text-pink-strong"
          }`}
        >
          <Icon size={19} strokeWidth={2} />
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className={`block text-[15px] font-semibold leading-snug ${selected ? "text-pink-strong" : "text-text"}`}>
          {option.label}
        </span>
        {option.sublabel && <span className="mt-0.5 block text-[13px] text-text-secondary">{option.sublabel}</span>}
      </span>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 transition-all duration-200 ${
          multi ? "rounded-md" : "rounded-full"
        } ${selected ? "border-pink bg-pink" : "border-border-strong bg-transparent"}`}
      >
        {selected && <Check size={14} strokeWidth={3} className="text-white" />}
      </span>
    </motion.button>
  );
}
