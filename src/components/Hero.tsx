import { ArrowUpRight, Code, PenTool, Layers, Palette, Cpu, MousePointer, Activity, Settings, Layout, Smartphone, Compass, TrendingUp, Search } from "lucide-react";
import { motion } from "motion/react";
import InteractiveText from "./InteractiveText";
import { useWebsite } from "../context/WebsiteContext";

export default function Hero() {
  const { modules } = useWebsite();
  const heroModule = modules.find(m => m.id === "hero");
  const subtitle = heroModule?.subtitle || "loopCode Labs helps businesses grow through websites, mobile apps, marketing, SEO, automation, and innovative technology solutions.";

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden bg-transparent"
    >
      {/* Dynamic Grid Background Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(43, 186, 165, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43, 186, 165, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          backgroundPosition: "4px 4px",
          maskImage: "radial-gradient(ellipse at center, black 50%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 50%, transparent 85%)",
        }}
      />

      {/* 
        ========================================================================
        FLOATING COLLAGE OF DESIGN STUDIO WORKFLOW ARTIFACTS
        An exquisite 2.5D layered visualization of the digital design process:
        Wireframe -> UI Design (Figma) -> Asset Creation -> Dev (Code) -> Live App
        ========================================================================
      */}

      {/* 1. FIGMA WORKSPACE CANVAS MOCKUP (Top Right) */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -3 }}
        animate={{ 
          opacity: 0.85, 
          y: [10, -10, 10],
          rotate: [-3, -2, -3]
        }}
        transition={{
          opacity: { duration: 1 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[2%] top-[12%] w-[320px] h-[200px] hidden lg:flex flex-col bg-zinc-950/75 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10"
      >
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-900 bg-zinc-950/90 text-[10px] text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
            <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
            <span className="ml-1 text-zinc-500 font-bold">loopcode_design_system.fig</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[9px]">Draft</span>
            <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">80%</span>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-20 border-r border-zinc-900/80 p-2 text-[9px] font-mono text-zinc-500 flex flex-col gap-1 bg-zinc-950/30">
            <span className="text-zinc-600 font-bold text-[8px] uppercase tracking-wider mb-1">Layers</span>
            <div className="flex items-center gap-1 text-zinc-400">
              <Layout className="w-2.5 h-2.5 text-blue-400" />
              <span>Hero_Frame</span>
            </div>
            <div className="flex items-center gap-1 pl-2 text-accent">
              <PenTool className="w-2.5 h-2.5" />
              <span>Chakra_Path</span>
            </div>
            <div className="flex items-center gap-1 pl-2 text-zinc-400">
              <Code className="w-2.5 h-2.5 text-purple-400" />
              <span>Code_Block</span>
            </div>
            <div className="flex items-center gap-1 pl-2 text-zinc-400">
              <Layers className="w-2.5 h-2.5 text-zinc-500" />
              <span>Bg_Glows</span>
            </div>
          </div>
          <div className="flex-1 relative bg-zinc-900/40 p-3 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
            <div className="relative w-full h-full border border-accent/30 rounded-md bg-accent/5 p-2 flex flex-col justify-between">
              <div className="w-full flex justify-between items-start">
                <span className="text-[8px] font-mono text-accent uppercase tracking-widest">[ active selection ]</span>
                <span className="text-[8px] font-mono text-zinc-500">1200 x 800</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 py-2">
                <div className="w-4 h-4 rounded-full border border-[#ff9933] opacity-60" />
                <div className="w-5 h-5 rounded-full border border-white opacity-40 animate-pulse" />
                <div className="w-4 h-4 rounded-full border border-[#10b981] opacity-60" />
              </div>
              <div className="h-1.5 w-1/2 bg-accent/30 rounded" />
            </div>
            <div className="absolute right-6 top-8 flex items-center gap-1.5 bg-pink-500 text-[8px] font-mono font-bold text-white px-1.5 py-0.5 rounded-full shadow-lg">
              <MousePointer className="w-2 h-2 fill-white text-white rotate-[-90deg]" />
              <span>Anjali (UX)</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. DEVELOPER CODE EDITOR (Middle-Lower Right) */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: 3 }}
        animate={{ 
          opacity: 0.9, 
          y: [-15, 15, -15],
          rotate: [3, 4, 3]
        }}
        transition={{
          opacity: { duration: 1, delay: 0.2 },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[4%] top-[75%] w-[340px] h-[210px] hidden xl:flex flex-col bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-20"
      >
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-zinc-900 bg-zinc-950/95">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            <span className="ml-1.5 text-[10px] text-zinc-500 font-mono">App.tsx</span>
          </div>
          <span className="text-[9px] text-zinc-600 font-mono">TypeScript</span>
        </div>
        <div className="flex-1 p-3.5 font-mono text-[9px] sm:text-[10px] leading-relaxed overflow-hidden text-zinc-400 bg-zinc-950/50">
          <p><span className="text-zinc-600">1</span> <span className="text-[#ff9933]">import</span> Lab, {"{"} Launch {"}"} <span className="text-[#ff9933]">from</span> <span className="text-[#10b981]">"loopcodelabs"</span>;</p>
          <p><span className="text-zinc-600">2</span> </p>
          <p><span className="text-zinc-600">3</span> <span className="text-blue-400">const</span> <span className="text-accent">labConfig</span> = {"{"}</p>
          <p><span className="text-zinc-600">4</span>   branding: <span className="text-[#10b981]">"Exquisite"</span>,</p>
          <p><span className="text-zinc-600">5</span>   growthModel: <span className="text-purple-400">"Exponential AI"</span>,</p>
          <p><span className="text-zinc-600">6</span>   market: <span className="text-[#ff9933]">"India & Global"</span></p>
          <p><span className="text-zinc-600">7</span> {"};"}</p>
          <p><span className="text-zinc-600">8</span> </p>
          <p><span className="text-zinc-600">9</span> <span className="text-blue-400">export default</span> <span className="text-purple-400">function</span> <span className="text-accent font-bold">InitiateGrowth</span>() {"{"}</p>
          <p><span className="text-zinc-600">10</span>   <span className="text-blue-400">return</span> &lt;<span className="text-emerald-400 font-bold">Lab</span> active={"{"}<span className="text-accent">true</span>{"}"} /&gt;;</p>
          <p><span className="text-zinc-600">11</span> {"}"}</p>
        </div>
      </motion.div>

      {/* 3. PANTONE COLOR SWATCH PALETTE (Far Right Center) */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: 6 }}
        animate={{ 
          opacity: 0.85, 
          y: [15, -15, 15],
          rotate: [6, 5, 6]
        }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[1.5%] top-[44%] w-[130px] h-[190px] hidden xl:flex flex-col bg-zinc-950/70 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden p-2 shadow-2xl z-10"
      >
        <div className="flex items-center gap-1.5 px-1 py-1 border-b border-zinc-900 mb-2">
          <Palette className="w-3 h-3 text-accent" />
          <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">SWATCHES</span>
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1 rounded border border-zinc-800/50">
            <span className="w-5 h-5 rounded bg-[#ff9933]" />
            <div className="font-mono text-[8px]">
              <p className="text-white font-bold">#FF9933</p>
              <p className="text-zinc-500">Saffron Dusk</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1 rounded border border-zinc-800/50">
            <span className="w-5 h-5 rounded bg-[#fafafa]" />
            <div className="font-mono text-[8px]">
              <p className="text-white font-bold">#FAFAFA</p>
              <p className="text-zinc-500">Glacier Pure</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1 rounded border border-zinc-800/50">
            <span className="w-5 h-5 rounded bg-[#10b981]" />
            <div className="font-mono text-[8px]">
              <p className="text-white font-bold">#10B981</p>
              <p className="text-zinc-500">Emerald Pulse</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1 rounded border border-zinc-800/50">
            <span className="w-5 h-5 rounded bg-accent" />
            <div className="font-mono text-[8px]">
              <p className="text-white font-bold">#2BBAA5</p>
              <p className="text-zinc-500">Premium Teal</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. WEB ANALYTICS & SEO PERFORMANCE DASHBOARD CARD (Lower Right) */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -6 }}
        animate={{ 
          opacity: 0.85, 
          y: [-10, 10, -10],
          rotate: [-6, -5, -6]
        }}
        transition={{
          opacity: { duration: 1, delay: 0.1 },
          y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[29%] top-[73%] w-[250px] h-[175px] hidden xl:flex flex-col bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden p-3 shadow-2xl z-10"
      >
        <div className="flex justify-between items-center pb-2 border-b border-zinc-900 mb-2">
          <div className="flex items-center gap-1.5">
            <Search className="w-3 h-3 text-accent" />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">SEO_PERFORMANCE</span>
          </div>
          <div className="flex items-center gap-1 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[7px] font-mono text-emerald-400 font-bold uppercase">LIVE</span>
          </div>
        </div>
        <div className="flex-1 flex gap-2">
          {/* SEO Score Circle Panel */}
          <div className="w-2/5 border border-zinc-900 bg-zinc-950/40 p-1.5 rounded-lg flex flex-col justify-between items-center text-center">
            <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">SEO Score</span>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r="20" stroke="#18181b" strokeWidth="3" fill="transparent" />
                <circle cx="24" cy="24" r="20" stroke="#2BBAA5" strokeWidth="3" fill="transparent" strokeDasharray="125.6" strokeDashoffset="12.5" />
              </svg>
              <span className="absolute text-[10px] font-mono font-bold text-white">98%</span>
            </div>
            <span className="text-[8px] font-mono text-zinc-400 font-semibold">CWV Passed</span>
          </div>

          {/* Web Analytics Sparkline & CTR Growth */}
          <div className="flex-1 flex flex-col justify-between p-1 bg-zinc-950/30 rounded-lg">
            <div className="flex justify-between items-center bg-zinc-900/40 px-1.5 py-1 rounded border border-zinc-800/30">
              <div className="flex flex-col">
                <span className="text-[6px] font-mono text-zinc-500 uppercase">Organic Clicks</span>
                <span className="text-[10px] font-mono font-bold text-white">+14.2k</span>
              </div>
              <div className="flex items-center gap-0.5 text-emerald-400">
                <TrendingUp className="w-2.5 h-2.5" />
                <span className="text-[8px] font-mono font-bold">+45%</span>
              </div>
            </div>

            {/* Micro Sparkline Chart */}
            <div className="h-8 flex items-end gap-1 px-1.5 py-1 bg-zinc-900/20 border border-zinc-900/50 rounded">
              <div className="h-[25%] w-full bg-zinc-800 rounded-sm" />
              <div className="h-[40%] w-full bg-zinc-800 rounded-sm" />
              <div className="h-[35%] w-full bg-accent/40 rounded-sm" />
              <div className="h-[60%] w-full bg-accent/60 rounded-sm" />
              <div className="h-[80%] w-full bg-accent rounded-sm" />
              <div className="h-[95%] w-full bg-accent rounded-sm" />
            </div>

            <div className="flex justify-between items-center text-[7px] font-mono px-0.5 pt-1 border-t border-zinc-900/40">
              <span className="text-zinc-500">Domain Auth: <strong className="text-white">74</strong></span>
              <span className="text-zinc-500">CTR: <strong className="text-emerald-400">4.8%</strong></span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 5. SYSTEM FLOW LOGIC DIAGRAM NODE CARD (Middle Right) */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: 4 }}
        animate={{ 
          opacity: 0.8, 
          y: [12, -12, 12],
          rotate: [4, 5, 4]
        }}
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[27%] top-[53%] w-[230px] h-[155px] hidden lg:flex flex-col bg-zinc-950/60 backdrop-blur-md border border-zinc-900/60 rounded-xl p-3 shadow-xl z-10"
      >
        <div className="flex justify-between items-center pb-2 border-b border-zinc-900 mb-2">
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3 h-3 text-purple-400 animate-pulse" />
            <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">AI_AGENT_FLOW</span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <div className="flex-1 relative flex items-center justify-between gap-1 mt-1">
          <div className="flex flex-col items-center gap-0.5 bg-zinc-900 border border-zinc-800 p-1.5 rounded-lg w-[64px] text-center shadow-lg">
            <span className="text-[7px] font-mono text-zinc-500 uppercase">Input</span>
            <span className="text-[8px] text-white font-bold">Concept</span>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-zinc-800 via-purple-500/50 to-zinc-800 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-400" />
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-purple-950/40 border border-purple-800/60 p-1.5 rounded-lg w-[68px] text-center shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="text-[7px] font-mono text-purple-400 uppercase font-bold">Gemini 2.5</span>
            <span className="text-[8px] text-white font-bold">Auto_UI</span>
          </div>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-zinc-800 via-accent/50 to-zinc-800 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
          </div>
          <div className="flex flex-col items-center gap-0.5 bg-accent/5 border border-accent/30 p-1.5 rounded-lg w-[64px] text-center shadow-lg">
            <span className="text-[7px] font-mono text-accent uppercase font-bold">Output</span>
            <span className="text-[8px] text-white font-bold">Live_App</span>
          </div>
        </div>
      </motion.div>

      {/* 6. MOBILE APP LIVE DYNAMICS PREVIEW (Lower Middle-Right) */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -3 }}
        animate={{ 
          opacity: 0.85, 
          y: [-12, 12, -12],
          rotate: [-3, -2, -3]
        }}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          y: { duration: 9.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[16%] top-[32%] w-[160px] h-[220px] hidden xl:flex flex-col bg-zinc-950 border-4 border-zinc-900 rounded-[24px] overflow-hidden shadow-2xl z-10"
      >
        <div className="h-6 bg-zinc-950 flex justify-between items-center px-4 pt-1.5">
          <span className="text-[7px] font-mono text-zinc-500">9:41</span>
          <div className="w-10 h-3 rounded-full bg-zinc-900 flex justify-center items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-950" />
          </div>
          <Smartphone className="w-2.5 h-2.5 text-zinc-600" />
        </div>
        <div className="flex-1 p-2.5 bg-zinc-950 flex flex-col gap-2">
          <div className="flex justify-between items-center bg-zinc-900/40 p-1 rounded-lg">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[7px] font-bold text-true-white">U</div>
              <span className="text-[8px] font-mono text-white">Client Portal</span>
            </div>
            <Activity className="w-2.5 h-2.5 text-accent" />
          </div>
          <div className="bg-zinc-900/60 p-1.5 rounded-lg border border-zinc-800/80">
            <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-wider">MONTHLY CONVERSION</span>
            <div className="flex items-end gap-1 h-10 pt-2 pb-1">
              <div className="h-[20%] w-full bg-[#ff9933] rounded" />
              <div className="h-[40%] w-full bg-[#ffffff] rounded" />
              <div className="h-[30%] w-full bg-[#10b981] rounded" />
              <div className="h-[65%] w-full bg-purple-500 rounded" />
              <div className="h-[90%] w-full bg-accent rounded" />
            </div>
            <div className="flex justify-between text-[6px] font-mono text-zinc-500">
              <span>M</span><span>A</span><span>M</span><span>J</span><span>J</span>
            </div>
          </div>
          <div className="bg-accent/10 p-1.5 rounded-lg border border-accent/20">
            <div className="flex justify-between items-center text-[7px] font-mono text-white">
              <span>Goal Progress</span>
              <span className="text-accent">+124%</span>
            </div>
            <div className="w-full bg-zinc-900 h-1 rounded-full mt-1 overflow-hidden">
              <div className="bg-accent h-full w-[85%]" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 7. VECTOR PEN TOOL CANVAS (Upper Middle-Right) */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        animate={{ 
          opacity: 0.8, 
          y: [10, -10, 10],
          rotate: [-2, -1, -2]
        }}
        transition={{
          opacity: { duration: 1, delay: 0.6 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[26%] top-[11%] w-[170px] h-[120px] hidden xl:flex flex-col bg-zinc-950/70 backdrop-blur-md border border-zinc-900/60 rounded-xl p-2.5 shadow-lg z-10"
      >
        <div className="flex justify-between items-center pb-1 border-b border-zinc-900 mb-1.5">
          <div className="flex items-center gap-1">
            <PenTool className="w-3 h-3 text-accent" />
            <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">BEZIER_NODE</span>
          </div>
          <span className="text-[7px] font-mono text-zinc-600">t: 0.45</span>
        </div>
        <div className="flex-1 relative border border-zinc-900 rounded bg-zinc-950/40 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(43,186,165,0.02) 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
          <svg className="w-full h-full text-zinc-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 70">
            <line x1="20" y1="50" x2="40" y2="15" stroke="#2BBAA5" strokeWidth="0.5" opacity="0.6" />
            <circle cx="40" cy="15" r="2" fill="#2BBAA5" />
            <line x1="130" y1="20" x2="110" y2="55" stroke="#2BBAA5" strokeWidth="0.5" opacity="0.6" />
            <circle cx="110" cy="55" r="2" fill="#2BBAA5" />
            <path d="M 20 50 C 40 15, 110 55, 130 20" fill="none" stroke="#2BBAA5" strokeWidth="1.5" />
            <circle cx="20" cy="50" r="3" fill="#fafafa" stroke="#2BBAA5" strokeWidth="1" />
            <circle cx="130" cy="20" r="3" fill="#fafafa" stroke="#2BBAA5" strokeWidth="1" />
          </svg>
          <div className="absolute left-1 bottom-1 text-[6px] font-mono text-zinc-500">P1(20,50) P2(130,20)</div>
        </div>
      </motion.div>

      {/* Loose Floating Icon Badges */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[38%] top-[24%] hidden lg:flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-400 shadow-lg z-10"
      >
        <Layers className="w-4 h-4" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[14%] top-[66%] hidden lg:flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 text-accent shadow-lg z-10"
      >
        <Compass className="w-4 h-4 animate-spin-slow" />
      </motion.div>



      {/* Beautiful Tricolor-inspired Ambient Glows (Subtle & High-End) */}
      <div className="absolute top-[10%] left-[10%] w-[350px] h-[350px] rounded-full bg-[#ff9933]/4 blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[20%] w-[400px] h-[400px] rounded-full bg-[#ffffff]/3 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#10b981]/4 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] left-[15%] w-[300px] h-[300px] rounded-full bg-accent/2 blur-[110px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col justify-center">
        
        {/* Indian Agency Dot Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase font-mono">
            AI ENABLED DIGITAL AGENCY
          </span>
        </motion.div>

        {/* Main Giant Text Stack - matching the EXACT look in the video */}
        <div className="flex flex-col space-y-1 md:space-y-2">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden py-1 sm:py-2"
          >
            <h1
              className="font-sans font-extrabold text-white tracking-tight text-[11vw] xs:text-[11vw] sm:text-[9.5vw] md:text-8xl lg:text-[110px] xl:text-[125px] leading-[0.9] sm:leading-[0.95] md:leading-[110px] xl:leading-[125px]"
            >
              <InteractiveText text="Empowering" />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden py-1 sm:py-2"
          >
            <h1
              className="font-sans font-extrabold text-white tracking-tight text-[11vw] xs:text-[11vw] sm:text-[9.5vw] md:text-8xl lg:text-[110px] xl:text-[125px] leading-[0.9] sm:leading-[0.95] md:leading-[110px] xl:leading-[125px] lowercase"
            >
              <InteractiveText text="your" />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden py-1 sm:py-2"
          >
            <h1
              className="font-sans font-extrabold text-accent tracking-tight text-[11vw] xs:text-[11vw] sm:text-[9.5vw] md:text-8xl lg:text-[110px] xl:text-[125px] leading-[0.9] sm:leading-[0.95] md:leading-[110px] xl:leading-[125px] lowercase"
            >
              <InteractiveText text="digital" />
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden py-1 sm:py-2"
          >
            <h1
              className="font-sans font-extrabold text-accent tracking-tight text-[11vw] xs:text-[11vw] sm:text-[9.5vw] md:text-8xl lg:text-[110px] xl:text-[125px] leading-[0.9] sm:leading-[0.95] md:leading-[110px] xl:leading-[125px] lowercase"
            >
              <InteractiveText text="future" />
            </h1>
          </motion.div>
        </div>

        {/* Description, Buttons, and Scroll Indicator */}
        <div className="mt-12 max-w-xl space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-sm sm:text-base md:text-[1.05rem] text-zinc-400 leading-relaxed font-normal"
          >
            {subtitle}
          </motion.p>

          {/* Action buttons mirroring the EXACT video layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => handleScrollTo("#contact")}
              className="px-6 py-3.5 bg-accent hover:bg-black text-true-black hover:text-[#2bbaa6] font-bold text-sm md:text-base rounded-full transition-all duration-300 flex items-center gap-1.5 group cursor-pointer shadow-lg shadow-accent/10 hover:shadow-accent/25"
            >
              Book consultation
              <ArrowUpRight className="w-4 h-4 md:w-4.5 md:h-4.5 text-true-black group-hover:text-[#2bbaa6] stroke-[2.5px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleScrollTo("#services")}
              className="px-6 py-3.5 bg-transparent hover:bg-[#2bbaa6]/10 text-text-primary font-bold text-sm md:text-base rounded-full border border-[#2bbaa6]/50 hover:border-[#2bbaa6] hover:shadow-[0_0_15px_rgba(43,186,166,0.2)] transition-all duration-300 cursor-pointer"
            >
              View services
            </button>
          </motion.div>

          {/* Scroll down indicator - Exactly like the video at 0:02 - 0:05 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-12 flex items-center gap-4"
          >
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 font-mono uppercase">
              SCROLL TO EXPLORE
            </span>
            <div className="w-8 h-8 rounded-full border border-zinc-800/80 flex items-center justify-center text-zinc-400 animate-bounce">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Mobile Showcase of design studio workflow artifacts */}
        <div className="mt-16 lg:hidden w-full relative z-20">
          <div className="flex flex-col space-y-2 mb-6">
            <span className="text-[10px] font-mono font-bold text-accent tracking-[0.25em] uppercase">
              [ WORKFLOW EXHIBIT ]
            </span>
            <h4 className="font-sans font-bold text-base text-zinc-100">
              Interactive process artifacts:
            </h4>
          </div>

          <div 
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 pt-2 px-1 scrollbar-none"
            style={{
              scrollbarWidth: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* 1. FIGMA WORKSPACE */}
            <div className="snap-center shrink-0 w-[290px] h-[200px] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-900 bg-zinc-950 text-[10px] text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                  <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                  <span className="ml-1 text-zinc-500 font-bold">design_system.fig</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[9px]">Draft</span>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className="w-20 border-r border-zinc-900/80 p-2 text-[9px] font-mono text-zinc-500 flex flex-col gap-1 bg-zinc-950/30">
                  <span className="text-zinc-600 font-bold text-[8px] uppercase tracking-wider mb-1">Layers</span>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <Layout className="w-2.5 h-2.5 text-blue-400" />
                    <span>Hero_Frame</span>
                  </div>
                  <div className="flex items-center gap-1 pl-2 text-accent">
                    <PenTool className="w-2.5 h-2.5" />
                    <span>Chakra_Path</span>
                  </div>
                </div>
                <div className="flex-1 relative bg-zinc-900/40 p-3 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                  <div className="relative w-full h-full border border-accent/30 rounded-md bg-accent/5 p-2 flex flex-col justify-between">
                    <span className="text-[8px] font-mono text-accent uppercase tracking-widest">[ active ]</span>
                    <div className="flex items-center justify-center gap-1.5 py-1">
                      <div className="w-3.5 h-3.5 rounded-full border border-[#ff9933] opacity-60" />
                      <div className="w-4 h-4 rounded-full border border-white opacity-40 animate-pulse" />
                    </div>
                    <div className="h-1 w-1/2 bg-accent/30 rounded" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. DEVELOPER CODE */}
            <div className="snap-center shrink-0 w-[290px] h-[200px] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-xl overflow-hidden shadow-xl">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-900 bg-zinc-950">
                <span className="text-[10px] text-zinc-500 font-mono">App.tsx</span>
                <span className="text-[9px] text-zinc-600 font-mono">TypeScript</span>
              </div>
              <div className="flex-1 p-3 font-mono text-[9px] leading-relaxed overflow-hidden text-zinc-400 bg-zinc-950">
                <p><span className="text-zinc-600">1</span> <span className="text-[#ff9933]">import</span> Lab <span className="text-[#ff9933]">from</span> <span className="text-[#10b981]">"loopcodelabs"</span>;</p>
                <p><span className="text-zinc-600">2</span> <span className="text-blue-400">const</span> <span className="text-accent">config</span> = {"{"}</p>
                <p><span className="text-zinc-600">3</span>   branding: <span className="text-[#10b981]">"Exquisite"</span>,</p>
                <p><span className="text-zinc-600">4</span>   growth: <span className="text-purple-400">"Exponential"</span></p>
                <p><span className="text-zinc-600">5</span> {"};"}</p>
              </div>
            </div>

            {/* 3. PANTONE SWATCH */}
            <div className="snap-center shrink-0 w-[140px] h-[200px] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-xl overflow-hidden p-2.5 shadow-xl">
              <div className="flex items-center gap-1.5 px-1 py-1 border-b border-zinc-900 mb-2">
                <Palette className="w-3 h-3 text-accent" />
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">SWATCHES</span>
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <div className="flex items-center gap-1.5 bg-zinc-900/60 p-1 rounded border border-zinc-800/50">
                  <span className="w-4 h-4 rounded bg-[#ff9933] shrink-0" />
                  <div className="font-mono text-[7px]">
                    <p className="text-white font-bold">#FF9933</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-900/60 p-1 rounded border border-zinc-800/50">
                  <span className="w-4 h-4 rounded bg-[#fafafa] shrink-0" />
                  <div className="font-mono text-[7px]">
                    <p className="text-white font-bold">#FAFAFA</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-zinc-900/60 p-1 rounded border border-zinc-800/50">
                  <span className="w-4 h-4 rounded bg-accent shrink-0" />
                  <div className="font-mono text-[7px]">
                    <p className="text-white font-bold">#2BBAA5</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. WEB ANALYTICS */}
            <div className="snap-center shrink-0 w-[240px] h-[200px] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-xl overflow-hidden p-3 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-900 mb-2">
                <div className="flex items-center gap-1.5">
                  <Search className="w-3 h-3 text-accent" />
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">SEO_PERFORMANCE</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-center bg-zinc-900/40 px-2 py-1 rounded border border-zinc-800/30">
                  <span className="text-[7px] font-mono text-zinc-500 uppercase">Organic clicks</span>
                  <span className="text-[10px] font-mono font-bold text-white">+14.2k</span>
                </div>
                {/* Sparkline */}
                <div className="h-10 flex items-end gap-1 px-1.5 py-1 bg-zinc-900/20 border border-zinc-900/50 rounded mt-2">
                  <div className="h-[25%] w-full bg-zinc-800 rounded-sm" />
                  <div className="h-[40%] w-full bg-accent/40 rounded-sm" />
                  <div className="h-[70%] w-full bg-accent/70 rounded-sm" />
                  <div className="h-[95%] w-full bg-accent rounded-sm" />
                </div>
                <div className="flex justify-between items-center text-[7px] font-mono pt-1.5 mt-1 border-t border-zinc-900/40">
                  <span className="text-zinc-500">DA: <strong className="text-white">74</strong></span>
                  <span className="text-zinc-500">CTR: <strong className="text-emerald-400">4.8%</strong></span>
                </div>
              </div>
            </div>

            {/* 5. AGENT FLOW */}
            <div className="snap-center shrink-0 w-[240px] h-[200px] flex flex-col bg-zinc-950 border border-zinc-800/80 rounded-xl p-3 shadow-xl">
              <div className="flex justify-between items-center pb-2 border-b border-zinc-900 mb-2">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-purple-400" />
                  <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">AI_AGENT_FLOW</span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-between gap-1">
                <div className="flex flex-col items-center gap-0.5 bg-zinc-900 border border-zinc-800 p-1 rounded w-[60px] text-center">
                  <span className="text-[6px] font-mono text-zinc-500 uppercase">Input</span>
                  <span className="text-[8px] text-white font-bold">Concept</span>
                </div>
                <div className="flex-1 h-0.5 bg-purple-500/50" />
                <div className="flex flex-col items-center gap-0.5 bg-purple-950/40 border border-purple-800/60 p-1 rounded w-[64px] text-center">
                  <span className="text-[6px] font-mono text-purple-400 uppercase font-bold">Gemini</span>
                  <span className="text-[8px] text-white font-bold">Auto_UI</span>
                </div>
                <div className="flex-1 h-0.5 bg-accent/50" />
                <div className="flex flex-col items-center gap-0.5 bg-accent/5 border border-accent/30 p-1 rounded w-[60px] text-center">
                  <span className="text-[6px] font-mono text-accent uppercase font-bold">Output</span>
                  <span className="text-[8px] text-white font-bold">Live_App</span>
                </div>
              </div>
            </div>

            {/* 6. MOBILE APP PREVIEW */}
            <div className="snap-center shrink-0 w-[160px] h-[200px] flex flex-col bg-zinc-950 border-2 border-zinc-900 rounded-[18px] overflow-hidden shadow-xl">
              <div className="h-5 bg-zinc-950 flex justify-between items-center px-3 pt-1">
                <span className="text-[6px] font-mono text-zinc-500">9:41</span>
                <Smartphone className="w-2 h-2 text-zinc-600" />
              </div>
              <div className="flex-1 p-2 bg-zinc-950 flex flex-col gap-1.5 justify-between">
                <div className="flex justify-between items-center bg-zinc-900/40 p-1 rounded-lg">
                  <span className="text-[7px] font-mono text-white">Client Portal</span>
                  <Activity className="w-2 h-2 text-accent" />
                </div>
                <div className="bg-zinc-900/60 p-1.5 rounded-lg border border-zinc-800/80">
                  <div className="flex items-end gap-0.5 h-6">
                    <div className="h-[20%] w-full bg-[#ff9933] rounded-sm" />
                    <div className="h-[40%] w-full bg-[#ffffff] rounded-sm" />
                    <div className="h-[65%] w-full bg-purple-500 rounded-sm" />
                    <div className="h-[90%] w-full bg-accent rounded-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* 7. VECTOR PEN TOOL */}
            <div className="snap-center shrink-0 w-[200px] h-[200px] flex flex-col bg-zinc-950 border border-zinc-900/60 rounded-xl p-2.5 shadow-xl">
              <div className="flex justify-between items-center pb-1 border-b border-zinc-900 mb-1.5">
                <div className="flex items-center gap-1">
                  <PenTool className="w-3 h-3 text-accent" />
                  <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider">BEZIER_NODE</span>
                </div>
              </div>
              <div className="flex-1 relative border border-zinc-900 rounded bg-zinc-950/40 overflow-hidden flex items-center justify-center">
                <svg className="w-full h-full text-zinc-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 70">
                  <line x1="20" y1="50" x2="40" y2="15" stroke="#2BBAA5" strokeWidth="0.5" opacity="0.6" />
                  <circle cx="40" cy="15" r="2" fill="#2BBAA5" />
                  <path d="M 20 50 C 40 15, 110 55, 130 20" fill="none" stroke="#2BBAA5" strokeWidth="1.5" />
                  <circle cx="20" cy="50" r="3" fill="#fafafa" stroke="#2BBAA5" strokeWidth="1" />
                  <circle cx="130" cy="20" r="3" fill="#fafafa" stroke="#2BBAA5" strokeWidth="1" />
                </svg>
              </div>
            </div>

          </div>
          
          <div className="flex items-center justify-center gap-2 text-zinc-600 text-[10px] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>← Swipe left / right to interact →</span>
          </div>
        </div>

      </div>
    </section>
  );
}

