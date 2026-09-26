"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ChoiceCard } from "../ChoiceCard";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { InteractiveFigure } from "../InteractiveFigure";
import { Headline } from "../Headline";
import type { Answers, ChoiceStep } from "@/lib/quizTypes";

function resolve<T>(value: T | ((a: Answers) => T), answers: Answers): T {
  return typeof value === "function" ? (value as (a: Answers) => T)(answers) : value;
}

export function ChoiceScreen({
  step,
  answers,
  currentAnswer,
  onAnswer,
  onContinue,
}: {
  step: ChoiceStep;
  answers: Answers;
  currentAnswer: string | string[] | undefined;
  onAnswer: (value: string | string[], answerId?: string) => void;
  onContinue: () => void;
}) {
  const multi = Boolean(step.multi);
  const [pending, setPending] = useState<string | null>(null);
  const selectedList = Array.isArray(currentAnswer) ? currentAnswer : currentAnswer ? [currentAnswer] : [];
  const advancedRef = useRef(false);

  function toggle(optionId: string) {
    if (multi) {
      const opt = step.options.find((o) => o.id === optionId);
      let next: string[];
      if (opt?.exclusive) {
        next = selectedList.includes(optionId) ? [] : [optionId];
      } else {
        const withoutExclusive = selectedList.filter((id) => !step.options.find((o) => o.id === id)?.exclusive);
        next = withoutExclusive.includes(optionId)
          ? withoutExclusive.filter((v) => v !== optionId)
          : [...withoutExclusive, optionId];
      }
      onAnswer(next, optionId);
      return;
    }
    if (advancedRef.current) return;
    advancedRef.current = true;
    onAnswer(optionId, optionId);
    setPending(optionId);
    window.setTimeout(() => {
      onContinue();
    }, 320);
  }

  const headline = resolve(step.headline, answers);
  const subheadline = step.subheadline ? resolve(step.subheadline, answers) : undefined;
  const showCta = multi || Boolean(step.ctaLabel && step.ctaLabel !== "");
  const gridCols = step.options.length > 3 ? "grid-cols-2" : "grid-cols-3";

  const optionsBlock = (
    <>
      {step.plainImageList ? (
        <div className="flex flex-col gap-3">
          {step.options.map((opt, i) => {
            const isSel = selectedList.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                type="button"
                role={multi ? "checkbox" : "radio"}
                aria-checked={isSel}
                onClick={() => toggle(opt.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileTap={{ scale: 0.985 }}
                className="flex w-full items-center gap-3.5 rounded-2xl border bg-surface px-3 py-3 text-left shadow-xs transition-colors"
                style={{
                  borderColor: isSel ? "var(--color-pink)" : "var(--color-border)",
                  background: isSel ? "var(--color-pink-mist)" : "var(--color-surface)",
                  boxShadow: isSel ? "0 4px 16px rgba(236,63,134,0.14)" : undefined,
                }}
              >
                {opt.image?.src && (
                  <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                    <Image src={opt.image.src} alt={opt.image.alt} fill style={{ objectFit: "cover" }} sizes="64px" />
                  </span>
                )}
                <span className={`flex-1 min-w-0 text-[14.5px] font-semibold leading-snug ${isSel ? "text-pink-strong" : "text-text"}`}>
                  {opt.label}
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    isSel ? "border-pink bg-pink" : "border-border-strong bg-transparent"
                  }`}
                >
                  {isSel && <Check size={14} strokeWidth={3} className="text-white" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      ) : step.imageList ? (
        <div className="flex flex-col gap-2.5">
          {step.options.map((opt, i) => {
            const isSel = selectedList.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                type="button"
                role={multi ? "checkbox" : "radio"}
                aria-checked={isSel}
                onClick={() => toggle(opt.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileTap={{ scale: 0.985 }}
                className="flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors"
                style={{
                  borderColor: isSel ? "var(--color-pink)" : "var(--color-pink-wash-border)",
                  background: isSel ? "var(--color-pink-mist)" : "var(--color-pink-wash)",
                  boxShadow: isSel ? "0 4px 16px rgba(236,63,134,0.14)" : undefined,
                }}
              >
                {opt.image?.src && (
                  <span className="relative block h-[72px] w-[54px] shrink-0 overflow-hidden">
                    <Image
                      src={opt.image.src}
                      alt={opt.image.alt}
                      fill
                      style={{ objectFit: "contain", objectPosition: "center top" }}
                      sizes="60px"
                    />
                  </span>
                )}
                <span className={`flex-1 min-w-0 text-[14.5px] font-semibold leading-snug ${isSel ? "text-pink-strong" : "text-text"}`}>
                  {opt.label}
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    isSel ? "border-pink bg-pink" : "border-border-strong bg-transparent"
                  }`}
                >
                  {isSel && <Check size={14} strokeWidth={3} className="text-white" />}
                </span>
              </motion.button>
            );
          })}
        </div>
      ) : step.imageGrid ? (
        <div className={`grid ${gridCols} gap-2.5`}>
          {step.options.map((opt, i) => {
            const isSel = selectedList.includes(opt.id);
            return (
              <motion.button
                key={opt.id}
                type="button"
                onClick={() => toggle(opt.id)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileTap={{ scale: 0.985 }}
                className="overflow-hidden rounded-2xl border-2 text-left transition-colors"
                style={{ borderColor: isSel ? "var(--color-pink)" : "var(--color-pink-wash-border)" }}
              >
                {opt.image && (
                  <ImagePlaceholder
                    slot={{ key: opt.image.key, alt: opt.image.alt, src: opt.image.src, variant: "side" }}
                    className="rounded-none border-0"
                  />
                )}
                <div
                  className="flex items-center justify-between gap-1 px-2.5 py-2.5"
                  style={{ background: isSel ? "var(--color-pink-mist)" : "var(--color-pink-wash)" }}
                >
                  <span className={`text-[12.5px] font-bold leading-tight ${isSel ? "text-pink-strong" : "text-text"}`}>{opt.label}</span>
                  {isSel && <Check size={13} className="shrink-0 text-pink-strong" strokeWidth={3} />}
                </div>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {step.options.map((opt, i) => (
            <ChoiceCard
              key={opt.id}
              option={opt}
              index={i}
              multi={multi}
              selected={multi ? selectedList.includes(opt.id) : pending === opt.id || currentAnswer === opt.id}
              onSelect={() => toggle(opt.id)}
            />
          ))}
        </div>
      )}
    </>
  );

  const imageBlock = step.image && (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
      <ImagePlaceholder slot={step.image} className="max-h-64" priority={step.imageAboveHeadline} />
    </motion.div>
  );
  const headlineBlock = (
    <div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
        <Headline size="sm">{headline}</Headline>
      </motion.div>
      {subheadline && (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.06 }}
          className="mt-1.5 text-[14px] font-medium text-text-secondary"
        >
          {subheadline}
        </motion.p>
      )}
    </div>
  );

  return (
    <div className="flex flex-1 flex-col gap-5 py-6">
      {step.imageAboveHeadline ? (
        <>
          {imageBlock}
          {headlineBlock}
        </>
      ) : (
        <>
          {headlineBlock}
          {imageBlock}
        </>
      )}

      {step.sideImage ? (
        (() => {
          const figureWidth = step.sideImage.figureWidthPct ?? 34;
          const isRight = step.sideImage.position === "right";
          const columns = isRight ? `1fr ${figureWidth}%` : `${figureWidth}% 1fr`;
          const figureCol = (
            <motion.div
              key="figure"
              initial={{ opacity: 0, x: isRight ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              <InteractiveFigure slot={step.sideImage} />
            </motion.div>
          );
          const optionsCol = (
            <div key="options" className="min-w-0">
              {optionsBlock}
            </div>
          );
          return (
            <div className="grid items-start gap-2.5" style={{ gridTemplateColumns: columns }}>
              {isRight ? [optionsCol, figureCol] : [figureCol, optionsCol]}
            </div>
          );
        })()
      ) : (
        optionsBlock
      )}

      {showCta && (
        <ScreenFooter>
          <CTAButton
            label={step.ctaLabel ?? "Continuar"}
            onClick={onContinue}
            disabled={selectedList.length === 0}
          />
        </ScreenFooter>
      )}
    </div>
  );
}
