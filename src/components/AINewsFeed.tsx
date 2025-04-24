
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trending, News, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}

const mockNewsData: NewsItem[] = [
  {
    title: "Google's Gemini 1.5 Pro Shows Massive Improvement in Long-Context Understanding",
    description: "The latest model from Google DeepMind demonstrates breakthrough performance on complex multi-modal tasks with context windows of up to 1 million tokens.",
    url: "#",
    urlToImage: "https://picsum.photos/seed/ai1/600/400",
    publishedAt: "2025-04-23T15:30:00Z",
    source: { name: "AI Research Weekly" }
  },
  {
    title: "OpenAI Introduces GPT-5 with Advanced Reasoning Capabilities",
    description: "The new flagship model shows significant improvements in logical reasoning and complex problem-solving across scientific domains.",
    url: "#",
    urlToImage: "https://picsum.photos/seed/ai2/600/400",
    publishedAt: "2025-04-22T09:45:00Z",
    source: { name: "Tech Innovations" }
  },
  {
    title: "Groq's New Inference Engine Breaks Speed Records for LLM Processing",
    description: "The specialized AI hardware achieves unprecedented token generation speeds, making real-time AI conversations more fluid than ever.",
    url: "#",
    urlToImage: "https://picsum.photos/seed/ai3/600/400",
    publishedAt: "2025-04-21T18:15:00Z",
    source: { name: "Computing Frontier" }
  },
  {
    title: "Anthropic's Claude 3.5 Achieves New Benchmarks in Ethical AI Alignment",
    description: "The latest model demonstrates improved capability to understand and respect human values while maintaining high performance on standard benchmarks.",
    url: "#",
    urlToImage: "https://picsum.photos/seed/ai4/600/400",
    publishedAt: "2025-04-20T12:00:00Z",
    source: { name: "AI Ethics Today" }
  },
  {
    title: "Meta Releases Open-Source Multimodal Framework for AR/VR Applications",
    description: "The new framework enables developers to build sophisticated AI-powered experiences for augmented and virtual reality environments.",
    url: "#",
    urlToImage: null,
    publishedAt: "2025-04-19T14:30:00Z",
    source: { name: "Developer Chronicles" }
  },
  {
    title: "AI-Generated Content Detection Tools Improving in Accuracy",
    description: "New research shows significant improvement in tools that can distinguish between human and AI-generated text, images, and videos.",
    url: "#",
    urlToImage: "https://picsum.photos/seed/ai5/600/400",
    publishedAt: "2025-04-18T10:15:00Z",
    source: { name: "Digital Verification Network" }
  }
];

const AINewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>(mockNewsData);
  const [activeTab, setActiveTab] = useState<string>("latest");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // In a real implementation, you would fetch news from an API here
    // For now, we'll use the mock data
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, you'd make an API call here
        // For now, we just simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real scenario, you'd set the news from the API response
        // setNews(response.data.articles);
        
        // For now, we just use our mock data with a slight delay to simulate loading
        setNews(mockNewsData);
      } catch (error) {
        console.error("Failed to fetch AI news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [activeTab]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="w-full">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              AI News & Trends
            </CardTitle>
          </div>
          <CardDescription className="text-base text-muted-foreground">
            Stay updated with the latest advancements in artificial intelligence
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="latest" onValueChange={setActiveTab} value={activeTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="latest" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Latest</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-2">
                <Trending className="w-4 h-4" />
                <span>Trending</span>
              </TabsTrigger>
              <TabsTrigger value="research" className="flex items-center gap-2">
                <News className="w-4 h-4" />
                <span>Research</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="latest" className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-[200px] bg-muted rounded-xl"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {news.map((item, index) => (
                    <a 
                      key={index} 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-200 border border-gray-100 group-hover:border-blue-100">
                        {item.urlToImage && (
                          <div className="w-full h-40 overflow-hidden">
                            <img 
                              src={item.urlToImage} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <CardContent className={cn("p-4", !item.urlToImage && "pt-5")}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              {item.source.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(item.publishedAt)}
                            </span>
                          </div>
                          <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                            {item.description}
                          </p>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice().reverse().map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-200 border border-gray-100 group-hover:border-blue-100">
                      {item.urlToImage && (
                        <div className="w-full h-40 overflow-hidden">
                          <img 
                            src={item.urlToImage} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardContent className={cn("p-4", !item.urlToImage && "pt-5")}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            {item.source.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.publishedAt)}
                          </span>
                        </div>
                        <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="research">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.filter((_, i) => i % 2 === 0).map((item, index) => (
                  <a 
                    key={index} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow duration-200 border border-gray-100 group-hover:border-blue-100">
                      {item.urlToImage && (
                        <div className="w-full h-40 overflow-hidden">
                          <img 
                            src={item.urlToImage} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardContent className={cn("p-4", !item.urlToImage && "pt-5")}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                            {item.source.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(item.publishedAt)}
                          </span>
                        </div>
                        <h3 className="font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AINewsFeed;
