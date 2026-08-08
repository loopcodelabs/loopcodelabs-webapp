import { useState, useMemo, useEffect } from "react";
import { Search, ArrowLeft, BookOpen, Clock, Tag, Sparkles, Send, Filter, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useWebsite } from "../context/WebsiteContext";

interface BlogHubProps {
  onBack: () => void;
}

interface BlogArticle {
  id: string;
  title: string;
  category: "SEO" | "Web Development" | "Automation" | "AI" | "Digital Marketing" | "Website Performance" | "Business Growth" | "Branding";
  targetKeyword: string;
  summary: string;
  readTime: string;
  outline: string[];
  keyTakeaways: string[];
}

export default function BlogHub({ onBack }: BlogHubProps) {
  const { blogs: cmsBlogs } = useWebsite();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedArticleId]);

  const categories = ["ALL", "SEO", "Web Development", "Automation", "AI", "Digital Marketing", "Website Performance", "Business Growth", "Branding"];

  const articles: BlogArticle[] = useMemo(() => {
    // Definitive master article per cluster topic
    const defaultClusterArticles: BlogArticle[] = [
      // 1. SEO CLUSTER
      {
        id: "blog-seo",
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
        keyTakeaways: [
          "Schema represents absolute programmatic communication.",
          "Directly increases rich-snippet real-estate on search.",
          "Improves organic mobile visibility."
        ]
      },
      // 2. WEB DEVELOPMENT CLUSTER
      {
        id: "blog-web-dev",
        title: "Custom React vs. WordPress: Choosing the Right Stack for Core Web Vitals",
        category: "Web Development",
        targetKeyword: "Website Development",
        summary: "Evaluate performance, load speeds, security, and long-term maintenance costs of React applications versus generic templated platforms.",
        readTime: "6 min read",
        outline: [
          "Why traditional template builders degrade Core Web Vitals and loading speeds",
          "Engineering lightweight custom client experiences with React and Vite",
          "Comparing bundle sizes, render-blocking scripts, and server roundtrips",
          "How site speed directly impacts digital ad campaign ROI"
        ],
        keyTakeaways: [
          "Custom React code boasts sub-second loading speeds.",
          "Eliminating bulk plugins dramatically secures your digital assets.",
          "Better speeds equate to higher organic conversions."
        ]
      },
      // 3. AUTOMATION CLUSTER
      {
        id: "blog-automation",
        title: "How Hyderabad Construction Firms Streamline Client Intake via Automation",
        category: "Automation",
        targetKeyword: "Business Process Automation",
        summary: "Discover how real estate and construction enterprises eliminate administrative bottlenecks using automated CRM pipelines.",
        readTime: "5 min read",
        outline: [
          "Identifying the primary paper and manual friction points in client onboarding",
          "Constructing automated custom estimators and digital lead portals",
          "Connecting incoming web inquiries directly to local sales directors",
          "Deploying daily automated status reports via cloud databases"
        ],
        keyTakeaways: [
          "Intake automation reduces administrative overhead by 60%.",
          "Saves sales agents valuable manual follow-up time.",
          "Establishes ultimate customer transparency from day one."
        ]
      },
      // 4. AI CLUSTER
      {
        id: "blog-ai",
        title: "Integrating the Google GenAI SDK into Express Backends",
        category: "AI",
        targetKeyword: "AI Solutions",
        summary: "A detailed coding guide to deploying Gemini models server-side, protecting API keys, and handling responses.",
        readTime: "6 min read",
        outline: [
          "Setting up the modern @google/genai TypeScript SDK safely",
          "Constructing secure, rate-limited server endpoints in Express",
          "Configuring strict system instructions to guarantee predictable text formatting",
          "Handling API failure states with intelligent retry algorithms"
        ],
        keyTakeaways: [
          "Always keep your Gemini API keys secure behind the server layer.",
          "Strict formatting instructions enable reliable programmatic parsing.",
          "Failsafe structures keep your business logic running smoothly."
        ]
      },
      // 5. DIGITAL MARKETING CLUSTER
      {
        id: "blog-marketing",
        title: "ROI-Focused Lead Generation: Turning High-Intent Searches Into Pipe",
        category: "Digital Marketing",
        targetKeyword: "Digital Marketing",
        summary: "The exact digital marketing architecture required to build a predictable, scalable lead acquisition pipeline.",
        readTime: "5 min read",
        outline: [
          "Identifying and capturing transactional, high-intent Google search phrases",
          "Designing landing pages focused strictly on single-action conversions",
          "Deploying advanced tracking systems to monitor acquisition costs",
          "Nurturing cold prospects with personalized performance emails"
        ],
        keyTakeaways: [
          "Vanity metrics like impressions don't pay business overheads.",
          "Sleek conversion forms directly maximize acquisition margins.",
          "Targeting exact buyer intent ensures high closing ratios."
        ]
      },
      // 6. WEBSITE PERFORMANCE CLUSTER
      {
        id: "blog-performance",
        title: "How Sub-Second Website Loading Speeds Directly Impact Paid Campaign Conversions",
        category: "Website Performance",
        targetKeyword: "Website Performance",
        summary: "Discover the direct mathematical correlation between page loading times and cost-per-lead metric performance.",
        readTime: "4 min read",
        outline: [
          "Analyzing the page abandonment rate for load times above 2 seconds",
          "How Google Ads Quality Scores directly penalize slow, unoptimized landing pages",
          "Implementing asset minification, compression, and modern next-gen image WebP formats",
          "Leveraging serverless edge networks to deliver content in under 100ms"
        ],
        keyTakeaways: [
          "Slow websites directly burn your monthly digital marketing budget.",
          "Faster load times double your ad campaign conversion rates.",
          "Optimizing assets drives down the cost per conversion metrics."
        ]
      },
      // 7. BUSINESS GROWTH CLUSTER
      {
        id: "blog-growth",
        title: "Why Local Proximity is the Next Growth Engine for B2B Services in Hyderabad",
        category: "Business Growth",
        targetKeyword: "Local SEO Hyderabad",
        summary: "A strategic overview of why dominating local search categories creates an absolute monopoly in your regional market.",
        readTime: "5 min read",
        outline: [
          "Understanding local buyer psychology and trust metrics",
          "How proximity optimization captures decision makers looking for physical meetings",
          "Building strong regional citation anchors and localized FAQ pages",
          "Translating local map pack dominance into stable corporate pipelines"
        ],
        keyTakeaways: [
          "Local decision-makers prefer region-expert partners.",
          "Proximity authority delivers the highest converting enterprise leads.",
          "Local dominance safeguards your brand from global market noise."
        ]
      },
      // 8. BRANDING CLUSTER
      {
        id: "blog-branding",
        title: "Corporate Visual Systems: Building an Elite Brand Identity that Commands Premium Pricing",
        category: "Branding",
        targetKeyword: "Branding",
        summary: "How high-contrast visual design, structured brand grids, and custom typography establish market authority.",
        readTime: "5 min read",
        outline: [
          "The psychological impact of typography and negative space on brand prestige",
          "Constructing mathematical grid brand marks that scale perfectly to print and screens",
          "Designing exhaustive stylebooks that protect visual assets from fragmentation",
          "How visual consistency elevates perceived product value by up to 200%"
        ],
        keyTakeaways: [
          "An elite visual system functions as a durable brand moat.",
          "Consistency across all client touchpoints conveys absolute precision.",
          "Bespoke branding commands immediate customer confidence."
        ]
      }
    ];

    // Guarantee strictly one article per cluster topic category
    const clusterMap = new Map<string, BlogArticle>();
    defaultClusterArticles.forEach((art) => {
      clusterMap.set(art.category, art);
    });

    if (cmsBlogs && cmsBlogs.length > 0) {
      cmsBlogs.forEach((cb) => {
        const cat = cb.category as BlogArticle["category"];
        if (cat) {
          clusterMap.set(cat, {
            id: cb.id,
            title: cb.title,
            category: cat,
            targetKeyword: cb.targetKeyword || "AI Automation",
            summary: cb.summary,
            readTime: cb.readTime || "5 min read",
            outline: cb.outline || [],
            keyTakeaways: cb.keyTakeaways || []
          });
        }
      });
    }

    return Array.from(clusterMap.values());
  }, [cmsBlogs]);

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchesCategory = selectedCategory === "ALL" || art.category === selectedCategory;
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.targetKeyword.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const activeArticle = useMemo(() => {
    if (!selectedArticleId) return null;
    return articles.find((a) => a.id === selectedArticleId) || null;
  }, [articles, selectedArticleId]);

  return (
    <div className="min-h-screen bg-zinc-950 pt-28 pb-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden" id="blog-hub-container">
      {/* Bright grid pattern overlay gradually fading downwards with enhanced brightness and glow */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_25%,rgba(0,0,0,0.6)_65%,transparent_95%)] pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(43,186,165,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] pointer-events-none z-0" />

      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-100px] left-[55%] -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/14 blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[20px] left-[55%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/22 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[80px] left-[55%] -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white/10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/5 blur-[150px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!activeArticle ? (
            <motion.div
              key="blog-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Header */}
              <div className="space-y-4">
                <nav className="flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase">
                  <button onClick={onBack} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 text-accent" /> HOME
                  </button>
                  <span>/</span>
                  <span className="text-accent font-bold">INSIGHTS HUB</span>
                </nav>

                <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                  The Editorial Ledger.
                </h1>
                <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
                  A curated, high-fidelity directory of strategic insights and technical blueprints—featuring one definitive master guide for each core cluster topic.
                </p>
              </div>

              {/* Filters & Search Row */}
              <div className="space-y-6 bg-zinc-950 border border-zinc-900 p-6 rounded-3xl" id="blog-search-filters">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search topic clusters (e.g. SEO, Web Development, AI, Automation)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-accent text-white text-xs sm:text-sm px-11 py-3.5 rounded-xl outline-none transition-all placeholder:text-zinc-500 font-sans"
                  />
                </div>

                {/* Categories Tab Pill List */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <Filter className="w-3 h-3" /> FILTER BY TOPIC CLUSTER
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-accent text-true-white border-accent"
                            : "bg-zinc-950 text-zinc-400 border-zinc-900 hover:text-white hover:border-zinc-800"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Articles Counter */}
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pb-2 border-b border-zinc-900">
                <span>SHOWING {filteredArticles.length} OF {articles.length} CLUSTER TOPICS</span>
                <span className="text-accent font-bold">[ PRE-INDEXED & GEO AUDITED ]</span>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="blog-articles-grid">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setSelectedArticleId(art.id)}
                      className="group p-6 rounded-3xl bg-zinc-950 border border-zinc-900 hover:border-zinc-850 cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-850 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                            {art.category}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-zinc-600" /> {art.readTime}
                          </span>
                        </div>

                        <h3 className="font-sans font-bold text-base text-zinc-300 group-hover:text-white transition-colors tracking-tight leading-snug">
                          {art.title}
                        </h3>

                        <p className="text-zinc-500 text-[11px] sm:text-xs leading-relaxed line-clamp-2">
                          {art.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-zinc-600">
                          Target: <strong className="text-zinc-400 font-semibold">{art.targetKeyword}</strong>
                        </span>
                        <span className="text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform font-bold uppercase flex items-center gap-1">
                          READ OUTLINE <BookOpen className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-16 text-center text-zinc-500 border border-dashed border-zinc-900 rounded-3xl">
                    <p className="text-sm font-sans mb-2">No matching topics found.</p>
                    <p className="text-xs font-mono">Try searching for other keywords like "Hyderabad", "React", "SEO", or "Automation".</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Article Detail Outline Viewer */
            <motion.article
              key="blog-detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-3xl mx-auto space-y-10"
            >
              {/* Header back navigation */}
              <button
                onClick={() => setSelectedArticleId(null)}
                className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-accent transition-colors cursor-pointer uppercase"
              >
                <ArrowLeft className="w-4 h-4 text-accent" /> BACK TO insights ledger
              </button>

              {/* Article Meta */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono font-bold text-zinc-300 uppercase tracking-widest">
                    {activeArticle.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Target keyword segment: <strong className="text-zinc-400 font-bold font-mono">{activeArticle.targetKeyword}</strong>
                  </span>
                </div>

                <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-1">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-zinc-650" /> {activeArticle.readTime}</span>
                  <span>•</span>
                  <span className="text-emerald-500 font-bold uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Verified organic value
                  </span>
                </div>
              </div>

              <div className="h-px bg-zinc-900" />

              {/* Article Summary Block */}
              <section className="p-6 rounded-2xl bg-zinc-950 border border-zinc-900 space-y-3">
                <span className="text-[10px] font-mono font-bold text-zinc-400 tracking-wider uppercase block">
                  [ HIGH-FIDELITY SUMMARY ]
                </span>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                  {activeArticle.summary}
                </p>
              </section>

              {/* SEO Structural Outline */}
              <section className="space-y-6">
                <h2 className="text-xs font-mono font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  [ TECHNICAL OUTLINE & SUB-HEADINGS ]
                </h2>

                <div className="space-y-4">
                  {activeArticle.outline.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-xl bg-zinc-950/40 border border-zinc-900/60 hover:border-zinc-800 transition-colors">
                      <span className="font-mono text-xs font-bold text-zinc-600 block shrink-0 mt-0.5">
                        H{idx + 2}.
                      </span>
                      <p className="text-xs font-bold text-zinc-200 font-sans leading-normal">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Key Takeaways */}
              <section className="space-y-4">
                <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">
                  [ INTENTIONAL STRATEGY TAKEAWAYS ]
                </h2>
                <div className="space-y-3">
                  {activeArticle.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{takeaway}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="h-px bg-zinc-900" />

              {/* Outlined Action CTA */}
              <section className="p-8 sm:p-10 rounded-3xl bg-zinc-950 border border-zinc-900 text-center space-y-6">
                <div className="space-y-3">
                  <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-widest uppercase block">
                    [ LINKING TO PRIMARY SERVICES ]
                  </span>
                  <h3 className="font-sans font-extrabold text-xl text-white">
                    Need professional implementation of these standards?
                  </h3>
                  <p className="text-zinc-400 text-xs max-w-lg mx-auto leading-relaxed">
                    We construct, optimize, and maintain complete digital pipelines customized strictly to your company parameters. Let's arrange a discovery consultation.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector("#contact");
                      if (element) {
                        setSelectedArticleId(null);
                        onBack();
                        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 200);
                      }
                    }}
                    className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-true-white font-bold text-xs uppercase tracking-wider rounded-full transition-all cursor-pointer shadow-lg shadow-accent/5 hover:shadow-accent/15"
                  >
                    Schedule a Discovery Call
                  </a>
                  <button
                    onClick={() => setSelectedArticleId(null)}
                    className="px-5 py-2.5 bg-transparent hover:bg-[#2bbaa6]/5 text-white font-bold text-xs uppercase tracking-wider rounded-full border border-[#2bbaa6]/40 hover:border-[#2bbaa6] hover:shadow-[0_0_15px_rgba(43,186,166,0.2)] transition-all cursor-pointer"
                  >
                    Go Back To Articles
                  </button>
                </div>
              </section>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
