import React, { useRef, useState } from "react";

const HoverLetter: React.FC<{ char: string }> = ({ char }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const letterCenterX = rect.left + rect.width / 2;
    const letterCenterY = rect.top + rect.height / 2;
    
    const dx = e.clientX - letterCenterX;
    const dy = e.clientY - letterCenterY;
    
    const halfWidth = rect.width / 2;
    const nx = dx / (halfWidth || 1);
    
    // Beautiful, liquid organic transformations as seen in the video:
    // Translates up, tilts/rotates depending on mouse entrance side, scales up
    const translateY = -10 - (1 - Math.abs(nx)) * 10; // moves up by 10px to 20px
    const translateX = nx * 3; // subtle horizontal shift
    const rotate = nx * -18; // tilt away from cursor up to 18 degrees
    const scale = 1.18 - Math.abs(nx) * 0.08; // scale up to 1.18x
    
    setTransform(`translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`);
  };

  const handleMouseLeave = () => {
    setTransform("");
  };

  // Ensure space characters are rendered correctly as full width spaces
  if (char === " ") {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="letter inline-block cursor-default select-none origin-bottom"
      style={{
        transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
        transform,
        willChange: "transform",
      }}
    >
      {char}
    </span>
  );
};

interface InteractiveTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function InteractiveText({ text, className, style }: InteractiveTextProps) {
  // Split text into individual words, then words into characters, to handle spaces elegantly
  const words = text.split(" ");

  return (
    <span className={className} style={style}>
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em] last:mr-0">
          {word.split("").map((char, charIdx) => (
            <HoverLetter key={charIdx} char={char} />
          ))}
        </span>
      ))}
    </span>
  );
}
