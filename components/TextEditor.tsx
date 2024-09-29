"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Zap, RefreshCw } from "lucide-react";

const TextEditorPage = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
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
      setOutputText(`${tone} tonda düzenlenmiş metin: ${inputText}`);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
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
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              Metin Düzenleyici
            </h1>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-6">
              <div className="mb-4">
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
              <div className="flex flex-wrap gap-2 mb-4">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => handleToneChange(tone)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedTone === tone
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    } transition-colors duration-200`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
              <button
                onClick={() => transformText(selectedTone)}
                disabled={!inputText || !selectedTone || isLoading}
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
            <div className="w-full md:w-1/2 p-6 bg-gray-50 dark:bg-gray-750">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Düzenlenmiş Metin
              </h3>
              <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 h-[calc(100%-3rem)] overflow-auto">
                <p className="text-gray-800 dark:text-gray-200">{outputText}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TextEditorPage;
