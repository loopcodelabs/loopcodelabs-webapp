import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export default function LetsTalk() {
  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = id;
    }
  };

  return (
    <section 
      id="lets-talk" 
      className="bg-accent text-accent-content py-24 sm:py-32 px-6 sm:px-12 lg:px-20 relative overflow-hidden"
    >
      {/* Organic abstract decorative blobs on the top-right (as seen in the image) */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] pointer-events-none opacity-20 z-0 select-none translate-x-12 -translate-y-12">
        <svg viewBox="0 0 200 200" fill="currentColor" className="text-accent-content/80 w-full h-full">
          <path d="M45,-76.3C57.7,-69.1,67.1,-56,74.5,-42C81.8,-28,87.1,-14,87.6,0.3C88.1,14.6,83.8,29.1,76.3,42C68.8,54.8,58.1,66,45.2,73.5C32.3,81,16.1,84.8,-0.1,85C-16.3,85.2,-32.6,81.8,-46,74.2C-59.4,66.7,-69.8,55.1,-76.7,41.9C-83.6,28.6,-87,14.3,-87,0C-87,-14.3,-83.6,-28.7,-76.5,-41.7C-69.4,-54.7,-58.5,-66.4,-45.3,-73.4C-32.1,-80.4,-16,-82.7,-0.2,-82.3C15.5,-82,31,-78.9,45,-76.3Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="absolute top-[20%] right-[10%] w-[120px] h-[120px] pointer-events-none opacity-15 z-0 select-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="text-accent-content/60 w-full h-full">
          <circle cx="50" cy="50" r="40" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-4 text-left"
        >
          <span className="text-[11px] sm:text-xs font-mono font-black tracking-[0.25em] text-accent-content/60 uppercase">
            START THE CONVERSATION
          </span>
          <h2 className="font-sans font-extrabold text-5xl sm:text-7xl md:text-[5.5rem] text-accent-content tracking-tight leading-[0.95] max-w-4xl">
            Let's build your <br className="hidden sm:inline" />
            digital future.
          </h2>
        </motion.div>

        {/* Layout with Description on Left, Buttons on Right aligned bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 sm:mt-16 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <p className="text-accent-content/85 font-sans font-medium text-base sm:text-xl md:text-2xl leading-relaxed max-w-2xl">
              Book a free, no-pressure consultation. We'll show you exactly where the biggest growth opportunities are.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-5 flex flex-row flex-wrap gap-4 items-center justify-start lg:justify-end"
          >
            <button
              onClick={() => handleScrollTo("#contact")}
              className="group px-6 py-4 bg-true-black hover:bg-black text-true-white hover:text-[#2bbaa6] font-sans font-bold text-sm sm:text-base rounded-full transition-all duration-300 flex items-center gap-1.5 shadow-xl shadow-black/20 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              Book consultation
              <ArrowUpRight className="w-4 h-4 text-true-white group-hover:text-[#2bbaa6] stroke-[2.5px] transition-colors" />
            </button>

            <button
              onClick={() => handleScrollTo("#services")}
              className="px-6 py-4 bg-transparent hover:bg-true-black/10 text-true-black font-sans font-bold text-sm sm:text-base border border-true-black/30 hover:border-true-black/60 rounded-full transition-all duration-300 flex items-center gap-1.5 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              View services
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
