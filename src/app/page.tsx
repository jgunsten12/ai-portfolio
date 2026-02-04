import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProjectsSection from "@/components/ProjectsSection";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <AboutMe />
        <StatsBar />
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
}
