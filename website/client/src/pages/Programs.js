// src/pages/ProgramsPage.js
import React from "react";
import { FaCheckCircle, FaUserGraduate, FaBookOpen, FaClock, FaTasks } from "react-icons/fa";

const programs = [
  {
    title: "AI & Coding Grandmaster: Master Coding Skills",
    age: "Age 5-15",
    grade: "Grade 1-10",
    activities: "350+ Activities",
    lessons: "144 Lessons",
    duration: "12-18 months",
    description:
      "Explore 144 interactive lessons to become a master of AI and coding. Choose a guided path or personalize your journey.",
    outcomes: [
      "Build apps, games, and websites",
      "Master AI and coding skills",
      "Engage in project-based learning",
      "Earn an AI & Coding Grandmaster certificate, accredited by STEM.org",
    ],
    curriculumLink: "#",
    trialLink: "#",
    image: "https://placehold.co/600x300/3F51B5/fff?text=Grandmaster",
  },
  {
    title: "AI & Coding Prodigy: Code Like a Pro",
    age: "Age 5-17",
    grade: "Grade 1-12",
    activities: "184+ Activities",
    lessons: "96 Lessons",
    duration: "9-12 months",
    description:
      "A 96-lesson curriculum for kids and teens to master AI, coding, and real-world applications through projects.",
    outcomes: [
      "Learn to code like a pro",
      "Create amazing apps and games",
      "Earn AI & Coding Prodigy certificate (STEM.org Accredited)",
      "Master problem-solving skills",
    ],
    curriculumLink: "#",
    trialLink: "#",
    image: "https://placehold.co/600x300/FF4081/fff?text=Prodigy",
  },
  {
    title: "AI & Coding Champion: Learn to Code",
    age: "Age 5-17",
    grade: "Grade 1-12",
    activities: "50+ Activities",
    lessons: "48 Lessons",
    duration: "4-6 months",
    description:
      "Kickstart AI & coding for kids and teens with 48 fun lessons and hands-on projects that build skills and creativity.",
    outcomes: [
      "Kickstart your AI & coding journey",
      "Build amazing apps, games & websites",
      "Earn AI & Coding Champion certificate (STEM.org Accredited)",
      "Unlock problem-solving superpowers",
    ],
    curriculumLink: "#",
    trialLink: "#",
    image: "https://placehold.co/600x300/00BFA5/fff?text=Champion",
  },
  {
    title: "Scratch Programming with AI: Unleash Your Creativity",
    age: "Age 5-14",
    grade: "Grade 1-8",
    activities: "50+ Activities",
    lessons: "36 Lessons",
    duration: "2-4 months",
    description:
      "Master AI and coding with Scratch: create games, animations, explore AI, and unlock endless creative potential.",
    outcomes: [
      "Learn block-based coding",
      "Create fun animations & games",
      "Explore the basics of Artificial Intelligence",
      "Design interactive stories & digital art",
    ],
    curriculumLink: "#",
    trialLink: "#",
    image: "https://placehold.co/600x300/FFC107/333?text=Scratch+AI",
  },
];

export default function ProgramsPage() {
  return (
    <div className="bg-background min-h-screen py-12 px-6 md:px-16">
      <h1 className="text-3xl font-bold text-center mb-12 font-poppins text-primary">
        Choose an{" "}
        <span className="text-secondary">AI & Coding Course</span> that excites
        your child
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {programs.map((program, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border-2 border-transparent shadow-card p-4 flex flex-col hover:border-primary hover:shadow-lg hover:scale-[1.02] transition-transform duration-300 h-full"
          >
            {/* Image + Ribbon */}
            <div className="relative">
              <img
                src={program.image}
                alt={program.title}
                className="rounded-md w-full h-40 object-cover"
              />
              {/* AI Tag - Red */}
              <span className="absolute top-2 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-r-lg shadow-md">
                AI
              </span>
              {/* Age Badge Transparent */}
              <span className="absolute top-2 right-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded">
                {program.age}
              </span>
            </div>

            {/* Text */}
            <h2 className="text-lg font-semibold mt-3 text-primary">
              {program.title}
            </h2>

            {/* Info with icons (smaller font) */}
            <div className="text-[12px] sm:text-[13px] text-gray-600 grid grid-cols-2 gap-y-1 mt-2">
              <div className="flex items-center gap-1.5">
                <FaUserGraduate className="text-secondary text-xs" /> {program.grade}
              </div>
              <div className="flex items-center gap-1.5">
                <FaTasks className="text-accent text-xs" /> {program.activities}
              </div>
              <div className="flex items-center gap-1.5">
                <FaBookOpen className="text-primary text-xs" /> {program.lessons}
              </div>
              <div className="flex items-center gap-1.5">
                <FaClock className="text-funPop text-xs" /> {program.duration}
              </div>
            </div>

            <p className="text-sm text-gray-700 mt-2 flex-grow">{program.description}</p>

            {/* Outcomes with ticks */}
            <div className="mt-3 flex-grow">
              <h3 className="text-sm font-semibold text-primary mb-2">
                Learning outcomes
              </h3>
              <ul className="space-y-1">
                {program.outcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <FaCheckCircle className="text-accent text-sm flex-shrink-0 mt-[2px]" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons (stick bottom) */}
            <div className="mt-auto flex flex-col gap-2">
              <a
                href={program.curriculumLink}
                className="text-secondary text-sm font-semibold hover:underline"
              >
                📘 Download curriculum
              </a>
              <a
                href={program.trialLink}
                className="bg-secondary text-white text-center py-2 rounded-xl shadow-btn font-semibold hover:bg-pink-600 transition"
              >
                🎉 Try a free lesson
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
