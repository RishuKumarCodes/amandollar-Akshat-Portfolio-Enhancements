import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={scrollToTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaArrowUp className="w-5 h-5" />
    </motion.button>
  );
}
