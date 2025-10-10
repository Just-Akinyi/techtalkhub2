import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((c) => c - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center font-poppins bg-background">
      <div className="bg-white p-8 rounded-xl shadow-card text-center">
        <h1 className="text-2xl font-bold text-secondary">Booking Failed</h1>
        <h1 className="text-4xl font-bold mb-4 text-text">
          Oops! Something went wrong.
        </h1>
        <p className="text-text">Please try again later.</p>
        <button
          onClick={() => (window.location.href = "/book-class")}
          className="mt-6 bg-primary text-white px-6 py-3 rounded-xl shadow-btn hover:opacity-90 transition"
        >
          Try Again
        </button>
        <p className="mt-2 text-gray-600">
          Redirecting you to homepage in {countdown}s
        </p>
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function ErrorPage() {
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(10);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown((c) => c - 1);
//     }, 1000);

//     const timer = setTimeout(() => {
//       navigate("/");
//     }, 8000);

//     return () => {
//       clearInterval(interval);
//       clearTimeout(timer);
//     };
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-red-100">
//       <div className="bg-white p-8 rounded-xl shadow-md text-center">
//         <h1 className="text-2xl font-bold text-red-600">Booking Failed</h1>
//         <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
//         <p>Please try again later.</p>
//         <button
//           onClick={() => (window.location.href = "/book-class")}
//           className="mt-6 bg-primary px-6 py-3 rounded-xl shadow-btn"
//         >
//           Try Again
//         </button>
//         <p className="mt-2 text-gray-600">
//           Redirecting you to homepage in {countdown}s
//         </p>
//       </div>
//     </div>
//   );
// }

// // // error.js
// // import React from "react";

// // export default function ErrorPage() {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center font-poppins bg-background">
// //       <div className="bg-red-500 p-10 rounded-xl text-white text-center max-w-md shadow-card">
// //         <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong.</h1>
// //         <p>Please try again later.</p>
// //         <button
// //           onClick={() => (window.location.href = "/book")}
// //           className="mt-6 bg-primary px-6 py-3 rounded-xl shadow-btn"
// //         >
// //           Try Again
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }
