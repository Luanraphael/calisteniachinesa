import { getTrackingParams } from "./utm";

export type QuizEventName =
  | "quiz_started"
  | "quiz_step_viewed"
  | "quiz_answer_selected"
  | "quiz_step_completed"
  | "quiz_back_clicked"
  | "quiz_analysis_started"
  | "quiz_analysis_completed"
  | "quiz_result_viewed"
  | "quiz_cta_clicked"
  | "quiz_completed";

export interface QuizEventPayload {
  step_id?: string;
  step_number?: number;
  answer_id?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Central analytics hook. No external tracker is wired up yet — this keeps a
 * single call site so pixels/GTM can be dropped in later without touching
 * screen components.
 */
export function trackQuizEvent(name: QuizEventName, payload: QuizEventPayload = {}): void {
  if (typeof window === "undefined") return;
  const event = {
    event: name,
    ...payload,
    ...getTrackingParams(),
    timestamp: Date.now(),
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);

  if (process.env.NODE_ENV === "development") {
    console.debug("[quiz_event]", event);
  }
}
