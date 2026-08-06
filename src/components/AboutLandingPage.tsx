import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Activity, 
  Users, 
  Eye, 
  Clock, 
  Award,
  Zap,
  Target,
  FileText,
  Briefcase
} from "lucide-react";
import { motion } from "motion/react";
import Contact from "./Contact";
import FAQ from "./FAQ";

const collaborativeCrewImg = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

interface AboutLandingPageProps {
  onBack: () => void;
}

export default function AboutLandingPage({ onBack }: AboutLandingPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const stats = [
    { value: "10+", label: "Projects delivered" },
    { value: "95+", label: "Avg. Lighthouse score" },
    { value: "4.9/5", label: "Client satisfaction" },
    { value: "3yrs", label: "Driving India growth" },
  ];

  const values = [
    {
      num: "01",
      title: "Innovation",
      desc: "We build with tomorrow's tools, today — so your business stays ahead, not catching up."
    },
    {
      num: "02",
      title: "Transparency",
      desc: "Clear reporting, honest timelines, no jargon. You always know exactly where things stand."
    },
    {
      num: "03",
      title: "Results",
      desc: "Vanity metrics are easy. We optimise for the numbers that actually transform your business."
    },
    {
      num: "04",
      title: "Partnership",
      desc: "We work as an extension of your team — invested in your outcomes, not just our deliverables."
    },
    {
      num: "05",
      title: "Continuous Improvement",
      desc: "Launch is the start. We test, learn, and refine so performance compounds over time."
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "The journey begins",
      desc: "loopCode Labs is founded to help Indian businesses grow online."
    },
    {
      year: "2024",
      title: "Web & mobile expansion",
      desc: "We scale our build team and add FlutterFlow app development, end to end."
    },
    {
      year: "2025",
      title: "AI-powered solutions",
      desc: "Automation and AI workflows enter every engagement."
    },
    {
      year: "2026",
      title: "Scaling across India",
      desc: "Now partnering with businesses nationwide to compound growth."
    }
  ];

  const marqueeTags = [
    "Website Development",
    "Mobile App Development",
    "UI/UX Design",
    "Branding & Strategy",
    "SEO Services",
    "Digital Marketing",
    "Paid Advertising",
    "Email Marketing",
    "Lead Generation Automation",
    "Marketing Automation",
    "AI Automation Solutions",
    "CRM & Workflow Automation",
    "AI Chatbots & Virtual Assistants",
    "AI Voice Agents",
    "Document Processing Automation",
    "AI Business Consulting",
    "Custom AI Applications",
    "AI Analytics & Business Intelligence",
    "Enterprise AI Integration",
    "AI Product Development"
  ];

  const handleBookConsultation = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewServices = () => {
    window.location.hash = "#services";
  };

  return (
    <article className="min-h-screen bg-zinc-950 pb-0 relative" id="about-subpage-view">
      {/* SECTION 1: Dark Header Area */}
      <div className="bg-zinc-950 text-white pt-28 pb-20 relative overflow-hidden">
        {/* Decorative Ambient Background Glows - placed behind grid lines for high-quality glow illumination */}
        <div className="absolute top-[-100px] left-[55%] -translate-x-1/2 w-[700px] h-[700px] rounded-full dark:bg-accent/14 bg-accent/5 blur-[150px] pointer-events-none" />
        <div className="absolute top-[20px] left-[55%] -translate-x-1/2 w-[400px] h-[400px] rounded-full dark:bg-accent/22 bg-accent/10 blur-[100px] pointer-events-none" />
        <div className="absolute top-[80px] left-[55%] -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white/10 blur-[80px] pointer-events-none" />
        
        {/* Bright grid pattern overlay gradually fading downwards with enhanced brightness and glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_25%,rgba(0,0,0,0.6)_65%,transparent_95%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(43,186,165,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          {/* Back Navigation Button */}
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2 mb-12 px-4 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer font-mono"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            BACK TO HOMEPAGE
          </button>

          {/* Hero Header Area - Exactly mimicking the visual hierarchy of the video */}
          <header className="space-y-6 text-left max-w-4xl" id="about-page-header">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent bg-zinc-900/80 px-4 py-2 rounded-full border border-zinc-800 tracking-[0.25em] uppercase inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
              [ ABOUT US ]
            </span>

            <h1 className="font-sans font-black text-4xl sm:text-6xl md:text-[5.5rem] text-white tracking-tight leading-[1.02] max-w-3xl">
              Building digital solutions that drive growth.
            </h1>

            <p className="text-zinc-400 text-sm sm:text-lg max-w-2xl leading-relaxed font-sans pt-2">
              loopCode Labs exists to help businesses become extraordinary by combining human ingenuity with intelligent technology. We think boldly, humanize every solution, orchestrate complex systems into seamless experiences, and drive measurable progress.
            </p>
          </header>
        </div>
      </div>

      {/* SECTION 2: Sleek Dark Content Area (Intro and Stats) */}
      <div className="bg-zinc-950 text-white pt-24 sm:pt-32 pb-12 sm:pb-16 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 space-y-24">
          
          {/* Agency Intro Section */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center" id="about-intro-section">
            {/* Left Column Copy */}
            <div className="lg:col-span-7 text-left space-y-6">
              <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
                A Hyderabad-based agency obsessed with one thing: blending AI-driven innovation with digital strategy to deliver measurable business growth.
              </h2>
            </div>

            {/* Right Column Image container with custom absolute location pill */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-900 shadow-[0_15px_40px_rgba(0,0,0,0.5)] group">
                <img
                  src={collaborativeCrewImg}
                  alt="loopCode Labs collaborative crew"
                  className="w-full h-full object-cover transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating badge mimicking Est. 2023 // Hyderabad */}
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-zinc-950/80">
                  <span className="font-mono text-[10px] font-bold text-zinc-300 tracking-widest uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    EST. 2023 // HYDERABAD
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 4 Stats Grid Row - Mimicking the video stats bar */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 sm:px-12 py-10 bg-[#121413] border border-zinc-800/80 rounded-[1.5rem] md:rounded-[2rem]" id="about-stats-row">
            {stats.map((stat, sIdx) => (
              <div key={sIdx} className="text-left space-y-2">
                <span className="font-sans font-black text-4xl sm:text-6xl text-[#c8ef32] tracking-tighter block leading-none">
                  {stat.value}
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-400 tracking-wider block uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </section>

        </div>
      </div>

      {/* SECTION 2B: Separate Sleek Light Warm Beige Content Area for Core Values */}
      <div className="bg-bg-alt text-text-primary pt-12 sm:pt-16 pb-24 sm:pb-32 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

          {/* Core Values Section - Designed EXACTLY according to the screenshot */}
          <section className="space-y-16" id="about-values-section">
            <div className="space-y-4 text-left">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-500 tracking-[0.25em] uppercase block">
                [ CORE VALUES ]
              </span>
              <h2 className="font-sans font-black text-4xl sm:text-6xl text-text-primary tracking-tighter leading-none">
                What we stand for
              </h2>
            </div>

            {/* Seamless 3x2 grid with rounded corners and border collapse */}
            <div className="grid grid-cols-1 md:grid-cols-3 border border-border-color rounded-[1.5rem] md:rounded-[2rem] bg-bg-card/40 overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              {/* Innovation (01) */}
              <div className="p-6 sm:p-8 bg-bg-card/70 hover:bg-accent text-text-primary border-b md:border-r border-border-color flex flex-col justify-between aspect-[1.6/1] md:aspect-[1.7/1] transition-all duration-300 relative overflow-hidden group">
                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="font-mono text-text-muted group-hover:text-accent-content/70 font-bold text-xs sm:text-sm block transition-colors duration-300">01</span>
                  {/* Premium, rounded image representing Innovation */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-border-color group-hover:border-accent-content/20 shadow-sm transition-all duration-300 bg-zinc-100">
                    <img
                      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=150&h=150&q=80"
                      alt="Innovation visual"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&h=150&q=80";
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 mt-auto relative z-10">
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-text-primary group-hover:text-accent-content tracking-tight leading-none transition-colors duration-300">
                    {values[0].title}
                  </h3>
                  <p className="text-text-secondary group-hover:text-accent-content/90 text-xs sm:text-sm leading-relaxed font-sans transition-colors duration-300">
                    {values[0].desc}
                  </p>
                </div>
              </div>

              {/* Transparency (02) */}
              <div className="p-6 sm:p-8 bg-bg-card/70 hover:bg-accent text-text-primary border-b md:border-r border-border-color flex flex-col justify-between aspect-[1.6/1] md:aspect-[1.7/1] transition-all duration-300 relative overflow-hidden group">
                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="font-mono text-text-muted group-hover:text-accent-content/70 font-bold text-xs sm:text-sm block transition-colors duration-300">02</span>
                  {/* Premium, rounded image representing Transparency */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-border-color group-hover:border-accent-content/20 shadow-sm transition-all duration-300 bg-zinc-100">
                    <img
                      src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&h=150&q=80"
                      alt="Transparency visual"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&h=150&q=80";
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 mt-auto relative z-10">
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-text-primary group-hover:text-accent-content tracking-tight leading-none transition-colors duration-300">
                    {values[1].title}
                  </h3>
                  <p className="text-text-secondary group-hover:text-accent-content/90 text-xs sm:text-sm leading-relaxed font-sans transition-colors duration-300">
                    {values[1].desc}
                  </p>
                </div>
              </div>

              {/* Results (03) */}
              <div className="p-6 sm:p-8 bg-bg-card/70 hover:bg-accent text-text-primary border-b border-border-color flex flex-col justify-between aspect-[1.6/1] md:aspect-[1.7/1] transition-all duration-300 relative overflow-hidden group">
                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="font-mono text-text-muted group-hover:text-accent-content/70 font-bold text-xs sm:text-sm block transition-colors duration-300">03</span>
                  {/* Premium, rounded image representing Results */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-border-color group-hover:border-accent-content/20 shadow-sm transition-all duration-300 bg-zinc-100">
                    <img
                      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=150&h=150&q=80"
                      alt="Results visual"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&h=150&q=80";
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 mt-auto relative z-10">
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-text-primary group-hover:text-accent-content tracking-tight leading-none transition-colors duration-300">
                    {values[2].title}
                  </h3>
                  <p className="text-text-secondary group-hover:text-accent-content/90 text-xs sm:text-sm leading-relaxed font-sans transition-colors duration-300">
                    {values[2].desc}
                  </p>
                </div>
              </div>

              {/* Partnership (04) */}
              <div className="p-6 sm:p-8 bg-bg-card/70 hover:bg-accent text-text-primary border-b md:border-b-0 md:border-r border-border-color flex flex-col justify-between aspect-[1.6/1] md:aspect-[1.7/1] transition-all duration-300 relative overflow-hidden group">
                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="font-mono text-text-muted group-hover:text-accent-content/70 font-bold text-xs sm:text-sm block transition-colors duration-300">04</span>
                  {/* Premium, rounded image representing Partnership */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-border-color group-hover:border-accent-content/20 shadow-sm transition-all duration-300 bg-zinc-100">
                    <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&h=150&q=80"
                      alt="Partnership visual"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&h=150&q=80";
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 mt-auto relative z-10">
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-text-primary group-hover:text-accent-content tracking-tight leading-none transition-colors duration-300">
                    {values[3].title}
                  </h3>
                  <p className="text-text-secondary group-hover:text-accent-content/90 text-xs sm:text-sm leading-relaxed font-sans transition-colors duration-300">
                    {values[3].desc}
                  </p>
                </div>
              </div>

              {/* Continuous Improvement (05) */}
              <div className="p-6 sm:p-8 bg-bg-card/70 hover:bg-accent text-text-primary border-b md:border-b-0 md:border-r border-border-color flex flex-col justify-between aspect-[1.6/1] md:aspect-[1.7/1] transition-all duration-300 relative overflow-hidden group">
                <div className="flex justify-between items-start w-full relative z-10">
                  <span className="font-mono text-text-muted group-hover:text-accent-content/70 font-bold text-xs sm:text-sm block transition-colors duration-300">05</span>
                  {/* Premium, rounded image representing Continuous Improvement */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-border-color group-hover:border-accent-content/20 shadow-sm transition-all duration-300 bg-zinc-100">
                    <img
                      src="https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=150&h=150&q=80"
                      alt="Continuous Improvement visual"
                      className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=150&h=150&q=80";
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5 mt-auto relative z-10">
                  <h3 className="font-sans font-black text-xl sm:text-2xl text-text-primary group-hover:text-accent-content tracking-tight leading-none transition-colors duration-300">
                    {values[4].title}
                  </h3>
                  <p className="text-text-secondary group-hover:text-accent-content/90 text-xs sm:text-sm leading-relaxed font-sans transition-colors duration-300">
                    {values[4].desc}
                  </p>
                </div>
              </div>

              {/* High-contrast black box (06) */}
              <div className="p-6 sm:p-8 bg-[#070708] text-[#ffffff] flex flex-col justify-center text-left aspect-[1.6/1] md:aspect-[1.7/1] relative overflow-hidden">
                <div className="space-y-3">
                  <p className="font-sans font-black text-xl sm:text-2xl leading-tight tracking-tight text-[#ffffff]">
                    Five principles. <span className="text-accent">One promise: your growth, measured.</span>
                  </p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* SECTION 3: Journey / Timeline (Dark background as in video 00:10) */}
      <div className="bg-zinc-950 text-white py-32 relative overflow-hidden">
        {/* Decorative background light */}
        <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] rounded-full dark:bg-accent/5 bg-accent/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start" id="about-timeline-section">
            {/* Left Column Sticky */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-4 text-left">
              <span className="text-[10px] sm:text-xs font-mono font-bold text-zinc-500 tracking-[0.25em] uppercase block">
                [ OUR JOURNEY ]
              </span>
              <h2 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                The road so far
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md">
                We've consistently evolved our team, capability, and technology stack to stay ahead of the digital curve.
              </p>
            </div>

            {/* Right Column Timeline Path */}
            <div className="lg:col-span-7 relative pl-8 border-l border-zinc-900 space-y-16">
              {timeline.map((item, tIdx) => (
                <motion.div
                  key={tIdx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1], delay: 0.05 }}
                  className="relative text-left space-y-3"
                >
                  {/* Timeline node */}
                  <div className="absolute -left-[40px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center">
                    {/* Glowing ring/pulse animation */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/40"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-accent relative z-10 shadow-[0_0_8px_var(--color-accent)]" />
                  </div>

                  {/* Floating year badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 font-mono text-[10px] font-bold text-accent">
                    {item.year}
                  </span>

                  <h3 className="font-sans font-black text-2xl text-white tracking-tight leading-none pt-1">
                    {item.title}
                  </h3>
                  
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* SECTION 4: Full-width Lime Green CTA (Bright background as in video 00:18) */}
      <div className="bg-accent text-zinc-950 py-28 relative overflow-hidden" id="about-outro-section">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-white/10 blur-[130px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 px-6 sm:px-12">
          <span className="text-[12px] font-mono font-bold text-zinc-950 bg-transparent tracking-[0.25em] uppercase inline-block">
            [ WORK WITH US ]
          </span>
          <h2 className="font-sans font-black text-4xl sm:text-6xl text-zinc-950 tracking-tighter leading-none">
            Let's write the next chapter together.
          </h2>
          <p className="text-zinc-800 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
            We take on a limited number of partners at a time so every client gets our best. Let's see if we're a fit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-6">
            <button
              onClick={handleBookConsultation}
              className="px-8 py-4 bg-true-black hover:bg-black text-true-white hover:text-[#2bbaa6] font-extrabold text-xs uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer shadow-xl hover:scale-105"
            >
              Book consultation
            </button>
            <button
              onClick={handleViewServices}
              className="px-8 py-4 bg-true-white hover:bg-zinc-100 text-true-black font-extrabold text-xs uppercase tracking-widest rounded-full border border-zinc-300 hover:border-zinc-400 transition-all duration-300 cursor-pointer hover:scale-105"
            >
              View services
            </button>
          </div>
        </div>
      </div>

      {/* Infinite scrolling marquee of services right above the contact form */}
      <section className="w-full bg-zinc-950 py-10 overflow-hidden relative" id="about-marquee-bar">
        <div className="flex whitespace-nowrap gap-16 select-none animate-[marquee_60s_linear_infinite]">
          {marqueeTags.concat(marqueeTags).map((tag, tIdx) => (
            <div key={tIdx} className="flex items-center gap-3 text-zinc-400 font-mono text-xs font-black uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Embedded Contact Form at the very bottom of the page */}
      <div className="bg-zinc-950 relative z-10" id="about-contact-wrapper">
        <Contact />
      </div>
    </article>
  );
}
