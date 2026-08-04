import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Cpu, GitBranch, Network, Sparkles, Terminal } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  // Animation stages:
  // 1. "draw"     : 0.0s - 1.2s  (Infinity loop path draws smoothly from center)
  // 2. "flow"     : 1.2s - 3.4s  (Dual neon track with 60fps particle comets & tech nodes)
  // 3. "converge" : 3.4s - 4.6s  (Infinity symbol converges into a central laser pulse)
  // 4. "reveal"   : 4.6s - 6.0s  (Laser expands to reveal loop_Code Labs branding)
  // 5. "exit"     : 6.0s+        (Fades out & calls onComplete)
  const [stage, setStage] = useState<"draw" | "flow" | "converge" | "reveal" | "exit">("draw");
  const [progress, setProgress] = useState<number>(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Smooth numeric percentage counter (0% to 100%)
  useEffect(() => {
    const startTime = Date.now();
    const duration = 5200; // 5.2s total progress duration
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);
      if (pct >= 100) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Stage timeline sequence
  useEffect(() => {
    const t1 = setTimeout(() => setStage("flow"), 1200);
    const t2 = setTimeout(() => setStage("converge"), 3400);
    const t3 = setTimeout(() => setStage("reveal"), 4600);
    const t4 = setTimeout(() => setStage("exit"), 6000);
    const t5 = setTimeout(() => {
      onCompleteRef.current();
    }, 6500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Mathematically balanced, perfectly continuous Bezier Lemniscate (Infinity Loop)
  // ViewBox: 400 x 300 | Center: (200, 150) | Left Loop Apex: (80, 150) | Right Loop Apex: (320, 150)
  const infinityPathD =
    "M 200 150 C 235 95, 275 90, 305 115 C 335 140, 335 160, 305 185 C 275 210, 235 205, 200 150 C 165 95, 125 90, 95 115 C 65 140, 65 160, 95 185 C 125 210, 165 205, 200 150 Z";

  const handleSkip = () => {
    setStage("exit");
    setTimeout(() => {
      onCompleteRef.current();
    }, 300);
  };

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          id="loopcode-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-[#090D16] text-white flex flex-col items-center justify-center overflow-hidden select-none font-sans"
        >
          {/* Deep Dark Tech Background with Subtle Ambient Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0E1626_0%,_#090D16_70%,_#05080E_100%)]" />

          {/* Glowing Ambient Backdrop Aura */}
          <motion.div
            animate={{
              opacity: stage === "flow" ? 0.6 : stage === "converge" ? 0.9 : 0.4,
              scale: stage === "converge" ? 1.3 : 1,
            }}
            transition={{ duration: 0.8 }}
            className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle_at_center,_rgba(0,229,255,0.15)_0%,_rgba(0,187,167,0.05)_50%,_transparent_70%)] blur-3xl pointer-events-none"
          />

          {/* Main Content Area */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl min-h-[420px] px-4">
            {/* SVG Animation Stage (Draw, Flow, Converge) */}
            {(stage === "draw" || stage === "flow" || stage === "converge") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{
                  opacity: stage === "converge" ? [1, 1, 0] : 1,
                  scale: stage === "converge" ? [1, 0.4, 0.1] : 1,
                  rotate: stage === "converge" ? 180 : 0,
                }}
                transition={{ duration: stage === "converge" ? 1.2 : 0.6, ease: "easeInOut" }}
                className="relative w-[320px] h-[240px] sm:w-[420px] sm:h-[300px] flex items-center justify-center"
              >
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,229,255,0.3)] overflow-visible"
                >
                  <defs>
                    {/* Multi-layered Neon Filters */}
                    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="blur1" />
                      <feGaussianBlur stdDeviation="8" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="intenseCoreGlow" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="4" result="blur1" />
                      <feGaussianBlur stdDeviation="12" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Gradient strokes for infinity track */}
                    <linearGradient id="cyanTealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00E5FF" />
                      <stop offset="50%" stopColor="#00BBA7" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>

                    <linearGradient id="cometGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                      <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* ===== STAGE 1 & 2: INFINITY TRACK & PARTICLES ===== */}
                  <g>
                    {/* Background Soft Glow Path */}
                    <path
                      d={infinityPathD}
                      fill="none"
                      stroke="#00E5FF"
                      strokeWidth="14"
                      opacity="0.25"
                      filter="url(#neonGlow)"
                      strokeLinecap="round"
                    />

                    {/* Dark Metallic Track Base */}
                    <path
                      d={infinityPathD}
                      fill="none"
                      stroke="#0F172A"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Core Glowing Infinity Line */}
                    <motion.path
                      d={infinityPathD}
                      fill="none"
                      stroke="url(#cyanTealGrad)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#neonGlow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Secondary Accent Dashed Track */}
                    <motion.path
                      d={infinityPathD}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth="1.2"
                      strokeDasharray="4 8"
                      opacity="0.6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
                    />

                    {/* 60FPS Streaming Light Particle Comets (animateMotion along Bezier path) */}
                    {(stage === "flow" || stage === "converge") && (
                      <g>
                        {/* Primary Leading Comet */}
                        <circle r="4.5" fill="#FFFFFF" filter="url(#intenseCoreGlow)">
                          <animateMotion
                            path={infinityPathD}
                            dur="2.2s"
                            repeatCount="indefinite"
                            calcMode="linear"
                          />
                        </circle>

                        {/* Secondary Trailing Comet */}
                        <circle r="3.5" fill="#00E5FF" filter="url(#neonGlow)" opacity="0.95">
                          <animateMotion
                            path={infinityPathD}
                            dur="2.2s"
                            begin="1.1s"
                            repeatCount="indefinite"
                            calcMode="linear"
                          />
                        </circle>

                        {/* Tertiary Small Comet */}
                        <circle r="2.5" fill="#38BDF8" opacity="0.8">
                          <animateMotion
                            path={infinityPathD}
                            dur="2.2s"
                            begin="0.55s"
                            repeatCount="indefinite"
                            calcMode="linear"
                          />
                        </circle>
                      </g>
                    )}

                    {/* Central Intersection Flare Node */}
                    <circle
                      cx="200"
                      cy="150"
                      r="7"
                      fill="#FFFFFF"
                      filter="url(#intenseCoreGlow)"
                    />
                    <circle
                      cx="200"
                      cy="150"
                      r="14"
                      fill="#00E5FF"
                      opacity="0.4"
                      filter="url(#neonGlow)"
                    />

                    {/* Floating Tech Orbiting Nodes */}
                    {stage === "flow" && (
                      <g className="pointer-events-none">
                        {/* Node 1: Code */}
                        <g>
                          <line x1="200" y1="150" x2="80" y2="60" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                          <circle cx="80" cy="60" r="14" fill="#090D16" stroke="#00E5FF" strokeWidth="1.5" />
                          <Code2 x="72" y="52" width="16" height="16" className="text-[#00E5FF]" />
                        </g>

                        {/* Node 2: Cpu / AI */}
                        <g>
                          <line x1="200" y1="150" x2="320" y2="60" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                          <circle cx="320" cy="60" r="14" fill="#090D16" stroke="#00E5FF" strokeWidth="1.5" />
                          <Cpu x="312" y="52" width="16" height="16" className="text-[#00E5FF]" />
                        </g>

                        {/* Node 3: Git Branch */}
                        <g>
                          <line x1="200" y1="150" x2="75" y2="240" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                          <circle cx="75" cy="240" r="14" fill="#090D16" stroke="#00E5FF" strokeWidth="1.5" />
                          <GitBranch x="67" y="232" width="16" height="16" className="text-[#00E5FF]" />
                        </g>

                        {/* Node 4: Network */}
                        <g>
                          <line x1="200" y1="150" x2="325" y2="240" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                          <circle cx="325" cy="240" r="14" fill="#090D16" stroke="#00E5FF" strokeWidth="1.5" />
                          <Network x="317" y="232" width="16" height="16" className="text-[#00E5FF]" />
                        </g>

                        {/* Subtle sparkling decorative dots */}
                        <circle cx="140" cy="50" r="2" fill="#00E5FF" opacity="0.6" />
                        <circle cx="260" cy="50" r="3" fill="#FFFFFF" opacity="0.8" />
                        <circle cx="350" cy="150" r="2.5" fill="#00E5FF" opacity="0.7" />
                        <circle cx="50" cy="150" r="3" fill="#00BBA7" opacity="0.8" />
                      </g>
                    )}
                  </g>
                </svg>
              </motion.div>
            )}

            {/* ===== STAGE 4: BRAND LOGO REVEAL ===== */}
            {stage === "reveal" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center space-y-4"
              >
                {/* Sleek Central Icon Badge */}
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00E5FF]/20 to-[#00BBA7]/20 border border-[#00E5FF]/40 flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.3)] mb-1"
                >
                  <Sparkles className="w-7 h-7 text-[#00E5FF]" />
                </motion.div>

                {/* Main Logo Text */}
                <div className="flex items-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans">
                  <span className="text-white tracking-tighter">
                    loopCode
                  </span>
                  <span className="text-[#00BBA7] ml-2 font-bold tracking-tight">
                    Labs
                  </span>
                </div>

                {/* Subtitle / Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 0.85, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-slate-400 font-medium"
                >
                  High Performance Software & AI
                </motion.div>

                {/* Horizontal Accent Beam */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "80%" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-[1.5px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent mt-3"
                />
              </motion.div>
            )}

            {/* Bottom Status Info (Progress % & Terminal Prompt) */}
            <div className="mt-8 flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <Terminal className="w-3.5 h-3.5 text-[#00E5FF] animate-pulse" />
                <span>
                  {stage === "draw" && "INITIALIZING SYSTEM ARCHITECTURE..."}
                  {stage === "flow" && "OPTIMIZING AI ENGINES & PIPELINES..."}
                  {stage === "converge" && "SYNCHRONIZING DEPENDENCIES..."}
                  {stage === "reveal" && "SYSTEM READY"}
                </span>
                <span className="text-[#00E5FF] font-bold">{progress}%</span>
              </div>

              {/* Sleek Progress Line */}
              <div className="w-48 h-[2px] bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00E5FF] to-[#00BBA7] shadow-[0_0_10px_#00E5FF]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={handleSkip}
            className="absolute bottom-6 right-6 text-[11px] font-mono font-bold text-slate-400 hover:text-white transition-colors tracking-widest bg-slate-900/80 border border-slate-700/80 hover:border-[#00E5FF]/50 px-4 py-2 rounded-full shadow-lg backdrop-blur-md cursor-pointer z-50 flex items-center space-x-1.5"
          >
            <span>SKIP INTRO</span>
            <span className="text-[#00E5FF]">//</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
