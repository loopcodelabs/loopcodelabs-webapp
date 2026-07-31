import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Code, 
  Smartphone, 
  Search, 
  Megaphone, 
  Target, 
  Mail, 
  Palette, 
  Layout, 
  Check, 
  TrendingUp, 
  LineChart, 
  Layers, 
  Inbox, 
  Activity, 
  Lock 
} from "lucide-react";
import { motion } from "motion/react";
import Contact from "./Contact";
import FAQ from "./FAQ";
import { useWebsite } from "../context/WebsiteContext";
import { safeSessionStorage } from "../utils/storage";
import ServiceVisualizer from "./ServiceVisualizer";

import { mapServicesToItems, ServiceItem } from "../utils/serviceMapping";

interface ServiceLandingPageProps {
  initialServiceSlug?: string;
  onBack: () => void;
}

export default function ServiceLandingPage({ initialServiceSlug, onBack }: ServiceLandingPageProps) {
  const { services: cmsServices } = useWebsite();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    // If a specific service slug was passed, scroll smoothly to its section
    if (initialServiceSlug) {
      setTimeout(() => {
        const element = document.getElementById(`service-sec-${initialServiceSlug}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [initialServiceSlug]);

  const servicesList: ServiceItem[] = mapServicesToItems(cmsServices);

  const handleScrollToSec = (secId: string) => {
    const el = document.getElementById(`service-sec-${secId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleStartProject = (service: ServiceItem) => {
    let budgetText = "₹1,50,000 - ₹3,00,000";
    if (service.id.includes("seo") || service.id.includes("email")) {
      budgetText = "₹50,000 - ₹1,50,000";
    }

    const message = `Hi loopCode Labs, I am interested in launching a project for: ${service.title}.\nI would like to configure a plan based on the deliverables:\n${service.deliverables.map(d => `- ${d}`).join("\n")}\n\nLet's build!`;

    // Save details to sessionStorage so Contact component can load them
    safeSessionStorage.setItem(
      "pending-estimate",
      JSON.stringify({
        projectType: service.id.includes("app") ? "mobile" : "landing",
        budget: budgetText,
        message: message,
      })
    );

    // Dispatch custom event to notify Contact if on same page
    window.dispatchEvent(new Event("apply-estimate"));

    // Scroll to contact form smoothly
    const contactForm = document.getElementById("contact");
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Custom high-fidelity visualizers for each service
  const renderVisualizer = (id: string) => {
    const cmsItem = cmsServices.find(s => s.slug === id);
    const module = cmsItem?.module || "build";
    return <ServiceVisualizer id={id} module={module} />;
  };

  return (
    <article className="min-h-screen bg-zinc-950 pt-28 pb-0 relative overflow-hidden" id="services-subpage-view">
      {/* Bright grid pattern overlay gradually fading downwards with enhanced brightness and glow */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_25%,rgba(0,0,0,0.6)_65%,transparent_95%)] pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(43,186,165,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] pointer-events-none z-0" />

      {/* Decorative Background Glows */}
      <div className="absolute top-[-100px] left-[55%] -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/14 blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[20px] left-[55%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/22 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[80px] left-[55%] -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white/10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/5 blur-[150px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        
        {/* Back navigation button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer font-mono"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          BACK TO HOMEPAGE
        </button>

        {/* Hero Header Area */}
        <header className="space-y-6 text-left max-w-4xl mb-16" id="services-page-header">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-accent bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800 tracking-[0.25em] uppercase inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            [ SERVICES ]
          </span>

          <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-[5rem] text-white tracking-tight leading-[1.05] max-w-3xl">
            Everything you need to grow online.
          </h1>

          <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl leading-relaxed font-sans">
            Eight disciplines, one accountable partner. We plug into your business and own the outcomes — from first pixel to compounding results.
          </p>
        </header>

        {/* Horizontal Index of 8 Services */}
        <section className="mb-24" id="services-index-grid">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 sm:p-5 rounded-3xl bg-gradient-to-b from-zinc-950 to-zinc-900/30 border border-zinc-900/80 shadow-[0_8px_30px_rgb(0,0,0,0.6)]">
            {servicesList.map((service) => (
              <button
                key={service.id}
                onClick={() => handleScrollToSec(service.id)}
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
                    className="font-sans font-bold text-zinc-300 transition-colors text-[11px] sm:text-xs md:text-sm tracking-tight leading-snug"
                    style={
                      hoveredId === service.id
                        ? { color: service.color }
                        : {}
                    }
                  >
                    {service.title}
                  </span>
                  <span 
                    className="font-mono text-zinc-500 text-[10px] transition-colors"
                    style={
                      hoveredId === service.id
                        ? { color: service.color }
                        : {}
                    }
                  >
                    {service.num}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Sequential 8 Detailed Service Sections */}
        <section className="space-y-36 pb-20" id="services-detailed-list">
          {servicesList.map((service, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={service.id} 
                id={`service-sec-${service.id}`} 
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center scroll-mt-24"
              >
                {/* Visual side */}
                <div className={`lg:col-span-5 ${isLeft ? "lg:order-1" : "lg:order-2"}`}>
                  {renderVisualizer(service.id)}
                </div>

                {/* Content side */}
                <div className={`lg:col-span-7 space-y-8 text-left ${isLeft ? "lg:order-2" : "lg:order-1"}`}>
                  
                  {/* Category marker and number */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-zinc-500 text-xs font-bold tracking-widest">{service.num} / SERVICE</span>
                    <div className="h-px bg-zinc-900 flex-1" />
                  </div>

                  {/* Header copy */}
                  <div className="space-y-4">
                    <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans">
                      {service.desc}
                    </p>
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase block">[ KEY BENEFITS ]</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-accent" />
                          </div>
                          <span className="text-zinc-300 text-xs font-medium font-sans leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Process */}
                  <div className="space-y-4 pt-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase block">[ PROCESS ]</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {service.process.map((step, sIdx) => (
                        <div key={sIdx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-900 flex flex-col justify-between aspect-[1.1/1]">
                          <span className="font-mono text-[9px] text-accent">{step.num}</span>
                          <div>
                            <span className="font-sans font-bold text-white text-xs block mb-0.5">{step.title}</span>
                            <span className="text-zinc-500 text-[10px] leading-tight block">{step.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase block">[ DELIVERABLES ]</span>
                    <div className="flex flex-wrap gap-2">
                      {service.deliverables.map((del, dIdx) => (
                        <span key={dIdx} className="px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-850 text-[10px] font-bold text-zinc-300 font-mono">
                          {del}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleStartProject(service)}
                      className="group inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-true-white font-extrabold text-xs uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-lg shadow-accent/5 hover:shadow-accent/15"
                    >
                      Start this project
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </section>

        {/* Dynamic CTA Banner matching 00:30 in the video */}
        <section className="py-24 bg-transparent relative overflow-hidden" id="services-outro-cta">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
          
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <span className="text-[12px] font-mono font-bold text-zinc-500 tracking-[0.25em] uppercase block">
              [ NOT SURE WHERE TO START? ]
            </span>
            <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight">
              Let's find your fastest path to growth.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Tell us your goals and we'll recommend exactly which services will move the needle first.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="group px-6 py-3 bg-accent hover:bg-black text-true-black hover:text-[#2bbaa6] font-extrabold text-xs uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer shadow-lg shadow-accent/20 hover:shadow-accent/30"
              >
                Book consultation
              </button>
              <button
                onClick={() => window.scrollTo({ top: 350, behavior: "smooth" })}
                className="px-6 py-3 bg-true-black hover:bg-zinc-900 text-true-white font-extrabold text-xs uppercase tracking-wider rounded-full border border-accent/40 hover:border-accent hover:shadow-[0_0_15px_rgba(43,186,166,0.2)] transition-all duration-300 cursor-pointer"
              >
                View services
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* FAQ Section */}
      <FAQ />

      {/* Embedded Contact Form at the very bottom of the page */}
      <div className="bg-transparent relative z-10" id="services-contact-wrapper">
        <Contact />
      </div>
    </article>
  );
}
