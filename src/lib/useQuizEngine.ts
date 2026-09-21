"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { quizSteps } from "./quizData";
import type { Answers } from "./quizTypes";
import { trackQuizEvent } from "./analytics";
import { captureAndPersistTrackingParams } from "./utm";

const STORAGE_KEY = "quiz_calistenia_state_v1";

interface PersistedState {
  stepIndex: number;
  answers: Answers;
}

function loadPersisted(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (typeof parsed.stepIndex !== "number" || parsed.stepIndex >= quizSteps.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

export type Direction = 1 | -1;

export function useQuizEngine() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState<Direction>(1);
  const [hydrated, setHydrated] = useState(false);
  const startedRef = useRef(false);

  /* eslint-disable react-hooks/set-state-in-effect -- one-time mount hydration from localStorage, guarded by `hydrated` */
  useEffect(() => {
    captureAndPersistTrackingParams();
    const persisted = loadPersisted();
    if (persisted) {
      setStepIndex(persisted.stepIndex);
      setAnswers(persisted.answers);
    }
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ stepIndex, answers }));
  }, [stepIndex, answers, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const step = quizSteps[stepIndex];
    if (!step) return;
    if (!startedRef.current) {
      startedRef.current = true;
      trackQuizEvent("quiz_started", { step_id: step.id, step_number: stepIndex });
    }
    trackQuizEvent("quiz_step_viewed", { step_id: step.id, step_number: stepIndex });
  }, [stepIndex, hydrated]);

  const goNext = useCallback(() => {
    setDirection(1);
    setStepIndex((i) => {
      const step = quizSteps[i];
      if (step) trackQuizEvent("quiz_step_completed", { step_id: step.id, step_number: i });
      const next = Math.min(i + 1, quizSteps.length - 1);
      if (next === quizSteps.length - 1) {
        trackQuizEvent("quiz_completed", { step_id: quizSteps[next].id, step_number: next });
      }
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStepIndex((i) => {
      const step = quizSteps[i];
      if (step) trackQuizEvent("quiz_back_clicked", { step_id: step.id, step_number: i });
      // Loading steps auto-advance on a timer (donut) or their own completion logic
      // (sequential) — landing back on one re-triggers that timer and bounces the lead
      // straight forward again, trapping her on the step she was trying to leave. Skip
      // over any run of loading steps so "back" always lands on a real question/screen.
      let prev = i - 1;
      while (prev > 0 && quizSteps[prev]?.type === "loading") {
        prev -= 1;
      }
      return Math.max(prev, 0);
    });
  }, []);

  const setAnswer = useCallback((key: string, value: Answers[string], answerId?: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    trackQuizEvent("quiz_answer_selected", { answer_id: answerId });
  }, []);

  const restart = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setAnswers({});
    setDirection(-1);
    setStepIndex(0);
    startedRef.current = false;
  }, []);

  const progressPct = Math.round((stepIndex / (quizSteps.length - 1)) * 100);

  return {
    hydrated,
    stepIndex,
    step: quizSteps[stepIndex],
    totalSteps: quizSteps.length,
    answers,
    direction,
    progressPct,
    goNext,
    goBack,
    setAnswer,
    restart,
  };
}
