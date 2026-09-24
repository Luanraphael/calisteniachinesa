"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CTAButton } from "../CTAButton";

export interface Plan {
  id: string;
  name: string;
  originalPrice: string;
  price: string;
  perDay: string;
  checkoutUrl: string;
  badge?: string;
  highlight?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "1m",
    name: "Plano de 1 mês",
    originalPrice: "R$ 97,00",
    price: "R$ 27,00",
    perDay: "R$ 0,90 por dia",
    checkoutUrl: "https://payfast.greenn.com.br/redirect/320659",
  },
  {
    id: "3m",
    name: "Plano de 3 meses",
    originalPrice: "R$ 267,00",
    price: "R$ 47,00",
    perDay: "R$ 0,52 por dia",
    badge: "MELHOR OFERTA PARA VOCÊ",
    highlight: true,
    checkoutUrl: "https://payfast.greenn.com.br/redirect/320658",
  },
  {
    id: "12m",
    name: "Plano Anual",
    originalPrice: "R$ 897,00",
    price: "R$ 67,00",
    perDay: "R$ 0,18 por dia",
    checkoutUrl: "https://payfast.greenn.com.br/redirect/320661",
  },
];

export function PlanSelector({
  selected,
  onSelect,
  onCta,
}: {
  selected: string;
  onSelect: (id: string) => void;
  onCta: () => void;
}) {
  const plan = PLANS.find((p) => p.id === selected) ?? PLANS[1];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-center text-[12px] font-semibold text-text-tertiary">
        Não é assinatura, você paga somente uma vez
      </p>
      {PLANS.map((p) => {
        const isSelected = p.id === selected;
        return (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => onSelect(p.id)}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center justify-between rounded-2xl border-2 px-4 py-4 text-left transition-colors ${
              isSelected ? "border-pink bg-pink-mist" : "border-border bg-surface"
            }`}
          >
            {p.badge && (
              <span className="absolute -top-3 left-4 rounded-full bg-pink-strong px-3 py-1 text-[10px] font-extrabold tracking-wide text-white shadow-sm">
                {p.badge}
              </span>
            )}
            <div className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  isSelected ? "border-pink bg-pink" : "border-border-strong"
                }`}
              >
                {isSelected && <Check size={13} strokeWidth={3} className="text-white" />}
              </span>
              <div>
                <p className="text-[14.5px] font-extrabold text-text">{p.name}</p>
                <p className="text-[12px] text-text-tertiary">
                  De <span className="line-through">{p.originalPrice}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[17px] font-extrabold text-pink-strong">{p.price}</p>
              <p className="text-[11px] text-text-tertiary">{p.perDay}</p>
            </div>
          </motion.button>
        );
      })}

      <CTAButton label={`Quero o ${plan.name.toLowerCase()}`} onClick={onCta} className="mt-1" />
    </div>
  );
}
