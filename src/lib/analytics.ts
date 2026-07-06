/**
 * Lightweight, privacy-friendly analytics.
 * - Tracks page views + custom events to localStorage (per-session summary).
 * - Forwards to window.plausible / window.gtag if either is installed via a script tag.
 * - Respects Do-Not-Track.
 */

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: EventPayload }) => void;
    gtag?: (...args: unknown[]) => void;
    __afAnalytics?: { views: number; events: Array<{ n: string; t: number }> };
  }
}

function dnt(): boolean {
  if (typeof navigator === "undefined") return false;
  return navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

function bag() {
  if (typeof window === "undefined") return { views: 0, events: [] as Array<{ n: string; t: number }> };
  if (!window.__afAnalytics) window.__afAnalytics = { views: 0, events: [] };
  return window.__afAnalytics;
}

export function trackPageview(path: string) {
  if (typeof window === "undefined" || dnt()) return;
  bag().views += 1;
  window.plausible?.("pageview", { props: { path } });
  window.gtag?.("event", "page_view", { page_path: path });
}

export function trackEvent(name: string, props?: EventPayload) {
  if (typeof window === "undefined" || dnt()) return;
  bag().events.push({ n: name, t: Date.now() });
  window.plausible?.(name, { props });
  window.gtag?.("event", name, props);
}
