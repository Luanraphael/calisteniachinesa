"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { parseRich } from "../Headline";
import type { Answers, RoadmapStep } from "@/lib/quizTypes";

export function RoadmapScreen({
  step,
  answers,
  onContinue,
}: {
  step: RoadmapStep;
  answers: Answers;
  onContinue: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-5 py-6">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38 }}
          className="text-[21px] font-extrabold leading-[1.24] tracking-tight text-text"
        >
          {parseRich(step.headline(answers))}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, delay: 0.06 }}
          className="mt-1.5 text-[13.5px] leading-relaxed text-text-secondary"
        >
          {step.body}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {step.phases.map((phase, i) => (
          <motion.div
            key={phase.range}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 + i * 0.08 }}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <ImagePlaceholder slot={phase.image} className="rounded-none border-0" />
            <div className="p-3">
              <p className="text-[10.5px] font-extrabold uppercase tracking-wide" style={{ color: phase.color }}>
                {phase.range}
              </p>
              <p className="mt-1 text-[12px] leading-snug text-text">{phase.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={onContinue} />
      </ScreenFooter>
    </div>
  );
}
