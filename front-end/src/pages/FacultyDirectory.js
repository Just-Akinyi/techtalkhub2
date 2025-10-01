import React from "react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const visualTeam = [
  "/assets/images/member1.jpeg",
  "/assets/images/member2.jpeg",
  "/assets/images/member3.jpeg",
  "/assets/images/member4.jpeg",
  "/assets/images/member5.jpeg",
  "/assets/images/member6.jpeg",
  "/assets/images/member7.jpeg",
  "/assets/images/member8.jpeg",
  "/assets/images/member9.jpeg",
  "/assets/images/member10.jpeg",
];

const detailedTeam = [
  {
    image: "/assets/images/member1.jpeg",
    name: "Jane Doe",
    title: "Head of Curriculum",
    bio: "Engaging and fun learning experiences with 10+ years in coding education.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    image: "/assets/images/member2.jpeg",
    name: "John Smith",
    title: "Lead Instructor",
    bio: "Web dev and robotics expert. Loves hands-on innovation.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    image: "/assets/images/member3.jpeg",
    name: "Emily White",
    title: "Robotics Instructor",
    bio: "Specialist in AI and robotics, focused on student creativity.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    image: "/assets/images/member4.jpeg",
    name: "Tom White",
    title: "Head of Product",
    bio: "Product manager delivering user-centric education tools.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    image: "/assets/images/member5.jpeg",
    name: "James Wilson",
    title: "CTO",
    bio: "Cloud-based solutions and technical strategy leader.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    image: "/assets/images/member6.jpeg",
    name: "Sarah Williams",
    title: "Director of Sales",
    bio: "Growth strategist with strong market reach.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    image: "/assets/images/member7.jpeg",
    name: "David Miller",
    title: "Lead Engineer",
    bio: "Expert in scalable systems and dev mentoring.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
  {
    image: "/assets/images/member8.jpeg",
    name: "Emily Johnson",
    title: "Marketing",
    bio: "Digital strategy expert for SaaS and EdTech.",
    linkedin: "#",
    twitter: "#",
    github: "#",
  },
];

export default function FacultyDirectoryPage() {
  return (
    <div className="bg-background min-h-screen py-16 px-6 sm:px-12 lg:px-24 font-poppins text-text">

      {/* SECTION 1: MEET OUR TEAM - VISUAL INTRO */}
      <section className="text-center mb-20 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-primary mb-4 tracking-wide">
          Meet our Team
        </h2>
        <p className="text-lg text-text/80 leading-relaxed">
          A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
        </p>
      </section>

      {/* Circle Photos Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 justify-center mb-32">
        {visualTeam.map((src, idx) => (
          <div
            key={idx}
            className="w-32 h-32 rounded-full overflow-hidden mx-auto bg-gradient-to-br from-secondary to-accent shadow-card animate-smoothPulse transition-transform hover:scale-110 cursor-pointer"
            title={`Team Member ${idx + 1}`}
          >
            <img
              src={src}
              alt={`Team Member ${idx + 1}`}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </div>
        ))}
      </section>

      {/* SECTION 2: THE TECH TALK HUB TEAM */}
      <section className="text-center mb-16 max-w-3xl mx-auto">
        <h2 className="text-4xl font-semibold text-primary mb-3">
          The Tech Talk Hub Team
        </h2>
        <p className="text-md text-text/80">
          Experts in technology and education coming together to inspire the next generation.
        </p>
      </section>

      {/* Detailed team cards */}
      <section className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {detailedTeam.map((member, index) => (
          <article
            key={index}
            className="flex flex-col items-center text-center bg-white p-8 rounded-xl shadow-card hover:shadow-btn transition-shadow duration-300"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary mb-5">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>
            <h3 className="text-xl font-semibold text-primary">{member.name}</h3>
            <p className="text-secondary font-medium mb-3">{member.title}</p>
            <p className="text-text/80 text-sm mb-5 leading-relaxed">{member.bio}</p>
            <div className="flex space-x-6 text-text/60 hover:text-primary transition-colors">
              <a
                href={member.linkedin}
                aria-label={`${member.name} LinkedIn`}
                className="text-primary hover:text-secondary"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={member.twitter}
                aria-label={`${member.name} Twitter`}
                className="text-primary hover:text-secondary"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={member.github}
                aria-label={`${member.name} GitHub`}
                className="text-primary hover:text-secondary"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}


// import React from "react";
// import {
//   FaLinkedin,
//   FaTwitter,
//   FaGithub,
// } from "react-icons/fa";

// const visualTeam = [
//   "/assets/images/member1.jpg",
//   "/assets/images/member2.jpg",
//   "/assets/images/member3.jpg",
//   "/assets/images/member4.jpg",
//   "/assets/images/member5.jpg",
//   "/assets/images/member6.jpg",
//   "/assets/images/member7.jpg",
//   "/assets/images/member8.jpg",
//   "/assets/images/member9.jpg",
//   "/assets/images/member10.jpg",
// ];

// const detailedTeam = [
//   {
//     image: "/assets/images/madam.jpeg",
//     name: "Jane Doe",
//     title: "Head of Curriculum",
//     bio: "Engaging and fun learning experiences with 10+ years in coding education.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
//   {
//     image: "/assets/images/sir.jpeg",
//     name: "John Smith",
//     title: "Lead Instructor",
//     bio: "Web dev and robotics expert. Loves hands-on innovation.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
//   {
//     image: "/assets/images/me.jpeg",
//     name: "Emily White",
//     title: "Robotics Instructor",
//     bio: "Specialist in AI and robotics, focused on student creativity.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
//   {
//     image: "/assets/images/member4.jpg",
//     name: "Tom White",
//     title: "Head of Product",
//     bio: "Product manager delivering user-centric education tools.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
//   {
//     image: "/assets/images/member5.jpg",
//     name: "James Wilson",
//     title: "CTO",
//     bio: "Cloud-based solutions and technical strategy leader.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
//   {
//     image: "/assets/images/member6.jpg",
//     name: "Sarah Williams",
//     title: "Director of Sales",
//     bio: "Growth strategist with strong market reach.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
//   {
//     image: "/assets/images/member7.jpg",
//     name: "David Miller",
//     title: "Lead Engineer",
//     bio: "Expert in scalable systems and dev mentoring.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
//   {
//     image: "/assets/images/member8.jpg",
//     name: "Emily Johnson",
//     title: "Marketing",
//     bio: "Digital strategy expert for SaaS and EdTech.",
//     linkedin: "#",
//     twitter: "#",
//     github: "#",
//   },
// ];

// export default function FacultyDirectoryPage() {
//   return (
//     <div className="bg-white py-12 px-4 sm:px-6 lg:px-16">

//       {/* SECTION 1: MEET OUR TEAM - VISUAL INTRO */}
//       <div className="text-center mb-16">
//         <h2 className="text-4xl font-bold text-gray-900">Meet our Team</h2>
//         <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
//           A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
//         </p>
//       </div>

//       {/* Circle Photos Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center mb-24">
//         {visualTeam.map((src, idx) => (
//           <div
//             key={idx}
//             className="w-28 h-28 rounded-full overflow-hidden mx-auto bg-gradient-to-br from-pink-200 to-yellow-200"
//           >
//             <img
//               src={src}
//               alt={`Team Member ${idx + 1}`}
//               className="w-full h-full object-cover rounded-full"
//             />
//           </div>
//         ))}
//       </div>

//       {/* SECTION 2: THE TECH TALK HUB TEAM */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-bold text-gray-900">The Tech Talk Hub Team</h2>
//         <p className="mt-2 text-md text-gray-600">
//           Experts in technology and education coming together to inspire the next generation.
//         </p>
//       </div>

//       <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
//         {detailedTeam.map((member, index) => (
//           <div
//             key={index}
//             className="flex flex-col items-center text-center bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition duration-300"
//           >
//             <img
//               src={member.image}
//               alt={member.name}
//               className="w-24 h-24 object-cover rounded-full border-4 border-gray-200 mb-4"
//             />
//             <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
//             <p className="text-indigo-600 font-medium">{member.title}</p>
//             <p className="text-sm text-gray-600 mt-2">{member.bio}</p>
//             <div className="flex space-x-4 mt-4 text-gray-500">
//               <a href={member.linkedin}><FaLinkedin className="hover:text-indigo-600" /></a>
//               <a href={member.twitter}><FaTwitter className="hover:text-blue-400" /></a>
//               <a href={member.github}><FaGithub className="hover:text-black" /></a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }