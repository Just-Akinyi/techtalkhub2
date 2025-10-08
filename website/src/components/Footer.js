// src/components/AppFooter.js
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

export default function AppFooter() {
  const socialLinks = [
    { icon: FaFacebook, label: "Facebook", href: "#" },
    { icon: FaTwitter, label: "Twitter", href: "#" },
    { icon: FaYoutube, label: "YouTube", href: "#" },
    { icon: FaLinkedin, label: "LinkedIn", href: "#" },
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaDiscord, label: "Discord", href: "#" },
  ];

  return (
    <footer className="w-full bg-hero-gradient text-white py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Contact Section */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl text-center space-y-5 shadow-card">
          <h2 className="text-3xl font-bold text-funPop">Got Questions?</h2>
          <p className="text-white/80 text-md">Send us a message and we'll get back to you soon.</p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-4 py-2 rounded-lg w-full md:w-72 text-text focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="bg-secondary text-background font-semibold px-5 py-2 rounded-lg shadow-btn hover:bg-funPop hover:text-text transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          {/* Social Icons Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-funPop">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-funPop transition text-2xl"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <FooterColumn
            title="Company"
            items={["About Us", "Programs", "Blog", "Careers", "Contact"]}
          />

          {/* Popular Courses */}
          <FooterColumn
            title="Popular Courses"
            items={[
              "Scratch Programming",
              "Python for Kids",
              "Web Development",
              "AI & ML",
              "App Development",
            ]}
          />

          {/* Premium Tracks */}
          <FooterColumn
            title="Premium Tracks"
            items={["AI Champion", "AI Prodigy", "AI Grandmaster"]}
          />
        </div>

        {/* Copyright */}
        <div className="text-center text-white/60 text-xs border-t border-white/20 pt-6">
          © {new Date().getFullYear()} Tech Talk Hub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-funPop">{title}</h3>
      <ul className="space-y-1">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="text-white/80 hover:text-white transition cursor-pointer"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
