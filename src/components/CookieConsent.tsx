import React, { useState, useEffect } from "react";
import { Cookie, ShieldCheck, Settings, X, Check } from "lucide-react";
import { initAnalytics } from "../utils/analyticsTracker";
import { safeLocalStorage } from "../utils/storage";

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = safeLocalStorage.getItem("lcl_cookie_consent");
    } catch (e) {}

    if (!consent) {
      // Delay slightly for smooth page entry
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    } else if (consent === "accepted") {
      initAnalytics();
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      safeLocalStorage.setItem("lcl_cookie_consent", "accepted");
      safeLocalStorage.setItem("lcl_consent_analytics", "true");
      safeLocalStorage.setItem("lcl_consent_marketing", "true");
    } catch (e) {}
    setIsVisible(false);
    initAnalytics();
  };

  const handleEssentialOnly = () => {
    try {
      safeLocalStorage.setItem("lcl_cookie_consent", "declined");
      safeLocalStorage.setItem("lcl_consent_analytics", "false");
      safeLocalStorage.setItem("lcl_consent_marketing", "false");
    } catch (e) {}
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const finalConsent = analyticsEnabled ? "accepted" : "declined";
    try {
      safeLocalStorage.setItem("lcl_cookie_consent", finalConsent);
      safeLocalStorage.setItem("lcl_consent_analytics", analyticsEnabled ? "true" : "false");
      safeLocalStorage.setItem("lcl_consent_marketing", marketingEnabled ? "true" : "false");
    } catch (e) {}
    setIsVisible(false);
    setShowSettings(false);
    if (analyticsEnabled) {
      initAnalytics();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Bottom Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-lg z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="p-5 rounded-2xl bg-zinc-950/95 border border-zinc-800 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Cookie & Privacy Preferences
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  GDPR & DPDP
                </span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We use privacy-friendly local analytics to measure page usage and improve our Software Labs services. No personal identifiers are sold.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-900">
            <button
              onClick={() => setShowSettings(true)}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors px-2 py-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              Customize
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEssentialOnly}
                className="px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 rounded-xl transition-all"
              >
                Essential Only
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 text-xs font-bold text-zinc-950 bg-teal-400 hover:bg-teal-300 rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setShowSettings(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-base">
                <ShieldCheck className="w-5 h-5" />
                Manage Privacy Controls
              </div>
              <p className="text-xs text-zinc-400">
                Choose which categories of analytical data and cookies you allow LoopCodeLabs to use.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Essential */}
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Strictly Necessary</p>
                  <p className="text-[11px] text-zinc-400">Required for website security and basic navigation.</p>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-800">
                  Always Active
                </span>
              </div>

              {/* Performance / Analytics */}
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Anonymous Performance Analytics</p>
                  <p className="text-[11px] text-zinc-400">Tracks pages visited, load times, and button clicks.</p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="w-4 h-4 accent-teal-400 cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Campaign & Advertising Cookies</p>
                  <p className="text-[11px] text-zinc-400">Used for tracking optional campaign conversions (Meta, Google Ads).</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingEnabled}
                  onChange={(e) => setMarketingEnabled(e.target.checked)}
                  className="w-4 h-4 accent-teal-400 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-xs font-bold bg-teal-400 hover:bg-teal-300 text-zinc-950 rounded-xl"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
