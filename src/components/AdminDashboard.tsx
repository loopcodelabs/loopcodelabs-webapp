import React, { useState } from "react";
import { useWebsite, Service, BlogArticle, AIScenario, HomepageModule } from "../context/WebsiteContext";
import { 
  ArrowLeft, 
  Settings, 
  Layers, 
  Palette, 
  Briefcase, 
  BookOpen, 
  Cpu, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  RefreshCw, 
  CheckCircle, 
  Check, 
  Monitor, 
  Mail, 
  Phone, 
  MapPin,
  Save,
  Globe,
  Sun,
  Moon,
  MessageCircle,
  Activity,
  BarChart2,
  FileText,
  ShieldCheck,
  KeyRound,
  UserCheck,
  Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnalyticsDashboard } from "./AnalyticsDashboard";

interface AdminDashboardProps {
  onBack: () => void;
}

type AdminTab = "general" | "modules" | "theme" | "services" | "blogs" | "scenarios" | "whatsapp" | "analytics" | "security";

export default function AdminDashboard({ onBack }: AdminDashboardProps) {
  const {
    modules,
    theme,
    services,
    blogs,
    scenarios,
    siteSettings,
    updateModule,
    reorderModules,
    updateTheme,
    addService,
    updateService,
    deleteService,
    addBlog,
    updateBlog,
    deleteBlog,
    addAIScenario,
    updateAIScenario,
    deleteAIScenario,
    updateSettings,
    resetAll,
    generateAutomatedPost
  } = useWebsite();

  const [activeTab, setActiveTab] = useState<AdminTab>("general");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // WhatsApp real-time logs state
  const [whatsappLogs, setWhatsappLogs] = useState<any[]>([]);
  const [loadingWhatsApp, setLoadingWhatsApp] = useState<boolean>(false);

  // Database login activity logs state
  const [loginLogs, setLoginLogs] = useState<any[]>([]);
  const [loadingLoginLogs, setLoadingLoginLogs] = useState<boolean>(false);

  const fetchWhatsAppLogs = async () => {
    setLoadingWhatsApp(true);
    try {
      const res = await fetch("/api/analytics/whatsapp-clicks");
      const data = await res.json();
      if (data.success && Array.isArray(data.logs)) {
        setWhatsappLogs(data.logs);
      }
    } catch (err) {
      console.error("Error fetching WhatsApp click logs:", err);
    } finally {
      setLoadingWhatsApp(false);
    }
  };

  const handleClearWhatsAppLogs = async () => {
    try {
      await fetch("/api/analytics/whatsapp-clicks/clear", { method: "POST" });
      localStorage.removeItem("lcl_whatsapp_clicks_log");
      setWhatsappLogs([]);
      showSuccess("WhatsApp click logs cleared from database!");
    } catch (e) {
      console.error("Error clearing WhatsApp logs:", e);
    }
  };

  const fetchLoginLogs = async () => {
    setLoadingLoginLogs(true);
    try {
      const res = await fetch("/api/admin/login-logs");
      const data = await res.json();
      if (data.success && Array.isArray(data.logs)) {
        setLoginLogs(data.logs);
      }
    } catch (err) {
      console.error("Error fetching database login logs:", err);
    } finally {
      setLoadingLoginLogs(false);
    }
  };

  const handleClearLoginLogs = async () => {
    try {
      await fetch("/api/admin/login-logs/clear", { method: "POST" });
      setLoginLogs([]);
      showSuccess("Database login activity logs cleared!");
    } catch (e) {
      console.error("Error clearing login logs:", e);
    }
  };

  React.useEffect(() => {
    if (activeTab === "whatsapp") {
      fetchWhatsAppLogs();
    } else if (activeTab === "security") {
      fetchLoginLogs();
    }
  }, [activeTab]);

  // Editable service state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({});

  // Editable blog state
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<Partial<BlogArticle>>({});

  // Editable scenario state
  const [editingScenarioId, setEditingScenarioId] = useState<string | null>(null);
  const [scenarioForm, setScenarioForm] = useState<Partial<AIScenario>>({});

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess("General settings updated successfully");
  };

  // Reorder sorted modules list
  const sortedModules = [...modules].sort((a, b) => a.order - b.order);

  // Helper to convert HEX to RGB string
  const hexToRgb = (hex: string): string => {
    const cleanHex = hex.replace(/^#/, "");
    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16);
      const g = parseInt(cleanHex[1] + cleanHex[1], 16);
      const b = parseInt(cleanHex[2] + cleanHex[2], 16);
      return `${r}, ${g}, ${b}`;
    } else if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      return `${r}, ${g}, ${b}`;
    }
    return "43, 186, 165";
  };

  // Curated preset themes for dark & light mode
  const themePresets = [
    {
      name: "Classic Lab (Dark)",
      mode: "dark" as const,
      accentColor: "#2BBAA5",
      accentColorRgb: "43, 186, 165",
      bgColor: "#09090b",
      cardColor: "#18181b",
      fontFamily: "Space Grotesk",
      desc: "Deep tech-focused dark signature look."
    },
    {
      name: "Swiss Clean (Light)",
      mode: "light" as const,
      accentColor: "#161616",
      accentColorRgb: "22, 22, 22",
      bgColor: "#f8fafc",
      cardColor: "#ffffff",
      fontFamily: "Inter",
      desc: "High-contrast corporate Swiss light aesthetic."
    },
    {
      name: "Nordic Emerald (Light)",
      mode: "light" as const,
      accentColor: "#0F766E",
      accentColorRgb: "15, 118, 110",
      bgColor: "#f0f4f4",
      cardColor: "#ffffff",
      fontFamily: "Space Grotesk",
      desc: "Fresh teal accents on crisp frosty paper."
    },
    {
      name: "Cosmic Cyber (Dark)",
      mode: "dark" as const,
      accentColor: "#8B5CF6",
      accentColorRgb: "139, 92, 246",
      bgColor: "#030014",
      cardColor: "#0a0521",
      fontFamily: "JetBrains Mono",
      desc: "Immersive deep indigo visual landscape."
    },
    {
      name: "Sunset Glow (Dark)",
      mode: "dark" as const,
      accentColor: "#F97316",
      accentColorRgb: "249, 115, 22",
      bgColor: "#0f0d0c",
      cardColor: "#1a1715",
      fontFamily: "Outfit",
      desc: "Warm dark charcoal layout with sunset vibes."
    },
    {
      name: "Tuscan Sand (Light)",
      mode: "light" as const,
      accentColor: "#B45309",
      accentColorRgb: "180, 83, 9",
      bgColor: "#faf6f0",
      cardColor: "#ffffff",
      fontFamily: "Outfit",
      desc: "Warm natural materials with rich amber accents."
    }
  ];

  // Accent Color presets
  const colorPresets = [
    { name: "Teal Green", hex: "#2BBAA5", rgb: "43, 186, 165" },
    { name: "Royal Violet", hex: "#8B5CF6", rgb: "139, 92, 246" },
    { name: "Neon Lime", hex: "#A3E635", rgb: "163, 230, 53" },
    { name: "Sunset Orange", hex: "#F97316", rgb: "249, 115, 22" },
    { name: "Electric Blue", hex: "#3B82F6", rgb: "59, 130, 246" },
    { name: "Premium Gold", hex: "#EAB308", rgb: "234, 179, 8" }
  ];

  // Font family presets
  const fontPresets = [
    { name: "Space Grotesk (Tech & Modern)", value: "Space Grotesk" },
    { name: "JetBrains Mono (Technical Minimalist)", value: "JetBrains Mono" },
    { name: "Inter (Corporate Swiss)", value: "Inter" },
    { name: "Outfit (Warm Display)", value: "Outfit" }
  ];

  return (
    <div className="min-h-screen bg-[#070709] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative z-30 font-sans text-zinc-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 border-b border-zinc-900 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">[ SYSTEM OPERATIONS ]</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded-md font-semibold">
                  5m Inactivity Session Limit Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">CMS Admin Console</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/LoopCodeLabs_Tech_Stack_Documentation.docx"
              download="LoopCodeLabs_Tech_Stack_Documentation.docx"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-800/60 hover:bg-cyan-900/60 hover:text-cyan-300 transition-all cursor-pointer shadow-sm"
              title="Download Technology Stack Reference Manual (.docx)"
            >
              <FileText className="w-3.5 h-3.5" />
              Tech Stack (.docx)
            </a>

            <a
              href="/LoopCodeLabs_API_Documentation.docx"
              download="LoopCodeLabs_API_Documentation.docx"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/60 hover:text-emerald-300 transition-all cursor-pointer shadow-sm"
              title="Download API Reference Manual (.docx)"
            >
              <FileText className="w-3.5 h-3.5" />
              API Manual (.docx)
            </a>

            <button
              onClick={() => {
                resetAll();
                showSuccess("All values restored to default defaults");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:text-white transition-all cursor-pointer"
              title="Reset state to factory defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Factory Reset
            </button>
            
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onBack();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-950 bg-accent hover:bg-accent/90 transition-all cursor-pointer shadow-lg shadow-accent/20"
            >
              <Monitor className="w-3.5 h-3.5" />
              View Live Site
            </a>
          </div>
        </div>

        {/* Global notification banner */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/20 text-accent text-xs font-semibold flex items-center gap-2 shadow-lg"
            >
              <CheckCircle className="w-4 h-4" />
              {successMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar navigation */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-3 mb-2 font-bold">MANAGEMENT TABS</p>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("general")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "general"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <Settings className="w-4 h-4 text-accent" />
                General Details
              </button>
              
              <button
                onClick={() => setActiveTab("modules")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "modules"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <Layers className="w-4 h-4 text-accent" />
                Homepage Sections
              </button>

              <button
                onClick={() => setActiveTab("theme")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "theme"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <Palette className="w-4 h-4 text-accent" />
                Theme & Custom CSS
              </button>

              <button
                onClick={() => setActiveTab("services")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "services"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <Briefcase className="w-4 h-4 text-accent" />
                Services Catalog
              </button>

              <button
                onClick={() => setActiveTab("blogs")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "blogs"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <BookOpen className="w-4 h-4 text-accent" />
                Automated Blogs
              </button>

              <button
                onClick={() => setActiveTab("scenarios")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "scenarios"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <Cpu className="w-4 h-4 text-accent" />
                Interactive Scenarios
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "analytics"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <BarChart2 className="w-4 h-4 text-teal-400" />
                Visitor Analytics
              </button>

              <button
                onClick={() => setActiveTab("whatsapp")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "whatsapp"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                WhatsApp Clicks
              </button>

              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer text-left ${
                  activeTab === "security"
                    ? "bg-accent/10 border border-accent/20 text-white"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-200 border border-transparent"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Login Logs (DB)
              </button>
            </nav>
            
            {/* Short status summary */}
            <div className="p-4 rounded-xl border border-zinc-900/80 bg-zinc-950/30 text-[11px] space-y-1.5 font-mono text-zinc-500 mt-6">
              <p className="text-zinc-400 font-bold uppercase tracking-wider text-[9px] mb-2">[ PLATFORM STATUS ]</p>
              <div className="flex justify-between"><span>Active Modules:</span> <span className="text-white">{modules.filter(m => m.enabled).length}/{modules.length}</span></div>
              <div className="flex justify-between"><span>Theme:</span> <span className="text-accent">{theme.fontFamily}</span></div>
              <div className="flex justify-between"><span>Services:</span> <span className="text-white">{services.length}</span></div>
              <div className="flex justify-between"><span>Automated Posts:</span> <span className="text-white">{blogs.length}</span></div>
              <div className="flex justify-between"><span>User State:</span> <span className="text-emerald-400">Authenticated</span></div>
            </div>
          </div>

          {/* Main Content Workspace */}
          <div className="lg:col-span-3 bg-zinc-950/20 border border-zinc-900/60 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
            
            {/* TAB: GENERAL SETTINGS */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">General Agency Details</h2>
                  <p className="text-xs text-zinc-500">Configure core naming, contact metadata and other universal properties.</p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Agency Brand Name</label>
                      <input
                        type="text"
                        value={siteSettings.agencyName}
                        onChange={(e) => updateSettings({ agencyName: e.target.value })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Support/Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="email"
                          value={siteSettings.contactEmail}
                          onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Business Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="text"
                          value={siteSettings.contactPhone}
                          onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Office Location Address</label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-3.5 h-3.5 text-zinc-500" />
                        <input
                          type="text"
                          value={siteSettings.contactAddress}
                          onChange={(e) => updateSettings({ contactAddress: e.target.value })}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Newsletter Subscribers Counter (Simulated Success)</label>
                      <input
                        type="number"
                        value={siteSettings.newsletterSuccessCount}
                        onChange={(e) => updateSettings({ newsletterSuccessCount: parseInt(e.target.value) || 0 })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-accent"
                      />
                    </div>

                    {/* Editable Budget Brackets */}
                    <div className="space-y-3 pt-4 border-t border-zinc-900 md:col-span-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">
                            Contact Form Budget Options (Editable Across Website)
                          </label>
                          <p className="text-[11px] text-zinc-500">
                            Configure the budget brackets available in the inquiry form dropdown across all pages.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const current = siteSettings.budgetOptions || [];
                            updateSettings({ budgetOptions: [...current, "₹1,00,000 - ₹2,00,000"] });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-bold text-accent cursor-pointer transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          Add Option
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(siteSettings.budgetOptions || []).map((opt, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={opt}
                              onChange={(e) => {
                                const updated = [...(siteSettings.budgetOptions || [])];
                                updated[idx] = e.target.value;
                                updateSettings({ budgetOptions: updated });
                              }}
                              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-accent"
                              placeholder="e.g. ₹50,000 - ₹1,50,000"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = (siteSettings.budgetOptions || []).filter((_, i) => i !== idx);
                                updateSettings({ budgetOptions: updated });
                              }}
                              disabled={(siteSettings.budgetOptions || []).length <= 1}
                              className="p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-30 cursor-pointer transition-colors"
                              title="Delete option"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-900 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-950 bg-accent hover:bg-accent/90 transition-all cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save Details
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB: MODULES MANAGEMENT */}
            {activeTab === "modules" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Homepage Sections Control</h2>
                  <p className="text-xs text-zinc-500">Toggle sections, customize local headers, and sort the execution sequence.</p>
                </div>

                <div className="space-y-3">
                  {sortedModules.map((m, index) => (
                    <div 
                      key={m.id}
                      className="p-4 rounded-2xl border border-zinc-900 bg-zinc-950/40 hover:border-zinc-800 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <button 
                            disabled={index === 0}
                            onClick={() => reorderModules(m.id, "up")}
                            className="p-1 rounded bg-zinc-900 text-zinc-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button 
                            disabled={index === sortedModules.length - 1}
                            onClick={() => reorderModules(m.id, "down")}
                            className="p-1 rounded bg-zinc-900 text-zinc-500 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{m.name}</span>
                            <span className="text-[9px] font-mono text-zinc-500 uppercase bg-zinc-900 px-1.5 py-0.5 rounded">Seq: {m.order}</span>
                          </div>
                          {m.title !== undefined && (
                            <p className="text-[10px] text-zinc-400 mt-1 max-w-md truncate">Title: {m.title}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t border-zinc-900 md:border-0 pt-3 md:pt-0">
                        {/* Switch styling */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                            {m.enabled ? "ACTIVE" : "DISABLED"}
                          </span>
                          <button
                            onClick={() => updateModule(m.id, { enabled: !m.enabled })}
                            className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${
                              m.enabled ? "bg-accent" : "bg-zinc-800"
                            } relative`}
                          >
                            <span 
                              className={`block w-4 h-4 rounded-full bg-zinc-950 transition-transform duration-300 transform ${
                                m.enabled ? "translate-x-4" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>

                        {m.title !== undefined && (
                          <button
                            onClick={() => {
                              const newTitle = prompt("Enter section Title:", m.title);
                              if (newTitle !== null) {
                                updateModule(m.id, { title: newTitle });
                              }
                              const newSub = prompt("Enter section Subtitle / Description:", m.subtitle || "");
                              if (newSub !== null) {
                                updateModule(m.id, { subtitle: newSub });
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-850 transition-all cursor-pointer border border-zinc-800"
                          >
                            Edit Titles
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: STYLE & THEME */}
            {activeTab === "theme" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-white mb-1">Theme & Preset Customizer</h2>
                  <p className="text-xs text-zinc-500">Apply brand typography, colors, modes, and curated presets instantly with dynamic CSS variables.</p>
                </div>

                <div className="space-y-6">
                  {/* Interface Mode */}
                  <div className="space-y-3 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900/60">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Interface Mode</label>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-bold">
                        Active: {theme.mode.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          updateTheme({ 
                            mode: "dark",
                            bgColor: "#09090b",
                            cardColor: "#18181b"
                          });
                          showSuccess("Switched to Dark Mode");
                        }}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          theme.mode === "dark"
                            ? "border-accent/60 bg-zinc-900 text-white shadow-[0_0_15px_rgba(43,186,165,0.08)]"
                            : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-800"
                        }`}
                      >
                        <Moon className="w-4 h-4 text-accent shrink-0" />
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2">
                            <span>Dark Mode</span>
                          </div>
                          <p className="text-[10px] text-zinc-400 font-normal mt-0.5">Deep charcoal & zinc canvas</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          updateTheme({ 
                            mode: "light",
                            bgColor: "#f8fafc",
                            cardColor: "#ffffff"
                          });
                          showSuccess("Switched to Light Mode");
                        }}
                        className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          theme.mode === "light"
                            ? "border-accent/60 bg-zinc-900 text-white shadow-[0_0_15px_rgba(43,186,165,0.08)]"
                            : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-white hover:border-zinc-800"
                        }`}
                      >
                        <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2">
                            <span>Light Mode</span>
                          </div>
                          <p className="text-[10px] text-zinc-400 font-normal mt-0.5">High-contrast light canvas</p>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Preset Themes Gallery */}
                  <div className="space-y-3">
                    <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Curated Design Presets</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {themePresets.map((preset) => {
                        const isSelected = 
                          theme.mode === preset.mode &&
                          theme.accentColor.toLowerCase() === preset.accentColor.toLowerCase() &&
                          theme.bgColor.toLowerCase() === preset.bgColor.toLowerCase();
                        
                        return (
                          <button
                            key={preset.name}
                            onClick={() => {
                              updateTheme({
                                mode: preset.mode,
                                accentColor: preset.accentColor,
                                accentColorRgb: preset.accentColorRgb,
                                bgColor: preset.bgColor,
                                cardColor: preset.cardColor,
                                fontFamily: preset.fontFamily
                              });
                              showSuccess(`Applied curated design: ${preset.name}`);
                            }}
                            className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col gap-2 cursor-pointer ${
                              isSelected 
                                ? "bg-zinc-900 border-accent text-white shadow-[0_4px_20px_rgba(43,186,165,0.1)]" 
                                : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-zinc-400 hover:text-zinc-200"
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-black uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-full border border-zinc-850" style={{ backgroundColor: preset.accentColor }} />
                                {preset.name}
                              </span>
                              <span className="text-[9px] font-mono uppercase bg-zinc-900 px-1.5 py-0.5 rounded text-zinc-500">
                                {preset.mode} // {preset.fontFamily}
                              </span>
                            </div>
                            <p className="text-[11px] text-zinc-500 leading-normal pr-6">{preset.desc}</p>
                            <div className="flex gap-1.5 mt-1.5">
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/60 text-zinc-400 border border-zinc-900">
                                Bg: {preset.bgColor}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950/60 text-zinc-400 border border-zinc-900">
                                Card: {preset.cardColor}
                              </span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-accent absolute right-4 top-4" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Advanced Custom Color Configurator */}
                  <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900/60 space-y-4">
                    <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider block">Advanced Style Customizer</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Custom Accent */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Accent Hex</span>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={theme.accentColor}
                            onChange={(e) => {
                              const newHex = e.target.value;
                              updateTheme({ accentColor: newHex, accentColorRgb: hexToRgb(newHex) });
                            }}
                            className="w-8 h-8 rounded border border-zinc-800 bg-transparent cursor-pointer overflow-hidden p-0"
                          />
                          <input
                            type="text"
                            value={theme.accentColor}
                            onChange={(e) => {
                              const newHex = e.target.value;
                              if (newHex.match(/^#[0-9A-Fa-f]{6}$/)) {
                                updateTheme({ accentColor: newHex, accentColorRgb: hexToRgb(newHex) });
                              }
                            }}
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 text-xs font-mono text-zinc-300"
                          />
                        </div>
                      </div>

                      {/* Custom Background */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Background Hex</span>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={theme.bgColor}
                            onChange={(e) => {
                              const newHex = e.target.value;
                              updateTheme({ bgColor: newHex });
                            }}
                            className="w-8 h-8 rounded border border-zinc-800 bg-transparent cursor-pointer overflow-hidden p-0"
                          />
                          <input
                            type="text"
                            value={theme.bgColor}
                            onChange={(e) => {
                              const newHex = e.target.value;
                              if (newHex.match(/^#[0-9A-Fa-f]{6}$/)) {
                                updateTheme({ bgColor: newHex });
                              }
                            }}
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 text-xs font-mono text-zinc-300"
                          />
                        </div>
                      </div>

                      {/* Custom Card Surface */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wide">Surface/Card Hex</span>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={theme.cardColor}
                            onChange={(e) => {
                              const newHex = e.target.value;
                              updateTheme({ cardColor: newHex });
                            }}
                            className="w-8 h-8 rounded border border-zinc-800 bg-transparent cursor-pointer overflow-hidden p-0"
                          />
                          <input
                            type="text"
                            value={theme.cardColor}
                            onChange={(e) => {
                              const newHex = e.target.value;
                              if (newHex.match(/^#[0-9A-Fa-f]{6}$/)) {
                                updateTheme({ cardColor: newHex });
                              }
                            }}
                            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-2 text-xs font-mono text-zinc-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Highlights / Quick Colors Selector */}
                  <div className="space-y-3">
                    <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Accent Quick Presets</label>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                      {colorPresets.map((preset) => {
                        const isSelected = theme.accentColor.toLowerCase() === preset.hex.toLowerCase();
                        return (
                          <button
                            key={preset.name}
                            onClick={() => {
                              updateTheme({ accentColor: preset.hex, accentColorRgb: preset.rgb });
                              showSuccess(`Applied brand accent: ${preset.name}`);
                            }}
                            className={`p-2 rounded-lg border text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected 
                                ? "bg-zinc-900 border-accent text-white" 
                                : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: preset.hex }} />
                            <div className="text-[10px] font-bold leading-none truncate">{preset.name}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Font presets */}
                  <div className="space-y-3">
                    <label className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Primary Display Font</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {fontPresets.map((f) => {
                        const isSelected = theme.fontFamily === f.value;
                        return (
                          <button
                            key={f.value}
                            onClick={() => {
                              updateTheme({ fontFamily: f.value });
                              showSuccess(`Typography updated to ${f.value}`);
                            }}
                            className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                              isSelected 
                                ? "bg-zinc-900 border-accent text-white" 
                                : "bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-zinc-400"
                            }`}
                          >
                            <span className="text-xs font-bold" style={{ fontFamily: f.value }}>{f.name.split(" ")[0]}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sliders for glass blur */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-900">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400 font-bold uppercase tracking-wider">Glass Overlay Opacity</span>
                        <span className="text-accent font-mono">{(theme.glassOpacity * 100).toFixed(0)}%</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="60"
                        value={theme.glassOpacity * 100}
                        onChange={(e) => updateTheme({ glassOpacity: parseFloat(e.target.value) / 100 })}
                        className="w-full accent-accent bg-zinc-900 h-1.5 rounded-full cursor-pointer"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-400 font-bold uppercase tracking-wider">Font Size Scale</span>
                        <span className="text-accent font-mono">{theme.fontSizeMultiplier.toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="8"
                        max="14"
                        value={theme.fontSizeMultiplier * 10}
                        onChange={(e) => updateTheme({ fontSizeMultiplier: parseFloat(e.target.value) / 10 })}
                        className="w-full accent-accent bg-zinc-900 h-1.5 rounded-full cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: SERVICES */}
            {activeTab === "services" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Services Catalog</h2>
                    <p className="text-xs text-zinc-500">Configure deliverables, numbering and deep custom documentation details.</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      const numStr = (services.length + 1).toString().padStart(2, "0");
                      const newS: Omit<Service, "id"> = {
                        number: numStr,
                        title: "New Custom Service",
                        slug: "custom-service",
                        module: "build",
                        description: "High-value enterprise solution engineered for direct results.",
                        details: "Detailed operational framework describing this capability.",
                        deliverables: ["Key Milestone 1", "Deliverable Outcome 2"]
                      };
                      addService(newS);
                      showSuccess("Added default placeholder service slot");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-950 bg-accent hover:bg-accent/90 transition-all cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    New Capability
                  </button>
                </div>

                <div className="space-y-4">
                  {services.map((s) => {
                    const isEditing = editingServiceId === s.id;
                    return (
                      <div 
                        key={s.id}
                        className="p-4 sm:p-5 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative overflow-hidden"
                      >
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-3">
                              <div className="col-span-1 space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Number</label>
                                <input
                                  type="text"
                                  value={serviceForm.number || ""}
                                  onChange={(e) => setServiceForm({ ...serviceForm, number: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div className="col-span-2 space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Title</label>
                                <input
                                  type="text"
                                  value={serviceForm.title || ""}
                                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div className="col-span-1 space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Module</label>
                                <select
                                  value={serviceForm.module || "build"}
                                  onChange={(e) => setServiceForm({ ...serviceForm, module: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                >
                                  <option value="build">Build</option>
                                  <option value="grow">Grow</option>
                                  <option value="automate">Automate</option>
                                  <option value="transform">Transform</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Short Description</label>
                              <input
                                type="text"
                                value={serviceForm.description || ""}
                                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Deep/Detailed Specs</label>
                              <textarea
                                value={serviceForm.details || ""}
                                onChange={(e) => setServiceForm({ ...serviceForm, details: e.target.value })}
                                rows={3}
                                className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none font-sans"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Deliverables (Comma separated)</label>
                              <input
                                type="text"
                                value={serviceForm.deliverables?.join(", ") || ""}
                                onChange={(e) => setServiceForm({ ...serviceForm, deliverables: e.target.value.split(",").map(val => val.trim()) })}
                                className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                onClick={() => setEditingServiceId(null)}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-850 text-zinc-400 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  updateService(s.id, serviceForm);
                                  setEditingServiceId(null);
                                  showSuccess(`Updated core capabilities for ${serviceForm.title}`);
                                }}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-accent text-zinc-950 cursor-pointer"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1.5 text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-accent font-bold">{s.number}</span>
                                <span className="text-sm font-bold text-white">{s.title}</span>
                                <span className="text-[9px] font-mono text-zinc-500 bg-zinc-900 px-1.5 py-0.5 rounded">slug: {s.slug}</span>
                                {s.module && (
                                  <span className="text-[8px] font-mono uppercase bg-zinc-900 text-zinc-400 border border-zinc-800 px-1.5 py-0.5 rounded">
                                    {s.module}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-zinc-400">{s.description}</p>
                              <div className="pt-2 flex flex-wrap gap-1">
                                {s.deliverables.map((del, dIdx) => (
                                  <span key={dIdx} className="text-[9px] bg-zinc-900/80 text-zinc-500 border border-zinc-850 px-2 py-0.5 rounded-full">{del}</span>
                                ))}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingServiceId(s.id);
                                  setServiceForm(s);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-850 transition-all cursor-pointer border border-zinc-800"
                              >
                                Edit
                              </button>
                              
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${s.title}?`)) {
                                    deleteService(s.id);
                                    showSuccess(`Removed ${s.title} from portfolio catalog`);
                                  }
                                }}
                                className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-all cursor-pointer"
                                title="Delete Service"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: AUTOMATED BLOGS */}
            {activeTab === "blogs" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Blogging Engine & Automated Scheduler</h2>
                    <p className="text-xs text-zinc-500">Add cluster articles or trigger simulated automated SEO posts instantly.</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        generateAutomatedPost();
                        showSuccess("🤖 AI Agent generated a new semantic SEO content cluster draft!");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-purple-950/40 border border-purple-800 hover:bg-purple-900/60 transition-all cursor-pointer animate-pulse"
                    >
                      <Sparkles className="w-3 h-3 text-purple-400" />
                      🤖 Trigger AI Post
                    </button>

                    <button
                      onClick={() => {
                        const newB: Omit<BlogArticle, "id" | "publishedAt"> = {
                          title: "New Technical Post Outline",
                          category: "AI",
                          targetKeyword: "Enterprise AI Agents",
                          summary: "Analyzing performance scaling curves in multi-agent routing configurations.",
                          readTime: "4 min read",
                          outline: ["Operational scaling metrics", "Framework limits"],
                          keyTakeaways: ["Latency curves require strict non-blocking handlers."]
                        };
                        addBlog(newB);
                        showSuccess("Created empty article slot");
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-zinc-950 bg-accent hover:bg-accent/90 transition-all cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      Add Manual
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {blogs.map((b) => {
                    const isEditing = editingBlogId === b.id;
                    return (
                      <div 
                        key={b.id}
                        className="p-4 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative overflow-hidden"
                      >
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Title</label>
                                <input
                                  type="text"
                                  value={blogForm.title || ""}
                                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Category</label>
                                  <input
                                    type="text"
                                    value={blogForm.category || ""}
                                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Read Time</label>
                                  <input
                                    type="text"
                                    value={blogForm.readTime || ""}
                                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                                    className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Target Keyword</label>
                                <input
                                  type="text"
                                  value={blogForm.targetKeyword || ""}
                                  onChange={(e) => setBlogForm({ ...blogForm, targetKeyword: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Published At</label>
                                <input
                                  type="text"
                                  value={blogForm.publishedAt || ""}
                                  onChange={(e) => setBlogForm({ ...blogForm, publishedAt: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Summary/Excerpt</label>
                              <textarea
                                value={blogForm.summary || ""}
                                onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                                rows={2}
                                className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none font-sans"
                              />
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                onClick={() => setEditingBlogId(null)}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-850 text-zinc-400 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  updateBlog(b.id, blogForm);
                                  setEditingBlogId(null);
                                  showSuccess(`Updated content cluster: ${blogForm.title}`);
                                }}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-accent text-zinc-950 cursor-pointer"
                              >
                                Save Post
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1.5 text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-accent uppercase font-bold">{b.category}</span>
                                <span className="text-sm font-bold text-white">{b.title}</span>
                              </div>
                              <p className="text-xs text-zinc-400">{b.summary}</p>
                              <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 pt-1">
                                <span>Key: {b.targetKeyword}</span>
                                <span>•</span>
                                <span>{b.readTime}</span>
                                <span>•</span>
                                <span>Published: {b.publishedAt}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingBlogId(b.id);
                                  setBlogForm(b);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-850 transition-all cursor-pointer border border-zinc-800"
                              >
                                Edit
                              </button>
                              
                              <button
                                onClick={() => {
                                  if (confirm(`Delete post "${b.title}"?`)) {
                                    deleteBlog(b.id);
                                    showSuccess("Deleted blog entry");
                                  }
                                }}
                                className="p-1 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-950/20 transition-all cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: INTERACTIVE AI SCENARIOS */}
            {activeTab === "scenarios" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Interactive AI Agent Scenarios</h2>
                    <p className="text-xs text-zinc-500">Edit the simulation prompts, node activations, and output responses in AIAgents.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {scenarios.map((s) => {
                    const isEditing = editingScenarioId === s.id;
                    return (
                      <div 
                        key={s.id}
                        className="p-4 rounded-2xl border border-zinc-900 bg-zinc-950/40 relative overflow-hidden"
                      >
                        {isEditing ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Label</label>
                                <input
                                  type="text"
                                  value={scenarioForm.label || ""}
                                  onChange={(e) => setScenarioForm({ ...scenarioForm, label: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Category</label>
                                <input
                                  type="text"
                                  value={scenarioForm.category || ""}
                                  onChange={(e) => setScenarioForm({ ...scenarioForm, category: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Simulated User Prompt</label>
                              <input
                                type="text"
                                value={scenarioForm.prompt || ""}
                                onChange={(e) => setScenarioForm({ ...scenarioForm, prompt: e.target.value })}
                                className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Time to Solve</label>
                                <input
                                  type="text"
                                  value={scenarioForm.timeToSolve || ""}
                                  onChange={(e) => setScenarioForm({ ...scenarioForm, timeToSolve: e.target.value })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Active Nodes (comma-separated IDs)</label>
                                <input
                                  type="text"
                                  value={scenarioForm.activeNodes?.join(", ") || ""}
                                  onChange={(e) => setScenarioForm({ ...scenarioForm, activeNodes: e.target.value.split(",").map(val => val.trim()) })}
                                  className="w-full bg-zinc-900 border border-zinc-850 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                              <button
                                onClick={() => setEditingScenarioId(null)}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-850 text-zinc-400 cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => {
                                  updateAIScenario(s.id, scenarioForm);
                                  setEditingScenarioId(null);
                                  showSuccess(`Updated simulated sequence ${scenarioForm.label}`);
                                }}
                                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-accent text-zinc-950 cursor-pointer"
                              >
                                Save Scenario
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1.5 text-left">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-accent uppercase font-bold">{s.category}</span>
                                <span className="text-sm font-bold text-white">{s.label}</span>
                                <span className="text-[9px] font-mono text-zinc-500">({s.timeToSolve})</span>
                              </div>
                              <p className="text-xs text-zinc-300">Prompt: "{s.prompt}"</p>
                              <p className="text-[10px] font-mono text-zinc-500">Active Nodes: {s.activeNodes.join(", ")}</p>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingScenarioId(s.id);
                                  setScenarioForm(s);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-zinc-300 bg-zinc-900 hover:bg-zinc-850 transition-all cursor-pointer border border-zinc-800"
                              >
                                Edit
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: VISITOR ANALYTICS */}
            {activeTab === "analytics" && (
              <AnalyticsDashboard />
            )}

            {/* TAB: WHATSAPP CLICK ANALYTICS */}
            {activeTab === "whatsapp" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                      WhatsApp Smart Chat Analytics
                    </h2>
                    <p className="text-xs text-zinc-500">Live logs of visitor clicks on the WhatsApp Smart Chat widget fetched directly from the database in real time.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchWhatsAppLogs}
                      disabled={loadingWhatsApp}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingWhatsApp ? "animate-spin text-emerald-400" : ""}`} />
                      Refresh
                    </button>
                    <button
                      onClick={handleClearWhatsAppLogs}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
                    >
                      Clear Logs
                    </button>
                  </div>
                </div>

                {loadingWhatsApp && whatsappLogs.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500 space-y-2 border border-zinc-900 bg-zinc-950/40 rounded-2xl">
                    <RefreshCw className="w-6 h-6 animate-spin text-[#25D366] mx-auto" />
                    <p className="text-xs font-mono text-zinc-400">Fetching WhatsApp click events from database...</p>
                  </div>
                ) : whatsappLogs.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-center space-y-2">
                    <MessageCircle className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs font-bold text-zinc-400">No WhatsApp Click Events Recorded Yet</p>
                    <p className="text-[11px] text-zinc-600">Clicks on the floating WhatsApp widget or WhatsApp CTA buttons will be recorded here automatically in real time.</p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
                    <div className="p-3 bg-zinc-900/80 border-b border-zinc-800 text-xs font-bold text-zinc-400 flex items-center justify-between">
                      <span>Total Real-Time Clicks: {whatsappLogs.length}</span>
                      <span className="text-[10px] text-emerald-400">Target: wa.me/916305178805</span>
                    </div>
                    <div className="divide-y divide-zinc-800/60 max-h-[550px] overflow-y-auto">
                      {whatsappLogs.map((log: any, idx: number) => (
                        <div key={log.id || idx} className="p-4 space-y-2.5 text-xs hover:bg-zinc-900/30 transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-zinc-400">
                            <span className="font-bold text-white flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                              <span>{log.eventName || "WhatsApp Widget Click"}</span>
                              {log.topic && (
                                <span className="px-2 py-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                                  {log.topic}
                                </span>
                              )}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-500">
                              {log.timestamp ? new Date(log.timestamp).toLocaleString() : "Just now"}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-zinc-400 font-mono bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-800/40">
                            <div><span className="text-zinc-600">Device:</span> <span className="text-zinc-200">{log.device || "Desktop"}</span></div>
                            <div><span className="text-zinc-600">Browser:</span> <span className="text-zinc-200">{log.browser || "Unknown"}</span></div>
                            <div><span className="text-zinc-600">OS:</span> <span className="text-zinc-200">{log.os || "Windows"}</span></div>
                            <div><span className="text-zinc-600">Location:</span> <span className="text-zinc-200">{log.city ? `${log.city}, ${log.country || "India"}` : (log.country || "India")}</span></div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-zinc-500 gap-2">
                            <div className="truncate max-w-md">
                              <span className="text-zinc-600">Page:</span> <span className="text-zinc-300">{log.pageTitle || "LoopCodeLabs"}</span> <span className="text-zinc-600">({log.pageUrl || "/"})</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span><span className="text-zinc-600">VID:</span> {log.visitorId || "N/A"}</span>
                              <span><span className="text-zinc-600">SID:</span> {log.sessionId || "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB: DATABASE LOGIN ACTIVITY LOGS */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-cyan-400" />
                      Database Login Activity Logs
                    </h2>
                    <p className="text-xs text-zinc-400">
                      Real-time database audit log recording all user login attempts, timestamps, Google OAuth profile details, IP addresses, and user agents in the <code className="text-cyan-400">login_logs</code> table.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={fetchLoginLogs}
                      disabled={loadingLoginLogs}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingLoginLogs ? "animate-spin text-cyan-400" : ""}`} />
                      Refresh Logs
                    </button>
                    <button
                      onClick={handleClearLoginLogs}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
                    >
                      Clear Audit Logs
                    </button>
                  </div>
                </div>

                {/* Session status banner */}
                <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2 justify-center text-cyan-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Security Enforcement Active</p>
                      <p className="text-[11px] text-zinc-400">5-Minute Inactivity Session Timeout enabled. Automatic logout triggers upon zero user activity.</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                    MySQL Table: login_logs
                  </div>
                </div>

                {loadingLoginLogs && loginLogs.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500 space-y-2 border border-zinc-900 bg-zinc-950/40 rounded-2xl">
                    <RefreshCw className="w-6 h-6 animate-spin text-cyan-400 mx-auto" />
                    <p className="text-xs font-mono text-zinc-400">Fetching login activity records from database...</p>
                  </div>
                ) : loginLogs.length === 0 ? (
                  <div className="p-10 rounded-2xl border border-zinc-900 bg-zinc-950/40 text-center space-y-2">
                    <UserCheck className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs font-bold text-zinc-400">No Login Activity Logged Yet</p>
                    <p className="text-[11px] text-zinc-600 max-w-md mx-auto">
                      All future Google OAuth sign-in events, successful logins, and access control blocks will be persisted directly to the MySQL <code className="text-zinc-400">login_logs</code> table and displayed here in real time.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-hidden">
                    <div className="p-3 bg-zinc-900/80 border-b border-zinc-800 text-xs font-bold text-zinc-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
                        Total Recorded Authentication Events: {loginLogs.length}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">Sorted by Most Recent</span>
                    </div>

                    <div className="divide-y divide-zinc-800/60 max-h-[580px] overflow-y-auto">
                      {loginLogs.map((log: any, idx: number) => {
                        const isSuccess = log.status === "Success";
                        const isUnauthorized = log.status === "Failed_Unauthorized";

                        return (
                          <div key={log.id || idx} className="p-4 space-y-2.5 text-xs hover:bg-zinc-900/40 transition-colors">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-3">
                                {log.picture ? (
                                  <img src={log.picture} alt={log.name || "User"} className="w-8 h-8 rounded-full border border-zinc-700" />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-zinc-300 text-xs">
                                    {(log.name || log.email || "U").substring(0, 1).toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-white text-xs">{log.name || "User"}</span>
                                    <span className="text-zinc-400 text-[11px]">({log.email || "Unknown"})</span>
                                  </div>
                                  <div className="text-[10px] text-zinc-500 font-mono">
                                    Provider: {log.provider || "Google OAuth"}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono border ${
                                  isSuccess
                                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                    : isUnauthorized
                                    ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                                    : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                                }`}>
                                  {isSuccess ? "✓ Login Success" : isUnauthorized ? "⚠ Access Denied" : "✕ Login Failed"}
                                </span>
                                <span className="font-mono text-[10px] text-zinc-500">
                                  {log.timestamp ? new Date(log.timestamp).toLocaleString() : "Just now"}
                                </span>
                              </div>
                            </div>

                            {log.failureReason && (
                              <div className="p-2 bg-rose-950/20 border border-rose-500/20 text-rose-300 text-[11px] rounded-lg">
                                <strong className="font-semibold">Reason:</strong> {log.failureReason}
                              </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] text-zinc-400 font-mono bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/40">
                              <div><span className="text-zinc-600">IP Address:</span> <span className="text-zinc-200">{log.ipAddress || "127.0.0.1"}</span></div>
                              <div><span className="text-zinc-600">User ID:</span> <span className="text-zinc-200">{log.userId || "N/A"}</span></div>
                              <div className="truncate"><span className="text-zinc-600">User Agent:</span> <span className="text-zinc-300" title={log.userAgent}>{log.userAgent ? (log.userAgent.length > 35 ? log.userAgent.substring(0, 35) + "..." : log.userAgent) : "Unknown"}</span></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
