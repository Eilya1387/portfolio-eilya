import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ScrollSkill from "@/components/ScrollSkill";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <div className="md:hidden block ">
        <Skills />
      </div>
      <div className="md:block hidden ">
        <ScrollSkill />
      </div>
      <Projects />
      <Contact />
    </main>
  );
}
