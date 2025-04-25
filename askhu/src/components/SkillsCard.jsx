import { motion } from "framer-motion";

export default function SkillsCard({
  category,
  items,
  containerVariants,
  itemVariants,
}) {
  return (
    <motion.div
      variants={containerVariants}
      className=" hover:shadow-lg transition-shadow bg-white dark:bg-white/7 dark:border dark:border-gray-700 p-8 sm:p-6 rounded-4xl shadow-md"
    >
      <motion.h3
        variants={itemVariants}
        className="text-xl font-semibold text-gray-800 dark:text-white mb-4"
      >
        {category}
      </motion.h3>
      <motion.ul variants={containerVariants} className="space-y-2">
        {items.split(", ").map((skill, i) => (
          <motion.li
            key={i}
            variants={itemVariants}
            className="flex items-center"
          >
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-600 dark:text-gray-300">{skill}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
