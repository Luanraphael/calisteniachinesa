"use client";

import { motion } from "framer-motion";

const W = 320;
const H = 170;

function curve(amp: number, k: number) {
  const pts: string[] = [];
  for (let x = 0; x <= 100; x += 5) {
    const t = x / 100;
    const y = amp * (1 - Math.exp(-k * t));
    pts.push(`${18 + t * (W - 36)},${H - 24 - y}`);
  }
  return "M " + pts.join(" L ");
}

export function RiskCurveChart() {
  const risk = curve(118, 3.2);
  const ideal = curve(78, 2.4);
  const below = curve(40, 1.6);

  return (
    <div className="w-full rounded-2xl border border-border bg-surface p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Comparação entre intensidade de treino e risco de lesão">
        <line x1="18" y1={H - 24} x2={W - 18} y2={H - 24} stroke="var(--color-border-strong)" />
        <line x1="18" y1="14" x2="18" y2={H - 24} stroke="var(--color-border-strong)" />
        <motion.path d={risk} fill="none" stroke="var(--color-danger)" strokeWidth={2.5} strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} />
        <motion.path d={ideal} fill="none" stroke="var(--color-pink-strong)" strokeWidth={2.5} strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15, ease: "easeOut" }} />
        <motion.path d={below} fill="none" stroke="var(--color-text-tertiary)" strokeWidth={2.5} strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} />
        <text x={W - 66} y="36" fontSize="10" fontWeight="700" fill="var(--color-danger)">Risco de lesão</text>
        <text x={W - 90} y="80" fontSize="10" fontWeight="700" fill="var(--color-pink-strong)">Nosso plano</text>
        <text x={W - 118} y="122" fontSize="10" fontWeight="700" fill="var(--color-text-tertiary)">Abaixo do ideal</text>
      </svg>
      <div className="mt-1 flex justify-between text-[10.5px] font-semibold text-text-tertiary">
        <span>Intensidade do treino</span>
        <span>Desempenho ao longo do tempo</span>
      </div>
    </div>
  );
}
