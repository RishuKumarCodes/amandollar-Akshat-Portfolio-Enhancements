import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { useVariants } from "../contexts/VariantsContext";

export default function Footer() {
  const { container: containerVariants, item: itemVariants } = useVariants();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <motion.div variants={itemVariants} className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Akshat Tiwari
            </h2>
            <p className="mt-2">
              Computer Science Student & Full-Stack Developer
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex space-x-6">
            {[
              { icon: FaGithub, href: "https://github.com/akshattiwari0055" },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/akshat-tiwari-92519a277/",
              },
              {
                icon: HiOutlineMail,
                href: "mailto:akshattiwari69399@gmail.com",
              },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.icon !== HiOutlineMail ? "_blank" : undefined}
                rel={
                  item.icon !== HiOutlineMail
                    ? "noopener noreferrer"
                    : undefined
                }
                className="hover:text-white transition-colors"
              >
                <item.icon className="w-6 h-6" />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p>
            © {new Date().getFullYear()} Akshat Tiwari. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
