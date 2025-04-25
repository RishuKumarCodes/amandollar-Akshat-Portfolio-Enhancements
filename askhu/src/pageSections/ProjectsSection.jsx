import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ProjectCard from "../components/ProjectsCard";
import { useVariants } from "../contexts/VariantsContext";
import SectionHeader from "../components/ui/SectionHeader";

export default function Projects() {
  const { container: containerVariants, item: itemVariants } = useVariants();

  const projects = [
    {
      title: "StockWise Pro",
      description:
        "A platform for stock market knowledge and mentorship, built with a user-friendly interface under LPU's Revenue Generation Programme.",
      tech: "HTML, CSS, JavaScript, PHP, MySQL",
      github: "https://github.com/akshattiwari0055/stockWise-Pro",
    },
    {
      title: "BiteExpress - Food Delivery Platform",
      description:
        "A full-stack food delivery app with real-time order tracking, responsive design, and secure payments via Razorpay API.",
      tech: "React.js, Node.js, Express.js, MongoDB, Razorpay API",
      github: "https://github.com/akshattiwari0055/BiteExpress",
    },
    {
      title: "EventWise - College Event Management System",
      description:
        "A full-stack app for managing college events, featuring student registration and event hosting, with planned e-certificate generation.",
      tech: "React.js, Node.js, Express, MongoDB, JWT Auth, Tailwind CSS",
      github: "https://github.com/akshattiwari0055/Event SpamWise",
    },
    {
      title: "Portfolio Website",
      description:
        "A responsive personal portfolio website showcasing projects, skills, and contact information.",
      tech: "React, Vite, Tailwind CSS, Framer Motion",
      github: "#",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 bg-blue-50 dark:bg-cyan-950">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          refProp={ref}
          isInView={isInView}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          h1txt="My"
          h1highlight="Projects"
          para="Here are some of my recent projects. Each one was built to solve a
            specific problem or explore new technologies."
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              {...project}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
