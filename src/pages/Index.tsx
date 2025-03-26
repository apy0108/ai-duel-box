
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import ComparisonInterface from '@/components/ComparisonInterface';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
    
    // Check if API keys are set
    const geminiKey = localStorage.getItem('gemini-api-key');
    const grokKey = localStorage.getItem('grok-api-key');
    
    if (!geminiKey || !grokKey) {
      // Soft reminder - we'll still allow access but show a toast
      // We're not using toast here since it might be annoying on every page load
      console.log('API keys not set. Consider setting them in Settings.');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16 flex flex-col items-center">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            AI Duel Box
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Compare outputs from Gemini and Grok side by side with the same prompt
          </p>
        </div>
        
        <ComparisonInterface />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
