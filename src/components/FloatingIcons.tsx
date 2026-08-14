"use client";

import { useEffect, useMemo, useState } from "react";
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

const ICONS = [
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
];

type FloatItem = {
  Icon: (typeof ICONS)[number];
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  opacity: number;
};

function generateItems(count: number): FloatItem[] {
  return Array.from({ length: count }).map(() => ({
    Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 18 + Math.random() * 26,
    duration: 10 + Math.random() * 14,
    delay: Math.random() * -20,
    driftX: (Math.random() - 0.5) * 60,
    opacity: 0.08 + Math.random() * 0.12,
  }));
}

export default function FloatingTechIcons() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(max-width: 768px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsMobile(mq.matches);
    setReducedMotion(rm.matches);

    const onResize = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onResize);
    rm.addEventListener("change", () => setReducedMotion(rm.matches));

    const handleVisibility = () => {
      document.documentElement.style.setProperty(
        "--float-play-state",
        document.hidden ? "paused" : "running",
      );
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      mq.removeEventListener("change", onResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const count = isMobile ? 12 : 20;
  const items = useMemo(() => generateItems(count), [count]);

  if (!mounted || reducedMotion) return null;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {items.map((item, i) => {
        const { Icon } = item;
        return (
          <span
            key={i}
            className="floating-icon absolute text-dark-accent"
            style={
              {
                top: `${item.top}%`,
                left: `${item.left}%`,
                fontSize: `${item.size}px`,
                opacity: item.opacity,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
                "--drift-x": `${item.driftX}px`,
              } as React.CSSProperties
            }
          >
            <Icon />
          </span>
        );
      })}
    </div>
  );
}
