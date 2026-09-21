"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Eu nunca fiz Calistenia Chinesa, é para iniciantes?",
    a: "Sim. As aulas foram criadas para iniciantes, com movimentos simples explicados passo a passo em vídeo, focados em resultado — sem termos complicados.",
  },
  {
    q: "Quanto tempo preciso me dedicar para ver resultados?",
    a: "Com poucos minutos por dia, muitas alunas relatam sentir menos tensão e mais disposição já na primeira semana. A partir da segunda semana os efeitos costumam ficar mais perceptíveis no dia a dia.",
  },
  {
    q: "Preciso de algum equipamento?",
    a: "Não. Você só precisa de um pequeno espaço na sua casa, uma cadeira e alguns minutos do seu dia.",
  },
  {
    q: "Como vou receber as aulas?",
    a: "Depois de confirmar sua inscrição, você recebe acesso imediato por e-mail e WhatsApp, com instruções passo a passo para entrar na sua área de aluna.",
  },
  {
    q: "E se eu tiver alguma dúvida sobre os exercícios?",
    a: "Você pode acionar nosso suporte sempre que precisar para esclarecer qualquer dúvida sobre os movimentos ou o seu plano.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2.5">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="overflow-hidden rounded-2xl border border-border bg-surface">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
            >
              <span className="text-[13.5px] font-bold text-text">{item.q}</span>
              <ChevronDown
                size={17}
                className={`shrink-0 text-pink-strong transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  <p className="px-4 pb-4 text-[13px] leading-relaxed text-text-secondary">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
