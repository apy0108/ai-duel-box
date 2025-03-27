
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Search, ArrowRightLeft, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Define the AI tool interface
interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  tags: string[];
  isFree: boolean;
}

// Define the categories
const categories = [
  'Text Generation',
  'Image Generation',
  'Code Assistance',
  'Data Analysis',
  'Audio/Video',
  'Translation',
  'Automation',
  'All'
];

const Categories: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Sample AI tools data
  const aiTools: AITool[] = [
    {
      id: '1',
      name: 'ChatGPT',
      description: 'Advanced AI chatbot that can understand and generate human-like text based on the input it receives.',
      category: 'Text Generation',
      imageUrl: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      link: 'https://chat.openai.com',
      tags: ['chatbot', 'text', 'openai'],
      isFree: true
    },
    {
      id: '2',
      name: 'Gemini',
      description: 'Google\'s multimodal AI that can process text, code, audio, image, and video inputs.',
      category: 'Text Generation',
      imageUrl: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef',
      link: 'https://gemini.google.com',
      tags: ['chatbot', 'multimodal', 'google'],
      isFree: true
    },
    {
      id: '3',
      name: 'DALL-E',
      description: "Creates images from textual descriptions, pushing the boundaries of what's possible in image generation.",
      category: 'Image Generation',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      link: 'https://openai.com/dall-e-3',
      tags: ['images', 'openai', 'art'],
      isFree: false
    },
    {
      id: '4',
      name: 'Midjourney',
      description: 'AI program that creates images from textual descriptions with exceptional artistic quality.',
      category: 'Image Generation',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12',
      link: 'https://www.midjourney.com',
      tags: ['images', 'art', 'design'],
      isFree: false
    },
    {
      id: '5',
      name: 'GitHub Copilot',
      description: 'AI pair programmer that helps you write code faster and with less work.',
      category: 'Code Assistance',
      imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
      link: 'https://github.com/features/copilot',
      tags: ['code', 'programming', 'github'],
      isFree: false
    },
    {
      id: '6',
      name: 'Tableau AI',
      description: 'AI-powered analytics that helps you discover insights and make better decisions with your data.',
      category: 'Data Analysis',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      link: 'https://www.tableau.com',
      tags: ['data', 'analytics', 'visualization'],
      isFree: false
    },
    {
      id: '7',
      name: 'Descript',
      description: 'All-in-one audio/video editing software with transcription, overdub, and collaboration features.',
      category: 'Audio/Video',
      imageUrl: 'https://images.unsplash.com/photo-1470075801209-17f9ec0cada6',
      link: 'https://www.descript.com',
      tags: ['audio', 'video', 'editing'],
      isFree: true
    },
    {
      id: '8',
      name: 'Claude',
      description: 'Anthropic\'s conversational AI assistant designed to be helpful, harmless, and honest.',
      category: 'Text Generation',
      imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
      link: 'https://claude.ai',
      tags: ['chatbot', 'text', 'anthropic'],
      isFree: true
    }
  ];

  // Filter tools based on search query and selected category
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleCompareClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pt-32 pb-16">
        <div className="text-center mb-12 animate-slide-down">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            AI Tools Directory
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Discover the best AI tools across different categories
          </p>
        </div>
        
        {/* Search & Filter Section */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search AI tools..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto md:justify-end">
            <Button
              onClick={handleCompareClick}
              className="shrink-0 flex gap-2 items-center"
              variant="outline"
            >
              <ArrowRightLeft className="w-4 h-4" />
              Compare AIs
            </Button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="shrink-0"
            >
              {category}
            </Button>
          ))}
        </div>
        
        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map(tool => (
            <div 
              key={tool.id}
              className="bg-background/80 border rounded-xl p-5 hover:shadow-lg transition-shadow duration-300 animate-fade-in glass-morphism premium-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <img 
                    src={tool.imageUrl}
                    alt={tool.name}
                    className="w-6 h-6 object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{tool.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>
                    {tool.isFree && (
                      <Badge variant="secondary" className="text-xs">
                        Free
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {tool.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {tool.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-end">
                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                >
                  Visit <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No AI tools found matching your criteria.</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
