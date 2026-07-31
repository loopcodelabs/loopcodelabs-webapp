import { WhatsAppConfig } from "./whatsappConfig";

export function getDeviceType(): string {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua) || window.innerWidth < 768) {
    return "Mobile";
  }
  return "Desktop";
}

export function getBrowserName(): string {
  if (typeof window === "undefined") return "Browser";
  const ua = navigator.userAgent;
  if ((navigator as any).brave || (window as any).brave || ua.includes("Brave")) return "Brave";
  if (ua.includes("Edg/") || ua.includes("Edge/") || ua.includes("EdgA/") || ua.includes("EdgiOS/") || ua.includes("Edge") || ua.includes("Edg")) return "Edge";
  if (ua.includes("Firefox/") || ua.includes("Firefox") || ua.includes("FxiOS")) return "Firefox";
  if (ua.includes("SamsungBrowser")) return "Samsung Internet";
  if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
  if (ua.includes("Chrome/") || ua.includes("Chrome") || ua.includes("CriOS")) return "Chrome";
  if (ua.includes("Safari/") || ua.includes("Safari")) return "Safari";
  return "Browser";
}

export function formatCurrentTime(): string {
  try {
    return new Date().toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    });
  } catch {
    return new Date().toISOString();
  }
}

export function generatePreFilledMessage(urlPath: string, hash: string, title: string): string {
  const combined = (urlPath + hash + " " + title).toLowerCase();

  if (combined.includes("web") || combined.includes("website") || combined.includes("custom-web")) {
    return "Hi,\n\nI am interested in developing a business website.\n\nCan we discuss my requirements?";
  }
  if (combined.includes("ai") || combined.includes("agent") || combined.includes("automation") || combined.includes("bot")) {
    return "Hi,\n\nI would like to build an AI application.\n\nPlease contact me.";
  }
  if (combined.includes("mobile") || combined.includes("app") || combined.includes("android") || combined.includes("ios")) {
    return "Hi,\n\nI need an Android/iOS application.\n\nPlease share the next steps.";
  }
  if (combined.includes("seo") || combined.includes("digital")) {
    return "Hi,\n\nI am interested in SEO services for my business.";
  }
  if (combined.includes("pricing") || combined.includes("estimate") || combined.includes("calculator")) {
    return "Hi,\n\nI'd like to know the pricing for your services.";
  }
  if (combined.includes("blog") || combined.includes("insights") || combined.includes("article")) {
    return "Hi,\n\nI was reading your blog and have a few questions.";
  }
  if (combined.includes("about") || combined.includes("story") || combined.includes("team")) {
    return "Hi,\n\nI was reading about LoopCodeLabs and would like to connect.";
  }
  if (urlPath === "/" || urlPath === "" || hash === "" || hash === "#" || hash === "#hero") {
    return "Hi LoopCodeLabs,\n\nI came across your website and would like to know more about your services.";
  }

  return "Hi,\n\nI am interested in your services.";
}

export function buildWhatsAppUrl(customTextOverride?: string): string {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://loopcodelabs.in/";
  const path = typeof window !== "undefined" ? window.location.pathname : "/";
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  const pageTitle = typeof document !== "undefined" && document.title ? document.title : "LoopCodeLabs";
  
  const baseMessage = customTextOverride || generatePreFilledMessage(path, hash, pageTitle);
  
  const device = getDeviceType();
  const referrer = typeof document !== "undefined" && document.referrer ? document.referrer : "Direct";
  const formattedTime = formatCurrentTime();

  const contextBlock = `
----------------
Context:
• Page: ${pageTitle.replace(" | LoopCodeLabs", "")}
• URL: ${currentUrl}
• Referrer: ${referrer}
• Device: ${device}
• Time: ${formattedTime}`;

  const fullMessage = `${baseMessage}\n${contextBlock}`;

  const encoded = encodeURIComponent(fullMessage);
  const cleanPhone = WhatsAppConfig.phone.replace(/[^0-9]/g, "");

  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}
