"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CircleCheckBig,
  Target,
  Flame,
  Scale,
  Gauge,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Countdown } from "../offer/Countdown";
import { PlanSelector, PLANS } from "../offer/PlanSelector";
import { Testimonials } from "../offer/Testimonials";
import { FaqAccordion } from "../offer/FaqAccordion";
import { CTAButton } from "../CTAButton";
import { Headline } from "../Headline";
import { trackQuizEvent } from "@/lib/analytics";
import { durationLabel, offerObjectiveLines, intensityLabel } from "@/lib/quizData";
import type { Answers } from "@/lib/quizTypes";

const RECEIVES = [
  {
    title: "Seu aplicativo personalizado de Calistenia Chinesa",
    desc: "Um plano organizado de acordo com suas respostas, objetivo e ponto de partida.",
  },
  {
    title: "Treinos completos em vídeo, passo a passo",
    desc: "É só apertar o play e acompanhar os movimentos, mesmo que você nunca tenha treinado antes.",
  },
  {
    title: "Aulas rápidas de aproximadamente 10 minutos",
    desc: "Rotinas simples para encaixar no seu dia sem precisar passar horas treinando.",
  },
  {
    title: "Exercícios para fazer em casa com o próprio corpo e uma cadeira",
    desc: "Sem academia, aparelhos caros ou uma rotina complicada de equipamentos.",
  },
  {
    title: "Sequência diária organizada para você saber exatamente o que fazer",
    desc: "Nada de abrir o aplicativo e ficar escolhendo treino. Você entra e já encontra sua próxima aula.",
  },
  {
    title: "Seu progresso acompanhado dentro do aplicativo",
    desc: "Visualize sua evolução, aulas concluídas e mantenha sua rotina organizada ao longo do programa.",
  },
  {
    title: "Acesso imediato pelo celular",
    desc: "Após sua inscrição, você recebe o acesso ao aplicativo e já pode começar sua primeira aula.",
  },
];

const BONUSES = [
  {
    emoji: "🥗",
    eyebrow: "BÔNUS 1",
    title: "Plano Alimentar Personalizado 40+",
    desc: "Você recebe dentro do próprio aplicativo um plano alimentar personalizado de acordo com suas preferências, objetivo e rotina, com sugestões organizadas para café da manhã, almoço, jantar e lanches, além de opções de substituição baseadas nos alimentos que você realmente gosta de comer.",
    price: "R$ 29,90",
  },
  {
    emoji: "🧘‍♀️",
    eyebrow: "BÔNUS 2",
    title: "Destrava Corpo em 5 Minutos",
    desc: "Uma sequência especial de movimentos para aqueles dias em que você acorda com o corpo pesado, rígido ou travado, ajudando a despertar a mobilidade, preparar o corpo para a aula e recuperar a disposição antes do treino em apenas alguns minutos.",
    price: "R$ 24,90",
  },
  {
    emoji: "🍫",
    eyebrow: "BÔNUS 3",
    title: "Protocolo Antissabotagem 40+",
    desc: "Você recebe um protocolo para saber exatamente como agir nos momentos que normalmente fazem você sair da rotina, como vontade forte de doce, fome fora de hora, estresse, finais de semana e refeições fora de casa, evitando que uma escolha fora do plano se transforme em vários dias de abandono.",
    price: "R$ 34,90",
  },
  {
    emoji: "📅",
    eyebrow: "BÔNUS 4",
    title: "Calendário de Evolução das 8 Semanas",
    desc: "Você acompanha visualmente toda a sua jornada, marcando os treinos concluídos, identificando em qual semana está e enxergando quanto falta para completar o programa, transformando sua consistência e evolução em algo visível todos os dias.",
    price: "R$ 27,90",
  },
  {
    emoji: "⚡",
    eyebrow: "BÔNUS 5",
    title: "Plano Volta ao Ritmo",
    desc: "Se você perder um treino ou ficar alguns dias sem praticar, receberá uma orientação exclusiva minha mostrando exatamente onde retomar, como ajustar os primeiros dias de volta e o que fazer mesmo depois de uma semana parada, para que uma pausa na rotina não se transforme em mais um abandono.",
    price: "R$ 37,90",
  },
];

const BONUSES_TOTAL = "R$ 155,50";

function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-4">
      {eyebrow && <p className="mb-1 text-[11px] font-extrabold uppercase tracking-[0.12em] text-pink-strong">{eyebrow}</p>}
      <h2 className="text-[19px] font-extrabold leading-tight tracking-tight text-text">{title}</h2>
    </div>
  );
}

function FullImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#faf6f8]">
      <Image src={src} alt={alt} width={1200} height={1500} className="h-auto w-full" sizes="(max-width: 520px) 100vw, 480px" />
    </div>
  );
}

export function ResultOfferScreen({ answers }: { answers: Answers }) {
  const [selectedPlan, setSelectedPlan] = useState("3m");
  const [confirmed, setConfirmed] = useState(false);
  const planSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackQuizEvent("quiz_result_viewed", { step_id: "offer" });
  }, []);

  const current = Number(answers.currentWeightKg ?? 68);
  const target = Number(answers.targetWeightKg ?? 60);
  const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS[1];

  function handleCheckoutClick() {
    trackQuizEvent("quiz_cta_clicked", { answer_id: selectedPlan });
    planSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setConfirmed(true);
  }

  return (
    <div className="flex flex-1 flex-col gap-8 py-6">
      {/* Header confirmation */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center">
        <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success-light">
          <CircleCheckBig size={26} className="text-success" />
        </span>
        <h1 className="text-[22px] font-extrabold leading-tight tracking-tight text-text">
          Seu treino personalizado de Calistenia Chinesa está pronto
        </h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.1 }}>
        <FullImage src="/images/quiz/offer-hero.png" alt="Mulher pronta para começar seu treino de Calistenia Chinesa" />
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.15 }}>
        <FullImage src="/images/quiz/offer-hero-back.png" alt="Mulher pronta para começar seu treino de Calistenia Chinesa, vista de costas" />
      </motion.div>

      {/* Profile summary — never truncated: the card grows to fit the full text */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Target, label: "Objetivo", value: offerObjectiveLines(answers).join("\n"), color: "var(--color-pink-strong)" },
          { icon: Gauge, label: "Intensidade", value: intensityLabel(answers), color: "var(--color-pink-strong)" },
          { icon: Scale, label: "Peso atual", value: `${current}kg`, color: "var(--color-danger)" },
          { icon: Flame, label: "Meta", value: `${target}kg`, color: "var(--color-success)" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
            className="rounded-2xl border border-border bg-surface p-4"
          >
            <c.icon size={16} style={{ color: c.color }} />
            <p className="mt-2 text-[11.5px] font-semibold text-text-secondary">{c.label}</p>
            <p className="whitespace-pre-line break-words text-[14.5px] font-extrabold leading-snug text-text">{c.value}</p>
          </motion.div>
        ))}
      </div>
      <p className="-mt-5 text-center text-[11px] text-text-tertiary">Duração recomendada: {durationLabel(answers)}</p>

      {/* Countdown + plans */}
      <div ref={planSectionRef} className="flex flex-col gap-4">
        <Countdown initialSeconds={600} />
        <SectionTitle title="Escolha o seu plano" />
        <PlanSelector selected={selectedPlan} onSelect={setSelectedPlan} onCta={handleCheckoutClick} />

        {confirmed && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-success-light bg-success-light px-4 py-3.5 text-center"
          >
            <p className="text-[13px] font-bold text-[#1c6b4c]">
              Você selecionou o {plan.name}. Em produção, este botão leva ao checkout seguro para concluir sua
              inscrição.
            </p>
          </motion.div>
        )}

        <div className="flex items-center justify-center gap-2 text-center text-[11.5px] text-text-tertiary">
          <ShieldCheck size={14} className="text-success" />
          Garantia de 30 dias — devolução de 100% do valor pago
        </div>
      </div>

      {/* Before / after */}
      <div>
        <SectionTitle title="O que muitas alunas relatam ao longo da jornada" />
        <FullImage src="/images/quiz/offer-jornada.png" alt="Comparação de resultados antes e depois do programa" />
      </div>

      {/* Testimonials — image proof first, then written reviews */}
      <div>
        <SectionTitle eyebrow="Depoimentos" title="Resultados que nos orgulham" />
        <div className="flex flex-col gap-3">
          {[
            "/images/quiz/offer-testimonial-1.png",
            "/images/quiz/offer-testimonial-5.webp",
            "/images/quiz/offer-testimonial-3.jpg",
            "/images/quiz/offer-testimonial-4.png",
          ].map((src) => (
            <FullImage key={src} src={src} alt="Depoimento real de aluna do programa" />
          ))}
        </div>
        <div className="mt-4">
          <Testimonials />
        </div>
      </div>

      {/* What you get — built in HTML/CSS for maximum mobile legibility */}
      <div>
        <Headline size="sm" center className="mb-5">
          {"Veja tudo O que !!você receberá!!"}
        </Headline>
        <div className="flex flex-col gap-3">
          {RECEIVES.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.05, duration: 0.32 }}
              className="rounded-2xl border px-4 py-4"
              style={{ background: "var(--color-success-light)", borderColor: "#bfe6cb" }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: "var(--color-success)" }} aria-hidden />
                <div>
                  <p className="text-[15px] font-extrabold leading-snug text-text">{r.title}</p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#2f5d47]">{r.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly training breakdown */}
      <div>
        <SectionTitle title="Seu treinamento completo, semana a semana" />
        <div
          className="mb-4 rounded-2xl border px-5 py-4"
          style={{ background: "var(--color-success-light)", borderColor: "#bfe6cb" }}
        >
          <p className="text-[14.5px] font-medium leading-[1.65] text-[#1c6b4c]">
            Cada semana do seu plano já vem pronta para você seguir com clareza: movimentos guiados, tempo de aula, descanso e evolução passo a passo.
          </p>
        </div>
        <FullImage src="/images/quiz/offer-training-complete.png" alt="Cronograma semanal completo do treinamento" />
      </div>

      {/* Rating strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-surface py-5"
      >
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={18} className="fill-pink-strong text-pink-strong" />
          ))}
        </div>
        <p className="text-[13px] font-bold text-text">Nota 4,9/5,0 com base nas avaliações do programa</p>
      </motion.div>

      {/* Bonuses */}
      <div>
        <SectionTitle eyebrow="Bônus exclusivos" title="Além de tudo, você também recebe" />
        <div className="flex flex-col gap-3">
          {BONUSES.map((b, i) => (
            <motion.div
              key={b.eyebrow}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="rounded-2xl border p-4"
              style={{ borderColor: "var(--color-pink-wash-border)", background: "var(--color-pink-wash)" }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[24px] shadow-sm"
                  aria-hidden
                >
                  {b.emoji}
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-pink-strong">{b.eyebrow}</p>
                  <p className="mt-0.5 text-[15px] font-extrabold leading-tight text-text">{b.title}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[11.5px] font-semibold text-danger line-through">{b.price}</p>
                  <p className="text-[12.5px] font-extrabold text-success">GRÁTIS</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">{b.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.3, duration: 0.35 }}
          className="mt-4 rounded-2xl border px-5 py-5 text-center"
          style={{ background: "var(--color-callout-bg)", borderColor: "var(--color-callout-border)" }}
        >
          <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-callout-text)" }}>
            O valor total desses 5 bônus é de <span className="font-extrabold">{BONUSES_TOTAL}</span>, mas{" "}
            <span className="font-extrabold">apenas hoje</span>, durante esta promoção, Você receberá tudo de forma{" "}
            <span className="font-extrabold text-success">Gratuita!.</span>
          </p>
        </motion.div>
      </div>

      {/* Plans repeated — the page's last main CTA before the guarantee/FAQ close-out */}
      <div className="flex flex-col gap-4">
        <SectionTitle title="Escolha o seu plano" />
        <PlanSelector selected={selectedPlan} onSelect={setSelectedPlan} onCta={handleCheckoutClick} />
      </div>

      {/* Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <div className="w-40">
          <Image
            src="/images/quiz/offer-guarantee.png"
            alt="Garantia de 30 dias"
            width={600}
            height={600}
            className="h-auto w-full"
            sizes="160px"
          />
        </div>
        <p className="mx-auto max-w-[380px] text-[13.5px] leading-relaxed text-text-secondary">
          Você tem <span className="font-extrabold text-text">30 dias de garantia</span> para experimentar o
          aplicativo de Calistenia Chinesa sem nenhum risco. Se dentro desse período você sentir que não é para
          você, é só entrar em contato com nosso suporte e devolvemos 100% do valor pago, sem burocracia e sem
          perguntas.
        </p>
        <CTAButton label={`Quero o ${plan.name.toLowerCase()}`} onClick={handleCheckoutClick} className="mt-1" />
      </motion.div>

      {/* FAQ */}
      <div>
        <SectionTitle title="Perguntas frequentes" />
        <FaqAccordion />
      </div>

      <div className="sticky bottom-0 -mx-5 border-t border-border bg-bg/95 px-5 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 backdrop-blur-sm">
        <CTAButton label={`Quero o ${plan.name.toLowerCase()}`} onClick={handleCheckoutClick} />
      </div>
    </div>
  );
}
