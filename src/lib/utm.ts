const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "src",
] as const;

const STORAGE_KEY = "quiz_tracking_params";

export function captureAndPersistTrackingParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const found: Record<string, string> = {};
  let hasNew = false;
  for (const key of TRACKED_PARAMS) {
    const value = url.searchParams.get(key);
    if (value) {
      found[key] = value;
      hasNew = true;
    }
  }

  const existingRaw = window.sessionStorage.getItem(STORAGE_KEY);
  const existing = existingRaw ? (JSON.parse(existingRaw) as Record<string, string>) : {};

  const merged = hasNew ? { ...existing, ...found } : existing;
  if (hasNew) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }
  return merged;
}

export function getTrackingParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as Record<string, string>) : {};
}

/** Appends persisted tracking params to a URL/query string, preserving an existing checkout link. */
export function withTrackingParams(baseUrl: string): string {
  const params = getTrackingParams();
  const entries = Object.entries(params);
  if (entries.length === 0) return baseUrl;
  const url = new URL(baseUrl, typeof window !== "undefined" ? window.location.origin : "http://localhost");
  for (const [k, v] of entries) url.searchParams.set(k, v);
  return url.toString();
}
