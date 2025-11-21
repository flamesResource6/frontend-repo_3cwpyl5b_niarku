import React from "react";

function Modes({ mode }) {
  const isTutor = mode === "tutor";
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div className={`p-8 rounded-2xl border ${
          isTutor ? "bg-slate-900/60 border-indigo-900/40" : "bg-white border-indigo-200"
        }`}>
          <h2 className={`text-2xl font-bold mb-2 ${isTutor ? "text-indigo-100" : "text-slate-900"}`}>What is AI Tarot?</h2>
          <p className={`${isTutor ? "text-indigo-200/80" : "text-slate-600"}`}>
            A modern divination companion powered by AI. Ask a question, choose a spread, and watch as cards are drawn and interpreted with clarity and empathy.
          </p>
        </div>
        <div className={`p-8 rounded-2xl border ${
          isTutor ? "bg-slate-900/60 border-indigo-900/40" : "bg-white border-indigo-200"
        }`}>
          <h3 className={`text-xl font-semibold mb-2 ${isTutor ? "text-indigo-100" : "text-slate-900"}`}>Two modes</h3>
          <ul className={`space-y-2 list-disc pl-5 ${isTutor ? "text-indigo-200/80" : "text-slate-700"}`}>
            <li>Reading mode: choose 1-card, 3-cards, or Celtic Cross. Clean daylight UI.</li>
            <li>Tutor mode: the same spreads with step-by-step guidance. Night ambiance.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Modes;
