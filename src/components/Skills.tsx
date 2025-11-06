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
    icon: <SiNextdotjs />,
    color: "#ffffff",
    description: "Building fast, modern web applications",
  },
  {
    name: "React",
    icon: <FaReact />,
    color: "#61dafb",
    description: "Creating dynamic user interfaces",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript />,
    color: "#3178c6",
    description: "Type-safe development",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss />,
    color: "#38bdf8",
    description: "Rapid UI development",
  },
  {
    name: "JavaScript",
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
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
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
              className={`skill-card-${index} flex flex-col items-center gap-8 p-8 bg-dark-card/50 backdrop-blur-sm rounded-2xl border border-dark-border/50 hover:border-dark-accent/50 transition-colors text-center`}
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
                <h3 className="text-3xl font-bold mb-4">{skill.name}</h3>
                <p className="text-gray-400 text-lg">{skill.description}</p>
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
