"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

/**
 * SAMPLE testimonial copy for layout purposes only. Replace with verified,
 * real student reviews (with consent) before this page goes live.
 */
const TESTIMONIALS = [
  { name: "Marta S.", age: 52, text: "Comecei com muita dor no joelho e achei que não ia conseguir. Hoje faço os treinos sentada na minha sala e sinto o corpo muito mais leve.", photo: "/images/quiz/profile-marta.jpg" },
  { name: "Regina A.", age: 47, text: "Nunca fui de academia. Os vídeos são curtos e fáceis de seguir, deu pra encaixar até nos dias mais corridos.", photo: "/images/quiz/profile-regina.jpg" },
  { name: "Célia M.", age: 58, text: "O que mais gostei foi não precisar de nenhum equipamento. Só eu, uma cadeira e 10 minutos por dia.", photo: "/images/quiz/profile-celia.jpg" },
  { name: "Denise F.", age: 44, text: "Comecei pensando em melhorar a postura e acabei criando um hábito que não larguei mais.", photo: "/images/quiz/profile-denise.jpg" },
];

export function Testimonials() {
  return (
    <div className="flex flex-col gap-3">
      {TESTIMONIALS.map((t, i) => (
        <motion.div
          key={t.name}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
          className="rounded-2xl border border-border bg-surface p-4"
        >
          <div className="mb-2 flex items-center gap-3">
            <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
              <Image src={t.photo} alt={t.name} fill style={{ objectFit: "cover", objectPosition: "50% 20%" }} sizes="36px" />
            </span>
            <div>
              <p className="text-[13px] font-bold text-text">
                {t.name} <span className="font-medium text-text-tertiary">· {t.age} anos</span>
              </p>
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={11} className="fill-pink-strong text-pink-strong" />
                ))}
              </div>
            </div>
          </div>
          <p className="text-[13.5px] leading-relaxed text-text-secondary">{t.text}</p>
        </motion.div>
      ))}
    </div>
  );
}
