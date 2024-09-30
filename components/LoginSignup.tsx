"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, LogIn, Lock } from "lucide-react";
import axios from "axios";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import Navbar from "@/components/Navbar";

const LoginSignup = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [language, setLanguage] = useState("en");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const response = await axios.post("http://localhost:5001/api/login", {
          email,
          password,
        });
        console.log("Login successful", response.data);
        setCookie("token", response.data.token, { maxAge: 60 * 60 * 24 * 7 });
        setIsLoggedIn(true);
        router.push("/");
      } else if (isResetPassword) {
        console.log("Reset Password", { email });
      } else {
        const response = await axios.post("http://localhost:5001/api/signup", {
          name,
          email,
          password,
        });
        console.log("Signup successful", response.data);
        setIsLogin(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("light");
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 min-h-screen">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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
                  {error && <div className="text-red-500 text-sm">{error}</div>}
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
                        setError("");
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      {isLogin
                        ? "Create a new account"
                        : "Already have an account? Sign in"}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsResetPassword(!isResetPassword);
                      setError("");
                    }}
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
