
import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

const NavBar: React.FC = () => {
  return (
    <nav className="w-full py-6 px-8 flex justify-between items-center glass-morphism fixed top-0 left-0 right-0 z-50 animate-fade-in">
      <div className="flex items-center gap-2">
        <ArrowRightLeft className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-medium tracking-tight">AI Duel Box</h1>
      </div>
      <div className="flex items-center gap-4">
        <a 
          href="#" 
          className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
        >
          About
        </a>
        <a 
          href="#" 
          className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
        >
          FAQ
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
