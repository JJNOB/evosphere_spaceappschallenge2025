import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles, FileText, TrendingUp, Users, Calendar, BarChart3, Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from "react-markdown";

interface ResearchResult {
  summary: string;
  keyFindings: string;
  contradictions: string;
  sources: Array<{ title: string; url: string }>;
}

const Index = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const exampleQueries = [
    "Effects of microgravity on bone density",
    "Plant growth in space conditions",
    "Radiation impact on human cells",
    "Muscle atrophy during long-term missions"
  ];

  const researchCategories = [
    { name: "Human Biology", count: 156, icon: Users, color: "from-blue-500 to-cyan-500" },
    { name: "Plant Science", count: 98, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { name: "Microbiology", count: 142, icon: Sparkles, color: "from-purple-500 to-pink-500" },
    { name: "Cell Biology", count: 212, icon: FileText, color: "from-orange-500 to-red-500" }
  ];

  const stats = [
    { label: "Total Publications", value: "608", icon: FileText },
    { label: "Research Areas", value: "12", icon: BarChart3 },
    { label: "Years Covered", value: "30+", icon: Calendar },
    { label: "Active Studies", value: "89", icon: TrendingUp }
  ];

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a query",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('research-query', {
        body: { query }
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive"
        });
        return;
      }

      setResult(data.result as ResearchResult);
      toast({
        title: "Query processed",
        description: "Results are ready"
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error processing query",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Animated background stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-secondary rounded-full animate-pulse delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-accent rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/60 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powered by AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-gradient">NASA BioScience</span>
            <br />
            <span className="text-foreground">Research Explorer</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore 608 NASA bioscience publications with AI-powered insights. 
            Discover breakthroughs, identify knowledge gaps, and advance human space exploration.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-50 transition"></div>
              <div className="relative glass rounded-2xl p-2 flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about space bioscience research..."
                  className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <Button 
                  size="lg" 
                  className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  onClick={handleSearch}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Example Queries */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {exampleQueries.map((example, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary/20 transition px-3 py-1.5"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Results Tabs */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger 
              value="insights" 
              disabled={!result || result.sources.length === 0}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Insights
            </TabsTrigger>
            <TabsTrigger 
              value="gaps" 
              disabled={!result || result.sources.length === 0}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Knowledge Gaps
            </TabsTrigger>
            <TabsTrigger 
              value="sources" 
              disabled={!result || result.sources.length === 0}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="mt-8">
            <Card className="glass p-8">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  result && result.sources.length > 0 
                    ? "bg-gradient-to-br from-primary to-secondary" 
                    : "bg-gradient-to-br from-orange-500 to-red-500"
                }`}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">
                    {result && result.sources.length > 0 ? "General Summary" : "No Information Found"}
                  </h3>
                  {result ? (
                    <div className="prose prose-invert max-w-none text-foreground leading-relaxed">
                      <ReactMarkdown>{result.summary}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      Enter a query above to get AI-powered summaries of NASA bioscience research. 
                      Our system analyzes hundreds of publications to provide comprehensive insights 
                      into space biology experiments and their implications for human exploration.
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="mt-8">
            <Card className="glass p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Key Findings</h3>
                  {result ? (
                    <div className="prose prose-invert max-w-none text-foreground leading-relaxed">
                      <ReactMarkdown>{result.keyFindings}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      Discover breakthrough findings, consensus areas, and conflicting results across 
                      different studies. Understand trends and progress in space biology research.
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="gaps" className="mt-8">
            <Card className="glass p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4">Contradictions & Debates</h3>
                  {result ? (
                    <div className="prose prose-invert max-w-none text-foreground leading-relaxed">
                      <ReactMarkdown>
                        {result.contradictions || "No significant contradictions or debates identified in the current research."}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      Identify unexplored areas and research opportunities. Find where additional 
                      studies are needed to support future Moon and Mars missions.
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources" className="mt-8">
            <Card className="glass p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">Referenced Sources</h3>
                    {result && result.sources.length > 0 && (
                      <Button
                        onClick={() => {
                          const csv = [
                            ['Title', 'URL'],
                            ...result.sources.map(s => [s.title, s.url])
                          ].map(row => row.join(',')).join('\n');
                          
                          const blob = new Blob([csv], { type: 'text/csv' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'research-sources.csv';
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="gap-2"
                        variant="outline"
                      >
                        <Download className="w-4 h-4" />
                        Download CSV
                      </Button>
                    )}
                  </div>
                  {result && result.sources.length > 0 ? (
                    <div className="space-y-3">
                      {result.sources.map((source, i) => (
                        <div key={i} className="p-4 glass rounded-lg hover:border-primary/50 transition">
                          <h4 className="font-semibold text-foreground mb-2">{source.title}</h4>
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            {source.url}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      Enter a query above to see the list of relevant research papers and publications.
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Database Overview</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="glass p-6 hover:border-primary/50 transition group">
              <stat.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition" />
              <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Research Categories */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Research Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {researchCategories.map((category, i) => (
            <Card key={i} className="glass p-6 hover:border-primary/50 transition cursor-pointer group">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-muted-foreground">{category.count} publications</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
