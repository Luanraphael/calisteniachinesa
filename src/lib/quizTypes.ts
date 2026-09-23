import type { LucideIcon } from "lucide-react";

export type Answers = Record<string, string | string[] | number | undefined>;

export interface ImageSlot {
  /** Stable identifier so the asset can be swapped later; also used as placeholder fallback. */
  key: string;
  /** Layout treatment. "natural" renders the asset at its own aspect ratio with no
   * crop, background fill, or rounded frame — for images that must appear exactly
   * as provided (e.g. an app mockup graphic that already has its own composition). */
  variant: "full" | "side" | "mockup" | "circle" | "portrait" | "natural";
  alt: string;
  /** Real asset path under /public. When absent, an elegant placeholder renders instead. */
  src?: string;
  /** Required for "natural" — the asset's real pixel size, so next/image can size it
   * without a `fill` wrapper (which is what forced the mismatched-aspect background). */
  naturalWidth?: number;
  naturalHeight?: number;
}

export interface ChoiceOption {
  id: string;
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
  /** Literal emoji, only set when the reference funnel uses one for this option. */
  emoji?: string;
  /** Per-option thumbnail (image-choice grids like body type / desired body / focus area). */
  image?: { key: string; alt: string; src?: string };
  /** "None of the above" style option: white background instead of the pink wash, reads as a neutral opt-out. */
  neutral?: boolean;
  /** Selecting this option clears every other selection in a multi-select step (and vice versa). */
  exclusive?: boolean;
}

export interface BaseStep {
  id: string;
  showProgress?: boolean;
  showBack?: boolean;
}

export interface LandingStep extends BaseStep {
  type: "landing";
  titleLine1: string;
  titleLine2: string;
  titleAccent?: string;
  subheadline: string;
  image: ImageSlot;
  hint: string;
  options: ChoiceOption[];
  answerKey: string;
}

export interface WelcomeStep extends BaseStep {
  type: "welcome";
  image: ImageSlot;
  headline: string;
  body: string;
  center?: boolean;
  ctaLabel: string;
}

export interface ChoiceStep extends BaseStep {
  type: "choice";
  headline: string | ((a: Answers) => string);
  subheadline?: string | ((a: Answers) => string);
  /** Full-width image above the question (rare — most choice steps use sideImage or imageGrid instead). */
  image?: ImageSlot;
  /** Renders `image` BEFORE the headline instead of after (only the goal step needs this). */
  imageAboveHeadline?: boolean;
  /**
   * The persona photo participates in the layout alongside the options, per the reference
   * composition — rendered edge-to-edge via InteractiveFigure, never boxed like a card.
   * figureWidthPct tunes the column split per asset (seated personas usually need more
   * width, standing ones need less width and more height); defaults to 34 when omitted.
   */
  sideImage?: ImageSlot & { position: "left" | "right"; figureWidthPct?: number };
  options: ChoiceOption[];
  multi?: boolean;
  answerKey: string;
  ctaLabel?: string;
  /** Options rendered as an image grid (body type / desired body / focus area) */
  imageGrid?: boolean;
  /** Options rendered as full-width rows: thumbnail left, label middle, radio/check right (e.g. the goal step). */
  imageList?: boolean;
}

export interface InfoStep extends BaseStep {
  type: "info";
  /** Static, or computed from answers (e.g. the biotype photo, chosen per the lead's actual answer). */
  image?: ImageSlot | ((a: Answers) => ImageSlot);
  imagePosition?: "top" | "bottom" | "middle";
  headline: string | ((a: Answers) => string);
  headlineSize?: "sm" | "md" | "lg";
  center?: boolean;
  /** Renders a highlighted "insight" card below the (page-level) headline. */
  calloutStyle?: "yellow";
  calloutEmoji?: string;
  /** The yellow callout's own message — the headline itself stays outside the box. */
  calloutBody?: string;
  /** A second headline-weight line rendered after the realImage/graph (e.g. "E quando isso acontece:"). */
  subheadline2?: string;
  body?: string | ((a: Answers) => string);
  bullets?: { text: string; tone?: "danger" | "neutral" }[];
  /** Checked list rendered before a "middle"-positioned image (bullets renders after it). */
  preBullets?: { text: string; tone?: "danger" | "neutral" }[];
  /** A real, provided asset rendered inline (e.g. the estrogen-by-age reference chart). */
  realImage?: { src: string; alt: string };
  /** A single pre-made graphic that already contains the headline/comparison — suppresses the HTML headline. */
  fullGraphic?: { src: string; alt: string };
  /** Embedded chart shown inline within the info screen, matching the reference's placement. */
  embeddedChart?: "riskCurve";
  /** Small stylised "article" trust card (never a real outlet's branding). */
  articleCard?: { eyebrow: string; title: string; body: string };
  citation?: string;
  ctaLabel: string;
}

export interface BenefitsStep extends BaseStep {
  type: "benefits";
  image: ImageSlot;
  headline: string;
  subheadline?: string;
  items: { icon: LucideIcon; color: string; bg: string; title: string; text: string }[];
  ctaLabel: string;
}

export interface RoadmapStep extends BaseStep {
  type: "roadmap";
  headline: (a: Answers) => string;
  body: string;
  phases: { range: string; text: string; image: ImageSlot; color: string }[];
  ctaLabel: string;
}

export interface SliderStep extends BaseStep {
  type: "slider";
  headline: string;
  helper?: string;
  answerKey: string;
  min: number;
  max: number;
  default: number;
  unit: string;
  ctaLabel: string;
}

export interface TextInputStep extends BaseStep {
  type: "textInput";
  headline: string;
  subheadline?: string;
  answerKey: string;
  placeholder: string;
  inputMode?: "text" | "numeric";
  maxLength?: number;
  ctaLabel: string;
}

export interface LoadingStep extends BaseStep {
  type: "loading";
  /** donut = circular ring (mid-quiz saves); sequential = 4 stacked bars filling one-by-one (final analysis). */
  variant: "donut" | "sequential";
  headline: string | ((a: Answers) => string);
  subLabel?: string;
  durationMs: number;
  /** Sequential variant only: the 4 process labels, filled one after another. */
  tasks?: string[];
  showSocialProof?: boolean;
  /** Real testimonial photos rendered right below the social proof (sequential variant). */
  testimonials?: { src: string; alt: string }[];
}

export interface ProfileStep extends BaseStep {
  type: "profile";
  headline: string;
  expertImage?: { src: string; alt: string };
  ctaLabel: string;
}

export interface ChartStep extends BaseStep {
  type: "chart";
  headline: string;
  ctaLabel: string;
}

export interface ResultStep extends BaseStep {
  type: "result";
}

export type QuizStep =
  | LandingStep
  | WelcomeStep
  | ChoiceStep
  | InfoStep
  | BenefitsStep
  | RoadmapStep
  | SliderStep
  | TextInputStep
  | LoadingStep
  | ProfileStep
  | ChartStep
  | ResultStep;
