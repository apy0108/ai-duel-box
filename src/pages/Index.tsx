import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import ComparisonInterface from '@/components/ComparisonInterface';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Info } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
    
    const groqKey = localStorage.getItem('groq-api-key');
    const geminiKey = localStorage.getItem('gemini-api-key');
    
    if (!geminiKey || !groqKey) {
      toast({
        title: "API Keys Not Configured",
        description: "Please set up your Gemini and Groq API keys in Settings to use the comparison feature.",
        action: (
          <button 
            className="px-3 py-1 rounded-md bg-primary text-white text-xs font-medium"
            onClick={() => navigate('/settings')}
          >
            Go to Settings
          </button>
        ),
        duration: 5000,
      });
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16 flex flex-col items-center">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            AI Fusion Hub Comparison
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Compare outputs from different AI models side by side with the same prompt
          </p>
        </div>
        
        <ComparisonInterface />
        
        <div className="mt-12 max-w-2xl w-full bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Quick Tip</h3>
            <p className="text-sm text-blue-700">
              If you're looking for AI tools instead of comparing models, check out our 
              <span 
                className="text-primary font-medium cursor-pointer mx-1 hover:underline"
                onClick={() => navigate('/categories')}
              >
                AI Tools Directory
              </span> 
              to discover the best AI solutions for your needs.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
