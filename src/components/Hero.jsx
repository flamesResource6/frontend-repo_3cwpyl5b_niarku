import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const tarotDeck = [
  { name: "The Fool", meaning: "New beginnings, leap of faith", img: "/tarot/fool.jpg" },
  { name: "The Magician", meaning: "Manifestation, power", img: "/tarot/magician.jpg" },
  { name: "The High Priestess", meaning: "Intuition, inner voice", img: "/tarot/highpriestess.jpg" },
  { name: "The Empress", meaning: "Abundance, nurture", img: "/tarot/empress.jpg" },
  { name: "The Emperor", meaning: "Structure, authority", img: "/tarot/emperor.jpg" },
];

function Card({ card, revealed, index }) {
  return (
    <motion.div
      className="relative w-40 h-64 rounded-xl bg-zinc-900/50 overflow-hidden border border-white/10 shadow-2xl"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: revealed ? 180 : 0 }}
      transition={{ duration: 0.8, delay: index * 0.4 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-gradient-to-br from-indigo-900 to-zinc-900">
        <div className="w-28 h-44 rounded-lg border-2 border-indigo-400/50" />
      </div>
      <div
        className="absolute inset-0 backface-hidden"
        style={{ transform: "rotateY(180deg)" }}
      >
        <img
          src={card.img}
          alt={card.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=800&auto=format&fit=crop";
          }}
        />
        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-sm">
          {card.name}
        </div>
      </div>
    </motion.div>
  );
}

function Ticker({ text, show, night }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={`mt-4 text-center text-sm font-medium ${
            night ? "text-indigo-200" : "text-indigo-900"
          }`}
        >
          <span className={`px-3 py-1 rounded-full ${night ? "bg-indigo-500/20" : "bg-indigo-100"} animate-pulse`}>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ mode, setMode }) {
  const isTutor = mode === "tutor"; // tutor = night, reader = day
  const [revealedCount, setRevealedCount] = useState(0);
  const [sequence, setSequence] = useState([]);

  const colors = isTutor
    ? "from-slate-950 via-indigo-950 to-slate-900"
    : "from-indigo-50 via-white to-indigo-100";

  const textColor = isTutor ? "text-indigo-100" : "text-slate-800";

  useEffect(() => {
    // pick 3 random unique cards for 3-card draw
    const indices = new Set();
    while (indices.size < 3) indices.add(Math.floor(Math.random() * tarotDeck.length));
    const picked = Array.from(indices).map((i) => tarotDeck[i]);
    setSequence(picked);
    setRevealedCount(0);

    const timers = picked.map((_, i) =>
      setTimeout(() => setRevealedCount((c) => Math.max(c, i + 1)), 600 + i * 900)
    );
    return () => timers.forEach(clearTimeout);
  }, [mode]);

  const tickerText = useMemo(() => {
    if (revealedCount === 0) return "";
    const last = sequence[revealedCount - 1];
    if (!last) return "";
    return `${last.name} — ${last.meaning}`;
  }, [revealedCount, sequence]);

  return (
    <div className={`relative overflow-hidden rounded-3xl border ${
      isTutor ? "border-indigo-900/50" : "border-indigo-200"
    } bg-gradient-to-b ${colors}`}>
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl ${
          isTutor ? "bg-indigo-700" : "bg-indigo-300"
        }`} />
      </div>

      <div className="p-6 flex items-center justify-between">
        <div className={`flex items-center gap-3 ${textColor}`}>
          <span className="text-2xl font-bold">AI Tarot</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMode("read")}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              !isTutor
                ? "bg-indigo-600 text-white shadow"
                : "bg-white/10 text-indigo-100 hover:bg-white/20"
            }`}
            title="Reading mode (Day)"
          >
            <Sun size={16} /> Read
          </button>
          <button
            onClick={() => setMode("tutor")}
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition ${
              isTutor
                ? "bg-indigo-600 text-white shadow"
                : "bg-indigo-100 text-indigo-900 hover:bg-indigo-200"
            }`}
            title="Tutor mode (Night)"
          >
            <Moon size={16} /> Tutor
          </button>
        </div>
      </div>

      <div className="px-6 pb-10">
        <div className={`grid md:grid-cols-[1.1fr_1fr] gap-8 items-center`}>
          {/* POV scene */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
            <div className={`absolute inset-0 ${
              isTutor ? "bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.25),transparent_60%)]" : "bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_60%)]"
            }`} />
            <div className="absolute inset-0 p-6 flex items-end justify-center gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card
                  key={i}
                  card={sequence[i] || tarotDeck[i]}
                  revealed={revealedCount > i}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-4">
            <h1 className={`text-4xl md:text-5xl font-bold ${textColor}`}>
              Personal AI Tarot readings, revealed one card at a time
            </h1>
            <p className={`${isTutor ? "text-indigo-200/80" : "text-slate-600"}`}>
              Experience a first-person view as the reader lays out a 3-card spread
              and turns each card. When revealed, a glowing ticker whispers the
              arcane meaning.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className={`px-3 py-1 rounded-full ${
                isTutor ? "bg-indigo-900/60 text-indigo-200" : "bg-indigo-100 text-indigo-900"
              }`}>1 card</span>
              <span className={`px-3 py-1 rounded-full ${
                isTutor ? "bg-indigo-900/60 text-indigo-200" : "bg-indigo-100 text-indigo-900"
              }`}>3 cards</span>
              <span className={`px-3 py-1 rounded-full ${
                isTutor ? "bg-indigo-900/60 text-indigo-200" : "bg-indigo-100 text-indigo-900"
              }`}>Celtic cross</span>
            </div>
            <Ticker text={tickerText} show={Boolean(tickerText)} night={isTutor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
