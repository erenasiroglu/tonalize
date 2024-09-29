"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  ArrowLeft,
  Upload,
  FileText,
  Send,
  RefreshCw,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CVToolsPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    hrName: "",
  });
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOutputType, setSelectedOutputType] = useState("coverLetter");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOutput(
        `AI-generated ${selectedOutputType} for ${
          formData.position
        } position at ${formData.companyName}:\n\nDear ${
          formData.hrName || "Hiring Manager"
        },\n\nI am writing to express my strong interest in the ${
          formData.position
        } position at ${
          formData.companyName
        }. With my skills and experience, I believe I would be a valuable asset to your team...\n\n[Full AI-generated content would appear here]`
      );
      setIsLoading(false);
    }, 2000);
  };

  const outputTypes = [
    { value: "coverLetter", label: "Cover Letter" },
    { value: "thankYouEmail", label: "Thank You Email" },
    { value: "interviewRequest", label: "Interview Request" },
    { value: "networkingMessage", label: "Networking Message" },
    { value: "applicationLetter", label: "Professional Application Letter" },
  ];

  return (
    <>
      <Head>
        <title>
          Tonalize - AI CV Tools | Professional Career Document Generator
        </title>
        <meta
          name="description"
          content="Create professional career documents with Tonalize's AI-powered CV tools. Generate cover letters, thank you emails, and more with ease."
        />
        <meta
          name="keywords"
          content="Tonalize, AI CV tools, cover letter generator, career documents, job application"
        />
        <meta property="og:title" content="Tonalize - AI CV Tools" />
        <meta
          property="og:description"
          content="Create professional career documents with Tonalize's AI-powered CV tools. Generate cover letters, thank you emails, and more with ease."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tonalize.com/cv-tools" />
        <link rel="canonical" href="https://tonalize.com/cv-tools" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900">
        <nav className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={() => router.push("/")}
                className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Home
              </button>
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-100">
                Tonalize AI
              </h1>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden lg:w-1/2"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Zap className="h-6 w-6 text-yellow-400 mr-2" />
                  Tonalize AI Document Creator
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="cv-upload"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <Upload className="h-12 w-12 text-gray-400" />
                        <span className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                          Click or drag to upload your CV
                        </span>
                        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          PDF, DOC, DOCX (Max 5MB)
                        </span>
                      </label>
                      {file && (
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                          Uploaded file: {file.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="companyName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter the company name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="position"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Position
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter the position you're applying for"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="hrName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        HR Contact Name (Optional)
                      </label>
                      <input
                        type="text"
                        id="hrName"
                        name="hrName"
                        value={formData.hrName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter HR contact name (if known)"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="outputType"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        AI Document Type
                      </label>
                      <Select
                        value={selectedOutputType}
                        onValueChange={setSelectedOutputType}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select AI document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {outputTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={!file || isLoading}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {isLoading ? (
                        <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                      ) : (
                        <Zap className="h-5 w-5 mr-2" />
                      )}
                      {isLoading ? "AI Processing..." : "Generate AI Document"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden lg:w-1/2"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <FileText className="h-5 w-5 text-indigo-100 mr-2" />
                  Tonalize AI-Generated Document
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 h-[calc(100vh-16rem)] overflow-auto">
                  {output ? (
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {output}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Your Tonalize AI-generated document will appear here...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CVToolsPage;
