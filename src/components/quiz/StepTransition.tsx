"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { ReactNode } from "react";

const variants = {
  enter: (dir: 1 | -1) => ({ opacity: 0, x: dir * 16, scale: 0.99 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: 1 | -1) => ({ opacity: 0, x: dir * -16, scale: 0.99 }),
};

export function StepTransition({
  stepKey,
  direction,
  children,
}: {
  stepKey: string;
  direction: 1 | -1;
  children: ReactNode;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [stepKey]);

  return (
    <AnimatePresence mode="wait" custom={direction} initial={false}>
      <motion.div
        key={stepKey}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="flex w-full flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
