"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, FileText } from "lucide-react";

const CVToolsPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cv: "",
    companyName: "",
    position: "",
    hrName: "",
  });
  const [output, setOutput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call
    setOutput(
      `Generated cover letter for ${formData.position} at ${formData.companyName}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push("/")}
              className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              CV Tools
            </h1>
          </div>
        </div>
      </nav>

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default CVToolsPage;
