"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, Globe, Zap, FileText, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const HomePage = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const changeLanguage = () => {
    // Implement language change logic here
    setLanguage(language === "en" ? "tr" : "en");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 min-h-screen">
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  Tonalize
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  {isDarkMode ? (
                    <Sun className="h-6 w-6" />
                  ) : (
                    <Moon className="h-6 w-6" />
                  )}
                </button>
                <button
                  onClick={changeLanguage}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <Globe className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                Transform Your Text with AI
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Enhance your writing with our advanced AI-powered text editor.
                Choose from various tones and create professional documents
                effortlessly.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <button
                    onClick={() => router.push("/text-editor")}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Start Editing
                  </button>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => router.push("/cv-tools")}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    CV Tools
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
              Our Features
            </h2>
            <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md bg-indigo-500 flex items-center justify-center">
                        <feature.icon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>

        <footer className="bg-white dark:bg-gray-800 mt-12">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
            <div className="flex justify-center space-x-6 md:order-2">
              {/* Add social media links here */}
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-center text-base text-gray-400">
                &copy; 2024 Tonalize. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const features = [
  {
    name: "AI-Powered Editing",
    description:
      "Our advanced AI algorithms help you refine your text to perfection.",
    icon: Zap,
  },
  {
    name: "Multiple Tones",
    description:
      "Choose from a variety of tones to match your writing style and audience.",
    icon: MessageSquare,
  },
  {
    name: "CV Tools",
    description:
      "Create professional CVs and cover letters tailored to your career goals.",
    icon: FileText,
  },
];

export default HomePage;
