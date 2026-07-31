import { useState, useEffect } from "react";
import { Plus, Minus, HelpCircle, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export const faqsData: FAQItem[] = [
  {
    id: 1,
    question: "What services does LoopCodeLabs offer?",
    answer: "LoopCodeLabs is an AI-powered software development company that builds custom websites, web applications, mobile apps, AI automation systems, CRM solutions, ERP platforms, AI chatbots, workflow automation, dashboards, cloud software, and business intelligence solutions tailored to your unique business needs."
  },
  {
    id: 2,
    question: "How can AI automation help my business?",
    answer: "AI automation eliminates repetitive manual work by automating customer support, lead management, appointment scheduling, invoicing, document processing, reporting, CRM updates, marketing workflows, and internal approvals. This improves productivity, reduces operational costs, and allows teams to focus on strategic work."
  },
  {
    id: 3,
    question: "Do you build custom software for specific industries?",
    answer: "Yes. We develop industry-specific software solutions for hospitality, construction, healthcare, manufacturing, education, logistics, retail, finance, real estate, and service-based businesses. Every solution is customized to match your workflow."
  },
  {
    id: 4,
    question: "Can you integrate AI into my existing website or software?",
    answer: "Absolutely. We can integrate AI chatbots, workflow automation, intelligent search, predictive analytics, document processing, recommendation engines, AI assistants, and custom APIs into your existing software without requiring a complete rebuild."
  },
  {
    id: 5,
    question: "How much does custom software development cost?",
    answer: "The cost depends on your project’s complexity, features, integrations, and timeline. We provide transparent pricing after understanding your business requirements and recommend the most cost-effective approach."
  },
  {
    id: 6,
    question: "Do you develop mobile apps for Android and iPhone?",
    answer: "Yes. We build scalable Android and iOS applications using modern technologies. Our mobile apps integrate seamlessly with websites, payment gateways, cloud platforms, CRMs, ERPs, and AI services."
  },
  {
    id: 7,
    question: "What makes LoopCodeLabs different from other software development companies?",
    answer: "LoopCodeLabs combines custom software engineering with artificial intelligence to create intelligent business systems that automate operations, improve efficiency, reduce costs, and scale with your business."
  },
  {
    id: 8,
    question: "Can you automate repetitive business processes?",
    answer: "Yes. We automate HR workflows, finance processes, approvals, inventory management, customer support, CRM operations, sales pipelines, marketing campaigns, reporting, notifications, and third-party integrations."
  },
  {
    id: 9,
    question: "How long does it take to develop a custom website or application?",
    answer: "Development timelines vary depending on project scope. Business websites are typically completed within a few weeks, while enterprise software, SaaS products, AI platforms, and mobile applications require additional development time. We follow an agile process with regular milestone reviews."
  },
  {
    id: 10,
    question: "Why should my business invest in custom software instead of off-the-shelf solutions?",
    answer: "Custom software is built specifically for your business processes, scales with your growth, integrates with your existing systems, offers better security, and eliminates unnecessary features found in generic software products."
  },
  {
    id: 11,
    question: "What is business process automation?",
    answer: "Business process automation uses software and AI to automate repetitive workflows, reduce manual effort, improve accuracy, and streamline operations across departments such as HR, sales, finance, customer support, and operations."
  },
  {
    id: 12,
    question: "What is an AI chatbot and how can it help my business?",
    answer: "An AI chatbot provides instant responses to customer queries, qualifies leads, books appointments, answers FAQs, collects customer information, and offers 24/7 support, improving customer experience while reducing support workload."
  },
  {
    id: 13,
    question: "Do you provide website maintenance and ongoing support?",
    answer: "Yes. We offer website maintenance, security updates, performance optimization, feature enhancements, bug fixes, server monitoring, backups, and long-term technical support to ensure your website remains secure and reliable."
  },
  {
    id: 14,
    question: "Can you redesign my existing website?",
    answer: "Absolutely. We modernize outdated websites by improving UI/UX, performance, SEO, responsiveness, accessibility, and conversion rates while preserving your existing content and branding where appropriate."
  },
  {
    id: 15,
    question: "Which technologies do you use for software development?",
    answer: "We build solutions using modern technologies including React, Next.js, Node.js, Python, Flutter, React Native, TypeScript, PostgreSQL, MongoDB, Firebase, Docker, cloud platforms, REST APIs, AI models, and scalable backend architectures."
  },
  {
    id: 16,
    question: "Do you provide cloud deployment services?",
    answer: "Yes. We deploy applications on AWS, Microsoft Azure, Google Cloud, DigitalOcean, and other cloud providers with scalable infrastructure, automated deployment pipelines, backups, monitoring, and security best practices."
  },
  {
    id: 17,
    question: "Can you integrate payment gateways into my website or application?",
    answer: "Yes. We integrate secure payment gateways such as Razorpay, Stripe, PayPal, Cashfree, PhonePe, and other payment providers for websites, e-commerce platforms, SaaS applications, and mobile apps."
  },
  {
    id: 18,
    question: "How do you ensure software security?",
    answer: "We follow industry best practices including secure authentication, role-based access control, encrypted communication, regular security updates, input validation, secure APIs, vulnerability testing, and data protection measures throughout development."
  },
  {
    id: 19,
    question: "Will my website be SEO-friendly?",
    answer: "Yes. Every website is built with SEO best practices including semantic HTML, fast loading speeds, mobile responsiveness, optimized metadata, structured data, clean URLs, image optimization, and Core Web Vitals optimization."
  },
  {
    id: 20,
    question: "Can LoopCodeLabs help digitize my existing business operations?",
    answer: "Yes. We analyze your current workflows and design custom digital solutions that automate manual processes, integrate disconnected systems, centralize business data, and improve operational efficiency using AI-powered software."
  }
];

export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(() => {
    try {
      const saved = sessionStorage.getItem("faq_expanded_id");
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const [showMore, setShowMore] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem("faq_show_more") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      if (expandedId !== null) {
        sessionStorage.setItem("faq_expanded_id", String(expandedId));
      } else {
        sessionStorage.removeItem("faq_expanded_id");
      }
    } catch (e) {
      // Ignore session storage errors
    }
  }, [expandedId]);

  useEffect(() => {
    try {
      sessionStorage.setItem("faq_show_more", String(showMore));
    } catch (e) {
      // Ignore session storage errors
    }
  }, [showMore]);

  const visibleFaqs = showMore ? faqsData : faqsData.slice(0, 10);

  const toggleFaq = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleToggleShowMore = () => {
    setShowMore((prev) => {
      const next = !prev;
      if (!next && expandedId !== null && expandedId > 10) {
        setExpandedId(null);
      }
      return next;
    });
  };

  // Structured Data (JSON-LD FAQPage Schema for all 20 FAQs)
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqsData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[var(--bg-main)] relative overflow-hidden transition-colors duration-300"
    >
      {/* Dynamic JSON-LD Structured Data for Search Engine Optimization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Decorative ambient background glows matching design system */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[120px] pointer-events-none select-none z-0" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] sm:text-xs font-mono font-extrabold tracking-[0.25em] uppercase">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2
            id="faq-heading"
            className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.05]"
          >
            Frequently Asked Questions
          </h2>

          <p className="text-[var(--text-secondary)] font-sans font-medium text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about AI automation, custom software development, websites, mobile apps, and digital transformation.
          </p>
        </motion.div>

        {/* FAQ Accordion Grid */}
        <div className="space-y-4">
          {visibleFaqs.map((faq, index) => {
            const isOpen = expandedId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index < 10 ? index * 0.04 : (index - 10) * 0.04 }}
                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[var(--bg-card)] border-accent/60 shadow-lg shadow-accent/5"
                    : "bg-[var(--bg-card)] border-zinc-800/60 dark:border-zinc-800/60 border-zinc-200/80 hover:border-accent/40 hover:shadow-md hover:shadow-accent/5"
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    id={`faq-question-${faq.id}`}
                    className="w-full text-left py-5 px-6 sm:py-6 sm:px-8 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl transition-colors select-none"
                  >
                    <span className="font-sans font-bold text-base sm:text-lg md:text-xl text-[var(--text-primary)] group-hover:text-accent transition-colors leading-snug">
                      {faq.question}
                    </span>

                    <span
                      className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "bg-accent text-true-black border-accent rotate-180"
                          : "bg-zinc-900/40 dark:bg-zinc-900/40 bg-zinc-100 text-[var(--text-primary)] border-zinc-800 dark:border-zinc-800 border-zinc-300 group-hover:border-accent/50 group-hover:text-accent"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Plus className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed border-t border-zinc-800/40 dark:border-zinc-800/40 border-zinc-200/60 pt-4 mt-1">
                        <p className="font-sans font-normal opacity-95">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Expand / Show More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <button
            type="button"
            onClick={handleToggleShowMore}
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-transparent hover:bg-black hover:text-[#2bbaa6] text-[var(--text-primary)] font-sans font-extrabold text-xs uppercase tracking-widest rounded-full border border-accent hover:border-black transition-all duration-300 cursor-pointer shadow-lg hover:shadow-accent/20 active:scale-[0.98]"
          >
            <span>{showMore ? "Show Less" : "Show More FAQs (+10)"}</span>
            <ChevronDown
              className={`w-4 h-4 text-accent group-hover:text-[#2bbaa6] transition-transform duration-300 ${
                showMore ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
