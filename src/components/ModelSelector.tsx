
import React from 'react';
import { Gem, Zap } from 'lucide-react';

interface ModelSelectorProps {
  aiType: 'gemini' | 'groq';
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ aiType }) => {
  const modelInfo = aiType === 'gemini' 
    ? { name: "Gemini 1.5 Flash", icon: <Gem className="w-4 h-4 text-blue-500" /> }
    : { name: "LLaMA 3.1 70B", icon: <Zap className="w-4 h-4 text-purple-500" /> };

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-background/80 border border-border/30">
      {modelInfo.icon}
      <span className="text-xs font-medium">{modelInfo.name}</span>
    </div>
  );
};

export default ModelSelector;
