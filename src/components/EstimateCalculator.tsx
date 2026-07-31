import { useState, useEffect } from "react";
import { Calculator, Sparkles, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { safeSessionStorage } from "../utils/storage";

interface EstimateCalculatorProps {
  onBack?: () => void;
}

export default function EstimateCalculator({ onBack }: EstimateCalculatorProps) {
  // Calculator States
  const [projectType, setProjectType] = useState<string>("landing");
  const [pages, setPages] = useState<number>(3);
  const [animations, setAnimations] = useState<boolean>(true);
  const [cms, setCms] = useState<boolean>(false);
  const [payment, setPayment] = useState<boolean>(false);
  const [seo, setSeo] = useState<boolean>(true);
  const [performance, setPerformance] = useState<boolean>(false);
  
  const [totalCost, setTotalCost] = useState<number>(1800);

  // Recalculate price in INR whenever values change
  useEffect(() => {
    let basePrice = 0;
    
    // 1. Base project price (INR values represent premium local lab rates)
    if (projectType === "landing") {
      basePrice = 85000;
    } else if (projectType === "corporate") {
      basePrice = 180000;
    } else if (projectType === "ecommerce") {
      basePrice = 280000;
    } else if (projectType === "custom") {
      basePrice = 450000;
    }

    // 2. Pages price (base includes up to 3 pages)
    const extraPages = Math.max(0, pages - 3);
    basePrice += extraPages * 12000;

    // 3. Optional Features add-on
    if (animations) basePrice += 25000;
    if (cms) basePrice += 20000;
    if (payment) basePrice += 30000;
    if (seo) basePrice += 15000;
    if (performance) basePrice += 25000;

    setTotalCost(basePrice);
  }, [projectType, pages, animations, cms, payment, seo, performance]);

  const handleApplyToForm = () => {
    // Determine target budget category to match select field in Contact
    let selectedBudget = "₹1,50,000 - ₹3,00,000";
    if (totalCost <= 150000) {
      selectedBudget = "₹50,000 - ₹1,50,000";
    } else if (totalCost > 150000 && totalCost <= 300000) {
      selectedBudget = "₹1,50,000 - ₹3,00,000";
    } else if (totalCost > 300000 && totalCost <= 500000) {
      selectedBudget = "₹3,00,000 - ₹5,00,000";
    } else if (totalCost > 500000) {
      selectedBudget = "₹5,00,000+";
    }

    const estimateMsg = `Hi loopCode Labs, I estimated my project using your cost calculator.\nDetails:\n- Project: ${projectType.toUpperCase()}\n- Total Pages: ${pages}\n- Extra Features: ${animations ? "Animations, " : ""}${cms ? "CMS, " : ""}${payment ? "Payments, " : ""}${seo ? "Advanced SEO, " : ""}${performance ? "Ultra performance, " : ""}\nEstimated Cost: ₹${totalCost.toLocaleString('en-IN')} INR.\nLet's build!`;

    // Save details to sessionStorage so Contact component can pick them up
    safeSessionStorage.setItem(
      "pending-estimate",
      JSON.stringify({
        projectType,
        budget: selectedBudget,
        message: estimateMsg,
      })
    );

    if (window.location.hash === "#pricing") {
      // Notify Contact component on the same page
      window.dispatchEvent(new Event("apply-estimate"));
      
      const contactForm = document.getElementById("contact");
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Redirect to contact section on homepage
      window.location.hash = "#contact";
    }
  };

  return (
    <section id="pricing" className="pt-28 pb-24 px-6 sm:px-12 lg:px-20 bg-zinc-950 relative overflow-hidden">
      {/* Bright grid pattern overlay gradually fading downwards with enhanced brightness and glow */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_25%,rgba(0,0,0,0.6)_65%,transparent_95%)] pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(43,186,165,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] pointer-events-none z-0" />

      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-100px] left-[55%] -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/14 blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[20px] left-[55%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/22 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[80px] left-[55%] -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white/10 blur-[80px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Back navigation */}
        {onBack && (
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer font-mono"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO HOMEPAGE
          </button>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="calc-header">
          <div className="space-y-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-[0.25em] uppercase">
              [ INTERACTIVE PLANNER ]
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-normal">
              Estimate Project Cost.
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm text-xs sm:text-sm leading-relaxed">
            Configure your page volume and technical criteria to receive an instant transparent budget recommendation. No gatekeeping.
          </p>
        </div>

        {/* Double Column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="calc-grid">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-zinc-950/80 border border-zinc-900 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
            
            {/* Step 1: Project Type */}
            <div className="space-y-4">
              <label className="text-[10px] sm:text-xs font-bold tracking-wider text-zinc-400 uppercase font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-[10px]">1</span>
                Select Project Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "landing", label: "SaaS Landing", desc: "Single visual page" },
                  { id: "corporate", label: "Multi-page Site", desc: "For modern companies" },
                  { id: "ecommerce", label: "E-Commerce", desc: "Store & Checkout systems" },
                  { id: "custom", label: "Custom App", desc: "Advanced dashboards" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-[95px] cursor-pointer ${
                      projectType === type.id
                        ? "bg-accent/5 border-accent text-white"
                        : "bg-zinc-900/30 border-zinc-900 text-zinc-400 hover:border-zinc-800"
                    }`}
                  >
                    <span className={`text-xs sm:text-sm font-bold block ${projectType === type.id ? "text-accent" : ""}`}>{type.label}</span>
                    <span className="text-[11px] text-zinc-400 block leading-tight mt-0.5">{type.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Page Count Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] sm:text-xs font-bold tracking-wider text-zinc-400 uppercase font-mono flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-[10px]">2</span>
                  Total Number of Pages
                </label>
                <span className="text-xs sm:text-sm font-bold text-white bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800 font-mono">
                  {pages} {pages === 1 ? "page" : "pages"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                value={pages}
                onChange={(e) => setPages(parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-850 rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                <span>1 Page</span>
                <span>5 Pages</span>
                <span>10 Pages</span>
                <span>20 Pages</span>
              </div>
            </div>

            {/* Step 3: Add-on Capabilities */}
            <div className="space-y-4">
              <label className="text-[10px] sm:text-xs font-bold tracking-wider text-zinc-400 uppercase font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold text-[10px]">3</span>
                Optional Tech Add-ons
              </label>
              <div className="space-y-3">
                {[
                  { state: animations, setter: setAnimations, label: "Advanced Animations & Interactions", price: "+₹25,000", desc: "Custom motion physics, smooth entrance timing, interactive elements" },
                  { state: cms, setter: setCms, label: "CMS & Dynamic Database Systems", price: "+₹20,000", desc: "Allows seamless blog articles, project collections, and self-managed editor panel" },
                  { state: payment, setter: setPayment, label: "Stripe & Checkout Integrations", price: "+₹30,000", desc: "Fully integrated payment gateways, customization billing cards, and secure carts" },
                  { state: seo, setter: setSeo, label: "SEO & Schema Optimization", price: "+₹15,000", desc: "Rich sitemaps, localized Google schema payload configurations for maximum reach" },
                  { state: performance, setter: setPerformance, label: "Ultra Speed Compliance (99+ Core Vitals)", price: "+₹25,000", desc: "Next-gen caching, image compression setups, and ultra lightweight loads" },
                ].map((feature, i) => (
                  <label
                    key={i}
                    className="flex items-start justify-between p-4 bg-zinc-900/10 border border-zinc-900 rounded-2xl cursor-pointer hover:border-zinc-800 transition-colors"
                  >
                    <div className="flex gap-3">
                      <input
                        type="checkbox"
                        checked={feature.state}
                        onChange={(e) => feature.setter(e.target.checked)}
                        className="w-4 h-4 rounded text-black bg-zinc-900 border-zinc-800 focus:ring-accent accent-accent mt-0.5 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-white block">{feature.label}</span>
                        <span className="text-[11px] text-zinc-400 block leading-relaxed mt-1 max-w-md">{feature.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-accent font-mono shrink-0 ml-2">{feature.price}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Price Output Panel (Right) */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-32" id="calc-output">
            <div className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-2 pb-2 border-b border-zinc-900">
                  <Calculator className="w-4 h-4 text-accent" />
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 font-mono uppercase">ESTIMATION SUMMARY</span>
                </div>

                {/* Simulated Price display */}
                <div className="pb-2">
                  <span className="text-xs text-zinc-400 block font-medium">Estimated Investment</span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-4xl sm:text-5xl font-sans font-extrabold text-white tracking-tight">
                      ₹{totalCost.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-mono text-accent font-bold">INR</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-zinc-900 text-zinc-300 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border border-zinc-800 mt-3">
                    <Sparkles className="w-3 h-3 text-accent" />
                    Timeline: {pages <= 3 ? "2-3 Weeks" : pages <= 10 ? "3-5 Weeks" : "5-7 Weeks"}
                  </div>
                </div>

                {/* What's included checklist */}
                <div className="space-y-4 pt-4 border-t border-zinc-900">
                  <span className="text-[10px] font-bold text-zinc-500 block font-mono tracking-wider uppercase">STANDARD SERVICE DELIVERABLES</span>
                  <div className="space-y-2.5">
                    {[
                      "Fully custom high-contrast visual interface",
                      "100% handoff of vector source assets",
                      "Standard secure custom domain linking",
                      "Complementary 30 days post-launch support",
                      "Optimised responsive layouts for mobile & desktop"
                    ].map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-zinc-400 text-xs font-medium">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <button
                  onClick={handleApplyToForm}
                  className="w-full py-4 mt-4 rounded-full bg-accent hover:bg-accent-hover text-true-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer font-sans shadow-lg shadow-accent/15"
                >
                  <Send className="w-4 h-4" />
                  APPLY TO INQUIRY FORM
                </button>

                <p className="text-[11px] text-zinc-400 text-center leading-relaxed mt-3 font-mono">
                  *This acts as a high-fidelity guide. Final scoping is verified during our discovery call.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
