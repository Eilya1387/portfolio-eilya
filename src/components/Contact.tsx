"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-title", {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 70%",
        },
      });

      gsap.from(".contact-form", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 75%",
        },
      });

      const button = document.querySelector(".submit-button");
      if (button) {
        button.addEventListener("mousemove", (e: Event) => {
          const event = e as MouseEvent;
          const rect = (button as HTMLElement).getBoundingClientRect();
          const x = event.clientX - rect.left - rect.width / 2;
          const y = event.clientY - rect.top - rect.height / 2;

          gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
          });
        });

        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
      }

      const inputs = document.querySelectorAll(".form-input");
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          gsap.to(input, {
            scale: 1.02,
            borderColor: "#00c754",
            duration: 0.3,
          });
        });

        input.addEventListener("blur", () => {
          gsap.to(input, {
            scale: 1,
            duration: 0.3,
          });
        });
      });

      gsap.to(".email-float", {
        y: -15,
        rotation: 5,
        duration: 2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    gsap.to(".contact-form", {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        const successMsg = document.createElement("div");
        successMsg.className = "success-message";
        successMsg.textContent = "✓ Message sent successfully!";
        successMsg.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #00c754;
          color: black;
          padding: 20px 40px;
          border-radius: 10px;
          font-weight: bold;
          z-index: 1000;
          opacity: 0;
        `;
        document.body.appendChild(successMsg);

        gsap.to(successMsg, {
          opacity: 1,
          scale: 1.1,
          duration: 0.3,
          onComplete: () => {
            gsap.to(successMsg, {
              opacity: 0,
              delay: 2,
              onComplete: () => successMsg.remove(),
            });
          },
        });
      },
    });

    setFormData({ name: "", email: "", message: "" });
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "Eilyamirmozafary@gmail.com",
      link: "mailto:eilya@example.com",
    },
    {
      icon: <FaTelegramPlane color="#4c88c4"/>,
      title: "Telegram Channel",
      value: "Coffee Web",
      link: "https://t.me/coffeee_web",
    },
    { icon: "📍", title: "Location", value: "Qazvin, Iran", link: "#" },
  ];

  const socialLinks = [
    {
      icon: <FaInstagram />,
      name: "Instagram",
      url: "https://www.instagram.com/eilya.master/",
      color: "#6a30c8",
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/Eilya1387",
      color: "#333",
    },
    {
      icon: <FaTelegramPlane />,
      name: "Telegram",
      url: "https://t.me/coffeee_web",
      color: "#0088cc",
    },
    { icon: <FaLinkedin />, name: "Linkdin", url: "#", color: "#b31313" },
  ];

  return (
    <section
      ref={contactRef}
      className="contact-section min-h-screen py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-dark-bg relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-dark-accent rounded-full blur-3xl top-10 sm:top-20 right-10 sm:right-20 animate-pulse"></div>
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-blue-500 rounded-full blur-3xl bottom-10 sm:bottom-20 left-10 sm:left-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" id="contact">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="contact-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
            Get In <span className="text-dark-accent">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 px-4">
            Have a project in mind? Let's create something amazing together!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          <div className="contact-form order-2 md:order-1">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-300">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-card border-2 border-dark-border rounded-lg focus:outline-none focus:border-dark-accent transition-all text-white text-sm sm:text-base"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-card border-2 border-dark-border rounded-lg focus:outline-none focus:border-dark-accent transition-all text-white text-sm sm:text-base"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-300">
                  Your Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  className="form-input w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-card border-2 border-dark-border rounded-lg focus:outline-none focus:border-dark-accent transition-all text-white resize-none text-sm sm:text-base"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-button w-full px-6 sm:px-8 py-3 sm:py-4 bg-dark-accent text-black font-bold rounded-lg hover:shadow-2xl transition-all text-base sm:text-lg"
                style={{ boxShadow: "0 0 30px rgba(0, 199, 84, 0.3)" }}
              >
                Send Message 🚀
              </button>
            </form>
          </div>

          <div className="contact-info space-y-6 sm:space-y-8 order-1 md:order-2">
            <div className="email-float text-center mb-8 sm:mb-12">
              <div className="inline-block text-6xl sm:text-7xl md:text-8xl">
                📬
              </div>
            </div>

            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="contact-card block p-4 sm:p-6 bg-dark-card rounded-xl border border-dark-border hover:border-dark-accent transition-all group"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-3xl sm:text-4xl md:text-5xl group-hover:scale-110 transition-transform flex-shrink-0">
                    {info.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm text-gray-400 mb-1">
                      {info.title}
                    </div>
                    <div className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-dark-accent transition-colors break-words">
                      {info.value}
                    </div>
                  </div>
                </div>
              </a>
            ))}

            <div className="social-links pt-6 sm:pt-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
                Connect With Me
              </h3>
              <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="social-icon w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-2xl sm:text-2xl md:text-3xl bg-dark-card rounded-full border-2 border-dark-border hover:border-dark-accent hover:scale-110 transition-all"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 sm:mt-16 md:mt-20 text-gray-500">
          <p className="text-base sm:text-lg">Made with 💚 by Eilya</p>
          <p className="text-xs sm:text-sm mt-2">© 2025 All rights reserved</p>
        </div>
      </div>
    </section>
  );
}
