// src/App.jsx
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SitePreloader from "./components/SitePreloader";
import Navbar from "./components/Navbar";
import Hero from "./pageSections/HeroSection";
import About from "./pageSections/AboutSection";
import Projects from "./pageSections/ProjectsSection";
import Skills from "./pageSections/SkillsSection";
import Contact from "./pageSections/ContactSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: read saved theme or OS preference, then start preloader timeout
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const osDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = stored === "dark" || (!stored && osDark);
    setIsDarkMode(useDark);
    document.documentElement.classList.toggle("dark", useDark);

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <SitePreloader key="preloader" />}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
          <Navbar
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />

          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>

          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
}
