import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { User } from "../types";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({ theme, toggleTheme, user, onLogin, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || "#");

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || "#");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Pricing", href: "#pricing" },
    { name: "Insights", href: "#blog" },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    
    if (id === "#blog") {
      window.location.hash = "#blog";
      return;
    }
    if (id === "#pricing") {
      window.location.hash = "#pricing";
      return;
    }
    if (id === "#services") {
      window.location.hash = "#services";
      return;
    }
    if (id === "#about") {
      window.location.hash = "#about";
      return;
    }

    const hasSubpage = window.location.hash && (
      ["#blog", "#pricing", "#services", "#about"].some(sub => window.location.hash.startsWith(sub)) || 
      window.location.hash.startsWith("#portfolio/")
    );
    
    if (hasSubpage) {
      window.location.hash = id;
      // Wait for homepage to mount and query element
      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 250);
    } else {
      window.location.hash = id;
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isSubpage = currentHash && (
    ["#blog", "#pricing", "#services", "#about"].some(sub => currentHash.startsWith(sub)) || 
    currentHash.startsWith("#portfolio/")
  );

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-12 lg:px-20 border-b ${
          scrolled 
            ? "bg-white/[0.05] backdrop-blur-xl border-white/[0.08] py-3.5 sm:py-4 shadow-xl" 
            : isSubpage 
              ? "bg-transparent border-transparent py-4 sm:py-5" 
              : "bg-white/[0.02] backdrop-blur-xl border-white/[0.04] py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScrollTo("#hero");
            }}
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer shrink-0"
            id="nav-logo"
          >
            {/* Custom Brand Badge SVG: < ♾️ > */}
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105" id="brand-badge-svg">
              <svg
                viewBox="0 0 100 36"
                className="w-10 h-5 sm:w-12 sm:h-6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Left bracket < */}
                <path
                  d="M 19 10 L 7 18 L 19 26"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white transition-colors duration-300"
                />
                
                {/* Infinity symbol in the middle */}
                <path
                  d="M 50 18 C 54 13, 58 9, 63 9 C 69 9, 73 13, 73 18 C 73 23, 69 27, 63 27 C 58 27, 54 23, 50 18 C 46 23, 42 27, 37 27 C 31 27, 27 23, 27 18 C 27 13, 31 9, 37 9 C 42 9, 46 13, 50 18 Z"
                  stroke="var(--color-accent)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300"
                />

                {/* Right bracket > */}
                <path
                  d="M 81 10 L 93 18 L 81 26"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white transition-colors duration-300"
                />
              </svg>
            </div>
            <span className="font-sans font-extrabold text-sm sm:text-lg tracking-tight text-white flex items-center gap-1">
              <span>loopCode</span>
              <span className="text-[#2BBAA5] font-semibold">Labs</span>
            </span>
          </a>
          
          {/* Centered Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 bg-zinc-950/15 border border-zinc-900/30 px-8 py-2.5 rounded-full backdrop-blur-xl shadow-lg shadow-black/10" id="desktop-nav-menu">
            {navLinks.map((link) => {
              const isActive = currentHash === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  className={`text-xs font-semibold tracking-wider transition-colors duration-200 uppercase ${
                    isActive ? "text-accent font-bold" : "text-zinc-400 hover:text-accent"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right CTA / Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-zinc-800/60 bg-zinc-950/20 text-zinc-400 hover:text-white hover:border-accent hover:bg-zinc-900/30 transition-all duration-300 cursor-pointer shrink-0"
              aria-label="Toggle Theme"
              id="header-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-700 dark:text-zinc-400" />
              )}
            </button>

            {user ? (
              <div className="relative group shrink-0">
                <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-5 h-5 rounded-full object-cover border border-zinc-800" 
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-semibold text-zinc-300 hidden md:inline-block max-w-[80px] truncate">{user.name}</span>
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-950/95 border border-zinc-900 rounded-2xl p-3 shadow-xl backdrop-blur-xl opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                  <div className="text-left mb-2.5 pb-2 border-b border-zinc-900">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <p className="text-[10px] text-zinc-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.location.hash = "#admin";
                    }}
                    className="w-full text-left py-1.5 px-2 rounded-lg text-xs font-semibold text-accent hover:bg-zinc-900 transition-all cursor-pointer mb-1"
                  >
                    Admin Dashboard
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left py-1.5 px-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-zinc-900 hover:text-red-300 transition-all cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider text-text-primary bg-transparent border border-accent hover:bg-black hover:text-[#2bbaa6] transition-all duration-300 group shadow-sm hover:shadow-accent/20 cursor-pointer whitespace-nowrap shrink-0"
              >
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent group-hover:text-[#2bbaa6] transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.53 5.53 0 018.4 13c0-3.047 2.483-5.514 5.53-5.514 1.395 0 2.673.511 3.657 1.353l3.221-3.222C18.84 3.737 16.488 2.4 13.93 2.4A9.6 9.6 0 004.33 12a9.6 9.6 0 009.6 9.6c5.215 0 9.6-3.763 9.6-9.6 0-.616-.062-1.222-.17-1.715H12.24z" />
                </svg>
                Sign In
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact");
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-text-primary bg-transparent border border-accent hover:bg-black hover:text-[#2bbaa6] transition-all duration-300 group shadow-sm hover:shadow-accent/20 shrink-0"
              id="desktop-cta"
            >
              Book a call
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#2bbaa6]" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-zinc-800/40 bg-zinc-950/30 backdrop-blur-md text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer shrink-0"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-24 z-50 md:hidden p-6 rounded-3xl bg-zinc-950/70 border border-zinc-900/40 backdrop-blur-xl shadow-2xl flex flex-col gap-6"
            id="mobile-drawer"
          >
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase font-mono">NAVIGATION</span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollTo(link.href);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-base font-bold text-zinc-300 hover:text-accent py-2 flex items-center justify-between group border-b border-zinc-900"
                >
                  {link.name}
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-accent transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-2 border-t border-zinc-900/50 flex flex-col gap-4">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 px-1">
                    <img 
                      src={user.picture} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full object-cover border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
                      <p className="text-[11px] text-zinc-500 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 rounded-full bg-zinc-900 border border-zinc-800 text-center text-xs font-bold text-red-400 uppercase tracking-widest hover:bg-zinc-850 transition-all cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLogin();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-full bg-transparent border border-accent text-center text-xs font-bold text-text-primary uppercase tracking-widest hover:bg-black hover:text-[#2bbaa6] transition-all flex items-center justify-center gap-2 cursor-pointer group shadow-sm hover:shadow-accent/20 whitespace-nowrap"
                >
                  <svg className="w-4 h-4 text-accent group-hover:text-[#2bbaa6] transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.53 5.53 0 018.4 13c0-3.047 2.483-5.514 5.53-5.514 1.395 0 2.673.511 3.657 1.353l3.221-3.222C18.84 3.737 16.488 2.4 13.93 2.4A9.6 9.6 0 004.33 12a9.6 9.6 0 009.6 9.6c5.215 0 9.6-3.763 9.6-9.6 0-.616-.062-1.222-.17-1.715H12.24z" />
                  </svg>
                  Sign In with Google
                </button>
              )}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTo("#contact");
              }}
              className="w-full py-4 rounded-full bg-accent hover:bg-accent-hover text-center text-xs font-extrabold text-true-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/20"
              id="mobile-cta"
            >
              Book a call
              <ArrowUpRight className="w-4 h-4 text-true-black stroke-[2.5px]" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
