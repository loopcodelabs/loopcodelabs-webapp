import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Clock, ChevronRight, CheckCircle2 } from "lucide-react";
import { WhatsAppConfig } from "../utils/whatsappConfig";
import { getBusinessStatus, BusinessStatus } from "../utils/businessHours";
import { buildWhatsAppUrl } from "../utils/whatsappMessage";
import { trackWhatsAppClick } from "../utils/analytics";
import "../styles/whatsapp-widget.css";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showTeaser, setShowTeaser] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [businessStatus, setBusinessStatus] = useState<BusinessStatus>(() => getBusinessStatus());

  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const primaryCtaRef = useRef<HTMLButtonElement>(null);

  // Update business status periodically (every 60 seconds)
  useEffect(() => {
    setBusinessStatus(getBusinessStatus());
    const interval = setInterval(() => {
      setBusinessStatus(getBusinessStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // 30-Second Inactive Teaser logic
  useEffect(() => {
    try {
      const teaserShown = sessionStorage.getItem("lcl_wa_teaser_shown");
      if (teaserShown) return;

      const timer = setTimeout(() => {
        setShowTeaser(true);
        sessionStorage.setItem("lcl_wa_teaser_shown", "true");

        // Automatically collapse teaser after 6 seconds
        const autoHideTimer = setTimeout(() => {
          setShowTeaser(false);
        }, 6000);

        return () => clearTimeout(autoHideTimer);
      }, 30000); // 30 seconds

      return () => clearTimeout(timer);
    } catch {
      // Ignore sessionStorage error
    }
  }, []);

  // Handle click outside to close popup
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Handle Escape key to close popup & focus trapping
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    
    // Focus primary CTA button when opened for accessibility
    setTimeout(() => {
      primaryCtaRef.current?.focus();
    }, 100);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleToggleOpen = () => {
    setShowTeaser(false);
    try {
      sessionStorage.setItem("lcl_wa_teaser_shown", "true");
    } catch {
      // Ignore
    }

    setIsOpen((prev) => !prev);
  };

  const handleStartChat = (topicOverride?: string) => {
    const activeTopic = topicOverride || selectedService || undefined;
    
    // Track click event in analytics
    trackWhatsAppClick(activeTopic);

    // Build URL with page-aware pre-filled message & metadata context
    let customMsg: string | undefined = undefined;
    if (activeTopic) {
      customMsg = `Hi LoopCodeLabs,\n\nI am interested in ${activeTopic}.\n\nCan we discuss my requirements?`;
    }

    const waUrl = buildWhatsAppUrl(customMsg);

    // Open WhatsApp URL in new window/app
    window.open(waUrl, "_blank", "noopener,noreferrer");

    // Close popup
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[999] font-sans pointer-events-none">
      <div className="relative pointer-events-auto flex flex-col items-end">
        
        {/* Teaser Tooltip Bubble (Shows once after 30s) */}
        {showTeaser && !isOpen && (
          <div
            role="status"
            aria-live="polite"
            className="wa-teaser-animate mb-3 bg-zinc-900/95 dark:bg-zinc-900/95 bg-white text-zinc-100 dark:text-zinc-100 text-zinc-900 border border-zinc-700/80 dark:border-zinc-700/80 border-zinc-200 shadow-2xl p-3.5 px-4 rounded-2xl max-w-[240px] relative flex items-start gap-2.5 backdrop-blur-lg cursor-pointer"
            onClick={handleToggleOpen}
          >
            <div className="p-1.5 rounded-full bg-[#25D366]/20 text-[#25D366] shrink-0 mt-0.5">
              <MessageCircle className="w-4 h-4 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight text-white dark:text-white text-zinc-900">
                Need help?
              </p>
              <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-400 text-zinc-600 mt-0.5 leading-snug">
                Chat with us on WhatsApp.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              aria-label="Close message"
              className="text-zinc-400 hover:text-white p-0.5 rounded-full hover:bg-zinc-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            
            {/* Arrow Pointer */}
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-zinc-900 dark:bg-zinc-900 bg-white border-r border-b border-zinc-700/80 dark:border-zinc-700/80 border-zinc-200 rotate-45"></div>
          </div>
        )}

        {/* Smart Popup Modal */}
        {isOpen && (
          <div
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="wa-modal-title"
            aria-describedby="wa-modal-desc"
            className="wa-popup-animate mb-3 sm:mb-4 w-[calc(100vw-2.5rem)] sm:w-[360px] max-w-[360px] max-h-[calc(100vh-6.5rem)] flex flex-col bg-zinc-950 border border-zinc-800 rounded-3xl shadow-2xl shadow-black/90 overflow-hidden backdrop-blur-xl transition-all duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 p-4 sm:p-5 border-b border-zinc-800/80 relative shrink-0">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* WhatsApp Avatar Icon */}
                  <div className="relative shrink-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md shadow-[#25D366]/20">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                    </div>
                    {/* Realtime Status Indicator Dot */}
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-900 ${businessStatus.badgeColor}`} />
                  </div>

                  <div>
                    <h3 id="wa-modal-title" className="font-sans font-extrabold text-xs sm:text-sm text-zinc-100 tracking-tight flex items-center gap-1.5">
                      <span>👋 Chat with {WhatsAppConfig.businessName}</span>
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] sm:text-[11px] font-bold text-zinc-200">
                        {businessStatus.statusText}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-[10px] text-zinc-400 font-medium">
                        {businessStatus.isOnline ? "Fast response" : "Offline mode"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close WhatsApp chat popup"
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Subtext info */}
              <div className="mt-2.5 sm:mt-3 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-300 bg-zinc-900/90 p-2 px-3 rounded-xl border border-zinc-800/80">
                <Clock className="w-3.5 h-3.5 text-accent shrink-0" />
                <p className="leading-tight">{businessStatus.subtext}</p>
              </div>
            </div>

            {/* Body */}
            <div id="wa-modal-desc" className="p-4 sm:p-5 space-y-3 sm:space-y-4 overflow-y-auto wa-custom-scroll bg-zinc-950">
              <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent mb-0.5 sm:mb-1">
                  Need help?
                </p>
                <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                  Our team can assist you with:
                </p>
              </div>

              {/* Quick Topic Buttons */}
              <div className="space-y-1.5 sm:space-y-2">
                {WhatsAppConfig.servicesList.map((serviceName) => {
                  const isSelected = selectedService === serviceName;
                  return (
                    <button
                      key={serviceName}
                      type="button"
                      onClick={() => setSelectedService(isSelected ? null : serviceName)}
                      className={`group w-full text-left px-3.5 py-2 sm:py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-accent/20 border border-accent text-accent font-semibold shadow-[0_0_12px_rgba(43,186,165,0.15)]"
                          : "bg-zinc-900/90 hover:bg-zinc-800/90 text-zinc-100 hover:text-white border border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-accent shadow-[0_0_6px_rgba(43,186,165,0.8)]" : "bg-accent/70"}`} />
                        {serviceName}
                      </span>
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Primary CTA */}
              <div className="pt-1 sm:pt-2 space-y-1.5 sm:space-y-2">
                <button
                  ref={primaryCtaRef}
                  type="button"
                  onClick={() => handleStartChat()}
                  className="w-full py-3 sm:py-3.5 px-4 sm:px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-[0.98] text-zinc-950 font-sans font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-[#25D366]/25 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Start WhatsApp Chat</span>
                  <Send className="w-3.5 h-3.5 shrink-0" />
                </button>

                {/* Secondary action: Close button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-1.5 text-center text-[11px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Circular Toggle Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggleOpen}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Smart Chat Widget"}
          className={`wa-btn-pulse w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-true-black shadow-2xl shadow-[#25D366]/40 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group border-2 border-white/20 relative ${
            isOpen ? "rotate-90 scale-105" : "hover:scale-105"
          }`}
        >
          {/* Status Dot on Floating Button */}
          <span className={`absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${businessStatus.badgeColor}`} />

          {isOpen ? (
            <X className="w-7 h-7 text-true-black stroke-[2.5]" />
          ) : (
            <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-true-black" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
