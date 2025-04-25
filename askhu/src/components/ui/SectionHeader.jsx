// SectionHeader.jsx
import { motion } from "framer-motion";

const SectionHeader = ({
  refProp,
  isInView,
  containerVariants,
  itemVariants,
  h1txt,
  h1highlight,
  para
}) => {
  return (
    <motion.div
      ref={refProp}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="text-center mb-16"
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4"
      >
        {h1txt} <span className="text-blue-600 dark:text-[#00ffff]">{h1highlight}</span>
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="w-20 h-1 bg-blue-600 dark:bg-[#00ffff] mx-auto"
      />

      <motion.p
        variants={itemVariants}
        className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto"
      >
        {para}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
