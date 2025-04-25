import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  containerVariants,
  itemVariants,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="
        backdrop-blur-md bg-white/70 dark:bg-black/20
        dark:border dark:border-white/10
        border border-gray-100
        rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300
        overflow-hidden p-6 sm:p-8 relative
      "
    >
      <motion.div variants={itemVariants} className="flex flex-col h-full">
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.split(", ").map((item, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full  bg-blue-100 dark:bg-blue-900  text-blue-600 dark:text-blue-300 font-medium"
            >
              {item}
            </span>
          ))}
        </div>

        {/* GitHub Link */}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.3 }}>
            <FaGithub className="w-5 h-5" />
          </motion.div>
          View on GitHub
        </a>
      </motion.div>
    </motion.div>
  );
}
