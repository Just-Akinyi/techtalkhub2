// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: "tech-talk-hub.firebasestorage.app",
  storageBucket: "tech-talk-hub.appspot.com",
  messagingSenderId: "457529885849",
  appId: "1:457529885849:web:ae19d7e75df7844f97a408",
  measurementId: "G-4PJB85ENJE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
