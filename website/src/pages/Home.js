//T BE FAST
// window.history.back() which triggers a full page navigation → not smooth.
// Instead we should use React Router’s useNavigate hook

import React from "react";
import HeroBackground from "../components/HeroBackground";
import SliderWidget from "../components/Slider";
// import AboutPage from "./About";
import AboutHighlight from "../components/AboutHighlight";
import ProgramsPage from "./Programs";
import FacultyDirectoryPage from "./FacultyDirectory";
import AdmissionsPage from "./Admissions";
import TestimonialsPage from "./Testimonials";
import ContactPage from "./Contact";
import AppFooter from "../components/Footer";
import Pricing from "./Pricing";
import HeroContent from "../components/HeroContent"; // Add this at the top
import NavBar from "../components/NavBar";
import StudentProjects from "./StudentProjects";

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
         <NavBar />
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center">
        <HeroBackground>
          <div className="px-6 md:px-24 py-16 flex flex-col md:flex-row items-center md:justify-between h-full space-y-8 md:space-y-0">
            <HeroContent />
            <img
              src="../hero.png"
              alt="Hero"
              className="w-82 md:w-106 rounded-xl shadow-card"
            />
          </div>
        </HeroBackground>
      </section>

      {/* Slider Section */}
      <section className="bg-white relative -mt-12">
        <div className="max-w-7xl mx-auto px-6">
          <SliderWidget />
        </div>
      </section>
        {/* Programs Section */}
      <section id="programs" className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ProgramsPage />
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <Pricing />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 bg-white ">
        <div className="max-w-7xl mx-auto px-2">
          {/* <AboutPage /> */}
<AboutHighlight />

        </div>
      </section>

    

      {/* Faculty Section */}
      <section id="faculty" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FacultyDirectoryPage />
        </div>
      </section>

      {/* Admissions Section */}
      <section id="admissions" className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <AdmissionsPage />
        </div>
      </section>

        {/* Projects Section */}
      <section id="about" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <StudentProjects />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <TestimonialsPage />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <ContactPage />
        </div>
      </section>

      <AppFooter />
    </div>
  );
}
