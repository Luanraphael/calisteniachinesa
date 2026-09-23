"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Patrícia M.",
    age: 46,
    text: "Tive que voltar aqui só pra avaliar. Muito bom mesmo. No meio de tanta promessa furada finalmente achei uma coisa que cabe de verdade na rotina. Tô entrando na minha terceira semana usando e já foram -4KG pra conta, Duas calças que eu tinha perdido já voltaram a servir, E ainda é só o começo estou muito animada!🥰",
    photo: "/images/quiz/profile-patricia.jpg",
  },
  {
    name: "Luciana R.",
    age: 49,
    text: "Tenho 49 anos e fazia tempo que eu não conseguia manter constância em nada. Aqui eu comecei com poucos minutos, sem me matar, e pela primeira vez não fiquei naquela sensação de 'segunda eu começo denovo'. Tá sendo muito mais fácil continuar, Eu to amando o processo!",
    photo: "/images/quiz/profile-luciana.jpg",
  },
  {
    name: "Adriana C.",
    age: 56,
    text: "O que me ganhou foi não precisar pensar no que fazer. Eu abro o aplicativo, vejo o treino do dia e faço. Parece bobeira, mas pra quem trabalha, cuida de casa e vive sem tempo isso muda tudo. Já virou parte da minha rotina.",
    photo: "/images/quiz/profile-adriana.jpg",
  },
  {
    name: "Márcia T.",
    age: 45,
    text: "Voltei aqui porque quando comprei eu tava bem desconfiada. Hoje tô na terceira semana e minha cintura já tá bem diferente, principalmente nas roupas. Não achei que 10 minutinhos fossem fazer tanta diferença na minha rotina mas vou te falar viu.. Bendita seja a Calistenia chinesa 😂🩷",
    photo: "/images/quiz/profile-marcia.jpg",
  },
  {
    name: "Marta S.",
    age: 52,
    text: "Comecei com muita dor no joelho e achei que não ia conseguir. Hoje faço os treinos sentada na minha sala e sinto o corpo muito mais leve.",
    photo: "/images/quiz/profile-marta.jpg",
  },
  {
    name: "Regina A.",
    age: 47,
    text: "Nunca fui de academia. Os vídeos são curtos e fáceis de seguir, deu pra encaixar até nos dias mais corridos.",
    photo: "/images/quiz/profile-regina.jpg",
  },
  {
    name: "Célia M.",
    age: 58,
    text: "O que mais gostei foi não precisar de nenhum equipamento. Só eu, uma cadeira e 10 minutos por dia.",
    photo: "/images/quiz/profile-celia.jpg",
  },
  {
    name: "Denise F.",
    age: 44,
    text: "Comecei pensando em melhorar a postura e acabei criando um hábito que não larguei mais.",
    photo: "/images/quiz/profile-denise.jpg",
  },
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
