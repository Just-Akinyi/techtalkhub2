import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/pricing");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-poppins px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="animate-smoothPulse text-red-600 text-6xl mb-4">❌</div>
        <h1 className="text-2xl font-bold text-secondary mb-2">
          Payment Failed
        </h1>
        <p className="text-text mb-4">
          Oops! Something went wrong with your transaction. Please try again or
          use another payment method.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to Pricing in {count}s...
        </p>
        <a
          href="/pricing"
          className="inline-block px-6 py-3 bg-secondary text-white font-medium rounded-xl shadow hover:bg-primary transition"
        >
          Back to Pricing
        </a>
      </div>
    </div>
  );
}
