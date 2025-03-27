
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PromptInput from './PromptInput';
import OutputBox from './OutputBox';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

// Import the HistoryEntry type
import { HistoryEntry } from '@/pages/History';

const ComparisonInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiOutput, setGeminiOutput] = useState('');
  const [grokOutput, setGrokOutput] = useState('');
  const [keysAvailable, setKeysAvailable] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if API keys are available
  useEffect(() => {
    const checkApiKeys = () => {
      const geminiKey = localStorage.getItem('gemini-api-key');
      const grokKey = localStorage.getItem('grok-api-key');
      setKeysAvailable(Boolean(geminiKey) && Boolean(grokKey));
    };
    
    // Check on mount
    checkApiKeys();
    
    // Re-check whenever the component gets focused
    window.addEventListener('focus', checkApiKeys);
    
    return () => {
      window.removeEventListener('focus', checkApiKeys);
    };
  }, []);
  
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
      console.log("Using API keys:", { 
        geminiKeyExists: Boolean(geminiKey), 
        grokKeyExists: Boolean(grokKey)
      });
      
      // Make API call to Gemini
      try {
        const geminiResponse = await fetchGeminiResponse(inputPrompt, geminiKey);
        setGeminiOutput(geminiResponse);
      } catch (error) {
        console.error("Error with Gemini API:", error);
        setGeminiOutput("Error fetching response from Gemini. Please check your API key and try again.");
      }
      
      // Make API call to Grok
      try {
        const grokResponse = await fetchGrokResponse(inputPrompt, grokKey);
        setGrokOutput(grokResponse);
      } catch (error) {
        console.error("Error with Grok API:", error);
        setGrokOutput("Error fetching response from Grok. Please check your API key and try again.");
      }
      
      setIsLoading(false);
      
      // Save to history after both responses are received
      saveToHistory(inputPrompt, 
        geminiOutput || "Error fetching response from Gemini.", 
        grokOutput || "Error fetching response from Grok."
      );
      
    } catch (error) {
      console.error('Error fetching AI responses:', error);
      toast.error('Failed to get responses. Please try again.');
      setIsLoading(false);
    }
  };

  // Mock functions to simulate API calls - in a real app, these would make actual API calls
  const fetchGeminiResponse = async (prompt: string, apiKey: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!apiKey) {
      throw new Error("No API key provided");
    }
    
    // For demo purposes, return a simulated response
    return `Gemini's response to: "${prompt}"\n\nThis is a simulated response using the provided API key. In a real implementation, this would be the actual response from Gemini API.`;
  };
  
  const fetchGrokResponse = async (prompt: string, apiKey: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    if (!apiKey) {
      throw new Error("No API key provided");
    }
    
    // For demo purposes, return a simulated response
    return `Grok's response to: "${prompt}"\n\nThis is a simulated response using the provided API key. In a real implementation, this would be the actual response from Grok API.`;
  };

  const handleGoToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 pb-10">
      {!keysAvailable && (
        <div className="w-full max-w-4xl bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 flex items-center justify-between">
          <p>You need to set up your API keys before comparing AI responses.</p>
          <Button 
            variant="outline" 
            onClick={handleGoToSettings}
            className="flex items-center gap-2 border-amber-300 text-amber-800 hover:bg-amber-100"
          >
            <Settings className="w-4 h-4" />
            Go to Settings
          </Button>
        </div>
      )}
      
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
