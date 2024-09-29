"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { ArrowLeft, Zap, RefreshCw, FileText, Edit } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TextEditorPage = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Profesyonel");
  const [isLoading, setIsLoading] = useState(false);

  const tones = [
    "Profesyonel",
    "Akademik",
    "Resmi",
    "Yaratıcı",
    "İkna Edici",
    "Esprili",
    "Mizahi",
    "Daha Kısa",
  ];

  const handleToneChange = async (tone: string) => {
    setSelectedTone(tone);
    if (inputText) {
      await transformText(tone);
    }
  };

  const transformText = async (tone: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOutputText(`${tone} tonda düzenlenmiş metin:\n\n${inputText}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>
          Tonalize - AI Powered Text Editor | Professional Writing Assistant
        </title>
        <meta
          name="description"
          content="Transform your writing with Tonalize's AI-powered text editor. Choose from multiple tones and create professional documents effortlessly."
        />
        <meta
          name="keywords"
          content="Tonalize, AI text editor, professional writing, tone adjustment, content creation"
        />
        <meta property="og:title" content="Tonalize - AI Powered Text Editor" />
        <meta
          property="og:description"
          content="Transform your writing with Tonalize's AI-powered text editor. Choose from multiple tones and create professional documents effortlessly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tonalize.com/text-editor" />
        <link rel="canonical" href="https://tonalize.com/text-editor" />
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
                Ana Sayfa
              </button>
              <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-100">
                Tonalize
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
                  <Edit className="h-6 w-6 text-indigo-500 mr-2" />
                  Metin Girişi
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="inputText"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Metninizi Girin
                    </label>
                    <textarea
                      id="inputText"
                      rows={10}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Düzenlemek istediğiniz metni buraya yazın..."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="toneSelect"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Ton Seçin
                    </label>
                    <Select
                      value={selectedTone}
                      onValueChange={handleToneChange}
                    >
                      <SelectTrigger id="toneSelect" className="w-full">
                        <SelectValue placeholder="Ton seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((tone) => (
                          <SelectItem key={tone} value={tone}>
                            {tone}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <button
                    onClick={() => transformText(selectedTone)}
                    disabled={!inputText || isLoading}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isLoading ? (
                      <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                    ) : (
                      <Zap className="h-5 w-5 mr-2" />
                    )}
                    {isLoading ? "İşleniyor..." : "Metni Dönüştür"}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden lg:w-1/2"
            >
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FileText className="h-6 w-6 text-indigo-500 mr-2" />
                  Düzenlenmiş Metin
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 h-[calc(100vh-16rem)] overflow-auto">
                  {outputText ? (
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {outputText}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Düzenlenmiş metniniz burada görünecek...
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

export default TextEditorPage;
