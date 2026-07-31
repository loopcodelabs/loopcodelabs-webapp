import { useState, useRef, MouseEvent } from "react";
import { ArrowUpRight, Code, TrendingUp, Cpu, Sparkles, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useWebsite } from "../context/WebsiteContext";
import ServiceVisualizer from "./ServiceVisualizer";
import { mapServicesToItems, ServiceItem } from "../utils/serviceMapping";

const serviceModules = [
  {
    id: "build",
    name: "Build",
    outcome: "Scale Premium Digital Presence",
    tagline: "Engineered for velocity and high-fidelity UX. We design & construct high-performance digital products that establish your absolute market authority.",
    color: "#2BBAA5", // Teal/Emerald
    glowColor: "rgba(43, 186, 165, 0.15)",
    glowColorStrong: "rgba(43, 186, 165, 0.45)",
    textColor: "text-[#2BBAA5]",
    hoverTextColor: "group-hover:text-[#2BBAA5]",
    borderColor: "border-[#2BBAA5]/20",
    hoverBorderColor: "group-hover:border-[#2BBAA5]/30",
    bgAccent: "bg-[#2BBAA5]/5",
    badgeBg: "bg-[#2BBAA5]/10 text-[#2BBAA5] border-[#2BBAA5]/20",
    icon: Code
  },
  {
    id: "grow",
    name: "Grow",
    outcome: "Acquire & Compound Pipelines",
    tagline: "Optimized for organic compounding search and high-yield paid campaigns. We construct search authority and conversion funnels that scale metrics.",
    color: "#3b82f6", // Sapphire/Blue
    glowColor: "rgba(59, 130, 246, 0.15)",
    glowColorStrong: "rgba(59, 130, 246, 0.45)",
    textColor: "text-blue-400",
    hoverTextColor: "group-hover:text-blue-400",
    borderColor: "border-blue-500/20",
    hoverBorderColor: "group-hover:border-blue-500/30",
    bgAccent: "bg-blue-500/5",
    badgeBg: "bg-blue-950/40 text-blue-300 border-blue-900/50",
    icon: TrendingUp
  },
  {
    id: "automate",
    name: "Automate",
    outcome: "Eradicate Operational Friction",
    tagline: "Designed to eliminate manual bottlenecks and duplicate processes. We wire CRM pipelines, LLM automations, and live bots to scale work-hours.",
    color: "#a855f7", // Violet/Purple
    glowColor: "rgba(168, 85, 247, 0.15)",
    glowColorStrong: "rgba(168, 85, 247, 0.45)",
    textColor: "text-purple-400",
    hoverTextColor: "group-hover:text-purple-400",
    borderColor: "border-purple-500/20",
    hoverBorderColor: "group-hover:border-purple-500/30",
    bgAccent: "bg-purple-500/5",
    badgeBg: "bg-purple-950/40 text-purple-300 border-purple-900/50",
    icon: Cpu
  },
  {
    id: "transform",
    name: "Transform",
    outcome: "Architect Corporate Intelligence",
    tagline: "Custom proprietary AI applications, fine-tuned models, and analytics architectures designed to secure long-term digital competitive moats.",
    color: "#fbbf24", // Gold/Amber
    glowColor: "rgba(251, 191, 36, 0.15)",
    glowColorStrong: "rgba(251, 191, 36, 0.45)",
    textColor: "text-amber-400",
    hoverTextColor: "group-hover:text-amber-400",
    borderColor: "border-amber-500/20",
    hoverBorderColor: "group-hover:border-amber-500/30",
    bgAccent: "bg-amber-500/5",
    badgeBg: "bg-amber-950/40 text-amber-300 border-amber-900/50",
    icon: Sparkles
  }
];

export default function Services() {
  const { services, modules } = useWebsite();
  const [activeModuleId, setActiveModuleId] = useState("build");
  const [hoveredModuleId, setHoveredModuleId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const servicesModule = modules.find(m => m.id === "services");
  const titleText = servicesModule?.title || "Full-stack digital growth.";

  const activeModule = serviceModules.find(m => m.id === activeModuleId) || serviceModules[0];
  
  // Map all services to ServiceItems to get images, custom colors, and structured details
  const mappedServicesList = mapServicesToItems(services);
  const activeServices = mappedServicesList.filter(s => s.module === activeModuleId);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const cardWidth = 320;
    const cardHeight = 200;
    
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    let x = relativeX + 25;
    let y = relativeY - 100;
    
    if (x + cardWidth > rect.width) {
      x = relativeX - cardWidth - 25;
    }
    
    if (y < 20) {
      y = relativeY + 20;
    } else if (y + cardHeight > rect.height) {
      y = rect.height - cardHeight - 20;
    }
    
    x = Math.max(10, x);
    y = Math.max(10, y);
    
    setMousePos({ x, y });
  };

  const getServiceSlug = (title: string, slug?: string) => {
    if (slug) return slug;
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-24 px-6 sm:px-12 lg:px-20 bg-transparent relative overflow-hidden transition-colors duration-500"
    >
      {/* Background Ambient Glow that shifts based on selected module */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000 opacity-20"
        style={{
          background: activeModule.color,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="services-header">
          <div className="space-y-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-[0.25em] uppercase">
              [ SERVICES ]
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-normal">
              {titleText}
            </h2>
          </div>
          
          <div>
            <button
              onClick={() => handleScrollTo("#contact")}
              className="group px-6 py-3 rounded-full bg-accent hover:bg-black text-true-black hover:text-[#2bbaa6] font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md hover:shadow-accent/20"
            >
              Get Custom Consultation
              <ArrowUpRight className="w-4 h-4 text-true-black group-hover:text-[#2bbaa6] stroke-[2.5px] transition-colors" />
            </button>
          </div>
        </div>

        {/* --- MODULE SELECTOR TABS --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12" id="services-modules-grid">
          {serviceModules.map((mod) => {
            const Icon = mod.icon;
            const isActive = mod.id === activeModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModuleId(mod.id);
                  setHoveredModuleId(null);
                }}
                onMouseEnter={() => setHoveredModuleId(mod.id)}
                onMouseLeave={() => setHoveredModuleId(null)}
                className={`group text-left p-6 rounded-2xl border transition-all duration-500 flex flex-col justify-between h-48 cursor-pointer relative overflow-hidden ${
                  isActive 
                    ? "bg-zinc-900/60 shadow-xl" 
                    : "bg-zinc-950/40 hover:bg-zinc-900/20"
                }`}
                style={{
                  boxShadow: isActive 
                    ? (hoveredModuleId === mod.id 
                        ? `0 10px 35px -5px ${mod.glowColorStrong || mod.glowColor}` 
                        : `0 10px 30px -10px ${mod.glowColor}`)
                    : (hoveredModuleId === mod.id 
                        ? `0 8px 25px -5px ${mod.glowColorStrong || mod.glowColor}` 
                        : "none"),
                  borderColor: isActive 
                    ? mod.color 
                    : (hoveredModuleId === mod.id ? mod.color : "rgb(24 24 27 / 1)") // Zinc-900
                }}
              >
                {/* Active Indicator Line */}
                <div 
                  className={`absolute top-0 inset-x-0 h-[2px] transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`} 
                  style={{ backgroundColor: mod.color }}
                />

                {/* Top icon and header */}
                <div className="flex items-center justify-between w-full">
                  <div 
                    className={`p-2.5 rounded-xl border transition-all duration-500 ${
                      isActive ? mod.bgAccent + " " + mod.borderColor : "bg-zinc-900/50 border-zinc-800"
                    }`}
                  >
                    <Icon 
                      className={`w-5 h-5 transition-colors duration-500`}
                      style={{ color: isActive ? mod.color : "#71717a" }}
                    />
                  </div>
                  <span className={`text-[10px] font-mono tracking-widest ${isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"} uppercase transition-colors duration-300`}>
                    MODULE {mod.id === "build" ? "01" : mod.id === "grow" ? "02" : mod.id === "automate" ? "03" : "04"}
                  </span>
                </div>

                {/* Bottom title and outcomes */}
                <div className="space-y-1.5 mt-4">
                  <h3 className={`font-sans font-extrabold text-xl sm:text-2xl transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"}`}>
                    {mod.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-zinc-500 group-hover:text-zinc-400 font-mono tracking-tight line-clamp-1 transition-colors duration-300">
                    {mod.outcome}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* --- DYNAMIC MODULE DESCRIPTION BANNER --- */}
        <div 
          className="p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 mb-10 relative overflow-hidden transition-all duration-500"
          style={{
            borderColor: `${activeModule.color}15`,
            boxShadow: `inset 0 0 20px ${activeModule.color}05`
          }}
        >
          <div className="max-w-4xl space-y-2">
            <span 
              className="text-[9px] font-mono tracking-widest uppercase py-1 px-2.5 rounded-full border inline-block"
              style={{
                borderColor: `${activeModule.color}30`,
                color: activeModule.color,
                backgroundColor: `${activeModule.color}08`
              }}
            >
              BUSINESS OUTCOME Focus
            </span>
            <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white tracking-tight">
              {activeModule.outcome}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-3xl font-medium">
              {activeModule.tagline}
            </p>
          </div>
        </div>

        {/* --- VISUAL SUB-SERVICES GRID (Just like services sub-page) --- */}
        <div className="mb-20" id="subservices-visual-grid">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-zinc-950 to-zinc-900/30 border border-zinc-900/80 shadow-[0_8px_30px_rgb(0,0,0,0.6)]">
            {activeServices.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  // Navigate to the dedicated services subpage and focus this specific service slug
                  window.location.hash = `#services/${service.id}`;
                }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="p-3 sm:p-4 rounded-2xl bg-zinc-900/20 hover:bg-zinc-900/60 border border-zinc-900/50 text-left transition-all duration-300 cursor-pointer group flex flex-col justify-between aspect-square"
                style={
                  hoveredId === service.id
                    ? {
                        borderColor: service.color,
                        boxShadow: `0 0 25px ${service.glowColor}`,
                      }
                    : {}
                }
              >
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3 border border-zinc-900/80 bg-zinc-950">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=500&h=350&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="flex items-center justify-between mt-auto w-full gap-2">
                  <span 
                    className="font-sans font-bold text-zinc-350 transition-colors text-[11px] sm:text-xs tracking-tight leading-snug line-clamp-2"
                    style={
                      hoveredId === service.id
                        ? { color: service.color }
                        : {}
                    }
                  >
                    {service.title}
                  </span>
                  <span 
                    className="font-mono text-zinc-500 text-[10px] transition-colors shrink-0"
                    style={
                      hoveredId === service.id
                        ? { color: service.color }
                        : {}
                    }
                  >
                    {service.number}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detailed alternating sub-service sections */}
        <div className="space-y-32 py-4 relative" id="services-detailed-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModuleId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-36"
            >
              {activeServices.map((service, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <div
                    key={service.id || index}
                    id={`subservice-sec-${service.slug}`}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-28 border-t border-zinc-900/40 pt-16"
                  >
                    {/* Graphical Visualizer Side */}
                    <div 
                      className={`lg:col-span-5 ${isLeft ? "lg:order-1" : "lg:order-2"} relative`}
                    >
                      {/* Sub-glowing backdrop for visual depth */}
                      <div 
                        className="absolute inset-0 blur-[100px] pointer-events-none -z-10 opacity-30 rounded-full"
                        style={{
                          background: activeModule.color,
                          transform: "scale(0.85)"
                        }}
                      />
                      <ServiceVisualizer id={service.id || service.slug} module={activeModuleId} />
                    </div>

                    {/* Explanatory Content Side */}
                    <div 
                      className={`lg:col-span-7 space-y-8 text-left ${isLeft ? "lg:order-2" : "lg:order-1"}`}
                    >
                      {/* Metric & Number Tag */}
                      <div className="flex items-center gap-3">
                        <span 
                          className="font-mono text-[10px] font-bold tracking-widest uppercase border px-2.5 py-1 rounded-full bg-zinc-950"
                          style={{
                            borderColor: `${activeModule.color}25`,
                            color: activeModule.color
                          }}
                        >
                          {service.number} / {activeModule.name.toUpperCase()} SUB-SERVICE
                        </span>
                        <div className="h-px bg-zinc-900 flex-1" />
                      </div>

                      {/* Header copy */}
                      <div className="space-y-4">
                        <h3 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight leading-none">
                          {service.title}
                        </h3>
                        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans font-medium">
                          {service.description}
                        </p>
                      </div>

                      {/* Rich details / specs block */}
                      <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-2.5">
                        <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider uppercase block">
                          [ BUSINESS OUTCOME & ARCHITECTURE SPEC ]
                        </span>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-sans">
                          {service.details}
                        </p>
                      </div>

                      {/* Deliverables / Key Benefits checklist */}
                      {service.deliverables && service.deliverables.length > 0 && (
                        <div className="space-y-4">
                          <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider uppercase block">
                            [ INTENTIONAL DELIVERABLES ]
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {service.deliverables.map((deliv, dIdx) => (
                              <div key={dIdx} className="flex items-start gap-2.5 group/item">
                                <div 
                                  className="w-5 h-5 rounded-full flex items-center justify-center border shrink-0 mt-0.5 transition-colors duration-300"
                                  style={{
                                    backgroundColor: `${activeModule.color}05`,
                                    borderColor: `${activeModule.color}30`
                                  }}
                                >
                                  <Check 
                                    className="w-3 h-3 transition-transform duration-300 group-hover/item:scale-110" 
                                    style={{ color: activeModule.color }}
                                  />
                                </div>
                                <span className="text-zinc-300 hover:text-white text-xs sm:text-sm font-sans font-medium transition-colors duration-200">
                                  {deliv}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Call-to-action buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        <button
                          onClick={() => {
                            window.location.hash = `#services/${getServiceSlug(service.title, service.slug)}`;
                          }}
                          className="px-5 py-2.5 rounded-full text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:bg-zinc-900 border border-zinc-850 hover:border-zinc-700 flex items-center gap-1.5 cursor-pointer"
                        >
                          Explore Spec Details
                          <ArrowUpRight className="w-3.5 h-3.5" style={{ color: activeModule.color }} />
                        </button>
                        <button
                          onClick={() => {
                            const contactForm = document.getElementById("contact");
                            if (contactForm) {
                              contactForm.scrollIntoView({ behavior: "smooth" });
                              const msgTextarea = document.getElementById("contact-message") as HTMLTextAreaElement;
                              if (msgTextarea) {
                                msgTextarea.value = `I am interested in loopCode Labs' ${service.title} services. Let's arrange a consultation regarding our digital objectives.`;
                                msgTextarea.dispatchEvent(new Event("input", { bubbles: true }));
                              }
                            }
                          }}
                          className="px-5 py-2.5 rounded-full text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                          style={{
                            backgroundColor: activeModule.color,
                          }}
                        >
                          Consult on {service.title}
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
