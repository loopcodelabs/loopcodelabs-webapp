import { 
  Cpu, 
  Search, 
  Megaphone, 
  Target, 
  Mail, 
  Palette, 
  Layout, 
  Code, 
  TrendingUp, 
  Sparkles, 
  Check 
} from "lucide-react";

interface ServiceVisualizerProps {
  id: string;
  module?: string;
}

export default function ServiceVisualizer({ id, module = "build" }: ServiceVisualizerProps) {
  switch (id) {
    case "website-development":
      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] sm:text-xs text-zinc-400 select-none overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/10 via-zinc-950/5 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
            </div>
            <div className="flex items-center gap-4 text-zinc-500 font-mono text-[9px]">
              <span className="text-accent">App.tsx</span>
              <span>tailwind.config.js</span>
            </div>
          </div>
          
          <div className="flex-1 py-4 space-y-2 font-mono text-left leading-relaxed">
            <div>
              <span className="text-purple-400">import</span> {"{ useState }"} <span className="text-purple-400">from</span> <span className="text-emerald-400">"react"</span>;
            </div>
            <div>
              <span className="text-purple-400">export default function</span> <span className="text-blue-400">App</span>() {"{"}
            </div>
            <div className="pl-4">
              <span className="text-purple-400">const</span> [speed, setSpeed] = <span className="text-blue-400">useState</span>(<span className="text-amber-400">100</span>);
            </div>
            <div className="pl-4 text-zinc-500">// Optimized Core Web Vitals schema</div>
            <div className="pl-4">
              <span className="text-purple-400">return</span> (
            </div>
            <div className="pl-8">
              {"<"}
              <span className="text-accent">main</span> <span className="text-purple-300">className</span>=
              <span className="text-emerald-400">"grid max-w-7xl"</span>
              {">"}
            </div>
            <div className="pl-12">
              {"<"}
              <span className="text-blue-400">Performance</span> <span className="text-purple-300">score</span>=
              <span className="text-emerald-400">"99+"</span>
              {" />"}
            </div>
            <div className="pl-8">{"</"}<span className="text-accent">main</span>{">"}</div>
            <div className="pl-4">);</div>
            <div>{"}"}</div>
          </div>

          <div className="border-t border-zinc-900 pt-4 flex items-center justify-between text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-accent" /> React 19 Engine</span>
            <span className="text-emerald-500 font-mono">100% TS COMPILING</span>
          </div>
        </div>
      );

    case "mobile-app-development":
      return (
        <div className="w-full aspect-[4/3] flex items-center justify-center relative select-none overflow-hidden group">
          {/* Elegant Smartphone Container */}
          <div className="w-[200px] sm:w-[220px] aspect-[9/18] rounded-[36px] bg-zinc-950 border-[6px] border-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative overflow-hidden flex flex-col">
            {/* Phone speaker/notch */}
            <div className="absolute top-2 inset-x-0 flex justify-center z-20">
              <div className="w-16 h-4 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="flex-1 bg-zinc-950 p-4 pt-10 flex flex-col justify-between font-sans text-left">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">Dash / v1.0</span>
                  <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                </div>
                <h4 className="text-xs font-bold text-white tracking-tight uppercase leading-snug">Mobile App Dev</h4>
                
                {/* Mock Charts */}
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-850/80 space-y-2">
                  <span className="text-[8px] font-mono text-zinc-500 block">REALTIME ACTIVITY</span>
                  <div className="h-10 flex items-end gap-1">
                    <div className="flex-1 bg-zinc-800 rounded-sm h-[30%]" />
                    <div className="flex-1 bg-zinc-800 rounded-sm h-[55%]" />
                    <div className="flex-1 bg-zinc-800 rounded-sm h-[40%]" />
                    <div className="flex-1 bg-zinc-800 rounded-sm h-[85%]" />
                    <div className="flex-1 bg-accent rounded-sm h-[100%] transition-all" />
                    <div className="flex-1 bg-zinc-800 rounded-sm h-[65%]" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-between text-[8px] font-mono text-white">
                  <span>FlutterFlow Core</span>
                  <span className="text-accent">Active</span>
                </div>
                <button className="w-full py-2 rounded-full bg-accent hover:bg-accent-hover text-white text-[9px] font-bold uppercase tracking-wider text-center transition-colors">
                  Interactive Build
                </button>
              </div>
            </div>
          </div>
          
          {/* Hover floating glassmorphic info pill */}
          <div className="absolute top-[15%] left-[10%] p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-850 backdrop-blur-md shadow-2xl space-y-1 max-w-[150px] text-left">
            <span className="text-[8px] font-mono text-zinc-500 block">PERFORMANCE</span>
            <span className="font-sans font-black text-white text-sm block">120Hz Native</span>
            <span className="text-[9px] text-zinc-400 block leading-tight">Strict iOS & PlayStore layout metrics</span>
          </div>
        </div>
      );

    case "seo-services":
      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-zinc-300 font-mono uppercase tracking-widest flex items-center gap-1.5"><Search className="w-3.5 h-3.5 text-accent" /> SEO Console</span>
              <span className="text-zinc-500 text-[9px] font-mono">INDEX STATUS: GREEN</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-900 space-y-1">
                <span className="text-[8px] text-zinc-500 block uppercase font-mono">Organic Clicks</span>
                <span className="text-sm font-black text-white tracking-tight">+142.4%</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-900 space-y-1">
                <span className="text-[8px] text-zinc-500 block uppercase font-mono">Google CTR</span>
                <span className="text-sm font-black text-white tracking-tight">8.94%</span>
              </div>
              <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 space-y-1">
                <span className="text-[8px] text-accent block uppercase font-mono">GEO Search</span>
                <span className="text-sm font-black text-white tracking-tight">Recommended</span>
              </div>
            </div>

            {/* Dynamic SVG chart wave representing compounding growth */}
            <div className="relative h-20 w-full mt-2">
              <svg className="w-full h-full" viewBox="0 0 300 80">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2BBAA5" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2BBAA5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="20" x2="300" y2="20" stroke="#18181b" strokeDasharray="3,3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#18181b" strokeDasharray="3,3" />
                
                {/* Filled Area */}
                <path 
                  d="M 0 75 Q 50 65 100 45 T 200 25 T 300 10 L 300 80 L 0 80 Z" 
                  fill="url(#chartGradient)" 
                />
                
                {/* Line path */}
                <path 
                  d="M 0 75 Q 50 65 100 45 T 200 25 T 300 10" 
                  fill="none" 
                  stroke="#2BBAA5" 
                  strokeWidth="2.5" 
                />
                
                {/* Current Position Marker */}
                <circle cx="300" cy="10" r="4" fill="#2BBAA5" />
              </svg>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between mt-2 pt-2 border-t border-zinc-900/80">
            <span>GENERATIVE ENGINE OPTIMIZATION</span>
            <span className="text-accent">Crawling Daily</span>
          </div>
        </div>
      );

    case "digital-marketing":
      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-zinc-300 tracking-widest uppercase flex items-center gap-1.5"><Megaphone className="w-3.5 h-3.5 text-accent" /> Channel Manager</span>
              <span className="text-zinc-500 text-[9px] font-mono">STATUS: LIVE</span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-900/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-sans font-bold text-white text-xs">Meta Audience Pipeline</span>
                </div>
                <span className="text-accent">A/B Set 3</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-900/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-sans font-bold text-white text-xs">B2B LinkedIn Funnel</span>
                </div>
                <span>High-intent leads</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-900/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span className="font-sans font-bold text-white text-xs">Google Intent Keywords</span>
                </div>
                <span className="text-white">ROAS 4.2x</span>
              </div>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
            <span>UNIFIED TRACKING DASHBOARD</span>
            <span className="text-emerald-500">OPTIMIZED</span>
          </div>
        </div>
      );

    case "paid-advertising":
      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-zinc-300 tracking-widest uppercase flex items-center gap-1.5"><Target className="w-3.5 h-3.5 text-accent" /> Ads Optimization</span>
              <span className="text-zinc-500 text-[9px] font-mono">BUDGET ATTR: 100%</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-900 space-y-1">
                <span className="text-[8px] text-zinc-500 block uppercase font-mono">Cost Per Acquisition</span>
                <span className="text-xs font-black text-accent">-32.4%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/50 border border-zinc-900 space-y-1">
                <span className="text-[8px] text-zinc-500 block uppercase font-mono">Conversion Rate</span>
                <span className="text-xs font-black text-white">+5.82%</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-between text-xs text-white">
              <span className="flex items-center gap-1.5 font-sans font-bold"><Check className="w-4 h-4 text-accent" /> Dynamic Retargeting</span>
              <span className="font-mono text-[9px] text-accent uppercase tracking-widest bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded">Enabled</span>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
            <span>ALGORITHMIC BID RETRYS</span>
            <span className="text-emerald-500">STABLE</span>
          </div>
        </div>
      );

    case "email-marketing":
      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-zinc-300 tracking-widest uppercase flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-accent" /> Mail Flow Engine</span>
              <span className="text-zinc-500 text-[9px] font-mono">BOUNCE RATE: 0.1%</span>
            </div>

            <div className="flex items-center justify-center py-4 relative">
              <div className="relative w-24 h-16 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col justify-end p-2 shadow-2xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-purple-500 via-accent to-emerald-500" />
                <span className="text-[8px] text-white font-bold tracking-tight">Email Marketing</span>
                <span className="text-[7px] text-accent font-mono">DELIVERY METRICS</span>
                
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent border-2 border-zinc-950 flex items-center justify-center font-bold text-black font-sans text-[9px] shadow-lg animate-bounce">
                  2
                </div>
              </div>

              <div className="absolute top-[35%] left-[60%] p-2 rounded-lg bg-zinc-950/80 border border-zinc-800 shadow-2xl backdrop-blur-md max-w-[110px]">
                <span className="text-[6px] text-zinc-500 block font-mono">CART ABANDON FLOW</span>
                <span className="text-[9px] text-white font-sans font-black block mt-0.5">+₹1.2L recovered</span>
              </div>

              <div className="absolute bottom-[10%] right-[60%] p-2 rounded-lg bg-zinc-950/80 border border-zinc-800 shadow-2xl backdrop-blur-md max-w-[110px]">
                <span className="text-[6px] text-zinc-500 block font-mono">NEWSLETTER BROADCAST</span>
                <span className="text-[9px] text-white font-sans font-black block mt-0.5">38% Open Rate</span>
              </div>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
            <span>DKIM/SPF CONFIGURATIONS</span>
            <span className="text-accent">VERIFIED</span>
          </div>
        </div>
      );

    case "branding-strategy":
      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-zinc-300 tracking-widest uppercase flex items-center gap-1.5"><Palette className="w-3.5 h-3.5 text-accent" /> Design Tokens</span>
              <span className="text-zinc-500 text-[9px] font-mono">SPEC: SWISS MINI</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-8 rounded-lg bg-zinc-950 border border-zinc-800 p-1 flex items-end">
                  <span className="text-[6px] text-zinc-500 block font-mono">#000000</span>
                </div>
                <div className="w-12 h-8 rounded-lg bg-accent p-1 flex items-end">
                  <span className="text-[6px] text-white block font-mono font-bold">#2BBAA5</span>
                </div>
                <div className="w-12 h-8 rounded-lg bg-zinc-800 p-1 flex items-end">
                  <span className="text-[6px] text-zinc-400 block font-mono">#27272A</span>
                </div>
                <div className="w-12 h-8 rounded-lg bg-white p-1 flex items-end">
                  <span className="text-[6px] text-zinc-600 block font-mono">#FFFFFF</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-900 space-y-1.5">
                <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 border-b border-zinc-900 pb-1">
                  <span>TYPOGRAPHY TOKENS</span>
                  <span className="text-white">COSMIC TYPE</span>
                </div>
                <div className="font-sans font-black text-white text-xs tracking-tight uppercase">
                  Space Grotesk Bold
                </div>
                <div className="font-mono text-[9px] text-zinc-400 leading-none">
                  JetBrains Mono Regular (Data)
                </div>
              </div>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
            <span>BRAND IDENTITY REPOSITORY</span>
            <span className="text-emerald-500">EXPORTED</span>
          </div>
        </div>
      );

    case "ui-ux-design":
      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-zinc-300 tracking-widest uppercase flex items-center gap-1.5"><Layout className="w-3.5 h-3.5 text-accent" /> Design Workspace</span>
              <span className="text-zinc-500 text-[9px] font-mono">CANVAS: 120FPS</span>
            </div>

            <div className="relative h-20 border border-zinc-900 rounded-xl bg-zinc-900/20 flex items-center justify-center overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 300 80">
                <line x1="150" y1="0" x2="150" y2="80" stroke="#1c1917" strokeWidth="0.5" />
                <line x1="0" y1="40" x2="300" y2="40" stroke="#1c1917" strokeWidth="0.5" />
                
                <path 
                  d="M 50 60 C 100 20, 200 20, 250 60" 
                  fill="none" 
                  stroke="#2BBAA5" 
                  strokeWidth="1.5" 
                />
                
                <circle cx="50" cy="60" r="3" fill="#2BBAA5" />
                <circle cx="250" cy="60" r="3" fill="#2BBAA5" />
                
                <line x1="100" y1="20" x2="200" y2="20" stroke="#a21caf" strokeWidth="1" strokeDasharray="2,2" />
                <rect x="97" y="17" width="6" height="6" fill="#a21caf" />
                <rect x="197" y="17" width="6" height="6" fill="#a21caf" />
              </svg>

              <div className="absolute top-2 right-2 p-1 bg-accent/10 border border-accent/20 text-accent font-mono text-[8px] rounded uppercase tracking-wider">
                Drag Anchor
              </div>
            </div>
          </div>

          <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
            <span>FIGMA DESIGN SYSTEM SPECS</span>
            <span className="text-accent">SYNCHRONIZED</span>
          </div>
        </div>
      );

    default: {
      if (module === "grow") {
        return (
          <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-blue-400 tracking-widest uppercase flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Growth Engine</span>
                <span className="text-zinc-500 text-[9px] font-mono">RETENTION: ACTIVE</span>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-1">
                  <span className="text-[8px] text-zinc-500 block uppercase font-mono">Automation Funnel Pipeline</span>
                  <span className="text-xs font-bold text-white">Dynamic Acquisition Conversions</span>
                </div>
                
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-900/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-300">Cohort Reach Goal</span>
                  <span className="text-blue-400 font-bold">+28.4% WoW</span>
                </div>
              </div>
            </div>
            <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
              <span>GROWTH ANALYTICS API</span>
              <span className="text-blue-400">STABLE</span>
            </div>
          </div>
        );
      }

      if (module === "automate") {
        return (
          <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-purple-400 tracking-widest uppercase flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> AI Agent Core</span>
                <span className="text-zinc-500 text-[9px] font-mono">INFERENCE: 45ms</span>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10 space-y-1">
                  <span className="text-[8px] text-zinc-500 block uppercase font-mono">Active Workflow Pipeline</span>
                  <span className="text-xs font-bold text-white">Continuous Agent Thread Loop</span>
                </div>

                <div className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-850/80 flex items-center justify-between text-[9px]">
                  <span className="text-zinc-500">SYSTEM COGNITION</span>
                  <span className="text-emerald-500 font-bold">100% SUCCESS RATE</span>
                </div>
              </div>
            </div>
            <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
              <span>AUTOMATION WEBHOOK SYNC</span>
              <span className="text-purple-400">CONNECTED</span>
            </div>
          </div>
        );
      }

      if (module === "transform") {
        return (
          <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                <span className="font-bold text-amber-400 tracking-widest uppercase flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Intelligence Matrix</span>
                <span className="text-zinc-500 text-[9px] font-mono">COMPLIANCE: SECURE</span>
              </div>
              
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 space-y-1">
                  <span className="text-[8px] text-zinc-500 block uppercase font-mono">Fine-Tuned Enterprise Model</span>
                  <span className="text-xs font-bold text-white">Domain-Specific Predictive Brain</span>
                </div>

                <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-850/80 flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-sans">Business Moat Depth</span>
                  <span className="text-amber-400 font-bold font-mono">PROPRIETARY</span>
                </div>
              </div>
            </div>
            <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
              <span>ENTERPRISE COGNITIVE PIPELINE</span>
              <span className="text-amber-400">AUTHORIZED</span>
            </div>
          </div>
        );
      }

      return (
        <div className="w-full aspect-[4/3] rounded-2xl bg-zinc-950 border border-zinc-900 p-6 flex flex-col justify-between font-mono text-[10px] text-zinc-400 select-none overflow-hidden relative group text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <span className="font-bold text-accent tracking-widest uppercase flex items-center gap-1.5"><Code className="w-3.5 h-3.5" /> Bespoke Solution</span>
              <span className="text-zinc-500 text-[9px] font-mono">STATUS: ACTIVE</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed font-sans">
              Bespoke software architecture engineered specifically to unlock high-fidelity operations and maximize scalable business outcomes.
            </p>
          </div>
          <div className="text-[8px] text-zinc-500 font-mono flex items-center justify-between border-t border-zinc-900/80 pt-2">
            <span>LOOPCODE LABS SPECIALIZED WORKFLOW</span>
            <span className="text-accent">LAUNCHED</span>
          </div>
        </div>
      );
    }
  }
}
