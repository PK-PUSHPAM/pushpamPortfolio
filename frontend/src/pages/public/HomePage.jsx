import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../sections/home/HeroSection";
import HighlightsSection from "../../sections/home/HighlightsSection";
import AboutSection from "../../sections/home/AboutSection";
import SkillsSection from "../../sections/home/SkillsSection";
import ProjectsSection from "../../sections/home/ProjectsSection";
import ContactSection from "../../sections/home/ContactSection";
import CTASection from "../../sections/home/CTASection";

const HomePage = () => {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <HighlightsSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <CTASection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
