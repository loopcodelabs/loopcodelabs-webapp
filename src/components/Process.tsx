import { useState } from "react";
import { ArrowUpRight, Target, LayoutGrid, Shield, Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function Process() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const approaches = [
    {
      num: "01",
      title: "Strategy first",
      desc: "We start with your business goals, not a template. Every decision traces back to a number that matters.",
      icon: <Target className="w-5 h-5" />,
      color: "#2BBAA5",
      glowColor: "rgba(43, 186, 165, 0.45)",
    },
    {
      num: "02",
      title: "Designed to convert",
      desc: "Beautiful is table stakes. We engineer experiences that turn attention into action and visitors into customers.",
      icon: <LayoutGrid className="w-5 h-5" />,
      color: "#38BDF8",
      glowColor: "rgba(56, 189, 248, 0.45)",
    },
    {
      num: "03",
      title: "Built to last",
      desc: "Fast, accessible, maintainable code on modern frameworks — so your investment keeps performing for years.",
      icon: <Shield className="w-5 h-5" />,
      color: "#A855F7",
      glowColor: "rgba(168, 85, 247, 0.45)",
    },
    {
      num: "04",
      title: "Optimised forever",
      desc: "Launch is the starting line. We test, measure, and refine so your results compound month over month.",
      icon: <Sparkles className="w-5 h-5" />,
      color: "#F97316",
      glowColor: "rgba(249, 115, 22, 0.45)",
    },
  ];

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="process" className="py-24 px-6 sm:px-12 lg:px-20 bg-bg-alt relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        
        {/* Left Column - Sticky Content on desktop */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit space-y-6" id="approach-left">
          <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-500 tracking-[0.25em] uppercase">
            [ THE APPROACH ]
          </span>
          <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-normal leading-tight">
            How we drive growth.
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            A proven process that turns marketing from a cost centre into your most reliable growth engine.
          </p>
          
          <div className="pt-4">
            <button
              onClick={() => { window.location.hash = "#about"; }}
              className="px-6 py-3 bg-zinc-950 hover:bg-zinc-900 text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-zinc-950/10"
            >
              About the team
              <ArrowUpRight className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>

        {/* Right Column - Principles vertical flow */}
        <div className="lg:col-span-7 space-y-6" id="approach-right">
          {approaches.map((appr, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group p-8 rounded-3xl relative overflow-hidden transition-all duration-300 cursor-pointer border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: hoveredIndex === idx ? appr.color : "var(--border-color)",
                boxShadow: hoveredIndex === idx ? `0 0 30px ${appr.glowColor}` : "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex items-start gap-6 relative z-10">
                <div 
                  className="w-12 h-12 rounded-2xl bg-zinc-950 border flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    color: hoveredIndex === idx ? appr.color : "var(--color-accent)",
                    borderColor: hoveredIndex === idx ? appr.color : "var(--border-color)",
                    boxShadow: hoveredIndex === idx ? `0 0 15px ${appr.glowColor}` : "none"
                  }}
                >
                  {appr.icon}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold" style={{ color: "var(--text-muted)" }}>{appr.num}</span>
                    <h3 
                      className="font-sans font-bold text-xl transition-colors"
                      style={{
                        color: hoveredIndex === idx ? appr.color : "var(--text-primary)"
                      }}
                    >
                      {appr.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed font-normal" style={{ color: "var(--text-secondary)" }}>
                    {appr.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
