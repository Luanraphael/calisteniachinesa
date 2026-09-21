"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const WIDTH = 340;
const HEIGHT = 190;
const PAD_X = 18;
const PAD_TOP = 46;
const PAD_BOTTOM = 30;

export function WeightProjectionChart({
  currentWeight,
  targetWeight,
}: {
  currentWeight: number;
  targetWeight: number;
}) {
  const points = useMemo(() => {
    const weeks = [0, 1, 4, 6, 8];
    const chartH = HEIGHT - PAD_TOP - PAD_BOTTOM;
    const chartW = WIDTH - PAD_X * 2;

    const spread = Math.max(Math.abs(currentWeight - targetWeight), 1) * 1.4;
    const minW = Math.min(currentWeight, targetWeight) - spread * 0.15;
    const maxW = Math.max(currentWeight, targetWeight) + spread * 0.15;
    const range = Math.max(maxW - minW, 1);

    return weeks.map((week, i) => {
      const t = i / (weeks.length - 1);
      // ease-out curve: fast initial change, settles near the end
      const eased = 1 - Math.pow(1 - t, 2.1);
      const weight = currentWeight + (targetWeight - currentWeight) * eased;
      const x = PAD_X + chartW * t;
      const y = PAD_TOP + chartH * (1 - (weight - minW) / range);
      return { week, weight, x, y };
    });
  }, [currentWeight, targetWeight]);

  const linePath = useMemo(() => {
    return points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");
  }, [points]);

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${HEIGHT - PAD_BOTTOM} L ${points[0].x} ${
    HEIGHT - PAD_BOTTOM
  } Z`;

  const first = points[0];
  const last = points[points.length - 1];
  const weekLabels = ["Sem 01", "Sem 04", "Sem 06", "Sem 08"];

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Projeção ilustrativa de evolução de peso ao longo de 8 semanas">
        <defs>
          <linearGradient id="proj-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-danger)" />
            <stop offset="100%" stopColor="var(--color-success)" />
          </linearGradient>
          <linearGradient id="proj-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-danger)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD_X}
            x2={WIDTH - PAD_X}
            y1={PAD_TOP + (HEIGHT - PAD_TOP - PAD_BOTTOM) * f}
            y2={PAD_TOP + (HEIGHT - PAD_TOP - PAD_BOTTOM) * f}
            stroke="var(--color-border)"
            strokeDasharray="3 5"
          />
        ))}

        <motion.path
          d={areaPath}
          fill="url(#proj-area)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />

        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#proj-line)"
          strokeWidth={3.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.circle
          cx={first.x}
          cy={first.y}
          r={6}
          fill="var(--color-danger)"
          stroke="white"
          strokeWidth={2}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        />
        <motion.circle
          cx={last.x}
          cy={last.y}
          r={6}
          fill="var(--color-success)"
          stroke="white"
          strokeWidth={2}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.35 }}
        />

        {(() => {
          const labelW = 68;
          const x = Math.min(Math.max(first.x - labelW / 2, 4), WIDTH - labelW - 4);
          return (
            <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.35 }}>
              <rect x={x} y={first.y - 34} width={labelW} height={22} rx={11} fill="var(--color-danger)" />
              <text x={x + labelW / 2} y={first.y - 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">
                Agora {currentWeight}kg
              </text>
            </motion.g>
          );
        })()}

        {(() => {
          const labelW = 84;
          const x = Math.min(Math.max(last.x - labelW / 2, 4), WIDTH - labelW - 4);
          return (
            <motion.g initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, duration: 0.35 }}>
              <rect x={x} y={last.y - 34} width={labelW} height={22} rx={11} fill="var(--color-success)" />
              <text x={x + labelW / 2} y={last.y - 19} textAnchor="middle" fontSize="11" fontWeight="700" fill="white">
                8 sem. {targetWeight}kg
              </text>
            </motion.g>
          );
        })()}
      </svg>

      <div className="mt-1 flex justify-between px-[2px] text-[11px] font-medium text-text-secondary">
        {weekLabels.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
    </div>
  );
}
