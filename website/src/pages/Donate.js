// src/pages/Donate.js
import React, { useState, useRef, useEffect } from "react";

export default function Donate() {
  const [currency, setCurrency] = useState("KES");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const titleRef = useRef(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    // Web Animations API — reliable and JS-controlled
    const anim = el.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(.2,.8,.2,1)",
        fill: "forwards",
        delay: 120,
      }
    );

    // cleanup
    return () => anim.cancel();
  }, []); // run on mount

  const handleDonate = () => {
    const finalAmount = customAmount || amount;
    if (!finalAmount) {
      alert("Please select or enter an amount.");
      return;
    }
    alert(`Donating ${currency} ${finalAmount}`);
  };

  return (
    <div className="bg-background min-h-screen font-poppins text-text">
      {/* Hero Section */}
      <section className="bg-hero-gradient text-white text-center py-16">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ opacity: 0 }} // start invisible until animation runs
        >
          Empower a Learner 🌍
        </h1>
        <p className="max-w-2xl mx-auto text-lg opacity-90">
          Your donation helps a child gain access to coding education and
          digital skills that can change their future.
        </p>
      </section>

      {/* Image + Donation Area */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative rounded-xl overflow-hidden shadow-card">
          <img
            src="/projects/donate.jpeg"
            alt="Child learning to code"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <p className="text-white text-xl font-semibold px-6 text-center">
              Every contribution counts — one child, one future at a time.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-card p-8 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Make a Donation</h2>
          <p className="mb-6 text-gray-600">
            Choose your currency and amount to support digital learning.
          </p>

          <div className="flex justify-center space-x-4 mb-6">
            {["KES", "USD"].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-2 rounded-xl border ${
                  currency === curr
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            {["500", "1000", "2000", "5000", "10000", "20000"].map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setAmount(amt);
                  setCustomAmount("");
                }}
                className={`px-4 py-2 rounded-xl border shadow-sm ${
                  amount === amt
                    ? "bg-secondary text-white border-secondary"
                    : "border-gray-300 text-gray-600 hover:bg-background"
                }`}
              >
                {currency} {amt}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount("");
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 focus:ring-2 focus:ring-primary outline-none"
          />

          <button
            onClick={handleDonate}
            className="bg-secondary hover:bg-primary text-white px-8 py-3 rounded-xl shadow-btn transition"
          >
            Donate Now →
          </button>
        </div>
      </section>

      <footer className="text-center py-10 text-sm text-gray-500">
        © {new Date().getFullYear()} Tech Talk Hub. All rights reserved.
      </footer>
    </div>
  );
}
