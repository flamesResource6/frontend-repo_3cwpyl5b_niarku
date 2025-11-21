import React, { useMemo, useState } from "react";

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function Pricing({ mode }) {
  const isTutor = mode === "tutor";
  const [billing, setBilling] = useState("monthly");
  const discount = 0.1; // 10%

  const plans = useMemo(() => {
    const base = [
      { name: "Free", price: 0, desc: "1 reading per day. No Tutor mode.", features: ["1 daily reading", "1-card & 3-card", "No Tutor mode"] },
      { name: "Reader", price: 5, desc: "Unlimited readings monthly.", features: ["Unlimited readings", "All spreads", "No Tutor mode"] },
      { name: "Oracle", price: 12, desc: "Full Reading + full Tutor mode.", features: ["Unlimited readings", "Tutor mode", "All spreads, all insights"] },
    ];
    return base.map((p) => ({
      ...p,
      monthly: p.price,
      annual: Math.round(p.price * 12 * (1 - discount) * 100) / 100,
    }));
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl font-bold ${isTutor ? "text-indigo-100" : "text-slate-900"}`}>Pricing</h2>
          <div className="flex items-center gap-2 text-sm">
            <span className={`${isTutor ? "text-indigo-200/80" : "text-slate-600"}`}>Monthly</span>
            <button
              onClick={() => setBilling((b) => (b === "monthly" ? "annual" : "monthly"))}
              className={`relative inline-flex w-14 h-8 rounded-full transition ${
                isTutor ? "bg-indigo-800" : "bg-indigo-200"
              }`}
              aria-label="Toggle billing period"
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 rounded-full transition-transform ${
                  billing === "annual" ? "translate-x-6" : "translate-x-0"
                } ${isTutor ? "bg-indigo-400" : "bg-white"}`}
              />
            </button>
            <span className={`${isTutor ? "text-indigo-200/80" : "text-slate-600"}`}>Annual -10%</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, idx) => {
            const price = billing === "monthly" ? p.monthly : p.annual / 12;
            const highlight = idx === 2;
            return (
              <div
                key={p.name}
                className={`p-6 rounded-2xl border flex flex-col gap-4 ${
                  isTutor
                    ? highlight
                      ? "bg-indigo-900/60 border-indigo-500/50"
                      : "bg-slate-900/60 border-indigo-900/40"
                    : highlight
                    ? "bg-indigo-50 border-indigo-300"
                    : "bg-white border-indigo-200"
                }`}
              >
                <div className="flex items-baseline gap-2">
                  <h3 className={`text-xl font-semibold ${isTutor ? "text-indigo-100" : "text-slate-900"}`}>{p.name}</h3>
                </div>
                <div>
                  <span className={`text-3xl font-bold ${isTutor ? "text-indigo-100" : "text-slate-900"}`}>{formatPrice(price)}</span>
                  <span className={`${isTutor ? "text-indigo-300/70" : "text-slate-500"}`}>/mo</span>
                </div>
                <p className={`${isTutor ? "text-indigo-200/80" : "text-slate-600"}`}>{p.desc}</p>
                <ul className={`space-y-2 text-sm ${isTutor ? "text-indigo-200/80" : "text-slate-700"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isTutor ? "bg-indigo-400" : "bg-indigo-500"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-auto rounded-lg px-4 py-2 font-medium ${
                    isTutor
                      ? highlight
                        ? "bg-indigo-500 text-white"
                        : "bg-white/10 text-indigo-100 hover:bg-white/20"
                      : highlight
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-100 text-indigo-900 hover:bg-indigo-200"
                  }`}
                >
                  Choose {p.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
