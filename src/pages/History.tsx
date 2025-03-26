
import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import HistoryItem from '@/components/HistoryItem';
import { useNavigate } from 'react-router-dom';
import { ClockRewind } from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface HistoryEntry {
  id: string;
  prompt: string;
  geminiResponse: string;
  grokResponse: string;
  timestamp: number;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = localStorage.getItem('prompt-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredHistory = history.filter(entry => 
    entry.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleHistoryItemClick = (entry: HistoryEntry) => {
    // Navigate to home with the selected prompt
    navigate('/', { state: { selectedPrompt: entry } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <NavBar />
      
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 pt-32 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <ClockRewind className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Prompt History</h1>
        </div>
        
        <div className="glass-morphism rounded-2xl p-6 premium-shadow animate-fade-in">
          <div className="mb-6">
            <Input
              placeholder="Search prompts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((entry) => (
                <HistoryItem
                  key={entry.id}
                  prompt={entry.prompt}
                  date={formatDate(entry.timestamp)}
                  onClick={() => handleHistoryItemClick(entry)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No matching prompts found" : "No history yet. Start by comparing some prompts!"}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
