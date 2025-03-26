
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PromptInput from './PromptInput';
import OutputBox from './OutputBox';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

// Import the HistoryEntry type
import { HistoryEntry } from '@/pages/History';

const ComparisonInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiOutput, setGeminiOutput] = useState('');
  const [grokOutput, setGrokOutput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check for selected prompt from history
  useEffect(() => {
    if (location.state?.selectedPrompt) {
      const historyEntry = location.state.selectedPrompt as HistoryEntry;
      setPrompt(historyEntry.prompt);
      setGeminiOutput(historyEntry.geminiResponse);
      setGrokOutput(historyEntry.grokResponse);
      
      // Clear the location state to prevent reloading the same prompt
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  const saveToHistory = (promptText: string, geminiResponse: string, grokResponse: string) => {
    const newEntry: HistoryEntry = {
      id: uuidv4(),
      prompt: promptText,
      geminiResponse,
      grokResponse,
      timestamp: Date.now(),
    };
    
    // Get existing history
    const existingHistory = localStorage.getItem('prompt-history');
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    
    // Add new entry and limit to 50 entries
    const updatedHistory = [newEntry, ...history].slice(0, 50);
    
    // Save back to localStorage
    localStorage.setItem('prompt-history', JSON.stringify(updatedHistory));
  };

  const handleSubmitPrompt = async (inputPrompt: string) => {
    setPrompt(inputPrompt);
    setIsLoading(true);
    setGeminiOutput('');
    setGrokOutput('');
    
    // Get API keys from localStorage
    const geminiKey = localStorage.getItem('gemini-api-key');
    const grokKey = localStorage.getItem('grok-api-key');
    
    // Check if API keys are available
    if (!geminiKey || !grokKey) {
      toast.error("API keys are missing. Please set them in Settings.");
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate API calls to Gemini and Grok
      // In a real implementation, these would be actual API calls using the stored keys
      setTimeout(() => {
        const geminiResponse = `Gemini's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key. In a real implementation, this would be the actual response from Gemini API.`;
        setGeminiOutput(geminiResponse);
      }, 2000);
      
      setTimeout(() => {
        const grokResponse = `Grok's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key. In a real implementation, this would be the actual response from Grok API.`;
        setGrokOutput(grokResponse);
        setIsLoading(false);
        
        // Save to history after both responses are received
        saveToHistory(inputPrompt, 
          `Gemini's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key.`, 
          `Grok's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key.`
        );
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
        <PromptInput 
          onSubmit={handleSubmitPrompt} 
          isLoading={isLoading} 
          initialPrompt={prompt}
        />
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
