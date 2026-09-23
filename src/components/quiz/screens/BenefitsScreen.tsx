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
        {step.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 + i * 0.07 }}
            className="flex items-start gap-2.5 rounded-2xl px-4 py-3.5"
            style={{ background: item.bg }}
          >
            <span className="mt-[6px] h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} aria-hidden />
            <p className="text-[14px] leading-snug text-text">
              <span className="font-extrabold">{item.title}</span> {item.text}
            </p>
          </motion.div>
        ))}
      </div>

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={onContinue} />
      </ScreenFooter>
    </div>
  );
}
