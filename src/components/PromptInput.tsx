
import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim());
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 glass-morphism rounded-2xl premium-shadow animate-slide-up">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="prompt" className="text-sm font-medium text-foreground/80">
          Enter your prompt
        </label>
        <Textarea
          id="prompt"
          placeholder="Compare the future impact of quantum computing vs. artificial intelligence..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[120px] resize-none rounded-xl text-base border border-border/50 focus:border-primary focus:ring-primary fluid-animation"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!prompt.trim() || isLoading}
            className="rounded-xl px-6 py-2 h-auto bg-primary hover:bg-primary/90 text-white flex items-center gap-2 interactive"
          >
            <span>Compare</span>
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
