"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { BarChart3, Zap, TrendingUp, TriangleAlert } from "lucide-react";
import { BmiGauge } from "@/components/charts/BmiGauge";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import { Headline } from "../Headline";
import { computeBmi } from "@/lib/bmi";
import type { Answers, ProfileStep } from "@/lib/quizTypes";

function resolve<T>(value: T | ((a: Answers) => T), answers: Answers): T {
  return typeof value === "function" ? (value as (a: Answers) => T)(answers) : value;
}

export function ProfileScreen({
  step,
  answers,
  onContinue,
}: {
  step: ProfileStep;
  answers: Answers;
  onContinue: () => void;
}) {
  const height = Number(answers.heightCm ?? 162);
  const weight = Number(answers.currentWeightKg ?? 68);
  const bmi = computeBmi(height, weight);
  const headline = resolve(step.headline, answers);

  const energy = "Instável";
  const bmiFormatted = bmi.toFixed(2);

  return (
    <div className="flex flex-1 flex-col gap-5 py-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
        <Headline size="sm">{headline}</Headline>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 }}>
        <p className="mb-3 text-[13px] font-bold text-text-secondary">Índice de Massa Corporal</p>
        <BmiGauge bmi={bmi} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.16 }}
        className="flex items-start gap-2.5 rounded-2xl border border-warning-light bg-warning-light px-4 py-3.5"
      >
        <TriangleAlert size={17} className="mt-0.5 shrink-0 text-warning" />
        <div className="text-[13.5px] leading-relaxed text-[#6b4c15]">
          <p className="font-bold">
            Seu IMC {bmiFormatted} <span className="font-extrabold text-danger underline decoration-2 underline-offset-2">Apresenta Riscos severos!</span>
          </p>
          <p className="mt-1">Pressão alta, problemas cardíacos, diabetes tipo 2 e queda hormonal</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.24 }}
        className="grid grid-cols-[1fr_auto] gap-4"
      >
        <div className="flex flex-col justify-center gap-4 rounded-2xl border border-border bg-surface p-4">
          <div>
            <p className="flex items-center gap-1.5 text-[11.5px] font-bold text-text-secondary">
              <BarChart3 size={13} className="text-pink-strong" /> Tipo de corpo
            </p>
            <p className="text-[14.5px] font-extrabold text-text">Endomorfo</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[11.5px] font-bold text-text-secondary">
              <Zap size={13} className="text-pink-strong" /> Nível de energia
            </p>
            <p className="text-[14.5px] font-extrabold text-text">{energy}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-[11.5px] font-bold text-text-secondary">
              <TrendingUp size={13} className="text-pink-strong" /> Potencial de transformação
            </p>
            <p className="text-[14.5px] font-extrabold text-text">Alto</p>
          </div>
        </div>
        <div className="relative w-28 overflow-hidden rounded-2xl bg-[#faf6f8]">
          {step.expertImage?.src ? (
            <Image
              src={step.expertImage.src}
              alt={step.expertImage.alt}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              sizes="120px"
            />
          ) : (
            <div className="flex h-full min-h-40 flex-col items-center justify-center gap-2 border border-dashed border-border-strong p-2 text-center">
              <ImageIcon size={20} className="text-ink-faint opacity-60" strokeWidth={1.5} />
              <span className="text-[10.5px] font-semibold leading-snug text-text-tertiary">
                {step.expertImage?.alt ?? "Mentora do programa"}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={onContinue} />
      </ScreenFooter>
    </div>
  );
}
