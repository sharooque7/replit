import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Resume from "@/components/resume";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      {/* <About /> */}
      <Projects />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
}
