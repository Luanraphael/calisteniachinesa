"use client";

import { useQuizEngine } from "@/lib/useQuizEngine";
import { QuizShell } from "./QuizShell";
import { QuizHeader } from "./QuizHeader";
import { StepTransition } from "./StepTransition";
import { LandingScreen } from "./screens/LandingScreen";
import { InfoScreen } from "./screens/InfoScreen";
import { ChoiceScreen } from "./screens/ChoiceScreen";
import { BenefitsScreen } from "./screens/BenefitsScreen";
import { RoadmapScreen } from "./screens/RoadmapScreen";
import { SliderScreen } from "./screens/SliderScreen";
import { LoadingScreen } from "./screens/LoadingScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ChartScreen } from "./screens/ChartScreen";
import { ResultOfferScreen } from "./screens/ResultOfferScreen";
import type { Answers } from "@/lib/quizTypes";

export function QuizApp() {
  const { hydrated, step, stepIndex, answers, direction, progressPct, goNext, goBack, setAnswer } = useQuizEngine();

  if (!hydrated || !step) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-pink-light border-t-pink-strong" />
      </div>
    );
  }

  const showProgress = step.showProgress ?? true;
  const showBack = (step.showBack ?? stepIndex > 0) && step.type !== "result" && step.type !== "loading";

  return (
    <QuizShell
      header={<QuizHeader progressPct={progressPct} showProgress={showProgress} showBack={showBack} onBack={goBack} />}
    >
      <StepTransition stepKey={step.id} direction={direction}>
        {renderStep()}
      </StepTransition>
    </QuizShell>
  );

  function renderStep() {
    switch (step.type) {
      case "landing":
        return (
          <LandingScreen
            step={step}
            answers={answers}
            onSelect={(id) => {
              setAnswer(step.answerKey, id, id);
              goNext();
            }}
          />
        );
      case "welcome":
        return <InfoScreen step={step} answers={answers} onContinue={goNext} />;
      case "info":
        return <InfoScreen step={step} answers={answers} onContinue={goNext} />;
      case "choice":
        return (
          <ChoiceScreen
            step={step}
            answers={answers}
            currentAnswer={answers[step.answerKey] as string | string[] | undefined}
            onAnswer={(value, id) => setAnswer(step.answerKey, value, id)}
            onContinue={goNext}
          />
        );
      case "benefits":
        return <BenefitsScreen step={step} onContinue={goNext} />;
      case "roadmap":
        return <RoadmapScreen step={step} answers={answers} onContinue={goNext} />;
      case "slider":
        return (
          <SliderScreen
            step={step}
            currentValue={answers[step.answerKey] as number | undefined}
            onChange={(value) => setAnswer(step.answerKey, value)}
            onContinue={goNext}
          />
        );
      case "loading":
        return <LoadingScreen step={step} answers={answers} onDone={goNext} />;
      case "profile":
        return <ProfileScreen step={step} answers={answers} onContinue={goNext} />;
      case "chart":
        return <ChartScreen step={step} answers={answers} onContinue={goNext} />;
      case "result":
        return <ResultOfferScreen answers={answers as Answers} />;
      default:
        return null;
    }
  }
}
