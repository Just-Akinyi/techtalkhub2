import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-background shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo + Name */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleScrollTo("hero")}
        >
          <img src="../logo.png" alt="Logo" className="w-15 h-10" />
          <span className="font-bold text-xl text-primary">Tech Talk Hub</span>
        </div>

        {/* Center nav items - desktop */}
        <div className="hidden md:flex space-x-8 text-text font-medium">
          <button onClick={() => handleScrollTo("pricing")} className="hover:text-secondary">Pricing</button>
          <button onClick={() => handleScrollTo("contact")} className="hover:text-secondary">Contact</button>
          <button onClick={() => handleScrollTo("programs")} className="hover:text-secondary">Courses</button>
          <button onClick={() => (window.location.href = "/careers")} className="hover:text-secondary">Careers</button>
        </div>

        {/* Right side - desktop */}
        <div className="hidden md:flex items-center space-x-4 relative">
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-text font-medium hover:text-secondary"
          >
            Login
          </button>

          {/* Book Trial and Empower CTA */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => (window.location.href = "/book-class")}
              className="bg-secondary text-background px-4 py-2 rounded-xl font-bold shadow-btn hover:bg-secondary-dark"
            >
              Book Trial
            </button>
            <a
              href="/donate"
              className="text-sm text-primary font-medium hover:text-secondary animate-pulse"
              title="Support Education Worldwide"
            >
              📚 Empower a Learner
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background shadow-md">
          <div className="flex flex-col items-center py-6 space-y-4 text-text font-medium">
            <button onClick={() => handleScrollTo("pricing")} className="hover:text-secondary">Pricing</button>
            <button onClick={() => handleScrollTo("contact")} className="hover:text-secondary">Contact</button>
            <button onClick={() => handleScrollTo("programs")} className="hover:text-secondary">Courses</button>
            <button onClick={() => (window.location.href = "/careers")} className="hover:text-secondary">Careers</button>
            <button onClick={() => (window.location.href = "/login")} className="hover:text-secondary">Login</button>

            {/* Book Trial and Empower CTA on Mobile */}
            {/* <div className="flex items-center space-x-3">
              <button
                onClick={() => (window.location.href = "/book-class")}
                className="bg-secondary text-background px-4 py-2 rounded-xl font-bold shadow-btn hover:bg-secondary-dark"
              >
                Book Trial
              </button>
              <a
                href="/donate"
                className="text-sm text-primary font-medium hover:text-secondary animate-pulse"
                title="Support Education Worldwide"
              >
                📚 Empower a Learner
              </a>
            </div> */}

<div className="flex items-center space-x-2">
  <button
    onClick={() => (window.location.href = "/book-class")}
    className="bg-secondary text-background px-4 py-2 rounded-xl font-bold shadow-btn hover:bg-secondary-dark"
  >
    Book Trial
  </button>
  <a
    href="/donate"
    className="px-3 py-1 text-sm font-semibold text-primary bg-primary/10 rounded-full hover:bg-primary/20 animate-pulse transition"
    title="Empower a Learner"
  >
    📚 Empower a Learner
  </a>
</div>




          </div>
        </div>
      )}
    </nav>
  );
}


// import React, { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";

// export default function NavBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   // Handle scroll for background change
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleScrollTo = (id) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//       setIsOpen(false);
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
//         scrolled ? "bg-background shadow-md" : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//         {/* Logo + Name */}
//         <div
//           className="flex items-center space-x-2 cursor-pointer"
//           onClick={() => handleScrollTo("hero")}
//         >
//           <img src="../logo.png" alt="Logo" className="w-15 h-10" />
//           <span className="font-bold text-xl text-primary">Tech Talk Hub</span>
//         </div>

//         {/* Center nav items - desktop */}
//         <div className="hidden md:flex space-x-8 text-text font-medium">
//           <button onClick={() => handleScrollTo("pricing")} className="hover:text-secondary">Pricing</button>
//           <button onClick={() => handleScrollTo("contact")} className="hover:text-secondary">Contact</button>
//           <button onClick={() => handleScrollTo("programs")} className="hover:text-secondary">Courses</button>
//           <button onClick={() => (window.location.href = "/careers")} className="hover:text-secondary">Careers</button>
//         </div>

//         {/* Right side - desktop */}
//         <div className="hidden md:flex items-center space-x-4 relative">
//           <button
//             onClick={() => (window.location.href = "/login")}
//             className="text-text font-medium hover:text-secondary"
//           >
//             Login
//           </button>
//           <div className="flex flex-col items-center">
//             <button
//               onClick={() => (window.location.href = "/book-class")}
//               className="bg-secondary text-background px-4 py-2 rounded-xl font-bold shadow-btn hover:bg-secondary-dark"
//             >
//               Book Trial
//             </button>
//             <a
//               href="/donate"
//               className="text-xs text-primary hover:text-secondary mt-1"
//             >
//               Help Us Educate
//             </a>
//           </div>
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden flex items-center">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-background shadow-md">
//           <div className="flex flex-col items-center py-6 space-y-4 text-text font-medium">
//             <button onClick={() => handleScrollTo("pricing")} className="hover:text-secondary">Pricing</button>
//             <button onClick={() => handleScrollTo("contact")} className="hover:text-secondary">Contact</button>
//             <button onClick={() => handleScrollTo("programs")} className="hover:text-secondary">Courses</button>
//             <button onClick={() => (window.location.href = "/careers")} className="hover:text-secondary">Careers</button>
//             <button onClick={() => (window.location.href = "/login")} className="hover:text-secondary">Login</button>
//             <div className="flex flex-col items-center">
//               <button
//                 onClick={() => (window.location.href = "/book-class")}
//                 className="bg-secondary text-background px-4 py-2 rounded-xl font-bold shadow-btn hover:bg-secondary-dark"
//               >
//                 Book Trial
//               </button>
//               <a
//                 href="/donate"
//                 className="text-xs text-primary hover:text-secondary mt-1"
//               >
//                 Help Us Educate
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
