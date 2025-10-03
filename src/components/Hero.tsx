"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
      });

      gsap.from(".hero-cta", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.9,
      });

      const text = "Frontend Developer";
      const element = textRef.current;
      if (element) {
        element.textContent = "";
        let i = 0;
        const typing = setInterval(() => {
          if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(typing);
          }
        }, 100);
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-dark-bg via-dark-card to-dark-bg"></div>

      <div className="relative z-10 text-center px-6">
        <h1 className="hero-title text-6xl md:text-8xl font-bold mb-4">
          Hi, I&apos;m <span className="text-dark-accent">Eilya</span>
        </h1>

        <h2
          ref={textRef}
          className="hero-subtitle text-2xl md:text-4xl text-gray-400 mb-8 h-12"
        ></h2>

        <div className="hero-cta flex gap-4 justify-center">
          <a href="#projects">
            <button className="px-8 py-3 bg-dark-accent text-black font-semibold rounded-lg hover:scale-105 transition-transform">
              View Projects
            </button>
          </a>
          <a href="#contact">
            <button className="px-8 py-3 border-2 border-dark-accent text-dark-accent font-semibold rounded-lg hover:bg-dark-accent hover:text-black transition-all">
              Contact Me
            </button>
          </a>
        </div>
      </div>

      <div className="absolute w-96 h-96 bg-dark-accent/10 rounded-full blur-3xl top-20 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-dark-accent/10 rounded-full blur-3xl bottom-20 right-10 animate-pulse delay-1000"></div>
    </section>
  );
}
