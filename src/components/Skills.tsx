"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";
import { FaSquareJs, FaReact } from "react-icons/fa6";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: "Next.js",
    level: 95,
    icon: <SiNextdotjs />,
    color: "#ffffff",
    description: "Building fast, modern web applications",
  },
  {
    name: "React",
    level: 90,
    icon: <FaReact />,
    color: "#61dafb",
    description: "Creating dynamic user interfaces",
  },
  {
    name: "TypeScript",
    level: 85,
    icon: <SiTypescript />,
    color: "#3178c6",
    description: "Type-safe development",
  },
  {
    name: "Tailwind CSS",
    level: 90,
    icon: <SiTailwindcss />,
    color: "#38bdf8",
    description: "Rapid UI development",
  },
  {
    name: "JavaScript",
    level: 90,
    icon: <FaSquareJs />,
    color: "#f7df1e",
    description: "Modern ES6+ features",
  },
];

export default function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 70%",
        },
      });

      skills.forEach((_, index) => {
        const card = `.skill-card-${index}`;
        const icon = `.skill-icon-${index}`;
        const content = `.skill-content-${index}`;
        const bar = `.skill-bar-${index}`;

        gsap.fromTo(
          icon,
          {
            x: -300,
            rotation: -360,
            scale: 0,
            opacity: 0,
          },
          {
            x: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          content,
          {
            x: 100,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          bar,
          {
            width: "0%",
          },
          {
            width: `${skills[index].level}%`,
            duration: 1.5,
            delay: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              once: true,
            },
          }
        );

        gsap.to(card, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        const cardElement = document.querySelector(card);
        cardElement?.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            scale: 1.2,
            duration: 0.6,
            ease: "power2.out",
          });
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
          });
        });

        cardElement?.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            rotation: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
          });
        });
      });

      gsap.to(".skill-icon", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          repeat: -1,
          yoyo: true,
        },
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={skillsRef}
      className="skills-section min-h-screen py-20 px-6 bg-dark-bg relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 bg-dark-accent rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl bottom-10 right-10 animate-pulse delay-1000"></div>
      </div>

      <div ref={containerRef} className="max-w-6xl mx-auto relative z-10">
        <h2 className="skills-title text-5xl md:text-6xl font-bold mb-20 text-center">
          Technical <span className="text-dark-accent">Arsenal</span>
        </h2>

        <div className="space-y-16">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`skill-card-${index} flex flex-col md:flex-row items-center gap-8 p-8 bg-dark-card/50 backdrop-blur-sm rounded-2xl border border-dark-border/50 hover:border-dark-accent/50 transition-colors`}
            >
              <div className="flex-shrink-0">
                <div
                  className={`skill-icon skill-icon-${index} text-7xl w-32 h-32 flex items-center justify-center rounded-full bg-gradient-to-br from-dark-card to-dark-border shadow-xl`}
                  style={{
                    boxShadow: `0 0 40px ${skill.color}40`,
                    color: skill.color,
                  }}
                >
                  {skill.icon}
                </div>
              </div>

              <div className={`skill-content-${index} flex-grow w-full`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-3xl font-bold">{skill.name}</h3>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: skill.color }}
                  >
                    {skill.level}%
                  </span>
                </div>

                <p className="text-gray-400 mb-4 text-lg">
                  {skill.description}
                </p>

                <div className="relative">
                  <div className="w-full h-4 bg-dark-border rounded-full overflow-hidden">
                    <div
                      className={`skill-bar-${index} h-full rounded-full relative`}
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
                        boxShadow: `0 0 20px ${skill.color}80`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Beginner</span>
                    <span>Intermediate</span>
                    <span>Expert</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 text-gray-500 animate-bounce">
          <p>↓ Keep scrolling to explore more ↓</p>
        </div>
      </div>
    </section>
  );
}
