"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiJavascript,
  SiTailwindcss,
  SiTypescript,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

interface TechSlide {
  name: string;
  icon: React.JSX.Element;
  color: string;
  bgColor: string;
  description: string;
  features: string[];
}

const techStack: TechSlide[] = [
  {
    name: "My Skills",
    icon: <img src="/favicon1.png" alt="" />,
    color: "#01c653",
    bgColor: "from-dark-accent via-[#0a0a0a] to-dark-accent",
    description: "Skills that transform ideas into reality",
    features: ["Java Script", "Type Script", "React js", "Next js"],
  },
  {
    name: "JavaScript",
    icon: <SiJavascript />,
    color: "#F7DF1E",
    bgColor: "from-yellow-400 via-yellow-500 to-amber-500",
    description: "The language of the web - Dynamic, versatile, and everywhere",
    features: [
      "ES6+ Features",
      "Async/Await",
      "DOM Manipulation",
      "Event Handling",
    ],
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#06B6D4",
    bgColor: "from-cyan-400 via-sky-500 to-blue-500",
    description: "Utility-first CSS framework for rapid UI development",
    features: [
      "Responsive Design",
      "Custom Themes",
      "Dark Mode",
      "JIT Compiler",
    ],
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "#3178C6",
    bgColor: "from-blue-500 via-blue-600 to-indigo-600",
    description: "JavaScript with superpowers - Type safety at scale",
    features: ["Type Safety", "IntelliSense", "Refactoring", "Scalability"],
  },
  {
    name: "React",
    icon: <SiReact />,
    color: "#61DAFB",
    bgColor: "from-cyan-300 via-sky-400 to-blue-400",
    description: "A JavaScript library for building user interfaces",
    features: ["Component-Based", "Virtual DOM", "Hooks", "State Management"],
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs />,
    color: "white",
    bgColor: "#0a0a0a",
    description: "The React framework for production-grade applications",
    features: ["SSR & SSG", "File Routing", "API Routes", "Image Optimization"],
  },
];

export default function ScrollSkill() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;

    if (!container || sections.length === 0) return;

    const scrollAnimation = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + container.offsetWidth * (sections.length - 1),
      },
    });

    sections.forEach((section, index) => {
      const icon = section.querySelector(".tech-icon");
      const title = section.querySelector(".tech-title");
      const desc = section.querySelector(".tech-desc");
      const features = section.querySelectorAll(".feature-item");
      const particles = section.querySelectorAll(".particle");

      if (icon) {
        gsap.fromTo(
          icon,
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollAnimation,
              start: "left center",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(icon, {
          y: -20,
          duration: 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      if (title) {
        gsap.fromTo(
          title,
          {
            x: -100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollAnimation,
              start: "left center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (desc) {
        gsap.fromTo(
          desc,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.5,
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollAnimation,
              start: "left center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (features.length > 0) {
        gsap.fromTo(
          features,
          {
            x: -50,
            opacity: 0,
            scale: 0.8,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.7,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollAnimation,
              start: "left center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (particles.length > 0) {
        particles.forEach((particle, i) => {
          const yValue = i % 2 === 0 ? -40 : 50;
          const xValue = i % 3 === 0 ? -25 : 30;
          const rotationValue = i * 45;
          const durationValue = 3.5 + (i % 3) * 0.5;

          gsap.to(particle, {
            y: yValue,
            x: xValue,
            rotation: rotationValue,
            duration: durationValue,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="hidden md:block relative w-full bg-dark-bg">
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <div
          className="flex h-full"
          style={{ width: `${techStack.length * 100}vw` }}
        >
          {techStack.map((tech, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) sectionsRef.current[index] = el;
              }}
              className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tech.bgColor} opacity-10`}
              />

              <div className="absolute inset-0 pointer-events-none">
                {[
                  { left: 10, top: 20 },
                  { left: 75, top: 15 },
                  { left: 25, top: 70 },
                  { left: 85, top: 60 },
                  { left: 50, top: 40 },
                  { left: 15, top: 85 },
                  { left: 65, top: 25 },
                  { left: 40, top: 55 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="particle absolute w-2 h-2 rounded-full opacity-20"
                    style={{
                      backgroundColor: tech.color,
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 max-w-6xl mx-auto px-12 grid grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div
                    className="tech-icon text-[300px] flex items-center justify-center"
                    style={{ color: tech.color }}
                  >
                    {tech.icon}
                  </div>

                  <div className="text-center">
                    <h2
                      className="text-7xl font-black"
                      style={{ color: tech.color }}
                    >
                      {tech.name}
                    </h2>
                  </div>
                </div>

                <div className="space-y-8">
                  <p className="tech-desc text-2xl text-gray-300 leading-relaxed">
                    {tech.description}
                  </p>

                  <div className="space-y-4">
                    {tech.features.map((feature, i) => (
                      <div
                        key={i}
                        className="feature-item flex items-center gap-4 p-4 bg-dark-card/50 backdrop-blur-sm rounded-xl border border-dark-border hover:border-opacity-50 transition-all"
                        style={{
                          borderColor: `${tech.color}40`,
                          boxShadow: `0 0 20px ${tech.color}10`,
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tech.color }}
                        />
                        <span className="text-lg text-gray-200 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: tech.color }}
              />
              <div
                className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10"
                style={{ backgroundColor: tech.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
