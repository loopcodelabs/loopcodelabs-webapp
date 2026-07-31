import { motion } from "motion/react";
import { Sparkles, Trophy, Star, Zap, Clock } from "lucide-react";

export default function LetsBuild() {
  const stats = [
    {
      num: "10+",
      label: "Projects delivered",
      sub: "Bespoke high-performance builds",
      icon: <Trophy className="w-5 h-5 text-accent" />,
    },
    {
      num: "95+",
      label: "Avg. Lighthouse score",
      sub: "Built for speed and SEO ranking",
      icon: <Zap className="w-5 h-5 text-accent" />,
    },
    {
      num: "4.9/5",
      label: "Client satisfaction",
      sub: "Raving reviews from partners",
      icon: <Star className="w-5 h-5 text-accent" />,
    },
    {
      num: "3yrs",
      label: "Driving Indian growth",
      sub: "Dedicated local performance",
      icon: <Clock className="w-5 h-5 text-accent" />,
    },
  ];

  return (
    <section
      className="py-24 px-6 sm:px-12 lg:px-20 bg-transparent relative overflow-hidden"
      id="lets-build-container"
    >
      {/* Ambient background glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent/5 to-transparent blur-[130px] pointer-events-none z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 relative z-10 w-full">
        
        {/* Dynamic content flow stacked cleanly */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-5xl w-full text-center space-y-12"
        >
          {/* [ WHAT WE DO ] block from the video */}
          <div className="space-y-4 max-w-5xl w-full text-left flex flex-col items-start">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-accent tracking-[0.25em] uppercase flex items-center justify-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              [ WHAT WE DO ]
            </span>
            <h3 className="font-sans font-extrabold text-3xl sm:text-5xl md:text-[3.25rem] text-white tracking-normal leading-tight max-w-3xl">
              We build the websites, apps, and growth systems behind ambitious startups and businesses.
            </h3>
          </div>

          {/* The four stats, styled beautifully */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="bg-zinc-950/80 border border-zinc-900 rounded-2xl p-6 text-center relative overflow-hidden group hover:border-zinc-800 transition-colors"
              >
                <div className="flex flex-col space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
                    {stat.icon}
                  </div>
                  <div>
                    <span className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tighter block">
                      {stat.num}
                    </span>
                    <span className="text-xs font-bold text-zinc-300 block mt-1">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-zinc-400 block mt-1 leading-snug">
                      {stat.sub}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
}
