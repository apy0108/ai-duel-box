
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightLeft, Clock, Settings, LogOut, Grid, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('user') !== null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/login');
  };

  return (
    <nav className="w-full py-6 px-8 flex justify-between items-center glass-morphism fixed top-0 left-0 right-0 z-50 animate-fade-in">
      <Link to="/" className="flex items-center gap-2">
        <Layers className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-medium tracking-tight">AI Fusion Hub</h1>
      </Link>
      
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link 
              to="/categories" 
              className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <Grid className="w-4 h-4" />
              <span>AI Categories</span>
            </Link>
            
            <Link 
              to="/history" 
              className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <Clock className="w-4 h-4" />
              <span>History</span>
            </Link>
            
            <Link 
              to="/settings" 
              className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            className="text-sm text-primary font-medium hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
