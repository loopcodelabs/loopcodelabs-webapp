import { ArrowLeft, ArrowUpRight, CheckCircle2, Award, Users, Database } from "lucide-react";
import { useEffect } from "react";

interface PortfolioDetailProps {
  projectId: string;
  onBack: () => void;
}

interface CaseStudy {
  title: string;
  client: string;
  category: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: { quote: string; author: string; role: string };
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
}

export default function PortfolioDetail({ projectId, onBack }: PortfolioDetailProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [projectId]);

  const caseStudies: Record<string, CaseStudy> = {
    "proj-1": {
      title: "India Immigration Portal",
      client: "Immigration Consulting India",
      category: "Website & Core Software Engineering",
      summary: "We engineered a complete, full-scale custom portal and interactive visa estimation workflow for a top-tier immigration firm based in Mumbai and Hyderabad, driving regional and national authority.",
      challenge: "The client was losing thousands of high-intent leads due to a convoluted 10-page inquiry form, high page loading times (8.4s), and zero support for mobile device traffic. Their CRM had to be updated manually by employees, leading to substantial data latency.",
      solution: "We engineered a single-view, highly responsive interactive estimation calculator utilizing a streamlined client state machine, reducing the step latency to under 120ms. We integrated a serverless API pipeline that instantly categorizes profiles, triggers transactional emails, and pipes clean customer profiles directly into their custom CRM system.",
      results: [
        "240% Increase in Completed Lead Submissions",
        "Page Loading Speed reduced from 8.4 seconds to 0.6 seconds",
        "Eliminated 100% of manual lead registration operations"
      ],
      testimonial: {
        quote: "loopCode Labs completely transformed our intake pipeline. What used to take an hour of manual client vetting is now fully self-serviced in under 2 minutes. Our revenue doubled within 60 days of launch.",
        author: "Karan Johar",
        role: "Director of Operations",
      },
      technologies: ["Next.js (React)", "Node.js Pipelines", "Tailwind CSS", "MongoDB", "AWS Serverless", "SendGrid APIs"],
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://www.visasavenue.com/immigration-consultants-in-mumbai/"
    },
    "proj-2": {
      title: "Point8 Wealth Dashboard",
      client: "Point8 Investment Partners",
      category: "UI/UX & Client-Side Dashboard Development",
      summary: "A premium, high-contrast user experience design and dynamic multi-asset client portfolio tracking dashboard with responsive charts.",
      challenge: "Point8 required a ultra-luxurious, secure web interface that asset managers and high-net-worth clients could use to view portfolio returns, evaluate liquidity allocations, and review custom performance reports with zero UI clutter.",
      solution: "We designed a dark-theme, Swiss-inspired typographic interface using Inter and JetBrains Mono, leveraging high negative space and crisp border divisions. We implemented interactive SVG charts using D3.js and structured real-time caching to ensure instant data rendering.",
      results: [
        "99.8% Client Retention and Visual Approval Rate",
        "Sub-150ms client-side rendering for multi-asset transactions",
        "Core Web Vitals score of 100 on desktop"
      ],
      testimonial: {
        quote: "The interface loopCode Labs designed isn't just beautiful—it's functional. Our clients constantly praise the readability and clarity of their wealth data. It's an absolute masterpiece.",
        author: "Ananya Rao",
        role: "Managing Partner",
      },
      technologies: ["React.js", "Vite", "D3.js Data Engine", "Tailwind CSS", "LocalSecure Storage", "Framer Motion"],
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://www.point8.vc/"
    },
    "proj-3": {
      title: "IndiaAccountant Rebranding & SEO",
      client: "IndiaAccountant Group",
      category: "Branding, Web Development & local SEO",
      summary: "Complete corporate rebranding, custom SEO-optimized portal architecture, and localized search marketing campaigns targeting Hyderabad, Bangalore, and Mumbai financial sectors.",
      challenge: "The client had no standardized visual system and their old website was completely invisible on search engines. They wanted to capture highly competitive commercial searches like 'corporate tax consultant Hyderabad' and 'best accounting firm India'.",
      solution: "We created a premium visual monogram 'IA' paired with luxury corporate guidelines. We then built a modern static portal with comprehensive semantic HTML hierarchies, local FAQ pages, and deployed specialized Local Business schema markup.",
      results: [
        "Ranked #1 on Google for Hyderabad tax corporate consultant terms",
        "Over 12,000 monthly organic high-intent visits within 4 months",
        "185% Increase in qualified enterprise inquiry forms"
      ],
      testimonial: {
        quote: "loopCode Labs turned a generic accounting business into an authoritative national financial institution. We are receiving more leads from Google Hyderabad than we can handle.",
        author: "Sanjay Shah",
        role: "Founder & CEO",
      },
      technologies: ["React Portal", "JSON-LD Schemas", "Google Search Consolidation", "Corporate Brand Kit", "Tailwind CSS", "Semantic HTML5"],
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://www.aaditt.com/"
    },
    "proj-4": {
      title: "InstaSure Financial Platform",
      client: "InstaSure Limited",
      category: "Full Stack Software Development",
      summary: "A secure lead generation platform engineered for rapid financial assessments, automated eligibility algorithms, and mobile-first conversions.",
      challenge: "Traditional banking assessments took up to three business days to verify applicant credit eligibility. InstaSure wanted to automate this criteria to instantly approve high-fidelity candidates.",
      solution: "We constructed an encrypted REST backend API connected to a self-executing eligibility scoring engine. User submissions are parsed in real-time, checked against qualification arrays, and instantly return visual green/red approval indicators.",
      results: [
        "Reduced applicant assessment cycles from 72 hours to 8 seconds",
        "45% growth in mobile-app direct digital conversions",
        "Highly compliant security architecture with zero-leak performance"
      ],
      testimonial: {
        quote: "We wanted speed, security, and beauty. loopCode Labs delivered all three. Our eligibility engine processes thousands of applicants a day without a single bottleneck.",
        author: "Suneel Kapoor",
        role: "Chief Technology Officer",
      },
      technologies: ["Node.js API", "React Mobile-First", "PostgreSQL", "Express v5", "Tailwind CSS", "Redis Cache"],
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://instasure.in/"
    },
    "proj-5": {
      title: "Boroin Finance Visual Strategy",
      client: "Boroin Lending India",
      category: "UX Design & Brand Strategy",
      summary: "High-end product positioning, custom financial calculator design, and responsive asset-backed lending interface.",
      challenge: "Asset-backed borrowers felt anxious submitting information about luxury vehicles and jewelry. Boroin needed a design system that projected absolute security, institutional prestige, and warm approachability.",
      solution: "We developed a branding strategy centering deep emerald green tokens, rich gold accents, and clean charcoal layouts. We designed an interactive loan-to-value estimator displaying instant calculations based on transparent parameters.",
      results: [
        "110% Increase in luxury asset valuation inquiries",
        "Award-winning interactive design feedback in financial directories",
        "99.9% customer trust rating on trustpilot reviews"
      ],
      testimonial: {
        quote: "The branding loopCode Labs established gave our borrowers immediate confidence. The estimator widget is simple, secure, and incredibly engaging.",
        author: "Meera Nair",
        role: "VP of Product Strategy",
      },
      technologies: ["Figma Design", "React Component architecture", "Tailwind custom-tokens", "Interactive client calculations"],
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://www.boroin.com/"
    },
    "proj-6": {
      title: "DoctorPilot Medical Marketing",
      client: "DoctorPilot India",
      category: "Local SEO & Programmatic Automation",
      summary: "A comprehensive digital marketing, localized SEO, and programmatic patient nurture campaign for a prominent multi-specialty clinic network.",
      challenge: "An enterprise-grade, multi-tenant practice growth and automation platform for healthcare providers, clinics, and hospitals, featuring real-time AI onboarding, SEO planning, and automated clinical content generation.",
      solution: "We built search optimized service listings for all treatment options, set up a dynamic appointment scheduler connected to clinic calendars, and automated Google Business Profile optimizations to drive local proximity traffic.",
      results: [
        "310% Increase in direct, non-commission booking pipeline",
        "Featured #1 on Google Local Pack across Hyderabad",
        "Automated WhatsApp confirmation messages to over 8,000 patients"
      ],
      testimonial: {
        quote: "We no longer rely on expensive aggregators. Our patients find us directly on Google, click to book, and receive automated reminders. Perfect performance.",
        author: "Dr. Sai Shiva Tadakamalla",
        role: "Neurosurgeon - Hyderabad",
      },
      technologies: ["Vite SPA", "Google Maps Platform", "WhatsApp Cloud API", "Drizzle Postgres", "Technical SEO Audits"],
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
      liveUrl: "https://doctorpilot.ai.studio/"
    }
  };

  const project = caseStudies[projectId];
  if (!project) {
    return (
      <div className="py-24 px-6 text-center text-zinc-400">
        <p>Project not found.</p>
        <button onClick={onBack} className="mt-4 text-accent underline hover:text-accent-hover transition-colors">Go back</button>
      </div>
    );
  }

  // Schema Injection for Project
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "creator": {
      "@type": "Organization",
      "name": "loopCode Labs",
      "url": "https://loopcodelabs.in"
    },
    "customer": {
      "@type": "Organization",
      "name": "Point8 Investment Partners"
    },
    "description": project.summary,
    "image": project.imageUrl,
    "keywords": project.technologies.join(", ")
  };

  return (
    <article className="min-h-screen bg-zinc-950 pt-28 pb-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden" id={`portfolio-page-${projectId}`}>
      <script type="application/ld+json">
        {JSON.stringify(projectSchema)}
      </script>

      {/* Bright grid pattern overlay gradually fading downwards with enhanced brightness and glow */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_25%,rgba(0,0,0,0.6)_65%,transparent_95%)] pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[linear-gradient(to_right,rgba(43,186,165,0.08)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_80%)] pointer-events-none z-0" />

      {/* Decorative Background Glows */}
      <div className="absolute top-[-100px] left-[55%] -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-accent/14 blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[20px] left-[55%] -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-accent/22 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[80px] left-[55%] -translate-x-1/2 w-[200px] h-[200px] rounded-full bg-white/10 blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-900/5 blur-[150px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Back navigation */}
        <nav className="flex items-center gap-3 text-xs font-mono tracking-wider text-zinc-500 uppercase" aria-label="Breadcrumb">
          <button 
            onClick={onBack} 
            className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-accent" />
            Back to home
          </button>
          <span>/</span>
          <span className="text-zinc-500">Portfolio</span>
          <span>/</span>
          <span className="text-accent font-bold">{project.title}</span>
        </nav>

        {/* Header Block */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-accent bg-zinc-900/80 px-3 py-1.5 rounded-lg border border-zinc-800 tracking-[0.2em] uppercase">
              [ CASE STUDY ]
            </span>
            <span className="text-[10px] font-mono font-bold text-zinc-400 border border-zinc-900 px-3 py-1.5 rounded-lg uppercase">
              {project.category}
            </span>
          </div>

          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl font-medium">
            {project.summary}
          </p>
        </header>

        {/* Feature Case Study Image */}
        <div className="rounded-3xl border border-zinc-900 overflow-hidden relative aspect-video max-h-[480px] group">
          <img 
            src={project.imageUrl} 
            alt={`loopCode Labs case study - ${project.title}`} 
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80";
            }}
          />
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-5 py-2.5 sm:px-6 sm:py-3 bg-accent hover:bg-accent-hover text-true-white font-sans font-bold text-xs sm:text-sm rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-xl shadow-black/60 hover:scale-105 active:scale-95 z-20 cursor-pointer"
            >
              Visit live site
              <ArrowUpRight className="w-4 h-4 text-true-white stroke-[2.5px]" />
            </a>
          )}
        </div>

        {/* Detail Core Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Business Challenge */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-zinc-650" />
                [ THE BUSINESS CHALLENGE ]
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                {project.challenge}
              </p>
            </div>

            {/* Our Solution */}
            <div className="space-y-3">
              <h2 className="text-xs font-mono font-bold text-accent uppercase tracking-widest flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-accent" />
                [ OUR ENGINEERING SOLUTION ]
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>

            {/* Testimonial Quote */}
            <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-900 space-y-4 relative overflow-hidden">
              <p className="text-zinc-300 italic text-sm sm:text-base leading-relaxed">
                "{project.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-850 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-zinc-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">{project.testimonial.author}</span>
                  <span className="text-[10px] text-zinc-500 block font-mono uppercase font-bold">{project.testimonial.role}, {project.client}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats & Tech (Right) */}
          <aside className="lg:col-span-4 space-y-8 p-6 rounded-3xl bg-zinc-950 border border-zinc-900/60 h-max">
            {/* Quantitative Results */}
            <div className="space-y-4">
              <h3 className="text-[10px] font-mono font-bold text-accent tracking-wider uppercase">
                [ VERIFIED METRICS ]
              </h3>
              <div className="space-y-3">
                {project.results.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-zinc-300 leading-normal font-sans">
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-zinc-900" />

            {/* Technical Stack used */}
            <div className="space-y-3">
              <h3 className="text-[10px] font-mono font-bold text-zinc-500 tracking-wider uppercase">
                [ TECHNICAL INTEL ]
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-850 text-[10px] text-zinc-400 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        {/* CTA conversion element */}
        <section className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-zinc-900 text-center space-y-6 relative overflow-hidden" id="project-footer-cta">
          <div className="space-y-4 max-w-2xl mx-auto">
            <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-widest uppercase block">
              [ THE INQUIRY SYSTEM ]
            </span>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              Ready to duplicate these results for your business?
            </h2>
            <p className="text-zinc-400 text-xs max-w-lg mx-auto leading-relaxed font-sans">
              Connect with our principal engineers for a discovery session. We will build, optimize, and launch your strategic assets.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center relative z-10">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const element = document.querySelector("#contact");
                if (element) {
                  onBack();
                  setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 200);
                }
              }}
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-true-white font-bold text-xs uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-accent/10"
            >
              Start Your Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-transparent hover:bg-[#2bbaa6]/5 text-white font-bold text-xs uppercase tracking-wider rounded-full border border-[#2bbaa6]/40 hover:border-[#2bbaa6] hover:shadow-[0_0_15px_rgba(43,186,166,0.2)] transition-all duration-300 cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
