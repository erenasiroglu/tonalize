"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  ArrowLeft,
  BarChart,
  PieChart,
  LineChart,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import NavBar from "./Navbar";

const AnalyticsPage = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Tonalize - Analytics | CV Tools Usage Insights</title>
        <meta
          name="description"
          content="Gain insights into your CV tools usage with Tonalize's analytics dashboard."
        />
        <meta
          name="keywords"
          content="Tonalize, analytics, CV tools, usage insights, data visualization"
        />
        <meta property="og:title" content="Tonalize - Analytics Dashboard" />
        <meta
          property="og:description"
          content="Gain insights into your CV tools usage with Tonalize's analytics dashboard."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tonalize.com/analytics" />
        <link rel="canonical" href="https://tonalize.com/analytics" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
        <NavBar />
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <BarChart className="h-5 w-5 text-indigo-600 mr-2" />
                  Document Types Generated
                </h2>
                <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Bar chart visualization
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <PieChart className="h-5 w-5 text-indigo-600 mr-2" />
                  Top Companies Applied To
                </h2>
                <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Pie chart visualization
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <LineChart className="h-5 w-5 text-indigo-600 mr-2" />
                  Usage Over Time
                </h2>
                <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Line chart visualization
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Activity className="h-5 w-5 text-indigo-600 mr-2" />
                  Key Statistics
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Documents Generated
                    </span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      127
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Average Documents per Day
                    </span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      4.2
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Most Popular Document Type
                    </span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      Cover Letter
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AnalyticsPage;
