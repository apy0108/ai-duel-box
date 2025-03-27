
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AI_MODELS } from '@/utils/apiService';

interface ModelSelectorProps {
  aiType: 'gemini' | 'grok';
  selectedModel: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ 
  aiType, 
  selectedModel, 
  onChange,
  disabled = false
}) => {
  const models = aiType === 'gemini' ? AI_MODELS.gemini : AI_MODELS.grok;

  return (
    <div className="w-full flex flex-col gap-1.5">
      <label className="text-xs font-medium text-muted-foreground">
        Select Model
      </label>
      <Select 
        value={selectedModel} 
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger 
          className={`h-8 text-sm ${
            aiType === 'gemini' ? "border-blue-200" : "border-purple-200"
          }`}
        >
          <SelectValue placeholder="Select model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
