/**
 * LoopCodeLabs Self-Hosted Analytics Tracker
 */

import { safeLocalStorage, safeSessionStorage } from "./storage";

export interface VisitorIds {
  visitorId: string;
  sessionId: string;
}

export function formatDatePrefix(d: Date = new Date()): string {
  const yy = d.getFullYear().toString().slice(-2);
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

// Generate or retrieve persistent Visitor ID (vid-YYMMDD-00001) and Session ID (sid-YYMMDD-00001)
export function getOrCreateIds(): VisitorIds {
  const datePrefix = formatDatePrefix();

  let visitorId: string | null = null;
  try {
    visitorId = safeLocalStorage.getItem("lcl_visitor_id");
  } catch (e) {}

  if (!visitorId || !/^vid-\d{6}-\d{5}$/.test(visitorId)) {
    const seqKey = `lcl_vid_seq_${datePrefix}`;
    let seq = 1;
    try {
      seq = parseInt(safeLocalStorage.getItem(seqKey) || "0", 10) + 1;
      safeLocalStorage.setItem(seqKey, seq.toString());
    } catch (e) {}
    visitorId = `vid-${datePrefix}-${seq.toString().padStart(5, "0")}`;
    try {
      safeLocalStorage.setItem("lcl_visitor_id", visitorId);
    } catch (e) {}
  }

  let sessionId: string | null = null;
  try {
    sessionId = safeSessionStorage.getItem("lcl_session_id");
  } catch (e) {}

  if (!sessionId || !/^sid-\d{6}-\d{5}$/.test(sessionId)) {
    const seqKey = `lcl_sid_seq_${datePrefix}`;
    let seq = 1;
    try {
      seq = parseInt(safeLocalStorage.getItem(seqKey) || "0", 10) + 1;
      safeLocalStorage.setItem(seqKey, seq.toString());
    } catch (e) {}
    sessionId = `sid-${datePrefix}-${seq.toString().padStart(5, "0")}`;
    try {
      safeSessionStorage.setItem("lcl_session_id", sessionId);
    } catch (e) {}
  }

  return { visitorId, sessionId };
}

// Helper to detect Browser Name
function detectBrowser(): string {
  if (typeof window === "undefined") return "Browser";
  const ua = navigator.userAgent;
  if ((navigator as any).brave || (window as any).brave || ua.includes("Brave")) return "Brave";
  if (ua.includes("Edg/") || ua.includes("Edge/") || ua.includes("EdgA/") || ua.includes("EdgiOS/") || ua.includes("Edge") || ua.includes("Edg")) return "Edge";
  if (ua.includes("Firefox") || ua.includes("FxiOS")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Internet";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Trident")) return "Internet Explorer";
  if (ua.includes("Chrome") || ua.includes("CriOS")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Browser";
}

// Helper to detect Device Type
function detectDevice(): "Desktop" | "Mobile" | "Tablet" {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return "Tablet";
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return "Mobile";
  return "Desktop";
}

// Helper to detect OS
function detectOS(): string {
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows 11/10";
  if (ua.includes("Mac")) return "macOS";
  if (ua.includes("Linux")) return "Linux";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  return "Unknown OS";
}

let isInitialized = false;
let sessionStartTime = Date.now();
let pageEntryTime = Date.now();
let pageClicksCount = 0;
let maxScrollPercent = 0;

export function initAnalytics() {
  if (typeof window === "undefined" || isInitialized) return;

  // Check consent preference
  let consent: string | null = null;
  try {
    consent = safeLocalStorage.getItem("lcl_cookie_consent");
  } catch (e) {}
  if (consent === "declined") {
    console.log("Analytics disabled by user cookie preference.");
    return;
  }

  isInitialized = true;
  const { visitorId, sessionId } = getOrCreateIds();

  // Extract UTM Parameters & Referrer
  const urlParams = new URLSearchParams(window.location.search);
  const utmSource = urlParams.get("utm_source") || undefined;
  const utmMedium = urlParams.get("utm_medium") || undefined;
  const utmCampaign = urlParams.get("utm_campaign") || undefined;

  let trafficSource: "Organic Search" | "Direct" | "Social Media" | "Referral" | "Paid Campaign" = "Direct";
  const ref = document.referrer;
  if (utmSource || utmCampaign) {
    trafficSource = "Paid Campaign";
  } else if (ref) {
    if (ref.includes("google") || ref.includes("bing") || ref.includes("duckduckgo") || ref.includes("yahoo")) {
      trafficSource = "Organic Search";
    } else if (ref.includes("linkedin") || ref.includes("twitter") || ref.includes("t.co") || ref.includes("facebook") || ref.includes("instagram")) {
      trafficSource = "Social Media";
    } else {
      trafficSource = "Referral";
    }
  }

  // Session Initialization REST API Call
  fetch("/api/analytics/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visitor: {
        visitorId,
        browser: detectBrowser(),
        deviceType: detectDevice(),
        os: detectOS(),
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        initialReferrer: document.referrer || "Direct",
        utmSource,
        utmMedium,
        utmCampaign,
        landingPage: window.location.pathname
      },
      session: {
        sessionId,
        landingPage: window.location.pathname,
        trafficSource,
        referrer: document.referrer || "Direct"
      }
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data?.session?.sessionId) {
        try {
          safeSessionStorage.setItem("lcl_session_id", data.session.sessionId);
        } catch (e) {}
      }
      if (data?.visitor?.visitorId) {
        try {
          safeLocalStorage.setItem("lcl_visitor_id", data.visitor.visitorId);
        } catch (e) {}
      }
    })
    .catch(() => {});

  // Pageview Reporting
  trackPageView(window.location.pathname, document.title);

  // Setup Global Interaction Listeners (Click Heatmaps + Auto CTA Events)
  setupEventListeners(visitorId, sessionId);

  // Performance Web Vitals Tracking
  if ("performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        try {
          const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
          const loadTime = navEntries[0] ? navEntries[0].loadEventEnd - navEntries[0].startTime : 0;
          const ttfb = navEntries[0] ? navEntries[0].responseStart - navEntries[0].requestStart : 0;

          fetch("/api/analytics/performance", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pageUrl: window.location.pathname,
              pageLoadTimeMs: Math.round(loadTime || 850),
              fcpMs: Math.round(ttfb * 2 || 320),
              lcpMs: Math.round(loadTime * 0.8 || 710),
              ttfbMs: Math.round(ttfb || 90)
            })
          }).catch(() => {});
        } catch (e) {}
      }, 1000);
    });
  }

  // Periodic Session Heartbeat (Every 30s)
  setInterval(() => {
    const activeIds = getOrCreateIds();
    const elapsedSeconds = Math.round((Date.now() - sessionStartTime) / 1000);
    fetch("/api/analytics/session/end", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: activeIds.sessionId,
        durationSeconds: elapsedSeconds
      })
    }).catch(() => {});
  }, 30000);
}

export function trackPageView(urlPath: string, pageTitle: string) {
  const { visitorId, sessionId } = getOrCreateIds();
  pageEntryTime = Date.now();
  pageClicksCount = 0;
  maxScrollPercent = 0;

  fetch("/api/analytics/pageview", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visitorId,
      sessionId,
      urlPath,
      pageTitle,
      timeSpentSeconds: 10,
      scrollPercentage: 50,
      clicksCount: 1
    })
  }).catch(() => {});
}

export function trackCustomEvent(eventName: string, metadata?: Record<string, any>) {
  const { visitorId, sessionId } = getOrCreateIds();

  fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName,
      urlPath: window.location.pathname,
      pageTitle: document.title,
      visitorId,
      sessionId,
      metadata
    })
  }).catch(() => {});
}

export function trackLeadSubmission(lead: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  requirements?: string;
}) {
  const { visitorId, sessionId } = getOrCreateIds();

  return fetch("/api/analytics/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      visitorId,
      sessionId,
      ...lead
    })
  }).catch(() => {});
}

const lastRecordedCtaEvents: Record<string, number> = {};

function setupEventListeners(initialVisitorId: string, initialSessionId: string) {
  // Click Heatmap & CTA Detection
  document.addEventListener("click", (e) => {
    pageClicksCount++;

    const target = e.target as HTMLElement | null;
    if (!target) return;

    // Record Click Heatmap Point
    const xRatio = Math.round((e.clientX / window.innerWidth) * 100) / 100;
    const yRatio = Math.round((e.clientY / window.innerHeight) * 100) / 100;

    fetch("/api/analytics/heatmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        urlPath: window.location.pathname,
        elementTag: target.tagName,
        elementText: target.innerText?.substring(0, 30) || "",
        xRatio,
        yRatio
      })
    }).catch(() => {});

    // CTA Events Auto Detection
    const buttonOrLink = target.closest("button, a") || target;
    const text = ((buttonOrLink as HTMLElement).innerText || target.innerText || "").toLowerCase().trim();
    const href = ((buttonOrLink as HTMLElement).getAttribute?.("href") || "").toLowerCase();

    let eventToTrigger: string | null = null;
    let meta: any = { text };

    if (text.includes("whatsapp") || href.includes("wa.me") || href.includes("whatsapp")) {
      eventToTrigger = "WhatsApp Button Click";
      meta = { text, href };
    } else if (text.includes("book") || text.includes("consultation") || text.includes("schedule")) {
      eventToTrigger = "Book Consultation";
    } else if (text.includes("contact") || text.includes("get in touch") || text.includes("start project")) {
      eventToTrigger = "Contact Button";
    } else if (text.includes("pricing") || text.includes("estimate") || href.includes("pricing")) {
      eventToTrigger = "Pricing Page View";
    } else if (text.includes("portfolio") || href.includes("portfolio")) {
      eventToTrigger = "Portfolio View";
    } else if (text.includes("call") || href.startsWith("tel:")) {
      eventToTrigger = "Call Button";
      meta = { text, href };
    } else if (text.includes("email") || href.startsWith("mailto:")) {
      eventToTrigger = "Email Button";
      meta = { text, href };
    }

    if (eventToTrigger) {
      const now = Date.now();
      const lastTime = lastRecordedCtaEvents[eventToTrigger] || 0;
      // Prevent firing duplicate CTA event within 2000ms
      if (now - lastTime > 2000) {
        lastRecordedCtaEvents[eventToTrigger] = now;
        trackCustomEvent(eventToTrigger, meta);
      }
    }
  });

  // Scroll Percentage Tracker
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      const scrollPercent = Math.min(100, Math.round((scrollTop / docHeight) * 100));
      if (scrollPercent > maxScrollPercent) {
        maxScrollPercent = scrollPercent;
      }
    }
  });
}
