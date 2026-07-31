import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Cpu, GitBranch, Layers, Network, Terminal, User } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  // Animation stages:
  // 1. "circle"    : 0.0s - 1.2s  (Spinning cyan glowing ring on studio light background)
  // 2. "infinity"  : 1.2s - 3.2s  (Circle morphs into infinity track with streaming code text)
  // 3. "atomic"    : 3.2s - 5.8s  (Second 3D infinity loop intersects into atomic structure + network nodes & central flare)
  // 4. "collapse"  : 5.8s - 7.0s  (Loops flatten horizontally into a laser beam)
  // 5. "brand"     : 7.0s - 9.0s  (Laser expands to reveal loop_Code Labs branding)
  // 6. "exit"      : 9.0s+        (Preloader completes and fades out)
  const [stage, setStage] = useState<"circle" | "infinity" | "atomic" | "collapse" | "brand" | "exit">("circle");
  const [textOffset, setTextOffset] = useState<number>(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Animate text moving along the infinity path
  useEffect(() => {
    let animId: number;
    const animateText = () => {
      setTextOffset((prev) => (prev + 0.4) % 100);
      animId = requestAnimationFrame(animateText);
    };
    animId = requestAnimationFrame(animateText);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    // Stage timeouts corresponding to video timeline
    const t1 = setTimeout(() => setStage("infinity"), 1200);
    const t2 = setTimeout(() => setStage("atomic"), 3200);
    const t3 = setTimeout(() => setStage("collapse"), 5800);
    const t4 = setTimeout(() => setStage("brand"), 7000);
    const t5 = setTimeout(() => setStage("exit"), 8800);
    const t6 = setTimeout(() => {
      onCompleteRef.current();
    }, 9400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, []);

  // Standard Lemniscate / Infinity Bezier Path centered at (200, 150)
  const infinityPathD = "M 200 150 C 240 85, 320 85, 320 150 C 320 215, 240 215, 200 150 C 160 85, 80 85, 80 150 C 80 215, 160 215, 200 150 Z";

  // Code string streaming through the infinity symbol
  const codeSnippet = "const loop = async () => { await code_labs.deploy({ speed: '100x' }); }; return <InfinityLoop /> ; ";

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          id="loopcode-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] bg-[#E8ECEF] flex flex-col items-center justify-center overflow-hidden select-none font-sans"
        >
          {/* Studio Environment Background (Light gray studio canvas with subtle spotlight & radial gradient) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#FFFFFF_0%,_#E1E7ED_70%,_#D3DCE6_100%)]" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#C5D0DC]/40 to-transparent pointer-events-none" />

          {/* Subtle Ambient Studio Light Glow */}
          <motion.div
            animate={{
              opacity: stage === "atomic" ? 0.8 : stage === "collapse" ? 0.9 : 0.5,
              scale: stage === "atomic" ? 1.2 : 1,
            }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,229,255,0.08)_0%,_transparent_60%)] pointer-events-none"
          />

          {/* Main Visual Animation Canvas Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl h-[420px]">
            
            {/* SVG Stage for Circles, Infinity Loops, and Nodes */}
            {(stage === "circle" || stage === "infinity" || stage === "atomic") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="relative w-[340px] h-[260px] sm:w-[420px] sm:h-[300px] flex items-center justify-center"
              >
                {/* SVG Canvas */}
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,229,255,0.25)] overflow-visible"
                >
                  <defs>
                    {/* Glowing Filters */}
                    <filter id="cyanNeon" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur1" />
                      <feGaussianBlur stdDeviation="10" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    <filter id="intenseCenterFlare" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="6" result="blur1" />
                      <feGaussianBlur stdDeviation="16" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>

                    {/* Gradient for metallic dark infinity track */}
                    <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0B132B" />
                      <stop offset="50%" stopColor="#1C2541" />
                      <stop offset="100%" stopColor="#0F172A" />
                    </linearGradient>

                    {/* Cyan Line Gradient */}
                    <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.2" />
                      <stop offset="50%" stopColor="#00E5FF" stopOpacity="1" />
                      <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* ===== STAGE 1: CIRCLE RING TRACE ===== */}
                  {stage === "circle" && (
                    <g>
                      {/* Quiet guide circle */}
                      <circle cx="200" cy="150" r="65" stroke="#CBD5E1" strokeWidth="2" fill="none" opacity="0.6" />

                      {/* Glowing Cyan Trace Line */}
                      <motion.circle
                        cx="200"
                        cy="150"
                        r="65"
                        stroke="#00E5FF"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                        filter="url(#cyanNeon)"
                        initial={{ pathLength: 0, rotate: -90 }}
                        animate={{ pathLength: [0, 0.95, 1], rotate: 270 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        style={{ transformOrigin: "200px 150px" }}
                      />

                      {/* High Intensity Lead Particle */}
                      <motion.circle
                        cx="200"
                        cy="85"
                        r="4"
                        fill="#FFFFFF"
                        filter="url(#cyanNeon)"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        style={{ transformOrigin: "200px 150px" }}
                      />
                    </g>
                  )}

                  {/* ===== STAGE 2 & 3: INFINITY & ATOMIC LOOPS ===== */}
                  {(stage === "infinity" || stage === "atomic") && (
                    <g>
                      {/* Hidden Path for Text Anchor */}
                      <path id="infinityTextPath" d={infinityPathD} fill="none" />

                      {/* 3D Container wrapper for primary and secondary loops */}
                      <g>
                        {/* SECONDARY 3D TILTED LOOP (In Atomic Stage) */}
                        {stage === "atomic" && (
                          <g style={{ transform: "rotateX(65deg) rotateY(25deg)", transformOrigin: "200px 150px" }}>
                            {/* Outer Glow Edge */}
                            <path
                              d={infinityPathD}
                              fill="none"
                              stroke="#00E5FF"
                              strokeWidth="8"
                              opacity="0.8"
                              filter="url(#cyanNeon)"
                            />

                            {/* Dark Tube Ribbon */}
                            <path
                              d={infinityPathD}
                              fill="none"
                              stroke="url(#trackGradient)"
                              strokeWidth="22"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />

                            {/* Inner Cyan Border */}
                            <path
                              d={infinityPathD}
                              fill="none"
                              stroke="#00E5FF"
                              strokeWidth="2"
                              opacity="0.9"
                            />

                            {/* Code Text in Secondary Loop */}
                            <text fill="#00E5FF" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                              <textPath href="#infinityTextPath" startOffset={`${(textOffset + 50) % 100}%`}>
                                {codeSnippet}
                              </textPath>
                            </text>
                          </g>
                        )}

                        {/* PRIMARY INFINITY LOOP TRACK */}
                        <g style={{ transform: stage === "atomic" ? "rotateX(-30deg) rotateY(-15deg)" : "none", transformOrigin: "200px 150px", transition: "transform 1.2s ease-in-out" }}>
                          {/* Outer Glowing Neon Shadow Edge */}
                          <motion.path
                            d={infinityPathD}
                            fill="none"
                            stroke="#00E5FF"
                            strokeWidth="10"
                            filter="url(#cyanNeon)"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                          />

                          {/* Thick Dark Metallic Track Tube */}
                          <path
                            d={infinityPathD}
                            fill="none"
                            stroke="url(#trackGradient)"
                            strokeWidth="26"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />

                          {/* Inner Bright Neon Borders */}
                          <path
                            d={infinityPathD}
                            fill="none"
                            stroke="#00E5FF"
                            strokeWidth="2.5"
                            opacity="0.95"
                          />

                          {/* STREAMING CYAN CODE TEXT INSIDE THE TRACK */}
                          <text fill="#00E5FF" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
                            <textPath href="#infinityTextPath" startOffset={`${textOffset}%`}>
                              {codeSnippet}
                            </textPath>
                          </text>
                        </g>

                        {/* ===== CENTRAL STARBURST / FLARE INTERSECTION ===== */}
                        {stage === "atomic" && (
                          <g>
                            {/* Central Core Bright Glow */}
                            <circle cx="200" cy="150" r="14" fill="#00E5FF" opacity="0.8" filter="url(#intenseCenterFlare)" />
                            <circle cx="200" cy="150" r="6" fill="#FFFFFF" filter="url(#intenseCenterFlare)" />

                            {/* Starburst Lens Rays */}
                            <motion.line
                              x1="160"
                              y1="150"
                              x2="240"
                              y2="150"
                              stroke="#FFFFFF"
                              strokeWidth="2"
                              filter="url(#cyanNeon)"
                              animate={{ scaleX: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                              style={{ transformOrigin: "200px 150px" }}
                            />
                            <motion.line
                              x1="200"
                              y1="110"
                              x2="200"
                              y2="190"
                              stroke="#FFFFFF"
                              strokeWidth="2"
                              filter="url(#cyanNeon)"
                              animate={{ scaleY: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                              style={{ transformOrigin: "200px 150px" }}
                            />
                          </g>
                        )}

                        {/* ===== FLOATING NETWORK GRAPH NODES (In Atomic Stage) ===== */}
                        {stage === "atomic" && (
                          <g className="pointer-events-none">
                            {/* Node 1: Top-Left Code Node */}
                            <g>
                              <line x1="200" y1="150" x2="80" y2="60" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                              <circle cx="80" cy="60" r="12" fill="#0F172A" stroke="#00E5FF" strokeWidth="1.5" />
                              <Code2 x="72" y="52" width="16" height="16" className="text-[#00E5FF]" />
                              <circle cx="80" cy="60" r="18" stroke="#00E5FF" strokeWidth="1" fill="none" opacity="0.3" />
                            </g>

                            {/* Node 2: Top-Right Cpu Node */}
                            <g>
                              <line x1="200" y1="150" x2="320" y2="60" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                              <circle cx="320" cy="60" r="12" fill="#0F172A" stroke="#00E5FF" strokeWidth="1.5" />
                              <Cpu x="312" y="52" width="16" height="16" className="text-[#00E5FF]" />
                            </g>

                            {/* Node 3: Bottom-Left Git Branch Node */}
                            <g>
                              <line x1="200" y1="150" x2="70" y2="240" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                              <circle cx="70" cy="240" r="12" fill="#0F172A" stroke="#00E5FF" strokeWidth="1.5" />
                              <GitBranch x="62" y="232" width="16" height="16" className="text-[#00E5FF]" />
                            </g>

                            {/* Node 4: Bottom-Right Network Node */}
                            <g>
                              <line x1="200" y1="150" x2="330" y2="240" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                              <circle cx="330" cy="240" r="12" fill="#0F172A" stroke="#00E5FF" strokeWidth="1.5" />
                              <Network x="322" y="232" width="16" height="16" className="text-[#00E5FF]" />
                            </g>

                            {/* Small decorative orbiting geometric dots */}
                            <circle cx="140" cy="50" r="3" fill="#00E5FF" opacity="0.7" />
                            <circle cx="260" cy="50" r="4" fill="#00E5FF" opacity="0.8" />
                            <circle cx="350" cy="150" r="3" fill="#00E5FF" opacity="0.6" />
                            <circle cx="50" cy="150" r="4" fill="#00E5FF" opacity="0.8" />
                            <polygon points="200,20 205,28 195,28" fill="#00E5FF" opacity="0.6" />
                            <rect x="196" y="270" width="8" height="8" fill="#00E5FF" opacity="0.5" rx="1" />
                          </g>
                        )}
                      </g>
                    </g>
                  )}
                </svg>
              </motion.div>
            )}

            {/* ===== STAGE 4: COLLAPSE INTO LASER LINE ===== */}
            {stage === "collapse" && (
              <div className="relative w-full flex items-center justify-center h-24 overflow-hidden">
                <motion.div
                  initial={{ width: "20px", height: "180px", borderRadius: "50px", opacity: 0.8 }}
                  animate={{ width: ["20px", "80%", "100%"], height: ["180px", "3px", "2px"], opacity: [0.8, 1, 1] }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-[#00E5FF] shadow-[0_0_20px_#00E5FF] rounded-full"
                />
              </div>
            )}

            {/* ===== STAGE 5: BRAND LOGO TEXT REVEAL ===== */}
            {stage === "brand" && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center space-y-3"
              >
                {/* Horizontal Light Accent Beam above title */}
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="h-[1.5px] bg-gradient-to-r from-transparent via-[#00BBA7] to-transparent mb-2"
                />

                {/* Main Logo Text matching the video screenshot (Timestamp 00:09) */}
                <div className="flex items-center text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans">
                  <span className="text-[#0F172A] tracking-tighter">
                    loop_Code
                  </span>
                  <span className="text-[#00BBA7] ml-2 font-bold tracking-tight">
                    Labs
                  </span>
                </div>

                {/* Subtitle tag */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.4 }}
                  className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-600 font-semibold"
                >
                  HIGH PERFORMANCE SOFTWARE & AI
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Bottom subtle progress indicator line */}
          <div className="absolute bottom-12 w-48 h-[2px] bg-slate-300 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{
                width:
                  stage === "circle"
                    ? "20%"
                    : stage === "infinity"
                    ? "45%"
                    : stage === "atomic"
                    ? "75%"
                    : stage === "collapse"
                    ? "90%"
                    : "100%",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-[#00BBA7] shadow-[0_0_8px_#00BBA7]"
            />
          </div>

          {/* Skip Intro Button */}
          <button
            onClick={onComplete}
            className="absolute bottom-8 right-8 text-[10px] font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors tracking-widest bg-white/80 border border-slate-300 px-4 py-2 rounded-full shadow-sm hover:bg-white cursor-pointer z-50"
          >
            SKIP INTRO //
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
