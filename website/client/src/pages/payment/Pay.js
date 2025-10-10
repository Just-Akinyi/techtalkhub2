import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const validAmounts = {
  KES: [6000, 17100,64800,10000,28500,108000, 13000,37050,140400,15500,44175,167400],
  USD: [45,128,486, 75,214,810, 97,277,1053, 116,330,1256],
};

export default function PaystackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [planName, setPlanName] = useState("");
  const [planClasses, setPlanClasses] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY ;
useEffect(() => {
  if (!window.PaystackPop) {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    document.body.appendChild(script);
  }
}, []);

  useEffect(() => {
    if (location.state?.amount) setAmount(location.state.amount);
    if (location.state?.currency) setCurrency(location.state.currency);
    if (location.state?.planName) setPlanName(location.state.planName);
    if (location.state?.planClasses) setPlanClasses(location.state.planClasses);
  }, [location.state]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateInputs = () => {
    if (!studentName || !email || !amount) {
      setMessage({
        type: "error",
        text: "Please fill in all fields: student name, email, and amount.",
      });
      return false;
    }

    if (!validateEmail(email)) {
      setMessage({ type: "error", text: "Enter a valid email address." });
      return false;
    }

    const amtNumber = Number(amount);
    if (!validAmounts[currency]?.includes(amtNumber)) {
      setMessage({
        type: "error",
        text: `Invalid amount for ${currency}. Please select a valid plan.`,
      });
      return false;
    }

    return true;
  };

  const verifyPayment = async (reference, retries = 3) => {
    const url =
      "https://us-central1-tech-talk-hub.cloudfunctions.net/verifyPayment";
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference, studentName }),

        });
        const data = await res.json();

        if (data.status === "success") {
          setMessage({
            type: "success",
            text: `Payment successful! Reference: ${reference}`,
          });
          setEmail("");
          setAmount("");
          setStudentName("");
          return true;
        } else if (i === retries - 1) {
          setMessage({ type: "error", text: "Payment verification failed." });
          return false;
        }
      } catch (err) {
        if (i === retries - 1)
          setMessage({
            type: "error",
            text: "Server error. Try again later.",
          });
      }
    }
  };

  const handlePay = () => {
  if (!validateInputs()) return;

  if (typeof window.PaystackPop !== "object") {
    setMessage({ type: "error", text: "Payment SDK not loaded yet. Please wait a few seconds and try again." });
    return;
  }

  const handler = window.PaystackPop.setup({
    key: PUBLIC_KEY,
    email: String(email),
    amount: Number(amount) * 100,
    currency: String(currency).toUpperCase(),
    metadata: { studentName: String(studentName) },
    callback: function (response) {
      if (!response?.reference) {
        setMessage({ type: "error", text: "No payment reference returned." });
        return;
      }
      setLoading(true);
      setMessage({ type: "info", text: "Verifying payment..." });
      verifyPayment(response.reference).then((success) => {
        setLoading(false);
        navigate(success ? "/paysuccess" : "/payerror");
      });
    },
    onClose: function () {
      setMessage({
        type: "error",
        text: "Payment popup closed without completing transaction.",
      });
      navigate("/");
    },
  });

  handler.openIframe();
};


  const isPayDisabled = !studentName || !email || !amount || loading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 font-poppins">
      <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-8 animate-fadeIn">
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-gradient-to-r from-primary to-secondary w-16 h-16 flex items-center justify-center rounded-full shadow-md text-white text-2xl font-bold">
            TT
          </div>
          <h2 className="text-2xl font-bold text-primary mt-3">Tech Talk Hub</h2>
          <p className="text-gray-600 text-sm">Secure Payment Portal</p>
        </div>

        {/* Plan Summary */}
        {amount && (
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 mb-6 text-center border border-primary/20">
            <p className="font-semibold text-gray-800">
              Selected Plan:{" "}
              <span className="text-primary">{planName || "Custom Plan"}</span>
            </p>
            {planClasses && (
              <p className="text-gray-700 text-sm">{planClasses}</p>
            )}
            <p className="text-gray-700 mt-1">
              Amount:{" "}
              <span className="text-secondary font-semibold">
                {currency === "KES" ? `KES ${amount}` : `$${amount}`}
              </span>
            </p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter student's full name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
          />

          <input
            type="number"
            placeholder={`Enter amount (${currency})`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-secondary focus:outline-none"
          />

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={isPayDisabled}
            className={`w-full py-3 rounded-xl font-semibold transition shadow-btn ${
              isPayDisabled
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : "bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 animate-smoothPulse"
            }`}
          >
            {loading ? "Processing..." : `Pay Now (${currency})`}
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div
            className={`mt-6 p-4 rounded-xl border text-sm text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border-green-300"
                : message.type === "error"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-blue-100 text-blue-700 border-blue-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Payments are processed securely via Paystack 🔒
        </p>
      </div>
    </div>
  );
}
