"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { DonutProgress } from "@/components/charts/DonutProgress";
import type { Answers, LoadingStep } from "@/lib/quizTypes";
import { trackQuizEvent } from "@/lib/analytics";

function resolve<T>(value: T | ((a: Answers) => T), answers: Answers): T {
  return typeof value === "function" ? (value as (a: Answers) => T)(answers) : value;
}

export function LoadingScreen({
  step,
  answers,
  onDone,
}: {
  step: LoadingStep;
  answers: Answers;
  onDone: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const isDonut = step.variant === "donut";

  // Only the donut variant is driven by this simple progress/done timer pair — the
  // "sequential" variant (SequentialLoading below) owns its own timing entirely, so this
  // must not also schedule an onDone() for it (that would race the real completion and
  // fire early, cutting the bar/testimonial sequence short).
  useEffect(() => {
    if (!isDonut) return;
    trackQuizEvent("quiz_analysis_started", { step_id: step.id });

    const stepMs = step.durationMs / 100;
    const progressTimer = window.setInterval(() => {
      setProgress((p) => Math.min(p + 1, 100));
    }, stepMs);

    const doneTimer = window.setTimeout(() => {
      trackQuizEvent("quiz_analysis_completed", { step_id: step.id });
      onDone();
    }, step.durationMs + 250);

    return () => {
      window.clearInterval(progressTimer);
      window.clearTimeout(doneTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const headline = resolve(step.headline, answers);

  if (step.variant === "donut") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[21px] font-extrabold leading-[1.25] tracking-tight text-text"
        >
          {headline}
        </motion.h1>
        {step.subLabel && <p className="text-[13px] font-semibold text-text-secondary">{step.subLabel}</p>}
        <DonutProgress pct={progress} />
      </div>
    );
  }

  return <SequentialLoading step={step} headline={headline} onDone={onDone} />;
}

function SequentialLoading({
  step,
  headline,
  onDone,
}: {
  step: LoadingStep;
  headline: string;
  onDone: () => void;
}) {
  const tasks = step.tasks ?? ["Analisando suas respostas"];
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    if (!step.testimonials || step.testimonials.length < 2) return;
    const halfway = window.setTimeout(() => setTestimonialIndex(1), step.durationMs / 2);
    return () => window.clearTimeout(halfway);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    trackQuizEvent("quiz_analysis_started", { step_id: step.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-runs once per activeIndex change, so the bar's ref is guaranteed to already be
  // committed to the DOM (unlike calling the next bar's animation synchronously from
  // inside the previous bar's rAF callback, which raced ahead of React's re-render and
  // silently no-op'd on a still-null ref, stalling the sequence).
  useEffect(() => {
    const n = tasks.length;
    const perBarMs = step.durationMs / n;
    const bar = barRefs.current[activeIndex];
    if (!bar) return;

    let rafId = 0;
    let cancelled = false;
    const startTime = performance.now();

    function frame(now: number) {
      if (cancelled) return;
      const elapsed = now - startTime;
      const pct = Math.min(elapsed / perBarMs, 1);
      bar!.style.transform = `scaleX(${pct})`;

      if (pct < 1) {
        rafId = requestAnimationFrame(frame);
      } else if (activeIndex < n - 1) {
        setActiveIndex((i) => i + 1);
      } else {
        trackQuizEvent("quiz_analysis_completed", { step_id: step.id });
        window.setTimeout(onDone, step.showSocialProof ? 2600 : 700);
      }
    }
    rafId = requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div className="flex flex-1 flex-col justify-center gap-6 py-8">
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="whitespace-pre-line text-center text-[21px] font-extrabold leading-[1.22] tracking-tight text-text"
      >
        {headline}
      </motion.h1>

      <div className="flex flex-col gap-3.5">
        {tasks.slice(0, activeIndex + 1).map((task, i) => (
          <motion.div
            key={task}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[12.5px] font-bold">
              <span className={i <= activeIndex ? "text-text-secondary" : "text-ink-faint"}>{task}</span>
              {i < activeIndex && <span className="text-success-strong">✓</span>}
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-pink-light">
              <div className="absolute inset-0 rounded-full bg-white/40" />
              <div
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="relative h-full w-full origin-left rounded-full"
                style={{
                  transform: "scaleX(0)",
                  background: "linear-gradient(90deg, var(--color-pink-soft), var(--color-pink-strong))",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.35)",
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {step.showSocialProof && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="text-[17px] font-extrabold leading-snug text-text">
            O corpo muda por completo..
            <br />
            <span className="text-success-strong">Emagrecer é só o começo!</span>
          </p>
          <div className="flex justify-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={17} className="fill-pink-strong text-pink-strong" />
            ))}
          </div>
          <p className="text-[12.5px] font-medium text-text-secondary">
            Nota <span className="font-bold text-pink-strong">4,93/5,0</span> baseado em 34.394 avaliações
          </p>
        </motion.div>
      )}

      {step.testimonials && step.testimonials.length > 0 && (
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#faf6f8] shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonialIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Image
                src={step.testimonials[testimonialIndex].src}
                alt={step.testimonials[testimonialIndex].alt}
                width={640}
                height={480}
                className="h-auto w-full object-contain"
                sizes="(max-width: 520px) 100vw, 480px"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
