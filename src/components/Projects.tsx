"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "EagerDevelopers",
    description:
      "a place to discover cutting-edge tools, learn programming expertise, and get inspired.",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    image: "/eagerdevelopers.webp",
    address: "https://eagerdevelopers.ir/",
  },
  {
    id: 2,
    title: "Navazino",
    description: "Music streaming Website",
    tech: ["React js", "TypeScript", "Tailwind"],
    image: "/Navazino.webp",
    address: "https://navazino.com/",
  },
  {
    id: 3,
    title: "Order Fastfood online",
    description:
      "Implement a modern web application for online pizza ordering with full customization capabilities.",
    tech: ["React js"],
    image: "/pizza.webp",
    address: "https://mcdonald-fastfood.vercel.app/",
  },
  {
    id: 4,
    title: "Khaje Nasir School",
    description: "landing page website & introduce Khaje Nasir school",
    tech: ["React js", "TypeScript"],
    image: "/school.webp",
    address: "https://nasirsch.ir/",
  },
  {
    id: 5,
    title: "Filimo site clone",
    description:
      "Design and implementation of a clone version of the Filmo website.",
    tech: ["React js", "Tailwind"],
    image: "/filimo.webp",
    address: "https://my-filimo.vercel.app/",
  },
];

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".projects-container",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      const cards = document.querySelectorAll(".project-card");
      cards.forEach((card) => {
        const element = card as HTMLElement;
        element.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
          });
        });
        element.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
          });
        });
      });
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={projectsRef}
      className="min-h-screen py-20 px-6"
      id="projects"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-16 text-center">
          Featured <span className="text-dark-accent">Projects</span>
        </h2>

        <div className="projects-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <a
              href={project.address}
              target="blank"
              key={project.id}
              className="project-card bg-dark-card p-6 rounded-lg border border-dark-border cursor-pointer"
            >
              <div>
                <img
                  src={project.image}
                  alt=""
                  className="w-full object-cover h-48 bg-dark-border rounded-lg mb-4 flex items-center justify-center"
                />
              </div>

              <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-dark-accent/20 text-dark-accent text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
