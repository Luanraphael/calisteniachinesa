"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X, Check } from "lucide-react";
import { CTAButton } from "../CTAButton";
import { ScreenFooter } from "../ScreenFooter";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { ArticleCard } from "../ArticleCard";
import { Headline, RichText } from "../Headline";
import { RiskCurveChart } from "@/components/charts/RiskCurveChart";
import type { Answers, InfoStep, WelcomeStep } from "@/lib/quizTypes";

function resolve<T>(value: T | ((a: Answers) => T), answers: Answers): T {
  return typeof value === "function" ? (value as (a: Answers) => T)(answers) : value;
}

export function InfoScreen({
  step,
  answers,
  onContinue,
}: {
  step: InfoStep | WelcomeStep;
  answers: Answers;
  onContinue: () => void;
}) {
  const headline = resolve(step.headline, answers);
  const body = "body" in step ? resolve(step.body, answers) : undefined;
  const bullets = "bullets" in step ? step.bullets : undefined;
  const preBullets = "preBullets" in step ? step.preBullets : undefined;
  const subheadline2 = "subheadline2" in step ? step.subheadline2 : undefined;
  const image = typeof step.image === "function" ? step.image(answers) : step.image;
  const imagePosition = "imagePosition" in step ? (step.imagePosition ?? "top") : "top";
  const embeddedChart = "embeddedChart" in step ? step.embeddedChart : undefined;
  const articleCard = "articleCard" in step ? step.articleCard : undefined;
  const citation = "citation" in step ? step.citation : undefined;
  const calloutEmoji = "calloutEmoji" in step ? step.calloutEmoji : undefined;
  const calloutStyle = "calloutStyle" in step ? step.calloutStyle : undefined;
  const calloutBody = "calloutBody" in step ? step.calloutBody : undefined;
  const realImage = "realImage" in step ? step.realImage : undefined;
  const center = "center" in step ? step.center : undefined;
  const headlineSize = "headlineSize" in step ? step.headlineSize : undefined;
  const fullGraphic = "fullGraphic" in step ? step.fullGraphic : undefined;

  const topImage = image && imagePosition === "top";
  const middleImage = image && imagePosition === "middle";
  const bottomImage = image && imagePosition === "bottom";

  function bulletList(list: { text: string; tone?: "danger" | "neutral" }[], delayBase: number) {
    return (
      <ul className="flex flex-col gap-2.5">
        {list.map((b, i) => (
          <motion.li
            key={b.text}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.32, delay: delayBase + i * 0.05 }}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-[14px] font-medium ${
              b.tone === "danger" ? "border-danger-light bg-danger-light text-[#8a2f3d]" : "border-border bg-surface text-text"
            }`}
          >
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                b.tone === "danger" ? "bg-danger text-white" : "bg-success text-white"
              }`}
            >
              {b.tone === "danger" ? <X size={13} strokeWidth={3} /> : <Check size={13} strokeWidth={3} />}
            </span>
            {b.text}
          </motion.li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-5 py-6">
      {fullGraphic && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-2xl bg-[#faf6f8]"
        >
          <Image
            src={fullGraphic.src}
            alt={fullGraphic.alt}
            width={1200}
            height={1500}
            className="h-auto w-full"
            sizes="(max-width: 520px) 100vw, 480px"
            priority
          />
        </motion.div>
      )}

      {topImage && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <ImagePlaceholder slot={image} />
        </motion.div>
      )}

      {/* Headline always has its own visual presence — never trapped inside the yellow box. */}
      {!fullGraphic && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 }} className={center ? "mx-auto max-w-[420px] text-center" : ""}>
          <Headline center={center} size={headlineSize}>
            {headline}
          </Headline>
        </motion.div>
      )}

      {fullGraphic
        ? null
        : calloutStyle === "yellow"
          ? calloutBody && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-[22px] border px-6 py-7 text-center"
                style={{ background: "var(--color-callout-bg)", borderColor: "var(--color-callout-border)" }}
              >
                <RichText
                  className="mx-auto max-w-[380px] text-[15px] font-medium leading-[1.65]"
                  style={{ color: "var(--color-callout-text)" }}
                >
                  {`${calloutEmoji ? `${calloutEmoji} ` : ""}${calloutBody}`}
                </RichText>
              </motion.div>
            )
          : calloutEmoji && body
            ? (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.12 }}
                  className="rounded-xl border border-border bg-pink-mist px-4 py-3 text-[13.5px] font-semibold leading-relaxed text-text"
                >
                  <span className="mr-1.5">{calloutEmoji}</span>
                  {body}
                </motion.p>
              )
            : null}

      {body && (calloutStyle === "yellow" || !calloutEmoji) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <RichText
            className={`text-[15px] leading-relaxed text-text-secondary ${center ? "mx-auto max-w-[420px] text-center" : "max-w-[480px]"}`}
          >
            {body}
          </RichText>
        </motion.div>
      )}

      {realImage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <Image
            src={realImage.src}
            alt={realImage.alt}
            width={1200}
            height={900}
            className="h-auto w-full"
            sizes="(max-width: 520px) 100vw, 480px"
          />
        </motion.div>
      )}

      {subheadline2 && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
          <Headline center={center} size="sm">
            {subheadline2}
          </Headline>
        </motion.div>
      )}

      {preBullets && preBullets.length > 0 && bulletList(preBullets, 0.2)}

      {middleImage && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <ImagePlaceholder slot={image} />
        </motion.div>
      )}

      {embeddedChart === "riskCurve" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          <RiskCurveChart />
        </motion.div>
      )}

      {articleCard && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.18 }}>
          <ArticleCard {...articleCard} />
        </motion.div>
      )}

      {bullets && bullets.length > 0 && bulletList(bullets, 0.2)}

      {citation && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24 }}
          className="rounded-xl border border-success-light bg-success-light px-4 py-2.5 text-center text-[12.5px] font-bold text-[#1c6b4c]"
        >
          {citation}
        </motion.p>
      )}

      {bottomImage && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.22 }}>
          <ImagePlaceholder slot={image} />
        </motion.div>
      )}

      <ScreenFooter>
        <CTAButton label={step.ctaLabel} onClick={onContinue} />
      </ScreenFooter>
    </div>
  );
}
