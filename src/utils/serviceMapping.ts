import { Service } from "../context/WebsiteContext";

export interface ServiceItem {
  id: string;
  slug: string;
  num: string;
  number: string;
  label: string;
  title: string;
  desc: string;
  description: string;
  details: string;
  benefits: string[];
  process: { num: string; title: string; desc: string; }[];
  deliverables: string[];
  image: string;
  color: string;
  glowColor: string;
  module?: string;
}

const serviceMetadataMap: Record<string, {
  image: string;
  color: string;
  glowColor: string;
  process: { num: string; title: string; desc: string; }[];
}> = {
  "website-development": {
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#2BBAA5",
    glowColor: "rgba(43, 186, 165, 0.45)",
    process: [
      { num: "01", title: "Discovery", desc: "Goals, audiences, sitemaps, and structure." },
      { num: "02", title: "Design", desc: "High-fidelity, bespoke on-brand interfaces." },
      { num: "03", title: "Build", desc: "Clean frontend React/Next.js codebases." },
      { num: "04", title: "Launch", desc: "SEO setup, analytics, and instant deployment." }
    ]
  },
  "mobile-app-development": {
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.45)",
    process: [
      { num: "01", title: "Scope", desc: "Feature matrix and complete product wireframes." },
      { num: "02", title: "Prototype", desc: "Clickable visual mockups to validate flows." },
      { num: "03", title: "Develop", desc: "Native Swift/Kotlin and cross-platform apps." },
      { num: "04", title: "Ship", desc: "App store submission and ongoing maintenance." }
    ]
  },
  "ui-ux-design": {
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#ec4899",
    glowColor: "rgba(236, 72, 153, 0.45)",
    process: [
      { num: "01", title: "Research", desc: "User flows and conversion optimization." },
      { num: "02", title: "Wireframe", desc: "Visual structure, grid patterns, and maps." },
      { num: "03", title: "Design", desc: "High-fidelity UI and responsive components." },
      { num: "04", title: "Prototype", desc: "Interactive feedback and assets sheet." }
    ]
  },
  "branding-strategy": {
    image: "https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.45)",
    process: [
      { num: "01", title: "Research", desc: "Competitor positioning and buyer research." },
      { num: "02", title: "Position", desc: "Value propositions, messaging, and copy." },
      { num: "03", title: "Identity", desc: "Logo design, color tokens, typography guides." },
      { num: "04", title: "Roadmap", desc: "Visual guidelines and long-term positioning." }
    ]
  },
  "seo-services": {
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#4ade80",
    glowColor: "rgba(74, 222, 128, 0.45)",
    process: [
      { num: "01", title: "Audit", desc: "Technical, content, and backlink analysis." },
      { num: "02", title: "Strategy", desc: "Keyword map prioritized by value." },
      { num: "03", title: "Execute", desc: "On-page, technical SEO, and schema markup." },
      { num: "04", title: "Grow", desc: "Topical cluster authority and compounding." }
    ]
  },
  "digital-marketing": {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#f43f5e",
    glowColor: "rgba(244, 63, 94, 0.45)",
    process: [
      { num: "01", title: "Plan", desc: "Audience targeting, channels, and campaigns." },
      { num: "02", title: "Create", desc: "Visual assets, copy, and capture flows." },
      { num: "03", title: "Launch", desc: "Deploy campaigns with full tracking codes." },
      { num: "04", title: "Optimize", desc: "Realtime analytics tracking and budget focus." }
    ]
  },
  "paid-advertising": {
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.45)",
    process: [
      { num: "01", title: "Setup", desc: "Ad accounts, pixel setup, and research." },
      { num: "02", title: "Build", desc: "A/B creative variations and target cohorts." },
      { num: "03", title: "Scale", desc: "Bid management and volume pacing." },
      { num: "04", title: "Report", desc: "ROAS updates and next-step improvements." }
    ]
  },
  "email-marketing": {
    image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    process: [
      { num: "01", title: "Map", desc: "Drip triggers and user lifecycle paths." },
      { num: "02", title: "Design", desc: "Beautiful responsive newsletter systems." },
      { num: "03", title: "Automate", desc: "Transactional triggers and CRM sync." },
      { num: "04", title: "Refine", desc: "A/B copywriting, open rates, CTR." }
    ]
  },
  "lead-generation-automation": {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.45)",
    process: [
      { num: "01", title: "Discover", desc: "Identify multi-channel pipeline bottlenecks." },
      { num: "02", title: "Script", desc: "Scrapers, enrichment APIs, and scrapbooks." },
      { num: "03", title: "Capture", desc: "Deploy instant validation webhooks." },
      { num: "04", title: "Route", desc: "Round-robin leads into sales CRM desks." }
    ]
  },
  "marketing-automation": {
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.45)",
    process: [
      { num: "01", title: "Audit", desc: "Map existing campaigns and event triggers." },
      { num: "02", title: "Target", desc: "Build segments based on digital footprints." },
      { num: "03", title: "Sequence", desc: "Deploy behavioral trigger-action trees." },
      { num: "04", title: "Nurture", desc: "Close deal cycles with smart retention drips." }
    ]
  },
  "ai-automation-solutions": {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    process: [
      { num: "01", title: "Audit", desc: "Evaluate workflows and manual bottlenecks." },
      { num: "02", title: "Design", desc: "Engineer LangChain frameworks & agents." },
      { num: "03", title: "Integrate", desc: "Hook models into operational webhooks." },
      { num: "04", title: "Deploy", desc: "Secure container execution and metrics." }
    ]
  },
  "crm-workflow-automation": {
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    process: [
      { num: "01", title: "Sync", desc: "Connect CRM databases via secure channels." },
      { num: "02", title: "Trigger", desc: "Define real-time event listener endpoints." },
      { num: "03", title: "Automate", desc: "Push information, assets, and invoices." },
      { num: "04", title: "Audit", desc: "Check pipelines and track API limits." }
    ]
  },
  "ai-chatbots-virtual-assistants": {
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    process: [
      { num: "01", title: "Context", desc: "Ingest custom databases and knowledge bases." },
      { num: "02", title: "Train", desc: "Fine-tune system instructions and rules." },
      { num: "03", title: "Launch", desc: "Embed conversational scripts on portals." },
      { num: "04", title: "Improve", desc: "Monitor semantic success and RAG steps." }
    ]
  },
  "ai-voice-agents": {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    process: [
      { num: "01", title: "Script", desc: "Define conversation goals and live hooks." },
      { num: "02", title: "Voice", desc: "Configure low-latency synthesis paths." },
      { num: "03", title: "Connect", desc: "Deploy phone lines and live agent setups." },
      { num: "04", title: "Support", desc: "Resolve tickets and log transcripts." }
    ]
  },
  "document-processing-automation": {
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.45)",
    process: [
      { num: "01", title: "Scan", desc: "Ingest PDFs, images, and raw contracts." },
      { num: "02", title: "Parse", desc: "Run OCR visual parsing structures." },
      { num: "03", title: "Verify", desc: "Run checks and flag missing entries." },
      { num: "04", title: "Export", desc: "Output JSON data straight into local systems." }
    ]
  },
  "ai-business-consulting": {
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.45)",
    process: [
      { num: "01", title: "Assess", desc: "Analyze enterprise systems and tasks." },
      { num: "02", title: "Strategize", desc: "Map potential high-ROI AI milestones." },
      { num: "03", title: "Validate", desc: "Conduct feasibility and compliance checks." },
      { num: "04", title: "Execute", desc: "Draft long-term action plan blueprints." }
    ]
  },
  "custom-ai-applications": {
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.45)",
    process: [
      { num: "01", title: "Blueprint", desc: "Draft architectures and custom schemas." },
      { num: "02", title: "Train", desc: "Fine-tune models with secure corporate datasets." },
      { num: "03", title: "Build", desc: "Write backend engines, APIs, and client portals." },
      { num: "04", title: "Scale", desc: "Continuous monitoring, auditing, and optimized feedback." }
    ]
  },
  "ai-analytics-business-intelligence": {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.45)",
    process: [
      { num: "01", title: "Pipe", desc: "Connect corporate databases with secure pipes." },
      { num: "02", title: "Model", desc: "Configure machine learning prediction parameters." },
      { num: "03", title: "Visualize", desc: "Build realtime charts and KPIs." },
      { num: "04", title: "Decipher", desc: "Receive anomaly and trend alerts." }
    ]
  },
  "enterprise-ai-integration": {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.45)",
    process: [
      { num: "01", title: "Legacy", desc: "Map security and communication schemas." },
      { num: "02", title: "Middleware", desc: "Deploy API gateways connecting systems." },
      { num: "03", title: "Firewalls", desc: "Add data filters protecting boundaries." },
      { num: "04", title: "Logs", desc: "Implement secure trace audits for queries." }
    ]
  },
  "ai-product-development": {
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=500&h=350&q=80",
    color: "#fbbf24",
    glowColor: "rgba(251, 191, 36, 0.45)",
    process: [
      { num: "01", title: "Concept", desc: "Draft feature map and system plans." },
      { num: "02", title: "Build", desc: "Develop UI/UX, microservices, and databases." },
      { num: "03", title: "Secure", desc: "Integrate subscription billing and limits." },
      { num: "04", title: "Launch", desc: "Execute marketing plan and product launch." }
    ]
  }
};

export function mapServicesToItems(cmsServices: Service[]): ServiceItem[] {
  return cmsServices.map(cms => {
    const slug = cms.slug || cms.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const meta = serviceMetadataMap[slug] || {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&h=350&q=80",
      color: "#2BBAA5",
      glowColor: "rgba(43, 186, 165, 0.45)",
      process: [
        { num: "01", title: "Discovery", desc: "Define corporate goals, metrics, and workflows." },
        { num: "02", title: "Strategy", desc: "Formulate proprietary data schemas." },
        { num: "03", title: "Build", desc: "Construct codebases, integrations, or models securely." },
        { num: "04", title: "Scale", desc: "Continuous monitoring, auditing, and optimization." }
      ]
    };

    return {
      id: slug,
      slug: slug,
      num: cms.number,
      number: cms.number,
      label: cms.title.toUpperCase(),
      title: cms.title,
      desc: cms.description + " " + cms.details,
      description: cms.description,
      details: cms.details,
      benefits: cms.deliverables.slice(0, 4),
      process: meta.process,
      deliverables: cms.deliverables,
      image: meta.image,
      color: meta.color,
      glowColor: meta.glowColor,
      module: cms.module
    };
  });
}
