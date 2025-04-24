
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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Nexus
          </h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
            Your central hub for AI tools and model comparison
          </p>
        </div>
        
        <div className="w-full mb-8 max-w-2xl mx-auto bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Welcome to AI Nexus</h3>
            <p className="text-sm text-blue-700">
              Compare outputs from different AI models side by side and explore the latest 
              advancements in artificial intelligence. Stay up-to-date with our AI news feed below.
            </p>
          </div>
        </div>
        
        <ComparisonInterface />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
