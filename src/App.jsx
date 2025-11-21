import React, { useState } from "react";
import Hero from "./components/Hero";
import Modes from "./components/Modes";
import Pricing from "./components/Pricing";
import Logo from "./components/Logo";

function App() {
  const [mode, setMode] = useState("read"); // read = day, tutor = night

  const isTutor = mode === "tutor";

  return (
    <div className={`min-h-screen ${isTutor ? "bg-slate-950" : "bg-gradient-to-b from-indigo-50 to-white"}`}>
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <Logo size={36} />
        <nav className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setMode("read")}
            className={`px-3 py-1.5 rounded-full ${
              !isTutor ? "bg-indigo-600 text-white" : "bg-white/10 text-indigo-100"
            }`}
          >
            Reading
          </button>
          <button
            onClick={() => setMode("tutor")}
            className={`px-3 py-1.5 rounded-full ${
              isTutor ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-900"
            }`}
          >
            Tutor
          </button>
        </nav>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6">
          <Hero mode={mode} setMode={setMode} />
        </section>
        <Modes mode={mode} />
        <Pricing mode={mode} />
      </main>

      <footer className="py-10 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AI Tarot — Readings with insight
      </footer>
    </div>
  );
}

export default App;
