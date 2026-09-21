"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import { Headline, RichText } from "../Headline";
import type { SliderStep } from "@/lib/quizTypes";

const TICK_GAP = 15;

function altUnit(unit: string): "pol" | "lb" | null {
  if (unit === "cm") return "pol";
  if (unit === "kg") return "lb";
  return null;
}
// Canonical value is always stored/dragged in the base unit (cm or kg).
// The alt unit is display-only — converted on the fly, never persisted,
// so toggling back and forth never drifts the underlying number.
function toDisplay(canonical: number, unit: string, showAlt: boolean): number {
  if (!showAlt) return canonical;
  if (unit === "cm") return Math.round(canonical / 2.54);
  if (unit === "kg") return Math.round(canonical * 2.20462);
  return canonical;
}

export function SliderScreen({
  step,
  currentValue,
  onChange,
  onContinue,
}: {
  step: SliderStep;
  currentValue: number | undefined;
  onChange: (value: number) => void;
  onContinue: () => void;
}) {
  const initial = currentValue ?? step.default;
  const [value, setValue] = useState(initial);
  const [showAlt, setShowAlt] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startValue: number; pointerId: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingClientX = useRef<number | null>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    onChange(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ticks = useMemo(() => {
    const arr: { v: number; major: boolean }[] = [];
    for (let v = step.min; v <= step.max; v++) arr.push({ v, major: v % 10 === 0 });
    return arr;
  }, [step.min, step.max]);

  function commit(v: number) {
    setValue(v);
    onChange(v);
  }

  function applyPointer(clientX: number) {
    const drag = dragRef.current;
    if (!drag || !trackRef.current) return;
    const deltaX = clientX - drag.startX;
    const deltaValue = Math.round(deltaX / TICK_GAP);
    const next = Math.min(step.max, Math.max(step.min, drag.startValue - deltaValue));
    if (next !== valueRef.current) setValue(next);
  }

  function scheduleFrame() {
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (pendingClientX.current != null) applyPointer(pendingClientX.current);
    });
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startValue: value, pointerId: e.pointerId };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!dragRef.current) return;
    pendingClientX.current = e.clientX;
    scheduleFrame();
  }
  function endDrag() {
    if (!dragRef.current) return;
    dragRef.current = null;
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    onChange(valueRef.current);
  }

  const alt = altUnit(step.unit);
  const displayValue = toDisplay(value, step.unit, showAlt);
  const displayUnit = showAlt && alt ? alt : step.unit;
  // Each tick's mark is centered within its own TICK_GAP-wide column, so the strip must be
  // shifted an extra half-column to bring the ACTIVE tick's mark (not the column's left edge)
  // under the fixed center indicator. This holds for every value, not just one hardcoded case.
  const offsetPx = -(value - step.min) * TICK_GAP - TICK_GAP / 2;

  return (
    <div className="flex flex-1 flex-col gap-6 py-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38 }}>
        <Headline>{step.headline}</Headline>
      </motion.div>

      {alt && (
        <div className="mx-auto flex rounded-full bg-pink-wash p-1" style={{ border: "1px solid var(--color-pink-wash-border)" }}>
          {[false, true].map((isAlt) => (
            <button
              key={String(isAlt)}
              type="button"
              onClick={() => setShowAlt(isAlt)}
              className={`rounded-full px-5 py-1.5 text-[13px] font-bold transition-colors ${
                showAlt === isAlt ? "bg-pink-strong text-white shadow-sm" : "text-text-secondary"
              }`}
            >
              {isAlt ? alt : step.unit}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col items-center gap-1 py-2">
        <div className="text-[52px] font-extrabold leading-none tracking-tight text-text tabular-nums">
          {displayValue}
          <span className="text-[22px] font-bold text-text-secondary">{displayUnit}</span>
        </div>
      </div>

      <div className="select-none">
        <div
          ref={trackRef}
          className="relative h-16 touch-none overflow-hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="slider"
          aria-valuemin={step.min}
          aria-valuemax={step.max}
          aria-valuenow={value}
          aria-label={step.headline}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") commit(Math.min(step.max, value + 1));
            if (e.key === "ArrowLeft") commit(Math.max(step.min, value - 1));
          }}
        >
          <div
            className="absolute top-0 flex h-11 items-end"
            style={{ left: "50%", transform: `translate3d(${offsetPx}px,0,0)`, willChange: "transform" }}
          >
            {ticks.map((t) => (
              <div key={t.v} className="flex flex-col items-center" style={{ width: TICK_GAP }}>
                <div
                  className="rounded-full"
                  style={{
                    width: 2,
                    height: t.major ? 26 : 14,
                    background: t.v === value ? "var(--color-pink-strong)" : t.major ? "var(--color-text-tertiary)" : "var(--color-border-strong)",
                  }}
                />
                {t.major && <span className="mt-1 text-[10px] font-semibold text-text-tertiary">{t.v}</span>}
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute left-1/2 top-0 h-11 w-0.5 -translate-x-1/2 bg-pink-strong" />
          <div className="pointer-events-none absolute left-1/2 top-9 h-0 w-0 -translate-x-1/2 border-x-[6px] border-t-[8px] border-x-transparent border-t-pink-strong" />
        </div>
        <div className="h-px w-full bg-border" />
        <p className="mt-2 text-center text-[12px] font-medium text-text-tertiary">Arraste para ajustar</p>
      </div>

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={onContinue} />
        {step.helper && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-border bg-surface px-4 py-3.5">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-pink-strong" />
            <RichText className="text-[13px] leading-relaxed text-text-secondary">{step.helper}</RichText>
          </div>
        )}
      </ScreenFooter>
    </div>
  );
}
