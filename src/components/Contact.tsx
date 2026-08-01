import { useState, useEffect, FormEvent } from "react";
import { Mail, MessageSquare, CheckCircle2, User, Loader2, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { safeSessionStorage } from "../utils/storage";
import { trackLeadSubmission } from "../utils/analyticsTracker";
import { useWebsite } from "../context/WebsiteContext";

export default function Contact() {
  const { siteSettings } = useWebsite();
  const contactEmail = siteSettings?.contactEmail || "hello@loopcodelabs.in";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("landing");
  const [budget, setBudget] = useState("₹1,50,000 - ₹3,00,000");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadPending = () => {
      const pending = safeSessionStorage.getItem("pending-estimate");
      if (pending) {
        try {
          const parsed = JSON.parse(pending);
          if (parsed.projectType) setProjectType(parsed.projectType);
          if (parsed.budget) setBudget(parsed.budget);
          if (parsed.message) setMessage(parsed.message);
          
          // Remove it immediately so it doesn't persist forever
          safeSessionStorage.removeItem("pending-estimate");
        } catch (err) {
          console.error("Failed to parse stored estimate:", err);
        }
      }
    };

    loadPending();

    window.addEventListener("apply-estimate", loadPending);
    return () => {
      window.removeEventListener("apply-estimate", loadPending);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      return;
    }

    setLoading(true);

    // Call analytics lead tracking to link previous browsing history with lead info
    trackLeadSubmission({
      name,
      email,
      phone: "+91 Mobile",
      company: projectType,
      requirements: `[Budget: ${budget}] - ${message}`
    });

    // Simulate network request latency
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setProjectType("landing");
    setBudget("₹1,50,000 - ₹3,00,000");
    setMessage("");
    setSuccess(false);
  };

  return (
    <section id="contact" className="py-24 px-6 sm:px-12 lg:px-20 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        
        {/* Copy Column (Left) */}
        <div className="lg:col-span-5 space-y-8 flex flex-col justify-center" id="contact-left">
          <div className="space-y-4">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-[0.25em] uppercase">
              [ LET'S PARTNER ]
            </span>
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-normal">
              Ready to launch?
            </h2>
          </div>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Fill out our inquiry form or send us an email directly. We review all incoming briefs and respond within 24-48 business hours.
          </p>

          {/* Contact Details Cards */}
          <div className="space-y-4">
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800/80 transition-colors group"
            >
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-accent transition-all">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold tracking-wider">EMAIL INQUIRIES</span>
                <span className="text-sm font-bold text-white group-hover:text-accent transition-colors">
                  {contactEmail}
                </span>
              </div>
            </a>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-950 border border-zinc-900">
              <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-accent">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold tracking-wider">LAB HOURS</span>
                <span className="text-sm font-bold text-white">
                  9:00 AM - 5:30 PM IST, Mon-Fri
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column (Right) */}
        <div className="lg:col-span-7" id="contact-right">
          <div className="w-full bg-zinc-950 border border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-[10px] font-bold text-zinc-400 font-mono uppercase">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 w-4 h-4 text-zinc-650" />
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full bg-zinc-900/30 border border-zinc-900 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-zinc-800 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-[10px] font-bold text-zinc-400 font-mono uppercase">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-3.5 w-4 h-4 text-zinc-650" />
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@company.co.nz"
                          className="w-full bg-zinc-900/30 border border-zinc-900 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-zinc-800 transition-all font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Project Selector */}
                    <div className="space-y-2">
                      <label htmlFor="contact-project-type" className="text-[10px] font-bold text-zinc-400 font-mono uppercase">What are we building?</label>
                      <select
                        id="contact-project-type"
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl py-3.5 px-4 text-sm text-zinc-300 focus:outline-none focus:border-zinc-800 transition-all cursor-pointer font-sans"
                      >
                        <option value="landing">SaaS Landing Page</option>
                        <option value="corporate">Multi-page Site</option>
                        <option value="ecommerce">E-Commerce Store</option>
                        <option value="custom">Custom Web Application</option>
                      </select>
                    </div>

                    {/* Estimated Budget Input - Always Custom Editable */}
                    <div className="space-y-2">
                      <label htmlFor="contact-budget" className="text-[10px] font-bold text-zinc-400 font-mono uppercase">
                        Estimated Budget (INR)
                      </label>
                      <input
                        type="text"
                        id="contact-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter the budget amount in INR"
                        className="w-full bg-zinc-950 border border-zinc-900 rounded-xl py-3.5 px-4 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-accent transition-all font-sans"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-[10px] font-bold text-zinc-400 font-mono uppercase">Message Brief *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your goals, pages, and timelines..."
                      className="w-full bg-zinc-900/30 border border-zinc-900 rounded-xl p-4 text-sm text-white placeholder-zinc-650 focus:outline-none focus:border-zinc-800 transition-all font-sans resize-y"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full py-4 rounded-xl bg-accent hover:bg-black text-sm font-extrabold text-true-black hover:text-[#2bbaa6] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-accent/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-true-black group-hover:text-[#2bbaa6]" />
                        DISPATCHING SECURE INQUIRY...
                      </>
                    ) : (
                      <>
                        DISPATCH INQUIRY
                        <ArrowUpRight className="w-4 h-4 text-true-black group-hover:text-[#2bbaa6] stroke-[2.5px] transition-colors" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-6 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-extrabold text-2xl text-white">Inquiry dispatched.</h3>
                    <p className="text-zinc-450 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you, <span className="text-accent font-bold">{name}</span>. Our partners will review your brief and reach out within 24 hours.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white border border-[#2bbaa6]/40 hover:border-[#2bbaa6] hover:bg-[#2bbaa6]/5 hover:shadow-[0_0_15px_rgba(43,186,166,0.2)] transition-all cursor-pointer"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
