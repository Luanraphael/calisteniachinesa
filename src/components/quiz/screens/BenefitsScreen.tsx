"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { Headline } from "../Headline";
import type { BenefitsStep } from "@/lib/quizTypes";

export function BenefitsScreen({ step, onContinue }: { step: BenefitsStep; onContinue: () => void }) {
  return (
    <div className="flex flex-1 flex-col gap-4 py-6">
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <ImagePlaceholder slot={step.image} />
      </motion.div>

      <div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, delay: 0.08 }}>
          <Headline size="sm">{step.headline}</Headline>
        </motion.div>
        {step.subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.12 }}
            className="mt-1.5 text-[14px] font-semibold text-text-secondary"
          >
            {step.subheadline}
          </motion.p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {step.items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.16 + i * 0.07 }}
              className="flex items-start gap-3.5 rounded-2xl border border-border bg-surface p-4 shadow-sm"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: item.bg, color: item.color }}
              >
                <Icon size={21} strokeWidth={2.1} />
              </span>
              <div>
                <p className="text-[14.5px] font-extrabold uppercase tracking-tight text-text">{item.title}</p>
                <p className="mt-0.5 text-[13.5px] leading-snug text-text-secondary">{item.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={onContinue} />
      </ScreenFooter>
    </div>
  );
}
