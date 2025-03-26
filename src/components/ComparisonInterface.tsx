
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
      
      // Simulate API calls to Gemini and Grok
      // In a real implementation, these would be actual API calls using the stored keys
      setTimeout(() => {
        const geminiResponse = `Gemini's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key${geminiKey ? ' (using your saved key)' : ''}. In a real implementation, this would be the actual response from Gemini API.`;
        setGeminiOutput(geminiResponse);
      }, 2000);
      
      setTimeout(() => {
        const grokResponse = `Grok's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key${grokKey ? ' (using your saved key)' : ''}. In a real implementation, this would be the actual response from Grok API.`;
        setGrokOutput(grokResponse);
        setIsLoading(false);
        
        // Save to history after both responses are received
        saveToHistory(inputPrompt, 
          `Gemini's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key${geminiKey ? ' (using your saved key)' : ''}.`, 
          `Grok's response to: "${inputPrompt}"\n\nThis is a simulated response using the API key${grokKey ? ' (using your saved key)' : ''}.`
        );
      }, 3000);
      
    } catch (error) {
      console.error('Error fetching AI responses:', error);
      toast.error('Failed to get responses. Please try again.');
      setIsLoading(false);
    }
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
