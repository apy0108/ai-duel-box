
import React from 'react';
import { Gem, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModelSelector from './ModelSelector';

interface OutputBoxProps {
  title: 'Gemini' | 'Groq';  // Changed from 'Grok' to 'Groq'
  content: string;
  isLoading: boolean;
  selectedModel: string;
  onModelChange: (model: string) => void;
  error?: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ 
  title, 
  content, 
  isLoading,
  selectedModel,
  onModelChange,
  error
}) => {
  return (
    <div 
      className={cn(
        "w-full h-full flex flex-col rounded-2xl glass-morphism premium-shadow p-6 animate-fade-in",
        title === 'Gemini' ? "border-blue-100" : "border-purple-100"
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {title === 'Gemini' ? (
            <Gem className="w-5 h-5 text-blue-500" />
          ) : (
            <Zap className="w-5 h-5 text-purple-500" />
          )}
          <h2 className={cn(
            "text-lg font-medium",
            title === 'Gemini' ? "text-blue-600" : "text-purple-600"
          )}>
            {title}
          </h2>
        </div>
        
        <ModelSelector 
          aiType={title.toLowerCase() as 'gemini' | 'groq'}  // Changed from 'grok' to 'groq'
          selectedModel={selectedModel}
          onChange={onModelChange}
          disabled={isLoading}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <div className="w-full h-4 bg-muted rounded"></div>
            <div className="w-11/12 h-4 bg-muted rounded"></div>
            <div className="w-10/12 h-4 bg-muted rounded"></div>
            <div className="w-full h-4 bg-muted rounded mt-2"></div>
            <div className="w-9/12 h-4 bg-muted rounded"></div>
            <div className="w-full h-4 bg-muted rounded mt-2"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 whitespace-pre-wrap">{error}</div>
        ) : content ? (
          <div className="whitespace-pre-wrap text-foreground/90 text-balance">{content}</div>
        ) : (
          <div className="text-muted-foreground flex items-center justify-center h-full text-center p-6">
            Enter a prompt above to see {title}'s response
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputBox;
