"use client";

import { ChevronLeft } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { BRAND_NAME } from "@/lib/quizData";

export function QuizHeader({
  progressPct,
  showProgress,
  showBack,
  onBack,
}: {
  progressPct: number;
  showProgress: boolean;
  showBack: boolean;
  onBack: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 bg-bg/90 backdrop-blur-sm px-5 pt-[max(env(safe-area-inset-top),1rem)] pb-3">
      <div className="mx-auto flex w-full max-w-[520px] items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar para a pergunta anterior"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-text-secondary transition-opacity ${
            showBack ? "opacity-100 hover:bg-pink-mist" : "pointer-events-none opacity-0"
          }`}
        >
          <ChevronLeft size={20} strokeWidth={2.25} />
        </button>
        <span className="flex-1 text-center text-[13px] font-bold tracking-[0.14em] text-text-secondary">
          {BRAND_NAME.toUpperCase()}
        </span>
        <span className="h-8 w-8 shrink-0" aria-hidden />
      </div>
      {showProgress && (
        <div className="mx-auto mt-3 w-full max-w-[520px]">
          <ProgressBar pct={progressPct} />
        </div>
      )}
    </header>
  );
}
