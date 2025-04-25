import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaBars, FaTimes, FaFileDownload } from "react-icons/fa";
import { PrimaryButton } from "./ui/Button";

const NAV_ITEMS = ["about", "projects", "skills", "contact"];
const resumePdf = "resume.pdf";

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const cls = document.documentElement.classList;
    if (isDark) cls.add("dark");
    else cls.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-1 flex justify-between items-center backdrop-blur-[24px] z-50 border-b border-white/5 shadow-[0_0_10px_rgba(0,255,255,0.05)]">
      <a
        className="dark:text-[#00ffff] text-[#0066ff] text-lg font-bold tracking-wider drop-shadow-[0_0_10px_rgba(0,255,255,0.5)] "
        href="#"
      >
        Akshat Tiwari
      </a>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((label) => (
          <a
            key={label}
            href={`#${label}`}
            onClick={(e) => handleNavClick(e, label)}
            className="
              relative font-medium uppercase text-xs tracking-wide
              transition duration-300 ease
              text-gray-800 dark:text-white/80
              hover:text-black dark:hover:text-white
              after:absolute after:left-0 after:bottom-[-4px]
              after:w-full after:h-[2px]
              after:bg-gradient-to-r after:from-[#00ffff] after:to-[#ff00ff]
              after:opacity-0 after:scale-x-0 after:origin-left
              after:transition after:duration-300 after:ease
              hover:after:opacity-100 hover:after:scale-x-100
            "
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Right-side controls */}
      <div className="flex items-center gap-4">
        {/* Resume button */}
        <div className="scale-70">
          <PrimaryButton
            onClick={() => {
              const link = document.createElement("a");
              link.href = resumePdf;
              link.download = "Akshat_Tiwari_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            <FaFileDownload className="text-gray-800 dark:text-white/80" />
            Resume
          </PrimaryButton>
        </div>
        {/* Theme toggle */}
        <button
          onClick={() => setIsDark((v) => !v)}
          className="
            p-2 rounded-full
            bg-white/10 hover:bg-white/20
            dark:bg-black/10 dark:hover:bg-black/20
            transition
          "
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <FaSun className="w-5 h-5 text-yellow-300" />
          ) : (
            <FaMoon className="w-5 h-5 text-gray-800" />
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 dark:bg-black/10 dark:hover:bg-black/20 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <FaTimes className="w-5 h-5 text-gray-800 dark:text-white/80" />
          ) : (
            <FaBars className="w-5 h-5 text-gray-800 dark:text-white/80" />
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <nav className="absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/90 backdrop-blur-md py-6 flex flex-col items-center gap-6">
          {NAV_ITEMS.map((label) => (
            <a
              key={label}
              href={`#${label}`}
              onClick={(e) => handleNavClick(e, label)}
              className="text-gray-800 dark:text-white/80 uppercase font-medium tracking-wide hover:text-black dark:hover:text-white transition"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
