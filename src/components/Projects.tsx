import { useState, MouseEvent } from "react";
import { ArrowUpRight, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  imageUrl: string;
  tags: string[];
  link: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("ALL");
  const [likedProjects, setLikedProjects] = useState<string[]>([]);

  const categories = ["ALL", "DEVELOPMENT", "DESIGN", "MARKETING"];

  const projects: ProjectItem[] = [
    {
      id: "proj-1",
      title: "India Immigration",
      client: "Immigration Consulting India",
      category: "DEVELOPMENT",
      description: "Full-scale custom portal and interactive visa estimation workflow for leading Mumbai agency.",
      imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      tags: ["Website Development", "Mobile App Dev", "Lead Generation"],
      link: "#"
    },
    {
      id: "proj-2",
      title: "Point8 Wealth",
      client: "Point8 Investment Partners",
      category: "DESIGN",
      description: "Premium user experience design and dynamic client dashboard tracking asset portfolios.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tags: ["UI/UX Design", "Website Development", "SEO Services"],
      link: "#"
    },
    {
      id: "proj-3",
      title: "IndiaAccountant",
      client: "IndiaAccountant Group",
      category: "MARKETING",
      description: "Complete corporate rebranding, website design, and targeted India local SEO campaigns.",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      tags: ["Website Development", "Branding & Strategy", "SEO Services"],
      link: "#"
    },
    {
      id: "proj-4",
      title: "InstaSure Finance",
      client: "InstaSure Limited",
      category: "DEVELOPMENT",
      description: "Secure lead generation platform built for rapid financial assessments and mobile-first conversions.",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      tags: ["Website Development", "SEO Services", "Lead Generation"],
      link: "#"
    },
    {
      id: "proj-5",
      title: "Boroin Finance",
      client: "Boroin Lending India",
      category: "DESIGN",
      description: "Modern, high-converting design layout and strategic product positioning for asset-backed lenders.",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
      tags: ["UI/UX Design", "Website Development", "Branding & Strategy"],
      link: "#"
    },
    {
      id: "proj-6",
      title: "DoctorPilot India",
      client: "DoctorPilot India",
      category: "MARKETING",
      description: "Complete marketing strategy, SEO audit, and programmatic email nurture flows for medical practices.",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
      tags: ["Website Development", "SEO Services", "Digital Marketing"],
      link: "#"
    }
  ];

  const filteredProjects = projects.filter((project) => {
    if (filter === "ALL") return true;
    return project.category === filter;
  });

  const toggleLike = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (likedProjects.includes(id)) {
      setLikedProjects(likedProjects.filter((p) => p !== id));
    } else {
      setLikedProjects([...likedProjects, id]);
    }
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="py-24 px-6 sm:px-12 lg:px-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" id="projects-header">
          <div className="space-y-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-[0.25em] uppercase">
              [ SELECTED WORK ]
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-normal">
              Proof, not promises.
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" id="project-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-accent text-true-white"
                    : "bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid - 3 Columns on lg, 2 on md, 1 on sm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl bg-zinc-950 border border-zinc-900 overflow-hidden shadow-2xl flex flex-col cursor-pointer"
                onClick={() => {
                  window.location.hash = "#portfolio/" + project.id;
                }}
              >
                {/* Media frame */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  {/* Backdrop tint on hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Floating Action Elements */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className="text-[9px] font-bold tracking-widest text-true-white font-mono bg-accent px-3 py-1.5 rounded-md uppercase">
                      {project.category}
                    </span>
                    <button
                      onClick={(e) => toggleLike(project.id, e)}
                      className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                        likedProjects.includes(project.id)
                          ? "bg-accent text-true-white border-accent"
                          : "bg-black/60 text-zinc-400 hover:text-white border-white/10"
                      }`}
                    >
                      <span className={`text-xs ${likedProjects.includes(project.id) ? "font-bold text-true-white" : ""}`}>
                        {likedProjects.includes(project.id) ? "♥" : "♡"}
                      </span>
                    </button>
                  </div>

                  {/* Arrow Indicator Bottom Right */}
                  <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-accent text-true-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Card copy */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 font-bold tracking-wider uppercase">{project.client}</span>
                    <h3 className="font-sans font-bold text-lg text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Project metadata */}
                  <div className="flex flex-wrap gap-1.5 border-t border-zinc-900 pt-4 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] font-semibold text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
