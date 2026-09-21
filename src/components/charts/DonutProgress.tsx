"use client";

export function DonutProgress({ pct }: { pct: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(pct, 100) / 100) * c;
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-pink-light)" strokeWidth="10" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="var(--color-pink-strong)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 0.12s linear" }}
      />
      <text x="60" y="66" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--color-text)">
        {Math.round(pct)}%
      </text>
    </svg>
  );
}
