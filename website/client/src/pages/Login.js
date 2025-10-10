// // src/pages/Login.js
// import React from "react";
// import LearningPage from "./Learning";

// export default function Login() {
//   // ⚠️ TEMPORARY: redirect straight to LearningPage
//   return <LearningPage />;
// }
// src/pages/LoginScreen.js
import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { app } from "../firebase";

export default function LoginScreen() {
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account", // force account picker
  });
  const db = getFirestore(app);

  const handleSignIn = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const bookingRef = doc(db, "bookings", user.uid);
      const bookingSnap = await getDoc(bookingRef);

      if (bookingSnap.exists()) {
        // Existing booking → allow access
        navigate("/dashboard");
      } else {
        // No booking → redirect to free trial
        alert(
          `Welcome ${user.displayName || "there"}! We see you're interested in our coding classes. Press OK to book a free trial class.`
        );
        navigate("/book-class");
      }
    } catch (error) {
      alert("Sign-in failed: " + error.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(135deg, #3B82F6, #9333EA, #FF4081)",
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-sm text-center">
        <img
          src="/assets/logo/Techtalk.png"
          alt="CourseBuddy Logo"
          className="w-16 h-16 mx-auto"
        />
        <h1 className="text-xl font-bold mt-5 text-gray-800">
          Learn. Build. Succeed.
        </h1>

        <button
          onClick={handleSignIn}
          disabled={busy}
          className={`mt-6 flex items-center justify-center w-full border rounded-lg py-2 ${
            busy
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-gray-100 transition"
          }`}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google icon"
            className="w-5 h-5 mr-2"
          />
          {busy ? "Signing in..." : "Sign in with Google"}
        </button>

        <a
          href="/"
          className="mt-2 text-xs text-primary hover:text-secondary transition duration-100"
        >
          ← Back to Website
        </a>
      </div>
    </div>
  );
}


// import React, { useState } from "react";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { app } from "../firebase"; // ✅ import your initialized Firebase app

// export default function LoginScreen() {
//   const [busy, setBusy] = useState(false);
//   const navigate = useNavigate();
//   const auth = getAuth(app);
//   const provider = new GoogleAuthProvider();

//   // const handleSignIn = async () => {
//   //   if (busy) return;
//   //   setBusy(true);
//   //   try {
//   //     await signInWithPopup(auth, provider);
//   //     navigate("/dashboard"); // or AuthGate equivalent
//   //     alert("Signed in successfully!");
//   //   } catch (error) {
//   //     alert("Sign-in failed: " + error.message);
//   //   } finally {
//   //     setBusy(false);
//   //   }
//   // };
//     const handleSignIn = async () => {
//     if (busy) return;
//     setBusy(true);
//     try {
//       const result = await signInWithPopup(auth, provider);
//       const user = result.user;

//       // Check Firestore for existing user
//       const userRef = doc(db, "users", user.uid);
//       const userSnap = await getDoc(userRef);

//       if (userSnap.exists()) {
//         // Existing user
//         navigate("/dashboard");
//       } else {
//         // New user — store their info
//         await setDoc(userRef, {
//           name: user.displayName,
//           email: user.email,
//           createdAt: new Date(),
//         });

//         // Show custom message
//         alert(
//           `Welcome ${user.displayName || "there"}! We see you're interested in our coding classes. Press OK book a free trial class`
//         );
//         navigate("/book-trial"); // your free trial booking page
//       }
//     } catch (error) {
//       alert("Sign-in failed: " + error.message);
//     } finally {
//       setBusy(false);
//     }
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen"
//       style={{
//         background: "linear-gradient(135deg, #3B82F6, #9333EA,#FF4081)", // like AppTheme.primary/secondary
//       }}
//     >
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-sm text-center">
//         <img
//           src="/assets/logo/Techtalk.png"
//           alt="CourseBuddy Logo"
//           className="w-16 h-16 mx-auto"
//         />
//         <h1 className="text-xl font-bold mt-5 text-gray-800">
//           Learn. Build. Succeed.
//         </h1>

//         <button
//           onClick={handleSignIn}
//           disabled={busy}
//           className={`mt-6 flex items-center justify-center w-full border rounded-lg py-2 ${
//             busy
//               ? "opacity-60 cursor-not-allowed"
//               : "hover:bg-gray-100 transition"
//           }`}
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google icon"
//             className="w-5 h-5 mr-2"
//           />
//           {busy ? "Signing in..." : "Sign in with Google"}
//         </button>
// <a href="/" className="mt-2 text-xs text-primary hover:text-secondary transition duration-100">
//   ← Back to Website
// </a>

//       </div>
//     </div>
//   );
// }
