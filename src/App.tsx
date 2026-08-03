import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LetsBuild from "./components/LetsBuild";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Process from "./components/Process";
import LetsTalk from "./components/LetsTalk";
import FAQ from "./components/FAQ";
import EstimateCalculator from "./components/EstimateCalculator";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import ServiceLandingPage from "./components/ServiceLandingPage";
import PortfolioDetail from "./components/PortfolioDetail";
import BlogHub from "./components/BlogHub";
import Preloader from "./components/Preloader";
import AboutLandingPage from "./components/AboutLandingPage";
import AIAgents from "./components/AIAgents";
import AdminDashboard from "./components/AdminDashboard";
import WhatsAppWidget from "./components/WhatsAppWidget";
import { CookieConsent } from "./components/CookieConsent";
import { initAnalytics, trackPageView } from "./utils/analyticsTracker";
import { User } from "./types";
import { useWebsite } from "./context/WebsiteContext";
import { safeLocalStorage, safeSessionStorage } from "./utils/storage";

export default function App() {
  const { modules, theme: cmsTheme, updateTheme: updateCmsTheme, services, blogs } = useWebsite();
  const theme = cmsTheme.mode || "dark";
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [showLoader, setShowLoader] = useState<boolean>(() => {
    const played = safeSessionStorage.getItem("preloader-played");
    return !played;
  });

  const [currentHash, setCurrentHash] = useState(window.location.hash || "#");

  // Fetch current user from server (using either token in localStorage or cookie)
  const fetchCurrentUser = async (tokenOverride?: string) => {
    try {
      const activeToken = tokenOverride || safeLocalStorage.getItem("auth_token");
      const headers: HeadersInit = {};
      if (activeToken) {
        headers["Authorization"] = `Bearer ${activeToken}`;
      }
      
      const res = await fetch("/api/auth/me", { headers });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // If not ok, clear local token if any
        if (!tokenOverride) {
          safeLocalStorage.removeItem("auth_token");
          setUser(null);
        }
      }
    } catch (err) {
      console.error("Error fetching current user:", err);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    initAnalytics();
  }, []);

  // Listen for message from popup window
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Validate origin is from AI Studio preview, localhost, or the current origin (essential for custom domains)
      const origin = event.origin;
      const isAllowedOrigin = 
        origin === window.location.origin ||
        origin.endsWith(".run.app") || 
        origin.includes("localhost") || 
        origin.includes("127.0.0.1");

      if (!isAllowedOrigin) {
        return;
      }
      if (event.data?.type === "OAUTH_AUTH_SUCCESS") {
        const { token, user: profile } = event.data;
        if (token) {
          safeLocalStorage.setItem("auth_token", token);
        }
        if (profile) {
          setUser(profile);
        } else {
          fetchCurrentUser(token);
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const login = async () => {
    try {
      let url = "";

      // 1. Attempt to fetch Google auth URL from Express backend
      try {
        const res = await fetch("/api/auth/google/url");
        if (res.ok) {
          const data = await res.json();
          url = data.url;
        }
      } catch (e) {
        console.warn("Backend /api/auth/google/url unreachable, falling back to client-side OAuth URL generation");
      }

      // 2. Client-side fallback if backend API endpoint was not reachable or returned error (e.g. on Vercel static SPA build)
      if (!url) {
        const clientId = ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) || "";
        if (clientId) {
          const redirectUri = `${window.location.origin}/auth/callback`;
          const params = new URLSearchParams({
            client_id: clientId,
            redirect_uri: redirectUri,
            response_type: "code",
            scope: "openid email profile",
            access_type: "offline",
            prompt: "consent"
          });
          url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        } else {
          alert("Google Client ID is missing. Please set GOOGLE_CLIENT_ID (or VITE_GOOGLE_CLIENT_ID) in your environment variables on Vercel.");
          throw new Error("Failed to get Google auth URL from server and VITE_GOOGLE_CLIENT_ID is not configured.");
        }
      }

      // 3. Open popup with Google auth url
      const width = 500;
      const height = 650;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;
      
      const popup = window.open(
        url,
        "google_login_popup",
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
      );

      if (!popup) {
        alert("Popup was blocked by your browser. Please allow popups for this site to log in.");
      }
    } catch (err) {
      console.error("Google login error:", err);
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      safeLocalStorage.removeItem("auth_token");
      setUser(null);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#";
      setCurrentHash(hash);
      trackPageView(hash, document.title);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    // If we are switching to a distinct page view, reset scroll position
    const isHomepageSection = ["#services", "#work", "#process", "#contact"].includes(currentHash);
    if (!isHomepageSection) {
      window.scrollTo(0, 0);
    }
  }, [currentHash]);

  // Max SEO dynamic meta/title sync
  useEffect(() => {
    let title = "loopCode Labs | High-Fidelity Enterprise Software Lab";
    let desc = "Bespoke digital architecture, software development, AI automation solutions, and business consulting.";

    if (currentHash === "#admin") {
      title = "Admin Console | loopCode Labs";
      desc = "loopCode Labs administrator control console. Manage services, blogs, modules, and visual styling theme settings.";
    } else if (currentHash.startsWith("#services/")) {
      const slug = currentHash.replace("#services/", "");
      const svc = services.find(s => s.slug === slug);
      if (svc) {
        title = `${svc.title} | Services | loopCode Labs`;
        desc = `${svc.description} Spec details: ${svc.details.substring(0, 120)}`;
      } else {
        title = "Our Capabilities & Services | loopCode Labs";
      }
    } else if (currentHash === "#services") {
      title = "Our Capabilities & Services | loopCode Labs";
      desc = "Discover how loopCode Labs accelerates digital transformation through Website Development, Mobile Apps, AI Automation, and Custom Business Consulting.";
    } else if (currentHash.startsWith("#portfolio/")) {
      const projId = currentHash.replace("#portfolio/", "");
      const name = projId.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      title = `${name} Case Study | loopCode Labs`;
      desc = `In-depth breakdown of loopCode Labs' custom solution for ${name}. View design tokens, tech stack, and production outcomes.`;
    } else if (currentHash.startsWith("#blog")) {
      title = "Insights & Innovations | loopCode Labs";
      desc = "Expert articles on software architecture, artificial intelligence agents, and growth engineering to scale your operation.";
    } else if (currentHash === "#pricing") {
      title = "Project Estimation & Cost Calculator | loopCode Labs";
      desc = "Calculate precise project pricing estimates and get custom software development proposals with our interactive cost tool.";
    } else if (currentHash === "#about") {
      title = "About Us | loopCode Labs";
      desc = "loopCode Labs exists to help businesses become extraordinary by combining human ingenuity with intelligent technology. We think boldly and build meticulously.";
    }

    // Set page Title
    document.title = title;

    // Set Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);
  }, [currentHash, services, blogs]);

  const toggleTheme = () => {
    const nextMode = theme === "dark" ? "light" : "dark";
    if (nextMode === "light") {
      updateCmsTheme({
        mode: "light",
        bgColor: "#f8fafc",
        cardColor: "#ffffff"
      });
    } else {
      updateCmsTheme({
        mode: "dark",
        bgColor: "#09090b",
        cardColor: "#18181b"
      });
    }
  };

  const renderContent = () => {
    if (currentHash === "#admin") {
      if (authLoading) {
        return (
          <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Verifying Administrator Credentials...</p>
          </div>
        );
      }

      if (!user) {
        return (
          <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 text-center relative z-20">
            <div className="max-w-md w-full bg-zinc-950/80 border border-zinc-900/80 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-500/5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest text-red-400 bg-red-500/10 border border-red-500/20 uppercase mb-3 inline-block">
                Restricted Admin Zone
              </span>

              <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                Authentication Required
              </h2>

              <p className="text-xs text-zinc-400 leading-relaxed mb-8">
                Access to the loopCode Labs CMS Admin Console is restricted to authorized administrative accounts only. Please authenticate with an approved Google account.
              </p>

              <div className="space-y-3">
                <button
                  onClick={login}
                  className="w-full py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider text-text-primary bg-transparent border border-accent hover:bg-black hover:text-[#2bbaa6] transition-all duration-300 shadow-lg hover:shadow-accent/20 flex items-center justify-center gap-2 cursor-pointer group whitespace-nowrap"
                >
                  <svg className="w-4 h-4 text-accent group-hover:text-[#2bbaa6] transition-colors fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.53 5.53 0 018.4 13c0-3.047 2.483-5.514 5.53-5.514 1.395 0 2.673.511 3.657 1.353l3.221-3.222C18.84 3.737 16.488 2.4 13.93 2.4A9.6 9.6 0 004.33 12a9.6 9.6 0 009.6 9.6c5.215 0 9.6-3.763 9.6-9.6 0-.616-.062-1.222-.17-1.715H12.24z" />
                  </svg>
                  Sign In with Google Admin
                </button>

                <button
                  onClick={() => { window.location.hash = "#"; }}
                  className="w-full py-3 px-6 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-900/60 transition-all cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </div>
        );
      }

      return <AdminDashboard onBack={() => { window.location.hash = "#"; }} />;
    }
    if (currentHash === "#services" || currentHash.startsWith("#services/")) {
      const serviceId = currentHash.startsWith("#services/") ? currentHash.replace("#services/", "") : undefined;
      return <ServiceLandingPage initialServiceSlug={serviceId} onBack={() => { window.location.hash = "#"; }} />;
    }
    if (currentHash.startsWith("#portfolio/")) {
      const projectId = currentHash.replace("#portfolio/", "");
      return <PortfolioDetail projectId={projectId} onBack={() => { window.location.hash = "#work"; }} />;
    }
    if (currentHash.startsWith("#blog")) {
      return <BlogHub onBack={() => { window.location.hash = "#"; }} />;
    }
    if (currentHash === "#pricing") {
      return (
        <div className="relative z-10">
          <EstimateCalculator onBack={() => { window.location.hash = "#"; }} />
          <Contact />
        </div>
      );
    }
    if (currentHash === "#about") {
      return <AboutLandingPage onBack={() => { window.location.hash = "#"; }} />;
    }

    const sortedModules = [...modules]
      .sort((a, b) => a.order - b.order)
      .filter(m => m.enabled);

    return (
      <main className="relative z-10" id="primary-home-content">
        {sortedModules.map(m => {
          switch (m.id) {
            case "hero": return <Hero key={m.id} />;
            case "letsbuild": return <LetsBuild key={m.id} />;
            case "marquee": return <Marquee key={m.id} />;
            case "services": return <Services key={m.id} />;
            case "aiagents": return <AIAgents key={m.id} />;
            case "projects": return <Projects key={m.id} />;
            case "process": return <Process key={m.id} />;
            case "letstalk": return <LetsTalk key={m.id} />;
            case "faq": return <FAQ key={m.id} />;
            case "contact": return <Contact key={m.id} />;
            default: return null;
          }
        })}
      </main>
    );
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-main)] text-zinc-100 overflow-x-hidden font-sans transition-colors duration-300">
      {/* Premium custom website loader */}
      {showLoader && (
        <Preloader
          onComplete={() => {
            safeSessionStorage.setItem("preloader-played", "true");
            setShowLoader(false);
          }}
        />
      )}

      {/* Premium custom mouse follower rendered at the top layer */}
      <CustomCursor />

      {/* Universal ambient gradients for the entire background */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-purple-950/15 via-blue-950/5 to-transparent pointer-events-none z-0 dark:opacity-100 opacity-30 transition-opacity duration-300" />
      {(currentHash === "#" || currentHash === "" || currentHash === "#work" || currentHash === "#process" || currentHash === "#contact" || currentHash === "#faq") && (
        <div className="absolute top-[2500px] left-0 right-0 h-[800px] bg-gradient-to-t from-purple-950/5 via-teal-950/5 to-transparent pointer-events-none z-0 dark:opacity-100 opacity-30 transition-opacity duration-300" />
      )}

      {/* Primary components */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        user={user}
        onLogin={login}
        onLogout={logout}
      />
      {renderContent()}
      {currentHash !== "#admin" && <Footer />}

      {/* Floating WhatsApp Smart Chat Widget */}
      <WhatsAppWidget />

      {/* Cookie Consent Banner for GDPR and DPDP Compliance */}
      <CookieConsent />
    </div>
  );
}


