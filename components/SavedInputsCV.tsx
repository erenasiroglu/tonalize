import React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";

interface SavedInput {
  id: number;
  companyName: string;
  position: string;
  hrName: string;
  outputType: string;
  date: string;
}

interface SavedInputsProps {
  savedInputs: SavedInput[];
  onDelete: (id: number) => void;
  onView: (input: SavedInput) => void;
}

const SavedInputs: React.FC<SavedInputsProps> = ({
  savedInputs,
  onDelete,
  onView,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Saved Inputs
      </h3>
      {savedInputs.map((input) => (
        <div
          key={input.id}
          className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {input.companyName} - {input.position}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {input.date}
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onView(input)}>
              <Eye className="h-4 w-4" />
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
      ))}
    </div>
  );
};

export default SavedInputs;
