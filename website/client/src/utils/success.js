import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins bg-green-100">
      <div className="bg-accent p-10 rounded-xl text-white text-center max-w-md shadow-card">
        <h1 className="text-4xl font-bold mb-4">Booking Successful! 🎉</h1>
        <p>You will receive a confirmation email soon.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-primary px-6 py-3 rounded-xl shadow-btn"
        >
          Back to Home
        </button>
        <p className="mt-2 text-gray-200">
          Redirecting you to homepage in {countdown}s
        </p>
      </div>
    </div>
  );
}


// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SuccessPage() {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown((c) => c - 1);
//     }, 1000);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate("/");
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [navigate]);

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-green-100">
// //       <div className="bg-accent p-10 rounded-xl text-white text-center max-w-md shadow-card">
// //          <h1 className="text-4xl font-bold mb-4">Booking Successful! 🎉</h1>
// //          <p>You will receive a confirmation email soon.</p>
// //          <button
// //            onClick={() => (window.location.href = "/")}
// //            className="mt-6 bg-primary px-6 py-3 rounded-xl shadow-btn"
// //          >
// //            Back to Home
// //          </button>
// //       </div>
// //       <div className="bg-white p-8 rounded-xl shadow-md text-center">
// //         <h1 className="text-2xl font-bold text-green-600">Booking Confirmed!</h1>
// //         <p className="mt-2 text-gray-600">Redirecting you to homepage...</p>
// //       </div>
// //     </div>
// //   );
// // }


// // // success.js
// // import React from "react";

// // export default function SuccessPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center font-poppins bg-green-100">
//       <div className="bg-accent p-10 rounded-xl text-white text-center max-w-md shadow-card">
//         <h1 className="text-4xl font-bold mb-4">Booking Successful! 🎉</h1>
//         <p>You will receive a confirmation email soon.</p>
//         <button
//           onClick={() => (window.location.href = "/")}
//           className="mt-6 bg-primary px-6 py-3 rounded-xl shadow-btn"
//         >
//           Back to Home
//         </button>
//         <p className="mt-2 text-gray-600">
//           Redirecting you to homepage in {countdown}s
//         </p>
//       </div>
//     </div>
//   );
// }
