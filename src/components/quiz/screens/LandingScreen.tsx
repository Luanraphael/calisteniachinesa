"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Answers, LandingStep } from "@/lib/quizTypes";
import { BRAND_NAME } from "@/lib/quizData";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { LiveIndicator } from "../LiveIndicator";

export function LandingScreen({
  step,
  onSelect,
}: {
  step: LandingStep;
  answers: Answers;
  onSelect: (optionId: string) => void;
}) {
  const advancedRef = useRef(false);

  return (
    <div className="flex flex-1 flex-col items-center gap-5 pb-8 pt-4 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[26px] font-extrabold leading-[1.1] tracking-tight text-text"
      >
        {step.titleLine1Prefix && `${step.titleLine1Prefix} `}
        {step.titleLine1}
        <span className="block text-pink-strong">
          {step.titleLine2}
          {step.titleAccent && <span className="text-success"> {step.titleAccent}</span>}
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-[14px] font-semibold text-text-secondary"
      >
        {step.subheadline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="w-full"
      >
        <ImagePlaceholder slot={step.image} priority />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="flex flex-col items-center gap-1"
      >
        <p className="flex items-center justify-center gap-2 text-[14px] font-bold text-text">
          <LiveIndicator />
          {step.hint}
        </p>
        {step.hintCaption && (
          <p className="text-[12.5px] font-semibold text-text-secondary">{step.hintCaption}</p>
        )}
      </motion.div>

      <div className="grid w-full grid-cols-2 gap-3">
        {step.options.map((opt, i) => (
          <motion.button
            key={opt.id}
            type="button"
            onClick={() => {
              if (advancedRef.current) return;
              advancedRef.current = true;
              onSelect(opt.id);
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.3 + i * 0.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-4 text-left shadow-xs transition-colors hover:border-pink hover:bg-pink-mist"
          >
            <span className="text-[15px] font-bold text-text">{opt.label}</span>
            <ChevronRight size={16} className="text-pink-strong" />
          </motion.button>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-auto pt-8 text-[11.5px] leading-relaxed text-text-tertiary"
      >
        Ao continuar, você concorda com:{" "}
        <a href="#" className="underline underline-offset-2">
          Termos de Uso
        </a>
        |
        <a href="#" className="underline underline-offset-2">
          Política de Privacidade
        </a>
        <br />© 2026 {BRAND_NAME} — Todos os direitos reservados.
      </motion.p>
    </div>
  );
}
