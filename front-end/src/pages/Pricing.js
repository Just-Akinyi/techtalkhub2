import React, { useState } from "react";

const plans = [
  {
    name: "Starter",
    classes: "1 class/week",
    monthly: { kes: 6000, usd: 45 },
    quarterly: { kes: 17100, usd: 128 },
    yearly: { kes: 64800, usd: 486 },
    features: [
      "1 personalized live class/week (45 mins each)",
      "Flexible scheduling tailored for your child",
      "Personalized attention in every class",
      "Unlimited rescheduling at student’s convenience",
    ],
  },
  {
    name: "Pro",
    classes: "2 classes/week",
    monthly: { kes: 10000, usd: 75 },
    quarterly: { kes: 28500, usd: 214 },
    yearly: { kes: 108000, usd: 810 },
    features: [
      "2 personalized live classes/week (45 mins each)",
      "8+ fun & engaging classes per month",
      "More focused attention",
      "Unlimited rescheduling at student’s convenience",
    ],
  },
  {
    name: "Elite",
    classes: "3 classes/week",
    monthly: { kes: 13000, usd: 97 },
    quarterly: { kes: 37050, usd: 277 },
    yearly: { kes: 140400, usd: 1053 },
    popular: true,
    features: [
      "3 engaging live classes/week (60 mins each)",
      "12+ fun & engaging classes per month",
      "Balanced attention and group interaction",
      "Priority rescheduling available",
    ],
  },
  {
    name: "Ultimate",
    classes: "4 classes/week",
    monthly: { kes: 15500, usd: 116 },
    quarterly: { kes: 44175, usd: 330 },
    yearly: { kes: 167400, usd: 1256 },
    features: [
      "4 intensive live classes/week (60 mins each)",
      "16+ fun & engaging classes per month",
      "Maximum attention and progress",
      "Limited rescheduling options",
    ],
  },
];

export default function Pricing() {
  const [currency, setCurrency] = useState("kes");
  const [billing, setBilling] = useState("monthly");

  const getDiscount = (billing) => {
    if (billing === "quarterly") return 5;
    if (billing === "yearly") return 10;
    return 0;
  };

  return (
    <div className="bg-background min-h-screen py-12 px-4 font-poppins">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8">
          Subscription Plans (1:1 + Full Playground)
        </h1>

        {/* Toggles */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
          {/* Currency Toggle */}
          <div className="flex border rounded-xl overflow-hidden">
            <button
              onClick={() => setCurrency("kes")}
              className={`px-4 py-2 ${
                currency === "kes"
                  ? "bg-primary text-white"
                  : "bg-white text-text"
              }`}
            >
              KES
            </button>
            <button
              onClick={() => setCurrency("usd")}
              className={`px-4 py-2 ${
                currency === "usd"
                  ? "bg-primary text-white"
                  : "bg-white text-text"
              }`}
            >
              USD
            </button>
          </div>

          {/* Billing Toggle */}
          <div className="flex border rounded-xl overflow-hidden">
            {["monthly", "quarterly", "yearly"].map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className={`px-4 py-2 capitalize ${
                  billing === b ? "bg-secondary text-white" : "bg-white text-text"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const discount = getDiscount(billing);
            const price =
              currency === "kes"
                ? plan[billing].kes.toLocaleString()
                : plan[billing].usd;

            let oldPrice = null;
            if (discount > 0) {
              const base = currency === "kes" ? plan.monthly.kes : plan.monthly.usd;
              const factor = billing === "quarterly" ? 3 : 12;
              oldPrice = base * factor;
            }

            return (
              <div
                key={plan.name}
                className={`relative bg-white shadow-card rounded-2xl p-6 flex flex-col hover:shadow-xl transition-transform duration-300 ${
                  plan.popular ? "border-2 border-primary scale-105 z-10" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow animate-pulse">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                <h2 className="text-xl font-bold text-secondary mb-1">{plan.name}</h2>
                <p className="text-sm text-gray-600 mb-4">{plan.classes}</p>

                {/* Price */}
                <div className="mb-4">
                  <p className="text-2xl font-bold text-primary">
                    {currency === "kes" ? `KES ${price}` : `$${price}`}
                  </p>

                  {oldPrice && (
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="line-through text-gray-400 text-sm">
                        {currency === "kes"
                          ? `KES ${oldPrice.toLocaleString()}`
                          : `$${oldPrice}`}
                      </span>
                      <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {discount}% off
                      </span>
                    </div>
                  )}

                  <p className="text-sm text-gray-500 capitalize mt-1">
                    per {billing}
                  </p>
                </div>

                {/* CTA */}
                <button
                onClick={() => (window.location.href = "/book-class")}
                  className={`mb-6 w-full py-2 rounded-xl font-medium transition ${
                    plan.popular
                      ? "bg-secondary text-white animate-pulse"
                      : "bg-gradient-to-r from-primary to-secondary text-white"
                  }`}
                >
                  Book Trial Class
                </button>

                {/* Features */}
                <ul className="text-left text-sm space-y-2 mt-auto">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-bold">✔</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
