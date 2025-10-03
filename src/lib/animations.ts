import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (element: string, delay = 0) => {
  gsap.from(element, {
    y: 100,
    opacity: 0,
    duration: 1,
    delay,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
};

export const slideInFromLeft = (element: string) => {
  gsap.from(element, {
    x: -100,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
};

export const staggerAnimation = (elements: string) => {
  gsap.from(elements, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: elements,
      start: "top 80%",
    },
  });
};