import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutProblem from "./components/AboutProblem";
import SectionDivider from "./components/SectionDivider";
import StorytellingScale from "./components/StorytellingScale";
import ImpactCalculator from "./components/ImpactCalculator";
import Programs from "./components/Programs";
import ImpactMetrics from "./components/ImpactMetrics";
import DocumentationMap from "./components/DocumentationMap";
import CommunityEvents from "./components/CommunityEvents";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Durasi animasi 800ms
      once: true, // Animasi hanya diputar sekali saat scroll
      offset: 0, // Trigger saat elemen benar-benar masuk viewport
      easing: "ease-out-cubic", // Efek easing yang halus
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-base overflow-hidden">
      <Navbar />
      <Hero />
      <AboutProblem />
      <SectionDivider />
      <StorytellingScale />
      <SectionDivider />
      <ImpactCalculator />
      <SectionDivider />
      <Programs />
      <SectionDivider />
      <ImpactMetrics />
      <SectionDivider />
      <DocumentationMap />
      <SectionDivider />
      <CommunityEvents />
      <SectionDivider />
      <ContactCTA />
      <Footer />
    </div>
  );
}

export default App;
