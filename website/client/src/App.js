import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
// rm -rf build

// npm cache clean --force

// npm run build

// firebase deploy
import BookClassPage from "./pages/BookClass";
import About from "./pages/About";
import ProgramsPage from "./pages/Programs";
import ContactPage from "./pages/Contact";
import TestimonialsPage from "./pages/Testimonials";
import LoginPage from "./pages/Login";
// import BlogPage from "./pages/blogs/BlogPage";
import Pricing from "./pages/Pricing"; 
import PaymentSuccess from "./pages/payment/PaySuccess";
import PaymentFailed from "./pages/payment/PayFail";
// import EnrollPage from "./pages/EnrollPage";
import BackToTopButton from "./components/BackToTopButton";
import ChatButton from "./components/ChatButton";
import StudentProjects from "./pages/StudentProjects";
import NotFoundPage from "./components/NotFoundPage";
import SuccessPage from "./utils/success";
import ErrorPage from "./utils/error";
import Donate from "./pages/Donate";
import TermsPage from "./pages/Terms";
import PaystackButton from "./pages/payment/Pay";

function App() {
  return (
    <div className="font-poppins bg-background min-h-screen">
   
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-class" element={<BookClassPage />} />
        <Route path="/about" element={<About />} />
         <Route path="/projects" element={<StudentProjects />} />
        <Route path="/programs" element={<ProgramsPage />} />
        {/* <Route path="/blog" element={<BlogPage />} /> */}
    <Route path="/donate" element={<Donate />} />
<Route path="/terms" element={<TermsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* <Route path="/enroll" element={<EnrollPage />} /> */}
        <Route path="/paysuccess" element={<PaymentSuccess />} />
        <Route path="/payerror" element={<PaymentFailed />} />
         <Route path="/pay" element={<PaystackButton />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>

     {/* Back to Top Button outside Routes */}
      <BackToTopButton />
      <ChatButton />
    </div>
  );
}

export default App;
