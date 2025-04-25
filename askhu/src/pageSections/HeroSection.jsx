import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaFileDownload, FaChevronDown } from "react-icons/fa";
import { useVariants } from "../contexts/VariantsContext";
import "../styles/HeroSection.css";
import {PrimaryButton, SecondaryButton} from "../components/ui/Button";

const resumePdf = "resume.pdf";

export default function HeroSection() {
  const { container: containerVariants, item: itemVariants } = useVariants();
  const flareRef = useRef(null);

  // mouse-move parallax flare
  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      const rotateX = dy * 10;
      const rotateY = -dx * 10;
      const scale = 1 + Math.hypot(dx, dy) * 0.1;

      const f = flareRef.current;
      if (!f) return;
      f.style.transform = `
        translate(-50%, -50%)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
      f.style.setProperty("--shine-x", `${50 + dx * 50}%`);
      f.style.setProperty("--shine-y", `${50 + dy * 50}%`);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="
        relative min-h-screen flex items-center justify-center pt-20 overflow-hidden
        bg-white dark:bg-[#0a0a0a]
      "
    >
      {/* noise layer */}
      <div className="absolute inset-0 bg-[url('https://assets.codepen.io/1502334/noise.png')] mix-blend-saturation pointer-events-none" />

      {/* content */}
      <motion.div
        className="max-w-7xl mx-auto px-6 z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-6
                     text-black dark:text-white"
        >
          Hi, I’m <span className="dark:text-[#00ffff] text-[#0066ff]">Akshat Tiwari</span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto
                     text-gray-800 dark:text-white/70"
        >
          Computer Science Student & Full-Stack Developer passionate about
          building innovative solutions
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-16"
        >
          <PrimaryButton
            onClick={() => {
              const link = document.createElement("a");
              link.href = "#projects";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            View My Work
          </PrimaryButton>
          <SecondaryButton
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
            Get Resume
          </SecondaryButton>
        </motion.div>
      </motion.div>

      {/* floating chevron */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" className="text-black dark:text-white">
          <FaChevronDown className="w-8 h-8" />
        </a>
      </motion.div>

      {/* flares */}
      <div ref={flareRef} className="directional-flare" />
      <div className="flare w-[600px] h-[600px] bg-[#00ffff] top-[20%] left-[30%]" />
      <div className="flare magenta w-[500px] h-[500px] bg-[#ff00ff] bottom-[20%] right-[20%]" />
      <div className="flare white w-[200px] h-[200px] bg-white opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 filter blur-[80px]" />
    </section>
  );
}
