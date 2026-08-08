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
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, zIndex: 30 }}
        transition={{
          opacity: { duration: 1 },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[1%] sm:right-[2%] top-[2%] sm:top-[8%] lg:top-[12%] w-[125px] xs:w-[160px] sm:w-[280px] lg:w-[320px] h-[90px] xs:h-[110px] sm:h-[180px] lg:h-[200px] flex flex-col bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 cursor-pointer pointer-events-none sm:pointer-events-auto"
      >
        <div className="flex items-center justify-between px-1.5 sm:px-3 py-1 sm:py-1.5 border-b border-zinc-900 bg-zinc-950/90 text-[7px] xs:text-[8px] sm:text-[10px] text-zinc-400 font-mono">
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#ff5f56]" />
            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#ffbd2e]" />
            <span className="w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-[#27c93f]" />
            <span className="ml-0.5 text-zinc-500 font-bold truncate max-w-[60px] xs:max-w-none">design.fig</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="px-0.5 py-0.5 rounded bg-accent/10 text-accent text-[7px] sm:text-[9px]">Draft</span>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-10 sm:w-20 border-r border-zinc-900/80 p-1 sm:p-2 text-[7px] sm:text-[9px] font-mono text-zinc-500 flex flex-col gap-0.5 sm:gap-1 bg-zinc-950/30">
            <span className="text-zinc-600 font-bold text-[6px] sm:text-[8px] uppercase tracking-wider mb-0.5">Layers</span>
            <div className="flex items-center gap-1 text-zinc-400">
              <Layout className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-blue-400 shrink-0" />
              <span className="truncate text-[6px] sm:text-[9px]">Hero</span>
            </div>
            <div className="flex items-center gap-1 pl-0.5 text-accent">
              <PenTool className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0" />
              <span className="truncate text-[6px] sm:text-[9px]">Path</span>
            </div>
          </div>
          <div className="flex-1 relative bg-zinc-900/40 p-1 sm:p-3 flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
            <div className="relative w-full h-full border border-accent/30 rounded-md bg-accent/5 p-1 sm:p-2 flex flex-col justify-between">
              <div className="w-full flex justify-between items-start">
                <span className="text-[6px] sm:text-[8px] font-mono text-accent uppercase tracking-widest">[ active ]</span>
              </div>
              <div className="flex items-center justify-center gap-1 py-0.5">
                <div className="w-2.5 h-2.5 sm:w-4 sm:h-4 rounded-full border border-[#ff9933] opacity-60" />
                <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full border border-white opacity-40 animate-pulse" />
              </div>
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
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, zIndex: 30 }}
        transition={{
          opacity: { duration: 1, delay: 0.2 },
          y: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[1%] lg:right-[4%] top-[82%] sm:top-[80%] lg:top-[75%] w-[130px] xs:w-[170px] sm:w-[290px] lg:w-[340px] h-[88px] xs:h-[110px] sm:h-[185px] lg:h-[210px] flex flex-col bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 cursor-pointer pointer-events-none sm:pointer-events-auto"
      >
        <div className="flex items-center justify-between px-2 sm:px-3.5 py-1 sm:py-2 border-b border-zinc-900 bg-zinc-950/95">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            <span className="ml-0.5 text-[7px] sm:text-[10px] text-zinc-500 font-mono">App.tsx</span>
          </div>
          <span className="text-[7px] sm:text-[9px] text-zinc-600 font-mono">TSX</span>
        </div>
        <div className="flex-1 p-1.5 sm:p-3.5 font-mono text-[6px] xs:text-[7px] sm:text-[9px] lg:text-[10px] leading-relaxed overflow-hidden text-zinc-400 bg-zinc-950/50">
          <p><span className="text-zinc-600">1</span> <span className="text-[#ff9933]">import</span> Lab <span className="text-[#ff9933]">from</span> <span className="text-[#10b981]">"loopcode"</span>;</p>
          <p><span className="text-zinc-600">2</span> <span className="text-blue-400">const</span> <span className="text-accent">config</span> = {"{"}</p>
          <p><span className="text-zinc-600">3</span>   growth: <span className="text-purple-400">"AI"</span></p>
          <p><span className="text-zinc-600">4</span> {"};"}</p>
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
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, zIndex: 30 }}
        transition={{
          opacity: { duration: 1, delay: 0.4 },
          y: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[1%] lg:right-[1.5%] top-[30%] sm:top-[34%] lg:top-[44%] w-[65px] xs:w-[80px] sm:w-[125px] lg:w-[130px] h-[95px] xs:h-[112px] sm:h-[175px] lg:h-[190px] flex flex-col bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden p-1 sm:p-2 shadow-2xl z-10 cursor-pointer pointer-events-none sm:pointer-events-auto"
      >
        <div className="flex items-center gap-1 px-0.5 py-0.5 border-b border-zinc-900 mb-1">
          <Palette className="w-2 h-2 sm:w-3 sm:h-3 text-accent" />
          <span className="text-[6px] sm:text-[9px] font-mono text-zinc-400 uppercase tracking-wider">SWATCH</span>
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 sm:p-1 rounded border border-zinc-800/50">
            <span className="w-2.5 h-2.5 sm:w-5 sm:h-5 rounded bg-[#ff9933] shrink-0" />
            <div className="font-mono text-[6px] sm:text-[8px]">
              <p className="text-white font-bold">#FF9</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 sm:p-1 rounded border border-zinc-800/50">
            <span className="w-2.5 h-2.5 sm:w-5 sm:h-5 rounded bg-[#fafafa] shrink-0" />
            <div className="font-mono text-[6px] sm:text-[8px]">
              <p className="text-white font-bold">#FFF</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-zinc-900/60 p-0.5 sm:p-1 rounded border border-zinc-800/50">
            <span className="w-2.5 h-2.5 sm:w-5 sm:h-5 rounded bg-accent shrink-0" />
            <div className="font-mono text-[6px] sm:text-[8px]">
              <p className="text-white font-bold">#2BB</p>
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
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, zIndex: 30 }}
        transition={{
          opacity: { duration: 1, delay: 0.1 },
          y: { duration: 11, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[1%] sm:right-[4%] lg:right-[29%] top-[68%] sm:top-[70%] lg:top-[73%] w-[110px] xs:w-[140px] sm:w-[230px] lg:w-[250px] h-[85px] xs:h-[100px] sm:h-[160px] lg:h-[175px] flex flex-col bg-zinc-950/85 backdrop-blur-md border border-zinc-800/80 rounded-xl overflow-hidden p-1.5 sm:p-3 shadow-2xl z-10 cursor-pointer pointer-events-none sm:pointer-events-auto"
      >
        <div className="flex justify-between items-center pb-1 border-b border-zinc-900 mb-1">
          <div className="flex items-center gap-0.5">
            <Search className="w-2 h-2 sm:w-3 sm:h-3 text-accent" />
            <span className="text-[6px] sm:text-[9px] font-mono text-zinc-400 uppercase">SEO</span>
          </div>
          <div className="flex items-center gap-0.5 bg-emerald-500/10 px-0.5 py-0.5 rounded border border-emerald-500/20">
            <span className="text-[5px] sm:text-[7px] font-mono text-emerald-400 font-bold">LIVE</span>
          </div>
        </div>
        <div className="flex-1 flex gap-1">
          <div className="w-full border border-zinc-900 bg-zinc-950/40 p-0.5 rounded flex flex-col justify-between items-center text-center">
            <span className="text-[6px] sm:text-[7px] font-mono text-zinc-500">Score</span>
            <span className="text-[8px] sm:text-[10px] font-mono font-bold text-emerald-400">98%</span>
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
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, zIndex: 30 }}
        transition={{
          opacity: { duration: 1, delay: 0.3 },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[2%] sm:right-[4%] lg:right-[27%] top-[48%] sm:top-[50%] lg:top-[53%] w-[110px] xs:w-[130px] sm:w-[210px] lg:w-[230px] h-[75px] xs:h-[88px] sm:h-[140px] lg:h-[155px] flex flex-col bg-zinc-950/80 backdrop-blur-md border border-zinc-900/60 rounded-xl p-1.5 sm:p-3 shadow-xl z-10 cursor-pointer pointer-events-none sm:pointer-events-auto"
      >
        <div className="flex justify-between items-center pb-1 border-b border-zinc-900 mb-1">
          <div className="flex items-center gap-0.5">
            <Cpu className="w-2 h-2 sm:w-3 sm:h-3 text-purple-400 animate-pulse" />
            <span className="text-[6px] sm:text-[9px] font-mono text-zinc-400 uppercase">AI_FLOW</span>
          </div>
        </div>
        <div className="flex-1 relative flex items-center justify-between gap-0.5 mt-0.5">
          <div className="flex flex-col items-center bg-purple-950/40 border border-purple-800/60 p-0.5 rounded w-full text-center">
            <span className="text-[6px] sm:text-[7px] font-mono text-purple-400 uppercase font-bold">Gemini</span>
            <span className="text-[6px] sm:text-[8px] text-white font-bold">Auto_UI</span>
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
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, zIndex: 30 }}
        transition={{
          opacity: { duration: 1, delay: 0.5 },
          y: { duration: 9.5, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 7.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[10%] sm:right-[3%] lg:right-[16%] top-[18%] sm:top-[28%] lg:top-[32%] w-[72px] xs:w-[90px] sm:w-[150px] lg:w-[160px] h-[100px] xs:h-[125px] sm:h-[200px] lg:h-[220px] flex flex-col bg-zinc-950 border border-zinc-900 rounded-[14px] sm:rounded-[24px] overflow-hidden shadow-2xl z-10 cursor-pointer pointer-events-none sm:pointer-events-auto"
      >
        <div className="h-3 sm:h-6 bg-zinc-950 flex justify-between items-center px-1.5 sm:px-4 pt-0.5">
          <span className="text-[5px] sm:text-[7px] font-mono text-zinc-500">9:41</span>
          <Smartphone className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 text-zinc-600" />
        </div>
        <div className="flex-1 p-1 sm:p-2.5 bg-zinc-950 flex flex-col gap-1 justify-between">
          <div className="bg-zinc-900/40 p-0.5 rounded text-[6px] sm:text-[8px] text-white font-mono">
            Portal
          </div>
          <div className="bg-accent/10 p-0.5 rounded border border-accent/20 text-[5px] sm:text-[7px] font-mono text-accent">
            +124%
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
        whileHover={{ scale: 1.05, zIndex: 30 }}
        whileTap={{ scale: 0.98, zIndex: 30 }}
        transition={{
          opacity: { duration: 1, delay: 0.6 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute right-[18%] sm:right-[4%] lg:right-[26%] top-[2%] sm:top-[6%] lg:top-[11%] w-[80px] xs:w-[95px] sm:w-[155px] lg:w-[170px] h-[55px] xs:h-[66px] sm:h-[110px] lg:h-[120px] flex flex-col bg-zinc-950/80 backdrop-blur-md border border-zinc-900/60 rounded-xl p-1 sm:p-2.5 shadow-lg z-10 cursor-pointer pointer-events-none sm:pointer-events-auto"
      >
        <div className="flex justify-between items-center pb-0.5 border-b border-zinc-900 mb-0.5">
          <div className="flex items-center gap-0.5">
            <PenTool className="w-2 h-2 sm:w-3 sm:h-3 text-accent" />
            <span className="text-[5px] sm:text-[8px] font-mono text-zinc-400 uppercase">BEZIER</span>
          </div>
        </div>
        <div className="flex-1 relative border border-zinc-900 rounded bg-zinc-950/40 overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full text-zinc-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 70">
            <path d="M 20 50 C 40 15, 110 55, 130 20" fill="none" stroke="#2BBAA5" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>

      {/* Loose Floating Icon Badges */}
      <motion.div 
        animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] lg:right-[45%] top-[16%] flex items-center justify-center w-5 h-5 sm:w-9 sm:h-9 rounded-lg bg-zinc-900/90 border border-zinc-800 text-purple-400 shadow-lg z-10"
      >
        <Layers className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[2%] lg:right-[14%] top-[58%] lg:top-[66%] flex items-center justify-center w-5 h-5 sm:w-9 sm:h-9 rounded-lg bg-zinc-900/90 border border-zinc-800 text-accent shadow-lg z-10"
      >
        <Compass className="w-2.5 h-2.5 sm:w-4 sm:h-4 animate-spin-slow" />
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
            AI ENABLED SOFTWARE LABS
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

      </div>
    </section>
  );
}

