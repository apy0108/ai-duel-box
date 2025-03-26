
import React, { useState } from 'react';
import PromptInput from './PromptInput';
import OutputBox from './OutputBox';
import { toast } from 'sonner';

const ComparisonInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiOutput, setGeminiOutput] = useState('');
  const [grokOutput, setGrokOutput] = useState('');

  const handleSubmitPrompt = async (inputPrompt: string) => {
    setPrompt(inputPrompt);
    setIsLoading(true);
    setGeminiOutput('');
    setGrokOutput('');
    
    try {
      // Simulate API calls to Gemini and Grok
      // In a real implementation, these would be actual API calls
      setTimeout(() => {
        setGeminiOutput(`Gemini's response to: "${inputPrompt}"\n\nThis is a simulated response. In a real implementation, this would be the actual response from Gemini API.`);
      }, 2000);
      
      setTimeout(() => {
        setGrokOutput(`Grok's response to: "${inputPrompt}"\n\nThis is a simulated response. In a real implementation, this would be the actual response from Grok API.`);
        setIsLoading(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error fetching AI responses:', error);
      toast.error('Failed to get responses. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 pb-10">
      <div className="w-full max-w-4xl">
        <PromptInput onSubmit={handleSubmitPrompt} isLoading={isLoading} />
      </div>
      
      {(prompt || isLoading) && (
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          <OutputBox 
            title="Gemini" 
            content={geminiOutput} 
            isLoading={isLoading} 
          />
          <OutputBox 
            title="Grok" 
            content={grokOutput} 
            isLoading={isLoading} 
          />
        </div>
      )}
    </div>
  );
};

export default ComparisonInterface;
