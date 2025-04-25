import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm({ itemVariants }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFormError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setFormError("Please fill out all fields");
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address");
      return;
    }
    setTimeout(() => {
      setFormSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setFormError(null);
      setTimeout(() => setFormSuccess(false), 3000);
    }, 1000);
  };

  return (
    <motion.div variants={itemVariants} className="bg-white dark:bg-white/10 dark:border dark:border-gray-600 backdrop-blur-xl rounded-2xl shadow-xl p-8 space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Send a Message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "email"].map((field) => (
          <div key={field} className="relative">
            <input
              type={field}
              id={field}
              value={formData[field]}
              onChange={handleChange}
              className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-500 py-2 pr-3 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition"
              placeholder=" "
            />
            <label
              htmlFor={field}
              className="absolute left-0 -top-2 text-gray-500 dark:text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-gray-600 dark:peer-focus:text-gray-200 transition-all"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
          </div>
        ))}
        <div className="relative">
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="peer w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-500 py-2 pr-3 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 transition"
            placeholder=" "
          />
          <label
            htmlFor="message"
            className="absolute left-0 -top-2 text-gray-500 dark:text-gray-400 text-sm peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:text-gray-600 dark:peer-focus:text-gray-200 transition-all"
          >
            Message
          </label>
        </div>

        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        {formSuccess && <p className="text-green-500 text-sm">Message sent successfully!</p>}

        <motion.button
          type="submit"
          variants={itemVariants}
          className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-indigo-500 hover:scale-105 transition-transform"
        >
          Send Message
        </motion.button>
      </form>
    </motion.div>
  );
}
