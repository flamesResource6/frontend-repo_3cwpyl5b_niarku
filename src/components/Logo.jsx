import React from "react";

function Logo({ size = 40, glow = true }) {
  return (
    <div
      className={
        "inline-flex items-center gap-2 select-none" +
        (glow ? " drop-shadow-[0_0_12px_rgba(99,102,241,0.45)]" : "")
      }
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Crystal ball */}
        <defs>
          <radialGradient id="g" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4338ca" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="28" r="20" fill="url(#g)" />
        {/* Digital eyes */}
        <rect x="23" y="24" width="6" height="4" rx="2" fill="#0ea5e9" />
        <rect x="35" y="24" width="6" height="4" rx="2" fill="#0ea5e9" />
        <circle cx="26" cy="26" r="1.2" fill="#022c22" />
        <circle cx="38" cy="26" r="1.2" fill="#022c22" />
        <rect x="20" y="32" width="24" height="2" rx="1" fill="#a5b4fc" opacity="0.7" />
        {/* Base */}
        <rect x="20" y="46" width="24" height="6" rx="3" fill="#111827" />
      </svg>
      <span className="text-xl font-semibold tracking-tight">AI Tarot</span>
    </div>
  );
}

export default Logo;
