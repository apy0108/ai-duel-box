
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 text-center text-sm text-foreground/60 animate-fade-in">
      <p>© {new Date().getFullYear()} AI Duel Box. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
