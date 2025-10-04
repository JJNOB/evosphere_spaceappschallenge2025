import { useState } from "react";
import { FileText, TrendingUp, Users, Calendar, BarChart3, Sparkles } from "lucide-react";
import { useResearchQuery } from "@/hooks/useResearchQuery";
import { BackgroundStars } from "@/components/research/BackgroundStars";
import { HeroSection } from "@/components/research/HeroSection";
import { ResultsTabs } from "@/components/research/ResultsTabs";
import { StatsSection } from "@/components/research/StatsSection";
import { ResearchCategories } from "@/components/research/ResearchCategories";
import { StatItem, ResearchCategory } from "@/types/research";
import styles from "./Index.module.css";

const exampleQueries = [
  "Effects of microgravity on bone density",
  "Plant growth in space conditions",
  "Radiation impact on human cells",
  "Muscle atrophy during long-term missions"
];

const researchCategories: ResearchCategory[] = [
  { name: "Human Biology", count: 156, icon: Users, color: "from-blue-500 to-cyan-500" },
  { name: "Plant Science", count: 98, icon: TrendingUp, color: "from-green-500 to-emerald-500" },
  { name: "Microbiology", count: 142, icon: Sparkles, color: "from-purple-500 to-pink-500" },
  { name: "Cell Biology", count: 212, icon: FileText, color: "from-orange-500 to-red-500" }
];

const stats: StatItem[] = [
  { label: "Total Publications", value: "608", icon: FileText },
  { label: "Research Areas", value: "12", icon: BarChart3 },
  { label: "Years Covered", value: "30+", icon: Calendar },
  { label: "Active Studies", value: "89", icon: TrendingUp }
];

const Index = () => {
  const [query, setQuery] = useState("");
  const { result, isLoading, executeQuery } = useResearchQuery();

  const handleSearch = () => {
    executeQuery(query);
  };

  return (
    <div className={styles.container}>
      <BackgroundStars />
      
      <HeroSection
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
        exampleQueries={exampleQueries}
      />

      <ResultsTabs result={result} />

      <StatsSection stats={stats} />

      <ResearchCategories categories={researchCategories} />
    </div>
  );
};

export default Index;
