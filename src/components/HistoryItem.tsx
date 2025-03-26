
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HistoryItemProps {
  prompt: string;
  date: string;
  onClick: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ prompt, date, onClick }) => {
  return (
    <div 
      onClick={onClick} 
      className="p-4 border border-border/50 rounded-xl hover:bg-accent cursor-pointer transition-colors duration-200 flex justify-between items-center group animate-fade-in"
    >
      <div className="space-y-1 overflow-hidden">
        <p className="font-medium text-sm line-clamp-1">{prompt}</p>
        <p className="text-xs text-muted-foreground">{date}</p>
      </div>
      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </div>
  );
};

export default HistoryItem;
