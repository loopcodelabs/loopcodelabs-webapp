import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import { safeLocalStorage } from "../utils/storage";

export interface HomepageModule {
  id: string;
  name: string;
  enabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
}

export interface WebsiteTheme {
  mode: "dark" | "light";
  accentColor: string; // e.g. "#2BBAA5" (Lime/teal)
  accentColorRgb: string; // e.g. "43, 186, 165"
  bgColor: string; // e.g. "#09090b" (Zinc 950)
  cardColor: string; // e.g. "#18181b" (Zinc 900)
  glassOpacity: number; // e.g. 0.15
  fontSizeMultiplier: number; // e.g. 1.0 (for sizing components)
  fontFamily: string; // "sans" | "mono" | "space"
}

export interface Service {
  id: string;
  number: string;
  title: string;
  slug: string;
  description: string;
  details: string;
  deliverables: string[];
  module?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  targetKeyword: string;
  summary: string;
  readTime: string;
  outline: string[];
  keyTakeaways: string[];
  publishedAt: string;
}

export interface AIScenario {
  id: string;
  label: string;
  prompt: string;
  category: string;
  timeToSolve: string;
  activeNodes: string[];
  nodeStatuses: Record<string, string>;
}

interface WebsiteContextType {
  modules: HomepageModule[];
  theme: WebsiteTheme;
  services: Service[];
  blogs: BlogArticle[];
  scenarios: AIScenario[];
  siteSettings: {
    agencyName: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    newsletterSuccessCount: number;
    budgetOptions: string[];
  };
  updateModule: (id: string, updates: Partial<HomepageModule>) => void;
  reorderModules: (id: string, direction: "up" | "down") => void;
  updateTheme: (updates: Partial<WebsiteTheme>) => void;
  addService: (service: Omit<Service, "id">) => void;
  updateService: (id: string, updates: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addBlog: (blog: Omit<BlogArticle, "id" | "publishedAt">) => void;
  updateBlog: (id: string, updates: Partial<BlogArticle>) => void;
  deleteBlog: (id: string) => void;
  addAIScenario: (scenario: AIScenario) => void;
  updateAIScenario: (id: string, updates: Partial<AIScenario>) => void;
  deleteAIScenario: (id: string) => void;
  updateSettings: (updates: Partial<WebsiteContextType["siteSettings"]>) => void;
  resetAll: () => void;
  generateAutomatedPost: () => void;
}

const defaultModules: HomepageModule[] = [
  { id: "hero", name: "Hero Section", enabled: true, order: 1, title: "We architect premium digital interfaces", subtitle: "We are an elite software engineering lab crafting high-converting websites, mobile apps, and automated growth systems." },
  { id: "letsbuild", name: "Let's Build", enabled: true, order: 2 },
  { id: "marquee", name: "Client Marquee", enabled: true, order: 3 },
  { id: "services", name: "Services Catalog", enabled: true, order: 4, title: "Our Core Capabilities", subtitle: "We build digital-first engines designed for performance, high-fidelity UX, and seamless backend system integration." },
  { id: "aiagents", name: "AI Agent Workspace", enabled: true, order: 5, title: "Autonomous Workforces", subtitle: "Watch our proprietary multi-agent framework coordinate databases, semantic routing, and browser-control systems live." },
  { id: "projects", name: "Case Studies & Work", enabled: true, order: 6, title: "Selected Case Studies", subtitle: "Explore our archive of premium digital systems engineered for high efficiency, scalability, and aesthetic perfection." },
  { id: "process", name: "Engineering Process", enabled: true, order: 7, title: "How We Engineer Excellence", subtitle: "A rigid, milestone-gated operational playbook designed to eliminate friction and secure deployment success." },
  { id: "letstalk", name: "Let's Talk", enabled: true, order: 8 },
  { id: "faq", name: "Frequently Asked Questions", enabled: true, order: 9, title: "Frequently Asked Questions", subtitle: "Everything you need to know about AI automation, custom software development, websites, mobile apps, and digital transformation." },
  { id: "contact", name: "Contact & Estimation", enabled: true, order: 10 }
];

const defaultTheme: WebsiteTheme = {
  mode: "dark",
  accentColor: "#2BBAA5",
  accentColorRgb: "43, 186, 165",
  bgColor: "#09090b",
  cardColor: "#18181b",
  glassOpacity: 0.15,
  fontSizeMultiplier: 1.0,
  fontFamily: "Space Grotesk"
};

const defaultServices: Service[] = [
  // === BUILD ===
  {
    id: "s1",
    number: "01",
    title: "Website Development",
    slug: "website-development",
    module: "build",
    description: "Custom Webflow, Next.js, and WordPress solutions built for lightning speed.",
    details: "We build top-tier frontends using React, Next.js, and high-performance layout libraries. Every site features perfect Lighthouse scores, modern fluid layouts, and serverless edge functions.",
    deliverables: ["Performance optimization (95+ Lighthouse)", "Dynamic CMS & content pipelines", "Framer Motion layout states", "Static Site Generation (SSG) deployment"]
  },
  {
    id: "s2",
    number: "02",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    module: "build",
    description: "Native iOS and Android app engineering with smooth cross-device features.",
    details: "Stunning iOS and Android applications written in React Native and Swift/Kotlin. We specialize in real-time syncing, background tasks, push notifications, and offline-first database structures.",
    deliverables: ["Cross-platform React Native codebases", "State management with Redux/Zustand", "App Store & Google Play publishing", "Secure biometrics and push integrations"]
  },
  {
    id: "s3",
    number: "03",
    title: "UI/UX Design",
    slug: "ui-ux-design",
    module: "build",
    description: "Fidelity design mockups, wireframing, and custom interactive prototypes.",
    details: "High-fidelity digital layout sheets. We construct meticulous wireframes, micro-interaction transitions, fluid UX paths, and responsive typography layouts across desktop and mobile form-factors.",
    deliverables: ["Comprehensive Figma visual file", "Interactive UX flow prototyping", "High-fidelity responsive states", "Detailed asset sheets for developers"]
  },
  {
    id: "s4",
    number: "04",
    title: "Branding & Strategy",
    slug: "branding-strategy",
    module: "build",
    description: "Full-scale corporate design books, logo guidelines, and product positioning.",
    details: "Establish an absolute competitive moat. We construct complete visual identities, design books, custom typography palettes, corporate logo systems, and strategic market positioning guides.",
    deliverables: ["Corporate style-guide playbooks", "Vector typography and logo books", "Interactive style component specs", "Market positioning & core deck strategy"]
  },

  // === GROW ===
  {
    id: "s5",
    number: "05",
    title: "SEO Services",
    slug: "seo-services",
    module: "grow",
    description: "On-page, technical, and off-page optimizations to rank #1 on Google India.",
    details: "Advanced technical search engine marketing that targets direct ROI. We specialize in JSON-LD structure mapping, competitive keyword clusters, page speed metrics, and programmatic content systems.",
    deliverables: ["Comprehensive technical site audits", "Topical cluster blueprints", "JSON-LD structured schema injects", "Core Web Vitals remediation"]
  },
  {
    id: "s6",
    number: "06",
    title: "Digital Marketing",
    slug: "digital-marketing",
    module: "grow",
    description: "ROI-driven conversion funnels, local outreach, and content mapping.",
    details: "Crafting end-to-end customer acquisition funnels. From high-converting landing pages to dynamic email capture, we configure high-yield systems to turn visitors into repeat enterprise buyers.",
    deliverables: ["High-impact landing page design", "Multi-stage lead capture forms", "Analytics dashboards and heatmaps", "Local search engine directory sync"]
  },
  {
    id: "s7",
    number: "07",
    title: "Paid Advertising",
    slug: "paid-advertising",
    module: "grow",
    description: "Meta Ads, Google Search, and LinkedIn campaigns tailored to drive direct leads.",
    details: "Surgical execution of paid digital campaigns. We write compelling copy, design conversion-focused creative assets, and build custom audiences to maximize your pipeline's Return on Ad Spend (ROAS).",
    deliverables: ["Ad design assets & copywriting", "Multi-platform pixel setups", "Budget pacing & continuous bid tests", "Custom cohort retention audiences"]
  },
  {
    id: "s8",
    number: "08",
    title: "Email Marketing",
    slug: "email-marketing",
    module: "grow",
    description: "High-retention automation and drip sequences to build customer life-time value.",
    details: "Unlock hidden retention loops. We map out full buyer journeys, wire dynamic transactional emails, and schedule content drips that nurture prospects and boost life-time customer value automatically.",
    deliverables: ["Custom template construction", "Behavior-based automated triggers", "Weekly high-yield newsletters", "A/B copy and layout experimentations"]
  },
  {
    id: "s9",
    number: "09",
    title: "Lead Generation Automation",
    slug: "lead-generation-automation",
    module: "grow",
    description: "Autonomous multi-channel lead capture, validation, and programmatic routing systems.",
    details: "We build high-fidelity forms and integrations that capture, enrich, verify, and route leads to your sales reps in real time. Features automatic phone verification, LinkedIn scraping, and CRM synchronization.",
    deliverables: ["Real-time lead enrichment pipelines", "E-mail & Phone verification filters", "Intelligent round-robin routing logic", "Web scraping and profiling agents"]
  },
  {
    id: "s10",
    number: "10",
    title: "Marketing Automation",
    slug: "marketing-automation",
    module: "grow",
    description: "End-to-end campaign automation, visitor tracking, and personalized cohort flows.",
    details: "Orchestrate personalized customer journeys at scale. We sync Webhook triggers with marketing platforms, implement dynamic content modules based on visitor behaviors, and configure multi-channel campaigns.",
    deliverables: ["Dynamic content personalization tokens", "Behavioral event tracking setups", "SaaS marketing lifecycle maps", "Automated re-engagement sequences"]
  },

  // === AUTOMATE ===
  {
    id: "s11",
    number: "11",
    title: "AI Automation Solutions",
    slug: "ai-automation-solutions",
    module: "automate",
    description: "Custom LLM integrations and automated agent workflows to automate complex business workflows.",
    details: "Harness modern Large Language Models to automate structured writing, content categorization, customer request triaging, and repetitive computer operations. Built with LangChain and semantic routing.",
    deliverables: ["Custom LLM integration blueprints", "Automated system triage controllers", "Structured data extraction pipelines", "Semantic query router gateways"]
  },
  {
    id: "s12",
    number: "12",
    title: "CRM & Workflow Automation",
    slug: "crm-workflow-automation",
    module: "automate",
    description: "Seamless integrations connecting HubSpot, Salesforce, Slack, and your proprietary databases.",
    details: "Eliminate manual copy-pasting between systems. We orchestrate robust data pipelines that keep your CRM, communication tools, invoicing apps, and internal databases perfectly synchronized 24/7.",
    deliverables: ["HubSpot/Salesforce database sync", "Instant Slack alert system notifications", "Dynamic automated invoice generation", "Error-handling redundancy mechanisms"]
  },
  {
    id: "s13",
    number: "13",
    title: "AI Chatbots & Virtual Assistants",
    slug: "ai-chatbots-virtual-assistants",
    module: "automate",
    description: "Intelligent, context-aware customer support agents trained on your custom knowledge base.",
    details: "Deploy 24/7 conversational interfaces that resolve up to 70% of inbound customer inquiries instantly. Integrates retrieval-augmented generation (RAG) with secure vector search databases.",
    deliverables: ["RAG-enabled vector knowledge base", "Contextual memory & session retention", "Human-in-the-loop takeover controls", "Interactive multi-language dialog flows"]
  },
  {
    id: "s14",
    number: "14",
    title: "AI Voice Agents",
    slug: "ai-voice-agents",
    module: "automate",
    description: "Ultra-low-latency autonomous conversational voice agents for seamless phone support.",
    details: "Deploy dynamic phone agents that speak naturally, handle interruptions, and execute database queries during live support calls. Built on Gemini Live API and WebRTC systems.",
    deliverables: ["Ultra-low-latency voice stream setups", "Custom vocal tone & pronunciation rules", "Automated live phone bridge triggers", "Post-call summary transcripts and logs"]
  },
  {
    id: "s15",
    number: "15",
    title: "Document Processing Automation",
    slug: "document-processing-automation",
    module: "automate",
    description: "Automated OCR, indexing, and data extraction from PDF invoices, legal contracts, and forms.",
    details: "Transform unstructured paper documents or PDFs into pristine database records instantly. Utilizes multimodal AI vision models to parse handwriting, tables, and nested text blocks with 99.9% accuracy.",
    deliverables: ["Multimodal OCR visual document parser", "JSON metadata structure exports", "Anomalous entry flagging algorithms", "Bulk secure file batch processes"]
  },

  // === TRANSFORM ===
  {
    id: "s16",
    number: "16",
    title: "AI Business Consulting",
    slug: "ai-business-consulting",
    module: "transform",
    description: "Strategic AI roadmaps, technical feasibility studies, and operational cost savings audits.",
    details: "Partner with our elite consultants to identify high-ROI AI opportunities in your enterprise. We audit your existing workflows, model financial impact, and author comprehensive execution roadmaps.",
    deliverables: ["Operational AI cost savings audit", "Technical architecture feasibility report", "Step-by-step corporate execution roadmap", "Vendor & model comparison matrices"]
  },
  {
    id: "s17",
    number: "17",
    title: "Custom AI Applications",
    slug: "custom-ai-applications",
    module: "transform",
    description: "Bespoke proprietary software, specialized vector search engines, and fine-tuned AI systems.",
    details: "Own your artificial intelligence stack. We design, build, and deploy specialized applications tailored to your proprietary data, domain-specific tasks, and strict compliance environments.",
    deliverables: ["Proprietary source-code repository", "Fine-tuned model checkpoint weights", "Interactive admin operations dashboard", "Scalable secure Kubernetes deployment"]
  },
  {
    id: "s18",
    number: "18",
    title: "AI Analytics & Business Intelligence",
    slug: "ai-analytics-business-intelligence",
    module: "transform",
    description: "Predictive modeling, churn analysis, and interactive real-time corporate insight dashboards.",
    details: "Turn raw tracking data into actionable strategic foresight. We engineer real-time pipelines that monitor enterprise KPIs, project future performance trends, and visualize key risk vectors dynamically.",
    deliverables: ["Interactive business intelligence dashboards", "Predictive buyer churn algorithms", "Automated anomaly alert system triggers", "Multi-tenant executive report builders"]
  },
  {
    id: "s19",
    number: "19",
    title: "Enterprise AI Integration",
    slug: "enterprise-ai-integration",
    module: "transform",
    description: "Embedding LLMs and cognitive agents into your legacy ERP, accounting, and supply chain software.",
    details: "Bring intelligent decision-making to your legacy systems. We engineer secure middleware APIs that connect proprietary databases with advanced intelligence systems without breaking operational continuity.",
    deliverables: ["Secure middleware API gateways", "Legacy ERP cognitive connectors", "Role-based data boundary firewalls", "Transactional audit logs and tracing"]
  },
  {
    id: "s20",
    number: "20",
    title: "AI Product Development",
    slug: "ai-product-development",
    module: "transform",
    description: "Architecting, prototyping, and scaling new AI-native SaaS products for commercial launch.",
    details: "From zero to SaaS launch. We partner to design user-centric AI features, engineer robust backend scaling limits, secure API rate boundaries, and deliver a polished commercial product.",
    deliverables: ["Commercial SaaS product architecture", "User subscription & token billing sync", "High-fidelity responsive UI interface", "DevOps scaling & failover playbooks"]
  }
];

const defaultBlogs: BlogArticle[] = [
  {
    id: "b1",
    title: "How Technical SEO Schema Multiplies CTR on Google Search India",
    category: "SEO",
    targetKeyword: "Technical SEO Services",
    summary: "Discover how embedding structured JSON-LD local business and service schemas can directly double your search click-through rates.",
    readTime: "5 min read",
    outline: [
      "Understanding the Schema markup framework for Indian local businesses",
      "Step-by-step configuration of ProfessionalService and WebPage schemas",
      "Validating rich results with Schema testing tools before deployment",
      "Case Study: 140% organic lead growth for Hyderabad-based enterprises"
    ],
    keyTakeaways: ["Schema represents absolute programmatic communication.", "Directly increases rich-snippet real-estate on search.", "Improves organic mobile visibility."],
    publishedAt: "2026-07-15"
  },
  {
    id: "b2",
    title: "The Shift to Generative Engine Optimization (GEO) in 2026",
    category: "SEO",
    targetKeyword: "SEO Company Hyderabad",
    summary: "Traditional search is evolving. Learn how to optimize your content structure so ChatGPT, Claude, and Gemini recommend your services.",
    readTime: "6 min read",
    outline: [
      "What is Generative Engine Optimization (GEO) and why is it crucial?",
      "Structuring content using conversational Q&A block elements",
      "Authoritativeness and transparent citations as ranking signals",
      "Aesthetic styling rules to capture AI assistant summaries"
    ],
    keyTakeaways: ["AI search engines prefer clear entities over raw keyword density.", "Transparent sourcing establishes trust metrics.", "Semantic layout triggers AI indexing."],
    publishedAt: "2026-07-14"
  },
  {
    id: "b3",
    title: "Why Standard Keyword Stuffing is Dead: Embracing Latent Semantic Indexing",
    category: "SEO",
    targetKeyword: "SEO Expert",
    summary: "Learn how modern search crawlers use vector embeddings to understand content intent without repeating exact phrases.",
    readTime: "5 min read",
    outline: [
      "Natural Language Processing (NLP) in search crawlers",
      "Mapping latent semantic entities related to your services",
      "Writing for human clarity first while retaining indexing signals",
      "Measuring topical relevance using competitive auditing tools"
    ],
    keyTakeaways: ["Search engines read concepts, not just keywords.", "Synonyms improve readability and ranking.", "High-quality write-ups naturally contain LSI terms."],
    publishedAt: "2026-07-13"
  }
];

const defaultScenarios: AIScenario[] = [
  {
    id: "projects",
    label: "Projects + BI",
    prompt: "Which projects are over budget — and by how much?",
    category: "PROJECTS + BI - PROFILE",
    timeToSolve: "2.3s",
    activeNodes: ["agent", "query_data", "seen_tables", "create_doc", "answer"],
    nodeStatuses: {
      query_data: "Budget vs actual - 124 projects",
      seen_tables: "3 projects over the approved threshold",
      create_doc: "Status report - draft for your approval",
      answer: "3 projects over, ₹5,41,200 total; draft reports generated."
    }
  },
  {
    id: "market",
    label: "Market Analysis",
    prompt: "Find Hyderabad real estate tech companies that raised series A in last 6 months",
    category: "MARKET RESEARCH - LIVE",
    timeToSolve: "4.1s",
    activeNodes: ["agent", "web", "semantic_search", "navigate_doc", "cross_doc", "answer"],
    nodeStatuses: {
      web: "Google news index & tech news scan",
      semantic_search: "Querying series A venture databases",
      navigate_doc: "Matching founders & geolocations in Hyderabad",
      cross_doc: "Cross-referencing Telangana MCA corporate logs",
      answer: "Identified 4 PropTech startups; aggregated funding logs and lists."
    }
  },
  {
    id: "database",
    label: "Database Clean",
    prompt: "Scan our contact database and deduplicate names with mismatched emails",
    category: "CRM & ERP INTEGRATION",
    timeToSolve: "1.8s",
    activeNodes: ["agent", "memory", "query_data", "validity_of_date", "answer"],
    nodeStatuses: {
      memory: "Accessing previous CRM clean-up parameters",
      query_data: "4,821 active customer records loaded",
      validity_of_date: "Matching last-modified date & transaction records",
      answer: "Deduplicated 312 records. Merged contact card drafts prepped."
    }
  }
];

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export const WebsiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<HomepageModule[]>(() => {
    const saved = safeLocalStorage.getItem("cms_modules");
    if (!saved) return defaultModules;
    try {
      const parsed: HomepageModule[] = JSON.parse(saved);
      defaultModules.forEach((defM) => {
        if (!parsed.some((m) => m.id === defM.id)) {
          parsed.push(defM);
        }
      });
      return parsed.sort((a, b) => a.order - b.order);
    } catch {
      return defaultModules;
    }
  });

  const [theme, setTheme] = useState<WebsiteTheme>(() => {
    const saved = safeLocalStorage.getItem("cms_theme");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.mode) {
          return parsed as WebsiteTheme;
        }
      } catch (e) {
        console.error("Error parsing cms_theme", e);
      }
    }
    return defaultTheme;
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = safeLocalStorage.getItem("cms_services");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Service[];
        const hasOldSlugs = parsed.some(s => 
          ["app-development", "seo", "paid-ads", "automation", "branding", "ui-ux"].includes(s.slug)
        );
        if (!hasOldSlugs && parsed && Array.isArray(parsed)) {
          const existingSlugs = new Set(parsed.map(s => s.slug));
          const merged = [...parsed];
          defaultServices.forEach(ds => {
            if (!existingSlugs.has(ds.slug)) {
              merged.push(ds);
            }
          });
          const healed = merged.map(s => {
            const match = defaultServices.find(ds => ds.slug === s.slug || ds.id === s.id);
            return {
              ...s,
              module: s.module || match?.module || "build"
            };
          });
          return healed;
        }
      } catch (e) {
        console.error("Error parsing cms_services", e);
      }
    }
    safeLocalStorage.setItem("cms_services", JSON.stringify(defaultServices));
    return defaultServices;
  });

  const [blogs, setBlogs] = useState<BlogArticle[]>(() => {
    const saved = safeLocalStorage.getItem("cms_blogs");
    return saved ? JSON.parse(saved) : defaultBlogs;
  });

  const [scenarios, setScenarios] = useState<AIScenario[]>(() => {
    const saved = safeLocalStorage.getItem("cms_scenarios");
    return saved ? JSON.parse(saved) : defaultScenarios;
  });

  const defaultBudgetOptions = [
    "₹50,000 - ₹1,50,000",
    "₹1,50,000 - ₹3,00,000",
    "₹3,00,000 - ₹5,00,000",
    "₹5,00,000+"
  ];

  const [siteSettings, setSiteSettings] = useState<WebsiteContextType["siteSettings"]>(() => {
    const saved = safeLocalStorage.getItem("cms_settings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.budgetOptions || !Array.isArray(parsed.budgetOptions) || parsed.budgetOptions.length === 0) {
          parsed.budgetOptions = defaultBudgetOptions;
        }
        return parsed;
      } catch (e) {
        console.error("Error parsing cms_settings", e);
      }
    }
    return {
      agencyName: "loopCode Labs",
      contactEmail: "hello@loopcodelabs.in",
      contactPhone: "+91 90000 12345",
      contactAddress: "Jubilee Hills, Road No 36, Hyderabad, India",
      newsletterSuccessCount: 1480,
      budgetOptions: defaultBudgetOptions
    };
  });

  const syncConfigToServer = useCallback((updates: Record<string, any>) => {
    fetch("/api/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates)
    }).catch(err => console.error("Error syncing config to server:", err));
  }, []);

  useEffect(() => {
    fetch("/api/config")
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.config) {
          if (data.config.modules && Array.isArray(data.config.modules)) setModules(data.config.modules);
          if (data.config.theme && data.config.theme.mode) setTheme(data.config.theme);
          if (data.config.services && Array.isArray(data.config.services)) {
            const serverServices = data.config.services as Service[];
            const existingSlugs = new Set(serverServices.map(s => s.slug));
            const merged = [...serverServices];
            defaultServices.forEach(ds => {
              if (!existingSlugs.has(ds.slug)) {
                merged.push(ds);
              }
            });
            const healed = merged.map(s => {
              const match = defaultServices.find(ds => ds.slug === s.slug || ds.id === s.id);
              return {
                ...s,
                module: s.module || match?.module || "build"
              };
            });
            setServices(healed);
          }
          if (data.config.blogs && Array.isArray(data.config.blogs)) setBlogs(data.config.blogs);
          if (data.config.scenarios && Array.isArray(data.config.scenarios)) setScenarios(data.config.scenarios);
          if (data.config.siteSettings) setSiteSettings(data.config.siteSettings);
        }
      })
      .catch(err => console.log("Initial server config load notice:", err));
  }, []);

  useEffect(() => {
    safeLocalStorage.setItem("cms_modules", JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    safeLocalStorage.setItem("cms_theme", JSON.stringify(theme));
    // Apply theme dynamic css variables
    const root = document.documentElement;
    
    if (theme.mode === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
      safeLocalStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      safeLocalStorage.setItem("theme", "dark");
    }
    
    root.style.setProperty("--color-accent", theme.accentColor || "#2BBAA5");
    root.style.setProperty("--color-accent-rgb", theme.accentColorRgb || "43, 186, 165");
    root.style.setProperty("--bg-main", theme.bgColor || (theme.mode === "light" ? "#f8fafc" : "#09090b"));
    root.style.setProperty("--bg-card", theme.cardColor || (theme.mode === "light" ? "#ffffff" : "#18181b"));
    root.style.setProperty("--font-display", theme.fontFamily || "Space Grotesk");
  }, [theme]);

  useEffect(() => {
    safeLocalStorage.setItem("cms_services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    safeLocalStorage.setItem("cms_blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    safeLocalStorage.setItem("cms_scenarios", JSON.stringify(scenarios));
  }, [scenarios]);

  useEffect(() => {
    safeLocalStorage.setItem("cms_settings", JSON.stringify(siteSettings));
  }, [siteSettings]);

  const updateModule = (id: string, updates: Partial<HomepageModule>) => {
    setModules(prev => {
      const next = prev.map(m => m.id === id ? { ...m, ...updates } : m);
      syncConfigToServer({ modules: next });
      return next;
    });
  };

  const reorderModules = (id: string, direction: "up" | "down") => {
    setModules(prev => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const index = sorted.findIndex(m => m.id === id);
      if (index === -1) return prev;
      
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= sorted.length) return prev;
      
      const tempOrder = sorted[index].order;
      sorted[index].order = sorted[newIndex].order;
      sorted[newIndex].order = tempOrder;
      
      syncConfigToServer({ modules: sorted });
      return sorted;
    });
  };

  const updateTheme = (updates: Partial<WebsiteTheme>) => {
    setTheme(prev => {
      const nextMode = updates.mode || prev.mode || "dark";
      let nextBg = updates.bgColor || prev.bgColor;
      let nextCard = updates.cardColor || prev.cardColor;

      // Adjust defaults if mode changed but colors weren't explicitly supplied
      if (updates.mode && updates.mode !== prev.mode) {
        if (updates.mode === "light") {
          nextBg = updates.bgColor || "#f8fafc";
          nextCard = updates.cardColor || "#ffffff";
        } else {
          nextBg = updates.bgColor || "#09090b";
          nextCard = updates.cardColor || "#18181b";
        }
      }

      const nextTheme: WebsiteTheme = {
        ...prev,
        ...updates,
        mode: nextMode,
        bgColor: nextBg,
        cardColor: nextCard
      };

      syncConfigToServer({ theme: nextTheme });
      return nextTheme;
    });
  };

  const addService = (service: Omit<Service, "id">) => {
    const id = "s_" + Date.now();
    setServices(prev => {
      const next = [...prev, { ...service, id }];
      syncConfigToServer({ services: next });
      return next;
    });
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...updates } : s);
      syncConfigToServer({ services: next });
      return next;
    });
  };

  const deleteService = (id: string) => {
    setServices(prev => {
      const next = prev.filter(s => s.id !== id);
      syncConfigToServer({ services: next });
      return next;
    });
  };

  const addBlog = (blog: Omit<BlogArticle, "id" | "publishedAt">) => {
    const id = "b_" + Date.now();
    const publishedAt = new Date().toISOString().split("T")[0];
    setBlogs(prev => {
      const next = [{ ...blog, id, publishedAt }, ...prev];
      syncConfigToServer({ blogs: next });
      return next;
    });
  };

  const updateBlog = (id: string, updates: Partial<BlogArticle>) => {
    setBlogs(prev => {
      const next = prev.map(b => b.id === id ? { ...b, ...updates } : b);
      syncConfigToServer({ blogs: next });
      return next;
    });
  };

  const deleteBlog = (id: string) => {
    setBlogs(prev => {
      const next = prev.filter(b => b.id !== id);
      syncConfigToServer({ blogs: next });
      return next;
    });
  };

  const addAIScenario = (scenario: AIScenario) => {
    setScenarios(prev => {
      const next = [...prev, scenario];
      syncConfigToServer({ scenarios: next });
      return next;
    });
  };

  const updateAIScenario = (id: string, updates: Partial<AIScenario>) => {
    setScenarios(prev => {
      const next = prev.map(s => s.id === id ? { ...s, ...updates } : s);
      syncConfigToServer({ scenarios: next });
      return next;
    });
  };

  const deleteAIScenario = (id: string) => {
    setScenarios(prev => {
      const next = prev.filter(s => s.id !== id);
      syncConfigToServer({ scenarios: next });
      return next;
    });
  };

  const updateSettings = (updates: Partial<WebsiteContextType["siteSettings"]>) => {
    setSiteSettings(prev => {
      const next = { ...prev, ...updates };
      syncConfigToServer({ siteSettings: next });
      return next;
    });
  };

  const generateAutomatedPost = () => {
    const aiTitles = [
      "Maximizing Multi-Agent Pipelines for India Corporate Operations",
      "Evaluating Framer Motion and WebGL for Next-Gen Fluid Portfolios",
      "Why Proximity Injections Double Local Business Leads in Jubilee Hills",
      "Integrating Gemini Live Audio API in Customer Retention Pipelines",
      "Designing Non-Blocking Low-Latency Databases for Hyderabad Startups"
    ];
    const categories = ["AI", "Web Development", "SEO", "Automation", "Business Growth"];
    const keywords = ["AI Agents Hyderabad", "React Web Dev", "Hyderabad Local SEO", "Automation Agency India", "Enterprise Growth"];
    
    const index = Math.floor(Math.random() * aiTitles.length);
    const title = aiTitles[index];
    const category = categories[index];
    const targetKeyword = keywords[index];
    
    addBlog({
      title,
      category,
      targetKeyword,
      summary: `Automated analysis on ${title.toLowerCase()}. Engineered using simulated algorithmic modeling to boost organic discoverability for Indian enterprises.`,
      readTime: "4 min read",
      outline: [
        `Introductory metrics on ${targetKeyword}`,
        "Analyzing real-world telemetry and Indian market trends",
        "Step-by-step custom deployment model",
        "ROI validation metrics"
      ],
      keyTakeaways: [
        "Programmatic publishing establishes strong search indexing clusters.",
        "Targeted content addresses hyper-local regional search queries.",
        "Automation pipelines optimize research-to-draft workflows."
      ]
    });
  };

  const resetAll = () => {
    setModules(defaultModules);
    setTheme(defaultTheme);
    setServices(defaultServices);
    setBlogs(defaultBlogs);
    setScenarios(defaultScenarios);
    const defaultSettings = {
      agencyName: "loopCode Labs",
      contactEmail: "hello@loopcodelabs.in",
      contactPhone: "+91 90000 12345",
      contactAddress: "Jubilee Hills, Road No 36, Hyderabad, India",
      newsletterSuccessCount: 1480,
      budgetOptions: defaultBudgetOptions
    };
    setSiteSettings(defaultSettings);
    syncConfigToServer({
      modules: defaultModules,
      theme: defaultTheme,
      services: defaultServices,
      blogs: defaultBlogs,
      scenarios: defaultScenarios,
      siteSettings: defaultSettings
    });
  };

  return (
    <WebsiteContext.Provider value={{
      modules,
      theme,
      services,
      blogs,
      scenarios,
      siteSettings,
      updateModule,
      reorderModules,
      updateTheme,
      addService,
      updateService,
      deleteService,
      addBlog,
      updateBlog,
      deleteBlog,
      addAIScenario,
      updateAIScenario,
      deleteAIScenario,
      updateSettings,
      resetAll,
      generateAutomatedPost
    }}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error("useWebsite must be used within a WebsiteProvider");
  }
  return context;
};
