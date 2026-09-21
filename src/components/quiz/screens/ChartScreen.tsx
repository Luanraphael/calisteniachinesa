"use client";

import { motion } from "framer-motion";
import { WeightProjectionChart } from "@/components/charts/WeightProjectionChart";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import type { Answers, ChartStep } from "@/lib/quizTypes";

export function ChartScreen({
  step,
  answers,
  onContinue,
}: {
  step: ChartStep;
  answers: Answers;
  onContinue: () => void;
}) {
  const current = Number(answers.currentWeightKg ?? 68);
  const target = Number(answers.targetWeightKg ?? 60);
  const goingUp = target > current;

  return (
    <div className="flex flex-1 flex-col gap-5 py-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="text-center text-[14px] font-semibold text-text-secondary"
      >
        {step.headline}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
        className="text-center text-[28px] font-extrabold leading-[1.1] tracking-tight text-text"
      >
        Prevemos que você {goingUp ? "alcance" : "chegue a"}{" "}
        <span className="text-success">{target}kg</span> em até{" "}
        <span className="text-pink-strong">8 semanas</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15 }}
        className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
      >
        <WeightProjectionChart currentWeight={current} targetWeight={target} />
      </motion.div>

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={onContinue} />
      </ScreenFooter>
    </div>
  );
}
