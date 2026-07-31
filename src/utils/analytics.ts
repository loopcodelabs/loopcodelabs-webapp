import { getBrowserName, getDeviceType } from "./whatsappMessage";

export interface WhatsAppAnalyticsPayload {
  timestamp: string;
  unixTimestamp: number;
  pageUrl: string;
  pageTitle: string;
  visitorId: string;
  sessionId: string;
  device: string;
  browser: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  language: string;
  screenResolution: string;
}

export function formatDatePrefix(d: Date = new Date()): string {
  const yy = d.getFullYear().toString().slice(-2);
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const dd = d.getDate().toString().padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

export function getOrCreateVisitorId(): string {
  const datePrefix = formatDatePrefix();
  if (typeof window === "undefined") return `vid-${datePrefix}-00001`;
  try {
    let vid = localStorage.getItem("lcl_visitor_id");
    if (!vid || !/^vid-\d{6}-\d{5}$/.test(vid)) {
      const seqKey = `lcl_vid_seq_${datePrefix}`;
      let seq = parseInt(localStorage.getItem(seqKey) || "0", 10) + 1;
      localStorage.setItem(seqKey, seq.toString());
      vid = `vid-${datePrefix}-${seq.toString().padStart(5, "0")}`;
      localStorage.setItem("lcl_visitor_id", vid);
    }
    return vid;
  } catch {
    return `vid-${datePrefix}-00001`;
  }
}

export function getOrCreateSessionId(): string {
  const datePrefix = formatDatePrefix();
  if (typeof window === "undefined") return `sid-${datePrefix}-00001`;
  try {
    let sid = sessionStorage.getItem("lcl_session_id");
    if (!sid || !/^sid-\d{6}-\d{5}$/.test(sid)) {
      const seqKey = `lcl_sid_seq_${datePrefix}`;
      let seq = parseInt(localStorage.getItem(seqKey) || "0", 10) + 1;
      localStorage.setItem(seqKey, seq.toString());
      sid = `sid-${datePrefix}-${seq.toString().padStart(5, "0")}`;
      sessionStorage.setItem("lcl_session_id", sid);
    }
    return sid;
  } catch {
    return `sid-${datePrefix}-00001`;
  }
}

export function getUtmParams(): { source: string; medium: string; campaign: string } {
  if (typeof window === "undefined") return { source: "", medium: "", campaign: "" };
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      source: urlParams.get("utm_source") || "",
      medium: urlParams.get("utm_medium") || "",
      campaign: urlParams.get("utm_campaign") || ""
    };
  } catch {
    return { source: "", medium: "", campaign: "" };
  }
}

export function trackWhatsAppClick(selectedTopic?: string): WhatsAppAnalyticsPayload {
  const now = new Date();
  const utm = getUtmParams();

  const payload: WhatsAppAnalyticsPayload & { topic?: string } = {
    timestamp: now.toISOString(),
    unixTimestamp: now.getTime(),
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    pageTitle: typeof document !== "undefined" ? document.title : "LoopCodeLabs",
    visitorId: getOrCreateVisitorId(),
    sessionId: getOrCreateSessionId(),
    device: getDeviceType(),
    browser: getBrowserName(),
    referrer: typeof document !== "undefined" ? document.referrer || "Direct" : "Direct",
    utmSource: utm.source,
    utmMedium: utm.medium,
    utmCampaign: utm.campaign,
    language: typeof navigator !== "undefined" ? navigator.language : "en-US",
    screenResolution: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "1920x1080",
    topic: selectedTopic || undefined
  };

  // 1. Log to developer console
  console.log("[Analytics] WhatsApp Click Event Recorded:", payload, selectedTopic ? `Topic: ${selectedTopic}` : "");

  // 2. Persist locally for admin dashboard analytics feed
  try {
    const existing = localStorage.getItem("lcl_whatsapp_clicks_log");
    const logs: WhatsAppAnalyticsPayload[] = existing ? JSON.parse(existing) : [];
    logs.unshift(payload);
    // Keep max 100 entries
    if (logs.length > 100) logs.pop();
    localStorage.setItem("lcl_whatsapp_clicks_log", JSON.stringify(logs));
  } catch (err) {
    // Fail gracefully
  }

  // 3. Network call to backend API
  if (typeof window !== "undefined") {
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/whatsapp-click", blob);
      } else {
        fetch("/api/analytics/whatsapp-click", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch(() => {});
      }
    } catch {
      // Ignore failures
    }
  }

  return payload;
}
