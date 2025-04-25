import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useVariants } from "../contexts/VariantsContext";
import ContactInfo from "../components/ContactInfoCard";
import ContactForm from "../components/ContactFormCard";
import SectionHeader from "../components/ui/SectionHeader";

export default function Contact() {
  const { container: containerVariants, item: itemVariants } = useVariants();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b bg-blue-50 dark:from-gray-900 dark:to-cyan-950"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-blue-200/20 dark:bg-cyan-900/20 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <SectionHeader
          refProp={ref}
          isInView={isInView}
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          h1txt="Get In"
          h1highlight="Touch"
          para="Feel free to reach out for collaborations or just to say hello!"
        />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 z-10"
        >
          <ContactInfo itemVariants={itemVariants} />
          <ContactForm itemVariants={itemVariants} />
        </motion.div>
      </div>
    </section>
  );
}
