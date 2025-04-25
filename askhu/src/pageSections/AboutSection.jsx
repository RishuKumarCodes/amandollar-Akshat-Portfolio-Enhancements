import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useVariants } from "../contexts/VariantsContext";
import SectionHeader from "../components/ui/SectionHeader";

export default function About() {
  const { container: containerVariants, item: itemVariants } = useVariants();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-neutral-950 dark:to-cyan-950"
    >
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          refProp={ref}
          isInView={isInView}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          h1txt="About"
          h1highlight="Me"
          para=""
        />
        {/* Grid container for cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Who I Am card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full"
          >
            <div className="bg-white dark:bg-white/7 dark:border dark:border-gray-700 p-8 sm:p-10 rounded-4xl shadow-md">
              <motion.h3
                variants={itemVariants}
                className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-6"
              >
                Who I Am
              </motion.h3>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
              >
                I'm a B.Tech Computer Science student at Lovely Professional
                University, passionate about building innovative web
                applications. With expertise in full-stack development, I create
                user-friendly and scalable solutions.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
              >
                My experience includes leading projects like StockWise Pro and
                volunteering in community events, which honed my technical and
                leadership skills. I thrive in hackathons, securing Top 10
                positions in events like Binary Blitz and Code-a-Thon.
              </motion.p>
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-3"
              >
                <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium px-3 py-1 rounded-lg">
                  5+ Projects
                </span>
                <span className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-medium px-3 py-1 rounded-lg">
                  3 Hackathons
                </span>
                <span className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium px-3 py-1 rounded-lg">
                  2 Years Coding
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Education & Experience card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full"
          >
            <div className="bg-white dark:bg-white/7 dark:border dark:border-gray-700 p-8 sm:p-10 rounded-4xl shadow-md">
              <motion.h3
                variants={itemVariants}
                className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-6"
              >
                Education & Experience
              </motion.h3>

              <motion.div variants={containerVariants} className="space-y-8">
                {[
                  {
                    title: "Hackathon Achievements",
                    institution: "Top 10 in Binary Blitz and Code-a-Thon",
                    period: "2023 – 2024",
                  },
                  {
                    title: "B.Tech in Computer Science and Engineering",
                    institution:
                      "Lovely Professional University, Jalandhar, Punjab",
                    period: "Aug 2023 – Present",
                  },
                  {
                    title: "Class 12 (Science)",
                    institution:
                      "Loyola International School, Lucknow, Uttar Pradesh",
                    period: "Aug 2022 – May 2023",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="relative pl-10 border-l-2 border-blue-200 dark:border-blue-600"
                  >
                    <div className="absolute -left-2 top-1 w-4 h-4 rounded-full bg-blue-600"></div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {item.institution}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {item.period}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
