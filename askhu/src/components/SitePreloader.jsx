import { motion } from "framer-motion";

export default function SitePreloader() {
  const bounceVariant = {
    hidden: { y: 0, opacity: 0.6 },
    visible: (i) => ({
      y: [0, -6, 0],
      opacity: [0.6, 1, 0.6],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 0.8,
          ease: [0.2, 0, 0.2, 1],
          delay: i * 0.2,
        },
        opacity: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 0.8,
          ease: "easeOut",
          delay: i * 0.2,
        },
      },
    }),
  };

  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25,
      },
    },
  };

  const name = "Akshat Tiwari";

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="flex overflow-hidden mb-6"
        variants={textContainer}
        initial="hidden"
        animate="visible"
      >
        {name.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            className="text-[6vw] font-bold text-gray-800"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.div>

      <div className="flex space-x-2 absolute right-0 bottom-0 p-10">
        {[0, 1, 2].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            className="w-4 h-4 bg-blue-600 rounded-full"
            variants={bounceVariant}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>
    </motion.div>
  );
}
