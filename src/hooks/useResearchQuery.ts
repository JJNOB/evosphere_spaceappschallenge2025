import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ResearchResult } from "@/types/research";

export const useResearchQuery = () => {
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const executeQuery = async (query: string) => {
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
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    result,
    isLoading,
    executeQuery
  };
};
