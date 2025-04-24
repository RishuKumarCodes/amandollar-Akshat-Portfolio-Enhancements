import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaFileDownload, FaChevronDown, FaSun, FaMoon, FaArrowUp } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";

const resumePdf = "resume.pdf";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.2 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500);
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-colors duration-300`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function Navbar({ isDarkMode, toggleDarkMode }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="fixed w-full bg-gray-900/80 dark:bg-gray-800/80 backdrop-blur-md text-white p-4 z-50 border-b border-gray-700 dark:border-gray-600">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Akshat Tiwari
            </h1>
          </motion.div>
          
          <div className="hidden md:flex space-x-6 items-center">
            {["home", "about", "projects", "skills", "contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className="capitalize hover:text-blue-400 transition-colors relative group"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
            <motion.button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </motion.button>
          </div>

          <motion.a
            href={resumePdf}
            download="Akshat_Tiwari_Resume.pdf"
            className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileDownload className="text-white" />
            <span>Resume</span>
          </motion.a>
        </div>
      </nav>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 z-50 origin-left"
        style={{ scaleX }}
      />
    </>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-br from-blue-900/80 to-purple-900/80 dark:from-gray-800/80 dark:to-gray-900/80"
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Hi, I'm <span className="text-blue-300">Akshat Tiwari</span>
        </motion.h1>
        <motion.p variants={itemVariants} className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
          Computer Science Student & Full-Stack Developer passionate about building innovative solutions
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
          <motion.a
            href="#projects"
            className="px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          
          <motion.a
            href={resumePdf}
            download="Akshat_Tiwari_Resume.pdf"
            className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileDownload />
            Download Resume
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" className="text-white">
          <FaChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            About <span className="text-blue-600">Me</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-blue-600 mx-auto"></motion.div>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:w-1/2"
          >
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Who I Am
              </motion.h3>
              <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-4">
                I'm a B.Tech Computer Science student at Lovely Professional University, passionate about building innovative web applications. With expertise in full-stack development, I create user-friendly and scalable solutions.
              </motion.p>
              <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mb-6">
                My experience includes leading projects like StockWise Pro and volunteering in community events, which honed my technical and leadership skills. I thrive in hackathons, securing Top 10 positions in events like Binary Blitz and Code-a-Thon.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <div className="bg-blue-50 dark:bg-blue-900 px-4 py-2 rounded-lg">
                  <span className="text-blue-600 dark:text-blue-300 font-medium">5+ Projects</span>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900 px-4 py-2 rounded-lg">
                  <span className="text-purple-600 dark:text-purple-300 font-medium">3 Hackathons</span>
                </div>
                <div className="bg-green-50 dark:bg-green-900 px-4 py-2 rounded-lg">
                  <span className="text-green-600 dark:text-green-300 font-medium">2 Years Coding</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:w-1/2"
          >
            <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Education & Experience
              </motion.h3>
              
              <motion.div variants={containerVariants} className="space-y-8">
                {[
                  {
                    title: "Hackathon Achievements",
                    institution: "Top 10 in Binary Blitz and Code-a-Thon",
                    period: "2023 - 2024"
                  },
                  {
                    title: "B.Tech in Computer Science and Engineering",
                    institution: "Lovely Professional University, Jalandhar, Punjab",
                    period: "Aug 2023 - Present"
                  },
                  {
                    title: "Class 12 (Science)",
                    institution: "Loyola International School, Lucknow, Uttar Pradesh",
                    period: "Aug 2022 - May 2023"
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative pl-8 border-l-2 border-blue-200 dark:border-blue-600"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                    <div className="mb-2">
                      <p className="font-medium text-gray-800 dark:text-white">{item.title}</p>
                      <p className="text-gray-600 dark:text-gray-300">{item.institution}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{item.period}</p>
                    </div>
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

function ProjectCard({ title, description, tech, github, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 overflow-hidden group"
      whileHover={{ y: -5 }}
    >
      <motion.div variants={itemVariants}>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tech.split(", ").map((item, i) => (
            <span key={i} className="text-xs bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded">
              {item}
            </span>
          ))}
        </div>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <FaGithub className="w-5 h-5 mr-2" />
          View on GitHub
        </a>
      </motion.div>
    </motion.div>
  );
}

function Projects() {
  const projects = [
    {
      title: "StockWise Pro",
      description: "A platform for stock market knowledge and mentorship, built with a user-friendly interface under LPU's Revenue Generation Programme.",
      tech: "HTML, CSS, JavaScript, PHP, MySQL",
      github: "https://github.com/akshattiwari0055/stockWise-Pro"
    },
    {
      title: "BiteExpress - Food Delivery Platform",
      description: "A full-stack food delivery app with real-time order tracking, responsive design, and secure payments via Razorpay API.",
      tech: "React.js, Node.js, Express.js, MongoDB, Razorpay API",
      github: "https://github.com/akshattiwari0055/BiteExpress"
    },
    {
      title: "EventWise - College Event Management System",
      description: "A full-stack app for managing college events, featuring student registration and event hosting, with planned e-certificate generation.",
      tech: "React.js, Node.js, Express, MongoDB, JWT Auth, Tailwind CSS",
      github: "https://github.com/akshattiwari0055/Event SpamWise"
    },
    {
      title: "Portfolio Website",
      description: "A responsive personal portfolio website showcasing projects, skills, and contact information.",
      tech: "React, Vite, Tailwind CSS, Framer Motion",
      github: "#"
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
          ref={ref}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            My <span className="text-blue-600">Projects</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-blue-600 mx-auto"></motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} index={index} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCategory({ category, items }) {
  return (
    <motion.div
      variants={containerVariants}
      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
    >
      <motion.h3 variants={itemVariants} className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        {category}
      </motion.h3>
      <motion.ul variants={containerVariants} className="space-y-2">
        {items.split(", ").map((skill, i) => (
          <motion.li key={i} variants={itemVariants} className="flex items-center">
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

function Skills() {
  const skills = [
    { category: "Languages", items: "Python, C, C++, Java, JavaScript, SQL, HTML, CSS" },
    { category: "Frameworks & Libraries", items: "React, Tailwind, Bootstrap, ShadCn, Three.js" },
    { category: "Databases", items: "MongoDB, SQL, Postgres" },
    { category: "Developer Tools", items: "Git, GitHub, VS Code, Figma, Virtual-Box, Azure-Rdp" },
    { category: "AI Tools", items: "ChatGPT, VoDev, Claude, DeepSeek" },
    { category: "Network Tools", items: "BurpSuite, WireShark, Nmap" }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
          ref={ref}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Technical <span className="text-blue-600">Skills</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-blue-600 mx-auto"></motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web development world.
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <SkillCategory key={index} {...skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("Please fill out all fields");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      setFormError("Please enter a valid email address");
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setFormSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setFormError(null);
      setTimeout(() => setFormSuccess(false), 3000);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setFormError(null);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
          ref={ref}
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Get In <span className="text-blue-600">Touch</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-20 h-1 bg-blue-600 mx-auto"></motion.div>
          <motion.p variants={itemVariants} className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just to say hello!
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={containerVariants}>
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Contact Information
              </motion.h3>
              
              <motion.div variants={containerVariants} className="space-y-4">
                {[
                  { icon: HiOutlineMail, title: "Email", value: "akshattiwari69399@gmail.com", href: "mailto:akshattiwari69399@gmail.com" },
                  { icon: HiOutlinePhone, title: "Phone", value: "+91 84000194579", href: "tel:+9184000194579" },
                  { icon: FaLinkedin, title: "LinkedIn", value: "linkedin.com/in/akshat-tiwari", href: "https://linkedin.com/in/akshat-tiwari" },
                  { icon: FaGithub, title: "GitHub", value: "github.com/akshattiwari0055", href: "https://github.com/akshattiwari0055" }
                ].map((item, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-start">
                    <item.icon className="w-6 h-6 mt-1 mr-4 text-blue-600" />
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-200">{item.title}</h4>
                      <a 
                        href={item.href}
                        target={item.title !== "Email" && item.title !== "Phone" ? "_blank" : undefined}
                        rel={item.title !== "Email" && item.title !== "Phone" ? "noopener noreferrer" : undefined}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {item.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
                
                <motion.a
                  variants={itemVariants}
                  href={resumePdf}
                  download="Akshat_Tiwari_Resume.pdf"
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg mt-4 w-full md:w-auto justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaFileDownload />
                  Download Resume
                </motion.a>
              </motion.div>
            </motion.div>
            
            <motion.div variants={containerVariants}>
              <motion.h3 variants={itemVariants} className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Send Me a Message
              </motion.h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-200 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="Your name"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="Your email"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white dark:bg-gray-800 dark:text-white"
                    placeholder="Your message"
                  ></textarea>
                </motion.div>
                
                {formError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm"
                  >
                    {formError}
                  </motion.p>
                )}
                
                {formSuccess && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-500 text-sm"
                  >
                    Message sent successfully!
                  </motion.p>
                )}
                
                <motion.button
                  type="submit"
                  variants={itemVariants}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
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
            <p className="mt-2">Computer Science Student & Full-Stack Developer</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex space-x-6">
            {[
              { icon: FaGithub, href: "https://github.com/akshattiwari0055" },
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/akshat-tiwari-92519a277/" },
              { icon: HiOutlineMail, href: "mailto:akshattiwari69399@gmail.com" }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.href}
                target={item.icon !== HiOutlineMail ? "_blank" : undefined}
                rel={item.icon !== HiOutlineMail ? "noopener noreferrer" : undefined}
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
          <p>© {new Date().getFullYear()} Akshat Tiwari. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      className={`fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={scrollToTop}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaArrowUp className="w-5 h-5" />
    </motion.button>
  );
}

export default App;
