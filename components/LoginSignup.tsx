"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  LogIn,
  ArrowLeft,
  Sun,
  Moon,
  Globe,
  Lock,
} from "lucide-react";

const LoginSignup = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [isResetPassword, setIsResetPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      isLogin ? "Login" : isResetPassword ? "Reset Password" : "Signup",
      { email, password, name }
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("light");
  };

  const changeLanguage = () => {
    setLanguage(language === "en" ? "tr" : "en");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 min-h-screen">
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-100">
                  Tonalize AI
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
                <button
                  onClick={() => router.push("/")}
                  className="p-2 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : isResetPassword ? "reset" : "signup"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
                  {isLogin
                    ? "Welcome Back!"
                    : isResetPassword
                    ? "Reset Password"
                    : "Join Tonalize AI"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!isLogin && !isResetPassword && (
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {!isResetPassword && (
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  )}
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                    >
                      {isLogin ? (
                        <>
                          <LogIn className="h-5 w-5 mr-2" /> Sign in
                        </>
                      ) : isResetPassword ? (
                        <>
                          <Lock className="h-5 w-5 mr-2" /> Reset Password
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-5 w-5 mr-2" /> Sign up
                        </>
                      )}
                    </button>
                  </div>
                </form>
                <div className="mt-6 flex flex-col space-y-2">
                  {!isResetPassword && (
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setIsResetPassword(false);
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      {isLogin
                        ? "Create a new account"
                        : "Already have an account? Sign in"}
                    </button>
                  )}
                  <button
                    onClick={() => setIsResetPassword(!isResetPassword)}
                    className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    {isResetPassword
                      ? "Back to login"
                      : "Forgot your password?"}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
