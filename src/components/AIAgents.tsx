import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useWebsite } from "../context/WebsiteContext";
import {
  Brain,
  Database,
  Search,
  Globe,
  History,
  CalendarCheck,
  Compass,
  Table,
  FileEdit,
  Shuffle,
  CheckCircle2,
  ArrowRight,
  User,
  BarChart3,
  TrendingUp,
  Scale,
  MessageSquare
} from "lucide-react";

interface Connection {
  from: string;
  to: string;
}

interface Scenario {
  id: string;
  label: string;
  prompt: string;
  category: string;
  timeToSolve: string;
  activeNodes: string[];
  activeConnections: Connection[];
  nodeStatuses: Record<string, string>;
}

const ALL_NODES = [
  { id: "agent", label: "Agent", x: 310, y: 250, icon: Brain },
  { id: "memory", label: "Memory", x: 510, y: 80, icon: History },
  { id: "query_data", label: "Query data", x: 510, y: 190, icon: Database },
  { id: "semantic_search", label: "Semantic search", x: 510, y: 300, icon: Search },
  { id: "web", label: "Web", x: 510, y: 410, icon: Globe },
  { id: "validity_of_date", label: "Validity of date", x: 790, y: 80, icon: CalendarCheck },
  { id: "navigate_doc", label: "Navigate doc", x: 790, y: 190, icon: Compass },
  { id: "seen_tables", label: "Seen tables", x: 790, y: 300, icon: Table },
  { id: "create_doc", label: "Create doc", x: 790, y: 410, icon: FileEdit },
  { id: "cross_doc", label: "Cross-doc", x: 790, y: 460, icon: Shuffle },
  { id: "answer", label: "Answer", x: 1010, y: 250, icon: CheckCircle2 }
];

const ALL_CONNECTIONS: Connection[] = [
  { from: "agent", to: "memory" },
  { from: "agent", to: "query_data" },
  { from: "agent", to: "semantic_search" },
  { from: "agent", to: "web" },
  { from: "memory", to: "semantic_search" },
  { from: "memory", to: "validity_of_date" },
  { from: "query_data", to: "validity_of_date" },
  { from: "query_data", to: "navigate_doc" },
  { from: "query_data", to: "seen_tables" },
  { from: "query_data", to: "create_doc" },
  { from: "semantic_search", to: "validity_of_date" },
  { from: "semantic_search", to: "seen_tables" },
  { from: "semantic_search", to: "navigate_doc" },
  { from: "semantic_search", to: "cross_doc" },
  { from: "web", to: "semantic_search" },
  { from: "web", to: "navigate_doc" },
  { from: "validity_of_date", to: "navigate_doc" },
  { from: "navigate_doc", to: "answer" },
  { from: "navigate_doc", to: "create_doc" },
  { from: "navigate_doc", to: "cross_doc" },
  { from: "seen_tables", to: "answer" },
  { from: "create_doc", to: "memory" },
  { from: "create_doc", to: "cross_doc" },
  { from: "create_doc", to: "answer" },
  { from: "cross_doc", to: "answer" }
];

const SCENARIOS: Scenario[] = [
  {
    id: "projects",
    label: "Projects + BI",
    prompt: "Which projects are over budget — and by how much?",
    category: "PROJECTS + BI - PROFILE",
    timeToSolve: "2.3s",
    activeNodes: ["agent", "query_data", "seen_tables", "create_doc", "answer"],
    activeConnections: [
      { from: "agent", to: "query_data" },
      { from: "query_data", to: "seen_tables" },
      { from: "query_data", to: "create_doc" },
      { from: "seen_tables", to: "answer" },
      { from: "create_doc", to: "answer" }
    ],
    nodeStatuses: {
      query_data: "Budget vs actual - 124 projects",
      seen_tables: "3 projects over the approved threshold",
      create_doc: "Status report - draft for your approval",
      answer: "3 projects over, ₹5,41,200 total; draft reports generated."
    }
  },
  {
    id: "market",
    label: "Market",
    prompt: "How did competitor pricing move this quarter?",
    category: "MARKET RESEARCH - PROFILE",
    timeToSolve: "2.1s",
    activeNodes: ["agent", "web", "semantic_search", "cross_doc", "answer"],
    activeConnections: [
      { from: "agent", to: "web" },
      { from: "web", to: "semantic_search" },
      { from: "semantic_search", to: "cross_doc" },
      { from: "cross_doc", to: "answer" }
    ],
    nodeStatuses: {
      web: "Competitor pricing - 3 competitor pages",
      semantic_search: "Sector reports Q1 - 200k documents parsed",
      cross_doc: "Competitor vs pricing comparison matrix",
      answer: "AVG +4.2% price increase across 3 primary competitors."
    }
  },
  {
    id: "legal",
    label: "Legal",
    prompt: "Was the non-compete clause in force in March 2022?",
    category: "LEGAL COMPLIANCE - PROFILE",
    timeToSolve: "1.9s",
    activeNodes: ["agent", "semantic_search", "validity_of_date", "navigate_doc", "answer"],
    activeConnections: [
      { from: "agent", to: "semantic_search" },
      { from: "semantic_search", to: "validity_of_date" },
      { from: "validity_of_date", to: "navigate_doc" },
      { from: "navigate_doc", to: "answer" }
    ],
    nodeStatuses: {
      semantic_search: "Non-compete clause - 4 contract excerpts found",
      validity_of_date: "In force since 01/2021 + amendment schedule",
      navigate_doc: "Master contract scan - 81.2 KiB checked",
      answer: "Clause was in force in 03/2022, amended by addendum no. 4."
    }
  },
  {
    id: "support",
    label: "Support",
    prompt: "Can this customer's refund be escalated? What does the policy say?",
    category: "CUSTOMER SUPPORT - PROFILE",
    timeToSolve: "1.8s",
    activeNodes: ["agent", "memory", "semantic_search", "navigate_doc", "answer"],
    activeConnections: [
      { from: "agent", to: "memory" },
      { from: "memory", to: "semantic_search" },
      { from: "semantic_search", to: "navigate_doc" },
      { from: "navigate_doc", to: "answer" }
    ],
    nodeStatuses: {
      memory: "Ticket #4521 historical context retrieved",
      semantic_search: "Refund policy document - 4 matches found",
      navigate_doc: "Terms of service policy - tier 2 refund escalation rules",
      answer: "Yes, refunds above tier 2 limit can be escalated directly."
    }
  }
];

export default function AIAgents() {
  const { scenarios: cmsScenarios = [] } = useWebsite();

  const mergedScenarios: Scenario[] = [];
  const processedIds = new Set<string>();

  // 1. Process static scenarios, overriding with CMS version if it exists
  SCENARIOS.forEach((staticS) => {
    const cmsS = cmsScenarios.find((cms) => cms.id === staticS.id);
    if (cmsS) {
      mergedScenarios.push({
        id: cmsS.id,
        label: cmsS.label,
        prompt: cmsS.prompt,
        category: cmsS.category,
        timeToSolve: cmsS.timeToSolve,
        activeNodes: cmsS.activeNodes,
        activeConnections: staticS.activeConnections, // Retain visual flow paths
        nodeStatuses: cmsS.nodeStatuses
      });
    } else {
      mergedScenarios.push(staticS);
    }
    processedIds.add(staticS.id);
  });

  const [activeId, setActiveId] = useState<string>("projects");
  const [animating, setAnimating] = useState<boolean>(false);

  const activeScenario = mergedScenarios.find((s) => s.id === activeId) || mergedScenarios[0];

  const getBezierPath = (x1: number, y1: number, x2: number, y2: number) => {
    const controlOffset = Math.abs(x2 - x1) * 0.45;
    return `M ${x1} ${y1} C ${x1 + controlOffset} ${y1}, ${x2 - controlOffset} ${y2}, ${x2} ${y2}`;
  };

  const handleScenarioChange = (id: string) => {
    if (id === activeId) return;
    setAnimating(true);
    setActiveId(id);
    const timer = setTimeout(() => setAnimating(false), 800);
    return () => clearTimeout(timer);
  };

  return (
    <section id="agents" className="py-24 px-6 sm:px-12 lg:px-20 bg-[var(--bg-main)] relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Grid overlay matching background theme */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black_30%,transparent_90%)] pointer-events-none z-0" />
      
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#2BBAA5]/5 dark:bg-[#2BBAA5]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-950/5 dark:bg-purple-950/10 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Title and Header Layout */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-[#2BBAA5] tracking-[0.25em] uppercase">
              [ AGENT WORKFLOWS ]
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight transition-colors duration-300">
              No fixed pipeline.<br />The agent chooses the path.
            </h2>
          </div>
          <div className="lg:max-w-md pt-2 lg:pt-8">
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed transition-colors duration-300">
              Below is an illustration showing how we implement agentic workflows tailored to accommodate your business needs. We design and implement custom agents that shall enhance and automate your business goals
            </p>
          </div>
        </div>

        {/* Selector Pills - Premium Horizontal Switcher */}
        <div className="mb-10 max-w-4xl mx-auto flex flex-col items-center gap-3">
          <label className="text-[10px] sm:text-xs font-bold tracking-wider text-text-muted uppercase font-mono">
            Select Business Profile to Observe Route
          </label>
          <div className="w-full bg-bg-card/40 border border-border-color p-1.5 rounded-2xl flex flex-wrap sm:flex-nowrap gap-1 backdrop-blur-sm shadow-xl">
            {mergedScenarios.map((scenario) => {
              const isActive = scenario.id === activeId;
              
              // Resolve custom icon that describes the profile
              let IconComponent = Database;
              if (scenario.id === "projects") IconComponent = BarChart3;
              else if (scenario.id === "market") IconComponent = TrendingUp;
              else if (scenario.id === "legal") IconComponent = Scale;
              else if (scenario.id === "support") IconComponent = MessageSquare;

              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioChange(scenario.id)}
                  className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer text-center relative ${
                    isActive
                      ? "bg-[#2BBAA5] text-zinc-950 font-extrabold shadow-lg shadow-[#2BBAA5]/15"
                      : "text-text-secondary hover:text-white hover:bg-bg-soft/50"
                  }`}
                >
                  <IconComponent className={`w-4 h-4 shrink-0 transition-all ${isActive ? "scale-110" : "text-zinc-400 group-hover:text-white"}`} />
                  {scenario.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Full-Width SVG Pipeline Canvas */}
        <div className="w-full flex items-center justify-center border border-border-color bg-bg-card rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/5 via-transparent to-[#2BBAA5]/5 pointer-events-none" />
            
            {/* Scrollable Container on Mobile */}
            <div className="w-full overflow-x-auto scrollbar-none">
              <div className="min-w-[1100px] xl:min-w-0 w-full relative aspect-[1280/500]">
                <svg
                  viewBox="0 0 1280 500"
                  className="w-full h-full overflow-visible"
                  style={{ contentVisibility: "auto" }}
                >
                  <defs>
                    {/* Neon Glow Filters */}
                    <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Connection from Prompt Card to Agent Node */}
                  <g key="prompt-to-agent">
                    {/* Glow path overlay */}
                    <motion.path
                      d="M 230 250 L 310 250"
                      stroke="#2BBAA5"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      filter="url(#activeGlow)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    
                    {/* Inner bright core path */}
                    <motion.path
                      d="M 230 250 L 310 250"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Flow animation */}
                    <path
                      d="M 230 250 L 310 250"
                      stroke="#2BBAA5"
                      strokeWidth="4"
                      strokeDasharray="8, 40"
                      strokeLinecap="round"
                      fill="none"
                      className="active-flow-line"
                      style={{ mixBlendMode: "plus-lighter" }}
                    />
                  </g>

                  {/* 1. DRAW INACTIVE/FADED CONNECTIONS */}
                  <g>
                    {ALL_CONNECTIONS.map((conn, idx) => {
                      const fromNode = ALL_NODES.find((n) => n.id === conn.from);
                      const toNode = ALL_NODES.find((n) => n.id === conn.to);
                      if (!fromNode || !toNode) return null;
                      
                      // Determine if connection is currently active for this scenario
                      const isActive = activeScenario.activeConnections.some(
                        (ac) => ac.from === conn.from && ac.to === conn.to
                      );

                      if (isActive) return null; // Drawn in active layer

                      return (
                        <path
                          key={`inactive-${idx}`}
                          d={getBezierPath(fromNode.x, fromNode.y, toNode.x, toNode.y)}
                          stroke="#4b5563"
                          strokeWidth="1.2"
                          strokeDasharray="3,3"
                          opacity="0.45"
                          fill="none"
                        />
                      );
                    })}
                  </g>

                  {/* 2. DRAW ACTIVE GLOWING PATHS WITH FLOW ANIMATIONS */}
                  <g>
                    {activeScenario.activeConnections.map((conn, idx) => {
                      const fromNode = ALL_NODES.find((n) => n.id === conn.from);
                      const toNode = ALL_NODES.find((n) => n.id === conn.to);
                      if (!fromNode || !toNode) return null;

                      return (
                        <g key={`active-group-${idx}`}>
                          {/* Glow path overlay */}
                          <motion.path
                            d={getBezierPath(fromNode.x, fromNode.y, toNode.x, toNode.y)}
                            stroke="#2BBAA5"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            fill="none"
                            filter="url(#activeGlow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.8 }}
                            transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.15 }}
                          />
                          
                          {/* Inner bright core path */}
                          <motion.path
                            d={getBezierPath(fromNode.x, fromNode.y, toNode.x, toNode.y)}
                            stroke="#ffffff"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: "easeInOut", delay: idx * 0.15 }}
                          />

                          {/* Infinite data flow indicator dot */}
                          <path
                            d={getBezierPath(fromNode.x, fromNode.y, toNode.x, toNode.y)}
                            stroke="#2BBAA5"
                            strokeWidth="4"
                            strokeDasharray="8, 40"
                            strokeLinecap="round"
                            fill="none"
                            className="active-flow-line"
                            style={{
                              mixBlendMode: "plus-lighter"
                            }}
                          />
                        </g>
                      );
                    })}
                  </g>

                  {/* 3. DRAW NODES AND LABELS */}
                  {ALL_NODES.map((node) => {
                    const NodeIcon = node.icon;
                    const isActive = activeScenario.activeNodes.includes(node.id);
                    const statusText = activeScenario.nodeStatuses[node.id];
                    const isAgent = node.id === "agent";
                    const isAnswer = node.id === "answer";

                    if (isAnswer) {
                      // Custom high-fidelity Answer Card matching the reference image perfectly
                      return (
                        <g key={node.id} className="transition-all duration-500">
                          <foreignObject x="990" y="140" width="280" height="220" className="overflow-visible select-none">
                            <div 
                              className="relative overflow-hidden rounded-2xl border border-border-color p-5 shadow-xl h-full flex flex-col justify-between backdrop-blur-md transition-all duration-300"
                              style={{ backgroundColor: "var(--bg-soft)" }}
                            >
                              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#2BBAA5]/5 blur-[25px] pointer-events-none" />
                              
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-5 h-5 rounded-full bg-[#2BBAA5]/15 flex items-center justify-center border border-[#2BBAA5]/30">
                                      <CheckCircle2 className="w-3 h-3 text-[#2BBAA5]" />
                                    </div>
                                    <span className="text-xs font-sans font-extrabold text-text-primary tracking-wide">
                                      Answer
                                    </span>
                                  </div>
                                  <span className="text-[10px] font-mono text-[#2BBAA5] font-bold bg-[#2BBAA5]/10 px-1.5 py-0.5 rounded-md">
                                    {activeScenario.timeToSolve}
                                  </span>
                                </div>
                                
                                <div className="h-[95px] flex items-center">
                                  <AnimatePresence mode="wait">
                                    <motion.p
                                      key={activeId}
                                      initial={{ opacity: 0, y: 3 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -3 }}
                                      className="text-xs text-text-secondary leading-relaxed font-sans"
                                    >
                                      {activeScenario.nodeStatuses.answer}
                                    </motion.p>
                                  </AnimatePresence>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-border-color flex items-center gap-1.5 text-[9px] font-mono">
                                <span className="bg-bg-card border border-border-color text-text-muted px-2 py-0.5 rounded">1</span>
                                <span className="bg-bg-card border border-border-color text-text-muted px-2 py-0.5 rounded">2</span>
                                <span className="text-text-muted font-bold ml-1">cited</span>
                              </div>
                            </div>
                          </foreignObject>
                        </g>
                      );
                    }

                    return (
                      <g
                        key={node.id}
                        className="transition-all duration-500"
                        opacity={isActive ? 1 : 0.65}
                      >
                        {/* Active Node Outer Glowing Ripple */}
                        {isActive && (
                          <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={isAgent ? 28 : 22}
                            fill="none"
                            stroke="#2BBAA5"
                            strokeWidth="1"
                            initial={{ scale: 0.9, opacity: 0.8 }}
                            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
                            transition={{
                              repeat: Infinity,
                              duration: 2.5,
                              ease: "easeInOut"
                            }}
                          />
                        )}

                        {/* Node Core Circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isAgent ? 20 : 16}
                          fill={isActive ? "var(--bg-card)" : "var(--bg-soft)"}
                          stroke={isActive ? "#2BBAA5" : "#4b5563"}
                          strokeWidth={isActive ? "2" : "1.2"}
                          className="transition-all duration-300"
                          filter={isActive ? "url(#nodeGlow)" : ""}
                        />

                        {/* Node Icon */}
                        <g transform={`translate(${node.x - (isAgent ? 10 : 8)}, ${node.y - (isAgent ? 10 : 8)})`}>
                          <NodeIcon
                            className={`transition-colors duration-300 ${
                              isActive ? "text-[#2BBAA5]" : "text-zinc-400"
                            }`}
                            size={isAgent ? 20 : 16}
                          />
                        </g>

                        {/* Node Label (Standard Name) */}
                        <text
                          x={node.x}
                          y={node.y + (isAgent ? 36 : 30)}
                          textAnchor="middle"
                          className={`text-[11px] font-sans font-bold select-none tracking-wide transition-colors duration-300 ${
                            isActive ? "fill-text-primary" : "fill-zinc-400"
                          }`}
                        >
                          {node.label}
                        </text>

                        {/* Dynamic Output Status (Only visible when active & text exists) */}
                        {isActive && statusText && (
                          <foreignObject
                            x={node.x - 100}
                            y={node.y + (isAgent ? 42 : 36)}
                            width="200"
                            height="50"
                            className="overflow-visible pointer-events-none select-none"
                          >
                            <motion.div
                              initial={{ opacity: 0, y: 3 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-center px-2"
                            >
                              <span className="text-[9px] font-mono font-bold block leading-normal drop-shadow-sm max-w-[160px] mx-auto bg-bg-card text-accent rounded py-0.5 px-1 border border-border-color shadow-md transition-colors duration-300">
                                {statusText}
                              </span>
                            </motion.div>
                          </foreignObject>
                        )}
                      </g>
                    );
                  })}

                  {/* Draw the beautiful Prompt Card on the Left of the SVG Canvas */}
                  <g key="prompt-card-group">
                    <foreignObject x="10" y="140" width="230" height="220" className="overflow-visible select-none">
                      <div 
                        className="relative overflow-hidden rounded-2xl border border-border-color p-5 shadow-xl h-full flex flex-col justify-between backdrop-blur-md transition-all duration-300"
                        style={{ backgroundColor: "var(--bg-soft)" }}
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#2BBAA5]/5 blur-[25px] pointer-events-none" />
                        
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-5 h-5 rounded-full bg-bg-soft flex items-center justify-center border border-border-color">
                              <User className="w-3 h-3 text-text-secondary" />
                            </div>
                            <span className="text-[9px] font-mono font-bold text-[#2BBAA5] tracking-wider truncate max-w-[150px]">
                              {activeScenario.category}
                            </span>
                          </div>
                          
                          <div className="h-[95px] flex items-center">
                            <AnimatePresence mode="wait">
                              <motion.p
                                key={activeId}
                                initial={{ opacity: 0, y: 3 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -3 }}
                                className="text-xs sm:text-sm font-medium text-text-primary leading-relaxed font-sans"
                              >
                                "{activeScenario.prompt}"
                              </motion.p>
                            </AnimatePresence>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border-color flex justify-between items-center text-[10px] font-mono text-text-muted">
                          <span>Execution speed:</span>
                          <span className="text-[#2BBAA5] font-bold">{activeScenario.timeToSolve}</span>
                        </div>
                      </div>
                    </foreignObject>
                  </g>

                </svg>
              </div>
            </div>

          </div>

        </div>
      
      {/* Inline styles for infinite dash-offset animation along path */}
      <style>{`
        @keyframes flowAnimation {
          to {
            stroke-dashoffset: -48;
          }
        }
        .active-flow-line {
          animation: flowAnimation 1.6s linear infinite;
        }
      `}</style>
    </section>
  );
}
