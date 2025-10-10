import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-poppins px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <div className="animate-smoothPulse text-green-600 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-primary mb-2">
          Payment Successful!
        </h1>
        <p className="text-text mb-4">
          Thank you for enrolling. We’ve received your payment and sent a
          confirmation to your email.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Redirecting to Dashboard in {count}s...
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-xl shadow hover:bg-secondary transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
