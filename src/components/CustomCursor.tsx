import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Magnetic cursor spring options
  const springConfig = { damping: 30, stiffness: 200, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const ringX = useTransform(cursorX, (val) => val - 20);
  const ringY = useTransform(cursorY, (val) => val - 20);

  const dotX = useTransform(mouseX, (val) => val - 3);
  const dotY = useTransform(mouseY, (val) => val - 3);

  useEffect(() => {
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      const x = e.clientX;
      const y = e.clientY;
      rafId = requestAnimationFrame(() => {
        mouseX.set(x);
        mouseY.set(y);
        rafId = null;
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      
      const isClickable = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer') !== null;
      setIsHovered((prev) => (prev !== isClickable ? isClickable : prev));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Magnetic mouse follower - extremely premium feel */}
      <motion.div
        animate={{
          scale: isHovered ? 1.7 : 1,
          backgroundColor: isHovered ? "rgba(43, 186, 165, 0.15)" : "rgba(43, 186, 165, 0)",
          borderColor: isHovered ? "var(--color-accent)" : "rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered 
            ? "0 0 20px rgba(43, 186, 165, 0.6), inset 0 0 8px rgba(43, 186, 165, 0.3)" 
            : "0 0 0px rgba(43, 186, 165, 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          x: ringX,
          y: ringY,
        }}
        className="hidden lg:block fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[99999]"
      />

      {/* Custom dot cursor - zero lag, highly responsive */}
      <motion.div
        animate={{
          scale: isHovered ? 1.3 : 1,
          backgroundColor: "var(--color-accent)",
          boxShadow: isHovered 
            ? "0 0 12px rgba(43, 186, 165, 0.9)" 
            : "0 0 0px rgba(43, 186, 165, 0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        style={{
          x: dotX,
          y: dotY,
        }}
        className="hidden lg:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999]"
      />
    </>
  );
}
