
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon, Check, Info, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Settings: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showGroqKey, setShowGroqKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState({
    gemini: false,
    groq: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load saved API keys from localStorage
    const savedGeminiKey = localStorage.getItem('gemini-api-key');
    const savedGroqKey = localStorage.getItem('groq-api-key');
    
    if (savedGeminiKey) {
      setGeminiKey(savedGeminiKey);
      setApiKeyStatus(prev => ({ ...prev, gemini: true }));
    }
    
    if (savedGroqKey) {
      setGroqKey(savedGroqKey);
      setApiKeyStatus(prev => ({ ...prev, groq: true }));
    }
  }, []);

  const validateApiKey = (key: string, type: string) => {
    // Basic validation - can be enhanced based on API key patterns
    if (!key || key.trim().length < 8) {
      return false;
    }
    
    // Specific validation for different API key formats if needed
    if (type === 'gemini' && !key.includes('AI')) {
      console.warn('Gemini key may not be valid - missing expected pattern');
    }
    
    if (type === 'groq' && !key.includes('xAI')) {
      console.warn('Groq key may not be valid - missing expected pattern');
    }
    
    return true;
  };

  const verifyAndSaveKeys = async () => {
    try {
      // Reset success state
      setSaveSuccess(false);
      
      // Validate inputs
      const geminiValid = validateApiKey(geminiKey, 'gemini');
      const groqValid = validateApiKey(groqKey, 'groq');
      
      if (!geminiValid || !groqValid) {
        throw new Error("Please enter valid API keys. Keys should be at least 8 characters long.");
      }

      // Save API keys to localStorage
      localStorage.setItem('gemini-api-key', geminiKey.trim());
      localStorage.setItem('groq-api-key', groqKey.trim());
      
      // Verify keys were saved
      const savedGeminiKey = localStorage.getItem('gemini-api-key');
      const savedGroqKey = localStorage.getItem('groq-api-key');
      
      if (!savedGeminiKey || !savedGroqKey) {
        throw new Error("Failed to save API keys. Please check your browser settings and try again.");
      }
      
      // Update status
      setApiKeyStatus({
        gemini: Boolean(savedGeminiKey),
        groq: Boolean(savedGroqKey),
      });
      
      // Show success state and toast
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      
      toast({
        title: "API keys saved successfully",
        description: "Your API keys have been saved and are ready to use for AI comparisons.",
      });
      
      console.log("API keys saved successfully:", {
        geminiSaved: Boolean(savedGeminiKey),
        groqSaved: Boolean(savedGroqKey)
      });
    } catch (error) {
      console.error("Error saving API keys:", error);
      toast({
        title: "Error saving API keys",
        description: error instanceof Error ? error.message : "There was a problem saving your API keys. Please try again.",
        variant: "destructive",
      });
    }
  };

  const toggleShowGeminiKey = () => setShowGeminiKey(!showGeminiKey);
  const toggleShowGroqKey = () => setShowGroqKey(!showGroqKey);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-32 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <Card className="mb-8 animate-fade-in">
          <CardHeader>
            <CardTitle>AI Fusion Hub Settings</CardTitle>
            <CardDescription>Configure your API keys for the AI comparison features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
              <div className="flex gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-800">
                    <strong>Important:</strong> API keys are required to use the comparison feature. Make sure to enter valid keys for both services.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="gemini-key" className="text-sm font-medium">
                  Gemini API Key {apiKeyStatus.gemini && <span className="text-green-500 text-xs ml-2">(✓ Set)</span>}
                </label>
                <div className="relative">
                  <Input
                    id="gemini-key"
                    type={showGeminiKey ? "text" : "password"}
                    placeholder="Enter your Gemini API key"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full pr-10"
                  />
                  <button 
                    type="button"
                    onClick={toggleShowGeminiKey}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get your Gemini API key from the <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google AI Studio</a>
                </p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="groq-key" className="text-sm font-medium">
                  Groq API Key {apiKeyStatus.groq && <span className="text-green-500 text-xs ml-2">(✓ Set)</span>}
                </label>
                <div className="relative">
                  <Input
                    id="groq-key"
                    type={showGroqKey ? "text" : "password"}
                    placeholder="Enter your Groq API key"
                    value={groqKey}
                    onChange={(e) => setGroqKey(e.target.value)}
                    className="w-full pr-10"
                  />
                  <button 
                    type="button"
                    onClick={toggleShowGroqKey}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showGroqKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Get your Groq API key from <a href="https://console.groq.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Groq Console</a>
                </p>
              </div>
              
              <Button 
                onClick={verifyAndSaveKeys}
                className={`mt-4 rounded-xl px-6 py-2 h-auto flex items-center gap-2 ${saveSuccess ? 'bg-green-600 hover:bg-green-700' : ''}`}
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved Successfully
                  </>
                ) : (
                  'Save API Keys'
                )}
              </Button>

              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Current API Status:</p>
                <div className="bg-background p-3 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gemini API Key:</span>
                    {apiKeyStatus.gemini ? (
                      <span className="text-green-500 font-medium flex items-center gap-1">
                        <Check className="w-4 h-4" /> Set
                      </span>
                    ) : (
                      <span className="text-amber-500 font-medium flex items-center gap-1">
                        <Info className="w-4 h-4" /> Not set
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Groq API Key:</span>
                    {apiKeyStatus.groq ? (
                      <span className="text-green-500 font-medium flex items-center gap-1">
                        <Check className="w-4 h-4" /> Set
                      </span>
                    ) : (
                      <span className="text-amber-500 font-medium flex items-center gap-1">
                        <Info className="w-4 h-4" /> Not set
                      </span>
                    )}
                  </div>
                  <div className="text-sm mt-3 text-muted-foreground">
                    <p>
                      {apiKeyStatus.gemini && apiKeyStatus.groq 
                        ? "All API keys are configured. You can now use the AI comparison feature."
                        : "Please set up both API keys to use the AI comparison feature."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-2">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> For testing purposes, you can use any string with 10+ characters as an API key. This will allow you to explore the interface without actual API access.
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
