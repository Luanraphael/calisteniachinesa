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

// Maps this funnel's internal event names to the standard Meta Pixel events
// the ad account optimizes against — keeps every screen's call to
// trackQuizEvent() automatically feeding the pixel through one place.
const META_PIXEL_EVENT: Partial<Record<QuizEventName, string>> = {
  quiz_result_viewed: "Lead",
  quiz_cta_clicked: "InitiateCheckout",
};

/**
 * Central analytics hook — every screen reports through here so pixels/GTM
 * stay wired up in a single call site instead of being sprinkled across
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

  const metaEvent = META_PIXEL_EVENT[name];
  if (metaEvent && window.fbq) {
    window.fbq("track", metaEvent, payload);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[quiz_event]", event);
  }
}
