"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import { Headline } from "../Headline";
import type { TextInputStep } from "@/lib/quizTypes";

export function TextInputScreen({
  step,
  currentValue,
  onChange,
  onContinue,
}: {
  step: TextInputStep;
  currentValue: string | undefined;
  onChange: (value: string) => void;
  onContinue: () => void;
}) {
  const [value, setValue] = useState(currentValue ?? "");
  const canContinue = value.trim().length > 0;

  function handleChange(next: string) {
    setValue(next);
    onChange(next);
  }

  function handleSubmit() {
    if (!canContinue) return;
    onContinue();
  }

  return (
    <div className="flex flex-1 flex-col gap-6 py-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
        <Headline>{step.headline}</Headline>
        {step.subheadline && (
          <p className="mt-1.5 text-[14px] font-medium text-text-secondary">{step.subheadline}</p>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.08 }}>
        <input
          type="text"
          inputMode={step.inputMode ?? "text"}
          maxLength={step.maxLength}
          autoFocus
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
          placeholder={step.placeholder}
          className="w-full rounded-2xl border border-border-strong bg-surface px-5 py-4 text-[20px] font-bold text-text placeholder:font-medium placeholder:text-text-tertiary focus:border-pink-strong focus:outline-none focus:ring-2 focus:ring-pink-light"
        />
      </motion.div>

      {step.infoBlock && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.14 }}
          className="flex items-start gap-2.5 rounded-2xl border border-border/70 bg-surface px-4 py-3.5"
        >
          <Info size={15} className="mt-0.5 shrink-0 text-text-tertiary" />
          <div>
            <p className="text-[13px] font-bold leading-snug text-text">{step.infoBlock.title}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-text-secondary">{step.infoBlock.text}</p>
          </div>
        </motion.div>
      )}

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={handleSubmit} disabled={!canContinue} />
      </ScreenFooter>
    </div>
  );
}
