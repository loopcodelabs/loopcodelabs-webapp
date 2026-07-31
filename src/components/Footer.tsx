import { useState } from "react";
import { ArrowUp, Github, Linkedin, Twitter, Globe, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useWebsite } from "../context/WebsiteContext";

export default function Footer() {
  const { siteSettings } = useWebsite();
  const contactEmail = siteSettings?.contactEmail || "hello@loopcodelabs.in";

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const socialLinks = [
    { name: "Twitter", href: "#", icon: <Twitter className="w-4 h-4" /> },
    { name: "LinkedIn", href: "#", icon: <Linkedin className="w-4 h-4" /> },
    { name: "GitHub", href: "#", icon: <Github className="w-4 h-4" /> },
    { name: "Dribbble", href: "#", icon: <Globe className="w-4 h-4" /> },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollTo = (id: string) => {
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
      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 250);
    } else {
      window.location.hash = id;
      const element = document.querySelector(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-transparent pt-16 pb-12 px-6 sm:px-12 lg:px-20 relative overflow-hidden" id="footer-section">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Top block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Logo brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={handleScrollToTop}>
              {/* Custom Brand Badge SVG: < ♾️ > */}
              <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105" id="footer-brand-badge-svg">
                <svg
                  viewBox="0 0 100 36"
                  className="w-12 h-6"
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
              <span className="font-sans font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
                <span>loopCode</span>
                <span className="text-[#2BBAA5] font-semibold">Labs</span>
              </span>
            </div>
            <p className="text-zinc-500 text-xs sm:text-sm max-w-sm leading-relaxed">
              Bespoke digital growth and design engineering lab. We build stunning high-performance web systems that command organic attention.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-widest block uppercase">NAVIGATION</span>
            <ul className="space-y-2">
              {[
                { name: "Services", href: "#services" },
                { name: "Featured Work", href: "#work" },
                { name: "About Us", href: "#about" },
                { name: "Estimate Cost", href: "#pricing" },
                { name: "Insights Ledger", href: "#blog" },
                { name: "FAQs", href: "#faq" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(link.href);
                    }}
                    className="text-xs text-zinc-400 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-bold text-zinc-400 font-mono tracking-widest block uppercase">SOCIAL CHANNELS</span>
            <div className="flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900 text-zinc-500 hover:text-accent flex items-center justify-center transition-all shadow-md"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-900 w-max">
              <MessageSquare className="w-3.5 h-3.5 text-accent" />
              <span>Status: ALL SYSTEMS DEPLOYED & LIVE</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-900/80 pt-8 mt-4 text-[10px] sm:text-xs text-zinc-600 font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <span>&copy; {new Date().getFullYear()} loopCode Labs. Hyderabad, India. All Rights Reserved.</span>
            <div className="flex items-center gap-2 text-zinc-500">
              <button
                onClick={() => setShowPrivacy(true)}
                className="hover:text-accent underline transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>&middot;</span>
              <button
                onClick={() => setShowTerms(true)}
                className="hover:text-accent underline transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-950 border border-zinc-900 hover:border-zinc-800 text-zinc-500 hover:text-white transition-all cursor-pointer"
          >
            BACK TO TOP
            <ArrowUp className="w-3.5 h-3.5 text-zinc-650" />
          </button>
        </div>

      </div>

      {/* GDPR & Legal Compliance Modals */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 select-none bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6 text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-accent tracking-[0.2em] uppercase">[ COMPLIANCE ]</span>
                  <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white mt-1">Privacy Policy</h3>
                </div>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 pr-1">
                <p>
                  At <strong>loopCode Labs</strong>, we prioritize the protection and security of our clients' and visitors' personal data. This Privacy Policy details our commitment to data transparency and strict compliance practices.
                </p>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">1. Data We Collect</h4>
                <p>
                  When you utilize our interactive cost estimator calculator, order plans, or submit enterprise inquiries via our contact forms, we securely capture the parameters you explicitly provide:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li>Inquirer identity parameters (Name, corporate email, contact coordinates).</li>
                  <li>Inquiry descriptors (project classification, custom criteria choices, allocated budget brackets).</li>
                  <li>Encrypted transmission credentials (to safely proxy requests and protect form validity).</li>
                </ul>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">2. How We Utilize Your Data</h4>
                <p>
                  Any submitted information is strictly leveraged to respond to user briefs, build precise digital cost assessments, and manage client communications. loopCode Labs absolutely does not sell, lease, distribute, or expose user information to third-party commercial marketing systems.
                </p>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">3. Security and Storage</h4>
                <p>
                  We store session variables and contact entries in highly secure environment sandboxes with modern cryptographic layers. The site uses local and session caches strictly to maintain user preference continuity (e.g. holding your estimated pricing details so you don't have to re-enter them on the contact form).
                </p>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">4. Your Rights</h4>
                <p>
                  Under regional and international data protection laws (including GDPR and CCPA guidelines), you hold absolute authority to review, update, sanitize, or request total removal of any personal communications or profile files recorded in our pipeline databases. Please coordinate with us at <strong>{contactEmail}</strong> for swift assistance.
                </p>

              </div>

              {/* Footer */}
              <div className="flex justify-end pt-4 border-t border-zinc-900">
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  UNDERSTOOD
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showTerms && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 select-none bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-zinc-900 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-6 sm:p-8 space-y-6 text-zinc-300 font-sans text-xs sm:text-sm leading-relaxed"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-accent tracking-[0.2em] uppercase">[ TERMS OF ENGAGEMENT ]</span>
                  <h3 className="font-sans font-extrabold text-lg sm:text-xl text-white mt-1">Terms of Service</h3>
                </div>
                <button
                  onClick={() => setShowTerms(false)}
                  className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4 pr-1">
                <p>
                  Welcome to <strong>loopCode Labs</strong>. By entering, browsing, or utilizing the interactive widgets, dynamic calculators, and articles on this website (accessible at loopcodelabs.in), you unconditionally agree to comply with the terms stipulated herein.
                </p>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">1. Informational Boundaries & Estimates</h4>
                <p>
                  Any mathematical outputs, timelines, and budget suggestions provided by our integrated cost estimation calculators represent standard, automated projections. They serve solely as initial guidelines and do not represent formal, legally binding contract offerings. Final pricing models are strictly governed by custom written statements of work signed by both parties.
                </p>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">2. Intellectual Property</h4>
                <p>
                  All proprietary source code, dynamic animations, mock-terminal modules, localized design layout tokens, copywriting, high-contrast assets, and custom logo marks published on this site are the sole intellectual property of loopCode Labs. Unauthorized replication, scraping, framing, or distribution of this software package is strictly prohibited and subject to legal action under intellectual property frameworks.
                </p>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">3. Third-Party Links & Content</h4>
                <p>
                  Our portfolio and insight case studies contain safe outbound hyperlinks to verified, live clients we have supported (e.g.Point8 Wealth, India Immigration Portal). loopCode Labs does not own, control, or take responsibility for the ongoing compliance, security configurations, or materials of those external domains.
                </p>

                <h4 className="font-bold text-white uppercase text-[10px] font-mono tracking-wider text-accent">4. Limitation of Liability</h4>
                <p>
                  loopCode Labs provides all website features "as-is" without warranty of any kind. Under no circumstances will the agency be liable for direct, indirect, incidental, or compound commercial damages resulting from temporary website down-times, estimation inaccuracies, or the application of the business growth advice hosted in our insights ledger.
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-4 border-t border-zinc-900">
                <button
                  onClick={() => setShowTerms(false)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  I ACCEPT
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
