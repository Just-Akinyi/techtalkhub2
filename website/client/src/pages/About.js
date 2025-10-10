// src/pages/About.js
import React from "react";

export default function About() {
  return (
    <div className="bg-background min-h-screen text-text font-poppins">
      {/* Hero */}
      <section className="bg-hero-gradient text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-smoothPulse">
          About Tech Talk Hub
        </h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Empowering Africa’s next generation of digital creators through engaging, hands-on coding education.
        </p>
      </section>

      {/* Hero Image with Tagline */}
      <section className="relative w-full h-64 md:h-96 overflow-hidden flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=1600&q=80"
          alt="Kids coding online"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <h2 className="absolute text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
          Learn. <span className="text-secondary">Create.</span> <span className="text-accent">Innovate.</span>
        </h2>
      </section>

      {/* Content */}
      <section className="py-16 px-6 md:px-20 space-y-12">
        {/* Who We Are */}
        <div className="bg-white rounded-xl shadow-card p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Who We Are</h2>
          <p>
            We are an online education and technology company specializing in digital skills
            training for children and teens.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="bg-white rounded-xl shadow-card p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission & Vision</h2>
          <p className="mb-4">
            <span className="font-semibold text-secondary">Our Mission:</span> To make coding and
            digital literacy accessible, affordable, and engaging for every child in Africa — giving
            them the tools to become creators of technology, not just consumers.
          </p>
          <p>
            <span className="font-semibold text-secondary">Our Vision:</span> A future where African
            youth lead innovation in technology, empowered with the skills and confidence to solve
            real-world challenges through creativity and code.
          </p>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl shadow-card p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">What We Offer</h2>
          <p>
            We provide coding and computer programming classes for students from Kindergarten (K1)
            to Grade 12. Our curriculum includes block-based coding (Scratch), Python, web
            development (HTML, CSS, JavaScript), game development, robotics, and AI for older
            students. We also host coding competitions and emphasize project-based learning to build
            computational thinking, creativity, and problem-solving skills.
          </p>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-xl shadow-card p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">How We Teach</h2>
          <p>
            All classes are delivered 100% online through live, interactive sessions led by trained
            coding instructors. Students engage in real projects, receive personalized feedback, and
            can choose between group classes or one-on-one tutoring.
          </p>
        </div>

        {/* Target Market */}
        <div className="bg-white rounded-xl shadow-card p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Who We Serve</h2>
          <p>
            Our learners include students aged 5–18 (K1 to Grade 12), parents seeking digital skills
            education for their children, and schools aiming to integrate coding into their
            curriculum.
          </p>
        </div>

        {/* Geographic Focus */}
        <div className="bg-white rounded-xl shadow-card p-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Reach</h2>
          <p>
            We currently serve students in Kenya, Uganda, Tanzania, South Africa, and Nigeria — with
            a mission to expand digital literacy across Africa by making high-quality coding
            education accessible and affordable.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Tech Talk Hub. All rights reserved.
      </footer>
    </div>
  );
}
