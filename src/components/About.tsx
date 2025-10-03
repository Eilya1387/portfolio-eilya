"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 70%",
        },
      });

      gsap.fromTo(
        ".about-image",
        {
          rotateY: -90,
          opacity: 0,
          scale: 0.5,
        },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-image",
            start: "top 80%",
          },
        }
      );

      gsap.from(".about-text", {
        x: -100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 70%",
        },
      });

      const stats = document.querySelectorAll(".stat-number");
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target") || "0");
        gsap.fromTo(
          stat,
          { textContent: 0 },
          {
            textContent: target,
            duration: 2,
            ease: "power1.inOut",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
            },
            onUpdate: function () {
              stat.textContent = Math.ceil(
                gsap.getProperty(stat, "textContent") as number
              ).toString();
            },
          }
        );
      });

      gsap.to(".about-image", {
        y: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".float-element", {
        y: -20,
        duration: 2,
        ease: "sine.inOut",
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { label: "Code Commits", value: 500 },
    { label: "GitHub Repos", value: 12 },
    { label: "Years Coding", value: 4 },
    { label: "Technologies", value: 13 },
  ];

  const hobbies = [
    { icon: "🎸", name: "Guitar", description: "Playing music" },
    { icon: "⚽", name: "Football", description: "Team player" },
    { icon: "💻", name: "Coding", description: "Always learning" },
    { icon: "🎮", name: "Gaming", description: "Strategic thinking" },
  ];

  return (
    <section
      ref={aboutRef}
      className="about-section min-h-screen py-20 px-6 bg-dark-card relative overflow-hidden"
    >
      <div className="absolute top-20 left-10 w-20 h-20 border-4 border-dark-accent/30 rounded-full float-element z-0"></div>
      <div className="absolute top-40 right-20 w-32 h-32 border-4 border-blue-500/30 rotate-45 float-element z-0"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-dark-accent/20 rounded-lg float-element z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="about-title text-5xl md:text-6xl font-bold mb-20 text-center">
          About <span className="text-dark-accent">Eilya</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="flex justify-center items-center">
            <div
              ref={imageRef}
              className="about-image relative"
              style={{ perspective: "1000px" }}
            >
              <div className="w-80 h-80 bg-gradient-to-br from-dark-accent to-blue-500 rounded-3xl flex items-center justify-center text-9xl shadow-2xl">
                <img
                  src="/spongebob.webp"
                  alt="Eilya web developer"
                  className=" rounded-3xl"
                />
              </div>
              <div className="absolute inset-0 bg-dark-accent/20 rounded-3xl blur-3xl -z-10"></div>
            </div>
          </div>

          <div className="about-content flex flex-col justify-center">
            <p className="about-text text-xl text-gray-300 mb-6 leading-relaxed">
              Hey! I'm Eilya, a passionate Frontend Developer specializing in
              Next.js and modern web technologies. I love creating beautiful,
              performant, and user-friendly interfaces.
            </p>
            <p className="about-text text-xl text-gray-300 mb-6 leading-relaxed">
              With expertise in React, TypeScript, and GSAP animations, I bring
              ideas to life with smooth interactions and stunning visual
              effects.
            </p>
            <p className="about-text text-xl text-gray-300 mb-6 leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me playing guitar or football,
              always staying active and creative.
            </p>

            <div className="about-text flex gap-4 mt-6">
              <a href="#contact">
                <button className="px-6 py-3 border-2 border-dark-accent text-dark-accent font-semibold rounded-lg hover:bg-dark-accent hover:text-black transition-all">
                  Contact Me
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card text-center p-6 bg-dark-bg rounded-xl border border-dark-border hover:border-dark-accent transition-colors"
            >
              <div
                className="stat-number text-5xl font-bold text-dark-accent mb-2"
                data-target={stat.value}
              >
                0
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        <div className="relative z-20">
          <h3 className="text-3xl font-bold mb-10 text-center">
            Beyond <span className="text-dark-accent">Code</span>
          </h3>
          <div className="hobbies-container grid grid-cols-2 md:grid-cols-4 gap-6">
            {hobbies.map((hobby, index) => (
              <div
                key={index}
                className="hobby-card bg-dark-bg p-6 rounded-xl border border-dark-border hover:border-dark-accent transition-all cursor-pointer group relative z-30"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">
                  {hobby.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{hobby.name}</h4>
                <p className="text-gray-400 text-sm">{hobby.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
