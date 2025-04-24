import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PromptInput from './PromptInput';
import OutputBox from './OutputBox';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { callGeminiAPI, callGroqAPI, AI_MODELS } from '@/utils/apiService';

import { HistoryEntry } from '@/pages/History';

const ComparisonInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiOutput, setGeminiOutput] = useState('');
  const [groqOutput, setGroqOutput] = useState('');
  const [geminiError, setGeminiError] = useState<string | undefined>();
  const [groqError, setGroqError] = useState<string | undefined>();
  const [keysAvailable, setKeysAvailable] = useState(false);
  const [geminiModel, setGeminiModel] = useState(AI_MODELS.gemini[0].id);
  const [groqModel, setGroqModel] = useState(AI_MODELS.groq[0].id);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkApiKeys = () => {
      const geminiKey = localStorage.getItem('gemini-api-key');
      const groqKey = localStorage.getItem('groq-api-key');
      setKeysAvailable(Boolean(geminiKey) && Boolean(groqKey));
    };
    
    checkApiKeys();
    window.addEventListener('focus', checkApiKeys);
    
    return () => {
      window.removeEventListener('focus', checkApiKeys);
    };
  }, []);

  useEffect(() => {
    if (location.state?.selectedPrompt) {
      const historyEntry = location.state.selectedPrompt as HistoryEntry;
      setPrompt(historyEntry.prompt);
      setGeminiOutput(historyEntry.geminiResponse);
      setGroqOutput(historyEntry.groqResponse);
      
      navigate('/', { replace: true });
    }
  }, [location.state, navigate]);

  const saveToHistory = (promptText: string, geminiResponse: string, groqResponse: string) => {
    const newEntry: HistoryEntry = {
      id: uuidv4(),
      prompt: promptText,
      geminiResponse,
      groqResponse,
      timestamp: Date.now(),
    };
    
    const existingHistory = localStorage.getItem('prompt-history');
    const history = existingHistory ? JSON.parse(existingHistory) : [];
    
    const updatedHistory = [newEntry, ...history].slice(0, 50);
    
    localStorage.setItem('prompt-history', JSON.stringify(updatedHistory));
  };

  const handleSubmitPrompt = async (inputPrompt: string) => {
    setPrompt(inputPrompt);
    setIsLoading(true);
    setGeminiOutput('');
    setGroqOutput('');
    setGeminiError(undefined);
    setGroqError(undefined);
    
    const geminiKey = localStorage.getItem('gemini-api-key');
    const groqKey = localStorage.getItem('groq-api-key');
    
    if (!geminiKey || !groqKey) {
      toast.error("API keys are missing. Please set them in Settings.");
      setIsLoading(false);
      return;
    }
    
    try {
      console.log("Using selected models:", { 
        geminiModel,
        groqModel
      });
      
      const geminiResponse = await callGeminiAPI(inputPrompt, geminiKey, geminiModel);
      if (geminiResponse.error) {
        setGeminiError(geminiResponse.error);
      } else {
        setGeminiOutput(geminiResponse.text);
      }
      
      const groqResponse = await callGroqAPI(inputPrompt, groqKey, groqModel);
      if (groqResponse.error) {
        setGroqError(groqResponse.error);
      } else {
        setGroqOutput(groqResponse.text);
      }
      
      saveToHistory(
        inputPrompt, 
        geminiResponse.text || geminiResponse.error || "Error fetching response", 
        groqResponse.text || groqResponse.error || "Error fetching response"
      );
      
    } catch (error) {
      console.error('Error fetching AI responses:', error);
      toast.error('Failed to get responses. Please try again.');
    } finally {
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
            selectedModel={geminiModel}
            onModelChange={setGeminiModel}
            error={geminiError}
          />
          <OutputBox 
            title="Groq" 
            content={groqOutput} 
            isLoading={isLoading}
            selectedModel={groqModel}
            onModelChange={setGroqModel}
            error={groqError}
          />
        </div>
      )}
    </div>
  );
};

export default ComparisonInterface;
