"use client";

import { motion } from "framer-motion";
import { CTAButton } from "../CTAButton";

export interface Plan {
  id: string;
  name: string;
  originalPrice: string;
  price: string;
  perDayValue: string;
  ctaLabel: string;
  checkoutUrl: string;
  badge?: string;
  badgeTone?: "pink" | "yellow";
}

export const PLANS: Plan[] = [
  {
    id: "1m",
    name: "Plano de 1 mês",
    originalPrice: "R$ 97,00",
    price: "R$ 27,00",
    perDayValue: "R$ 0,90",
    ctaLabel: "Quero o plano de 1 Mês",
    checkoutUrl: "https://payfast.greenn.com.br/redirect/320659",
  },
  {
    id: "3m",
    name: "Plano de 3 meses",
    originalPrice: "R$ 267,00",
    price: "R$ 47,00",
    perDayValue: "R$ 0,52",
    ctaLabel: "Quero o plano de 3 Meses",
    checkoutUrl: "https://payfast.greenn.com.br/redirect/320658",
    badge: "MELHOR OFERTA PARA VOCÊ",
    badgeTone: "pink",
  },
  {
    id: "12m",
    name: "Plano Anual",
    originalPrice: "R$ 897,00",
    price: "R$ 67,00",
    perDayValue: "R$ 0,18",
    ctaLabel: "Quero o plano ANUAL",
    checkoutUrl: "https://payfast.greenn.com.br/redirect/320661",
    badge: "Para nunca mais voltar ao peso atual",
    badgeTone: "yellow",
  },
];

const BORDER_TONE: Record<string, string> = {
  pink: "border-pink-strong",
  yellow: "border-callout-border",
};

const BANNER_TONE: Record<string, string> = {
  pink: "bg-pink-strong text-white",
  yellow: "bg-callout-border text-callout-text",
};

export function PlanSelector({ onCta }: { onCta: (planId: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <p className="text-center text-[12px] font-semibold text-text-tertiary">
        Não é assinatura, você paga somente uma vez
      </p>
      {PLANS.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
          className="flex flex-col gap-3"
        >
          <div
            className={`overflow-hidden rounded-2xl border-2 bg-surface ${
              p.badge ? BORDER_TONE[p.badgeTone ?? "pink"] : "border-border"
            }`}
          >
            {p.badge && (
              <div
                className={`px-3 py-2 text-center text-[11px] font-extrabold uppercase tracking-wide ${
                  BANNER_TONE[p.badgeTone ?? "pink"]
                }`}
              >
                {p.badgeTone === "yellow" ? "🔥 " : "⭐ "}
                {p.badge}
                {p.badgeTone === "yellow" ? "" : " ⭐"}
              </div>
            )}
            <div className="flex items-center justify-between gap-3 px-4 py-4">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 shrink-0 rounded-full border-2 border-border-strong" aria-hidden />
                <div>
                  <p className="text-[15px] font-extrabold text-text">{p.name}</p>
                  <p className="text-[12.5px] text-text-tertiary">
                    De <span className="font-semibold text-danger line-through">{p.originalPrice}</span>
                  </p>
                  <p className="text-[14px] font-bold text-text">
                    Por <span className="text-success">{p.price}</span>
                  </p>
                </div>
              </div>
              <div className="shrink-0 rounded-xl bg-pink-mist px-3 py-2 text-center">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-text-tertiary">apenas</p>
                <p className="text-[15px] font-extrabold leading-tight text-text">{p.perDayValue}</p>
                <p className="text-[9px] font-semibold text-text-tertiary">por dia</p>
              </div>
            </div>
          </div>

          <CTAButton
            label={`👉 ${p.ctaLabel}`}
            onClick={() => onCta(p.id)}
            showArrow={false}
            pulse
          />
        </motion.div>
      ))}
    </div>
  );
}
