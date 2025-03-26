
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, Check } from 'lucide-react';

const Settings: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState('');
  const [grokKey, setGrokKey] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedGeminiKey = localStorage.getItem('gemini-api-key');
    const savedGrokKey = localStorage.getItem('grok-api-key');
    
    if (savedGeminiKey) setGeminiKey(savedGeminiKey);
    if (savedGrokKey) setGrokKey(savedGrokKey);
  }, []);

  const handleSaveKeys = () => {
    try {
      // Save API keys to localStorage
      localStorage.setItem('gemini-api-key', geminiKey);
      localStorage.setItem('grok-api-key', grokKey);
      
      // Verify the keys were actually saved
      const savedGeminiKey = localStorage.getItem('gemini-api-key');
      const savedGrokKey = localStorage.getItem('grok-api-key');
      
      if (savedGeminiKey !== geminiKey || savedGrokKey !== grokKey) {
        throw new Error("Failed to save API keys to localStorage");
      }
      
      // Show success state and toast
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      toast({
        title: "API keys saved",
        description: "Your API keys have been saved successfully.",
      });
      
      // Log successful save for debugging
      console.log("API keys saved successfully:", {
        geminiSaved: Boolean(savedGeminiKey),
        grokSaved: Boolean(savedGrokKey)
      });
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast({
        title: "Error saving API keys",
        description: "There was a problem saving your API keys. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-32 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <div className="glass-morphism rounded-2xl p-8 premium-shadow animate-fade-in">
          <h2 className="text-xl font-semibold mb-6">API Keys</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="gemini-key" className="text-sm font-medium">
                Gemini API Key
              </label>
              <Input
                id="gemini-key"
                type="password"
                placeholder="Enter your Gemini API key"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Get your Gemini API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="grok-key" className="text-sm font-medium">
                Grok API Key
              </label>
              <Input
                id="grok-key"
                type="password"
                placeholder="Enter your Grok API key"
                value={grokKey}
                onChange={(e) => setGrokKey(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Get your Grok API key from <a href="https://x.ai/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">X.AI</a>
              </p>
            </div>
            
            <Button 
              onClick={handleSaveKeys}
              className={`mt-4 rounded-xl px-6 py-2 h-auto flex items-center gap-2 ${saveSuccess ? 'bg-green-600 hover:bg-green-700' : ''}`}
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved
                </>
              ) : (
                'Save API Keys'
              )}
            </Button>

            <div className="mt-4 text-sm">
              <p className="text-muted-foreground">
                Current status: {localStorage.getItem('gemini-api-key') && localStorage.getItem('grok-api-key') 
                  ? <span className="text-green-500 font-medium">Both API keys are set</span> 
                  : <span className="text-amber-500 font-medium">API keys are missing or incomplete</span>}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
