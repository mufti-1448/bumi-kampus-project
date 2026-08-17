import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutProblem from "./components/AboutProblem";
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
      duration: 800,
      once: true,
      offset: 0,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-base overflow-hidden">
      <Navbar />
      <Hero />
      <AboutProblem />
      <StorytellingScale />
      <ImpactCalculator />
      <Programs />
      <ImpactMetrics />
      <DocumentationMap />
      <CommunityEvents />
      <ContactCTA />
      <Footer />
    </div>
  );
}

export default App;
