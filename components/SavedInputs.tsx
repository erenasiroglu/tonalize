import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Trash2 } from "lucide-react";

interface SavedInput {
  id: number;
  text: string;
  tone: string;
  date: string;
}

interface SavedInputsProps {
  savedInputs: SavedInput[];
  onLoad: (input: SavedInput) => void;
  onDelete: (id: number) => void;
}

const SavedInputs: React.FC<SavedInputsProps> = ({
  savedInputs,
  onLoad,
  onDelete,
}) => {
  return (
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
              <Button variant="ghost" size="sm" onClick={() => onLoad(input)}>
                <Save className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(input.id)}
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
  );
};

export default SavedInputs;
