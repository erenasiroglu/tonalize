"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  ArrowLeft,
  Zap,
  RefreshCw,
  FileText,
  Edit,
  Save,
  Trash2,
  Eye,
  Menu,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TextEditorPage = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [isLoading, setIsLoading] = useState(false);
  const [saveInputs, setSaveInputs] = useState(true);
  const [savedInputs, setSavedInputs] = useState<
    Array<{ id: number; text: string; tone: string; date: string }>
  >([]);

  const tones = [
    "Professional",
    "Academic",
    "Formal",
    "Creative",
    "Persuasive",
    "Humorous",
    "Shorter",
  ];

  useEffect(() => {
    const storedInputs = localStorage.getItem("savedTextEditorInputs");
    if (storedInputs) {
      setSavedInputs(JSON.parse(storedInputs));
    }
  }, []);

  const handleToneChange = async (tone: string) => {
    setSelectedTone(tone);
    if (inputText) {
      await transformText(tone);
    }
  };

  const transformText = async (tone: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setOutputText(`Text edited in ${tone} tone:\n\n${inputText}`);
      setIsLoading(false);

      if (saveInputs) {
        const newInput = {
          id: Date.now(),
          text: inputText,
          tone: tone,
          date: new Date().toLocaleString(),
        };
        const updatedInputs = [...savedInputs, newInput];
        setSavedInputs(updatedInputs);
        localStorage.setItem(
          "savedTextEditorInputs",
          JSON.stringify(updatedInputs)
        );
      }
    }, 1000);
  };

  const toggleSaveInputs = () => {
    setSaveInputs(!saveInputs);
  };

  const deleteSavedInput = (id: number) => {
    const updatedInputs = savedInputs.filter((input) => input.id !== id);
    setSavedInputs(updatedInputs);
    localStorage.setItem(
      "savedTextEditorInputs",
      JSON.stringify(updatedInputs)
    );
  };

  const loadSavedInput = (input: { text: string; tone: string }) => {
    setInputText(input.text);
    setSelectedTone(input.tone);
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
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Menu className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Settings</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={saveInputs}
                          onCheckedChange={toggleSaveInputs}
                          id="save-inputs"
                        />
                        <label
                          htmlFor="save-inputs"
                          className="text-sm cursor-pointer"
                        >
                          Save inputs for analysis
                        </label>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <DialogTrigger>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          View Saved Inputs
                        </div>
                      </DialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Saved Inputs</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {savedInputs.map((input) => (
                      <div
                        key={input.id}
                        className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {input.date}
                          </span>
                          <div className="space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => loadSavedInput(input)}
                            >
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteSavedInput(input.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {input.text.length > 100
                            ? `${input.text.slice(0, 100)}...`
                            : input.text}
                        </p>
                        <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">
                          Tone: {input.tone}
                        </span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
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
                  Write Your Text
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="inputText"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Enter Your Text
                    </label>
                    <textarea
                      id="inputText"
                      rows={10}
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type or paste your text here..."
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="toneSelect"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Select Tone
                    </label>
                    <Select
                      value={selectedTone}
                      onValueChange={handleToneChange}
                    >
                      <SelectTrigger id="toneSelect" className="w-full">
                        <SelectValue placeholder="Select a tone" />
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
                    {isLoading ? "Processing..." : "Transform Text"}
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
                  Edited Text
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 h-[calc(100vh-16rem)] overflow-auto">
                  {outputText ? (
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {outputText}
                    </p>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      Your edited text will appear here...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      <Dialog>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Saved Inputs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {savedInputs.map((input) => (
              <div
                key={input.id}
                className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {input.date}
                  </span>
                  <div className="space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => loadSavedInput(input)}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSavedInput(input.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                  {input.text.length > 100
                    ? `${input.text.slice(0, 100)}...`
                    : input.text}
                </p>
                <span className="text-xs font-medium text-indigo-500 dark:text-indigo-400">
                  Tone: {input.tone}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TextEditorPage;
