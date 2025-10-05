import { Sparkles } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { ExampleQueries } from "./ExampleQueries";
import styles from './HeroSection.module.css';
interface HeroSectionProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  exampleQueries: string[];
}
export const HeroSection = ({
  query,
  setQuery,
  onSearch,
  isLoading,
  exampleQueries
}: HeroSectionProps) => {
  return <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.badge}>
          <Sparkles className={styles.badgeIcon} />
          <span className={styles.badgeText}>Powered by AI</span>
        </div>
        
        <h1 className={styles.title}>
          <span className={styles.titleGradient}>SPACE Biology</span>
          <br />
          <span className={styles.titleText}>Research Explorer</span>
        </h1>
        
        <p className={styles.description}>Explore NASA bioscience publications with AI-powered insights. Search through research papers and get instant AI-generated summaries and analysis.</p>

        <div className={styles.searchContainer}>
          <SearchBar value={query} onChange={setQuery} onSearch={onSearch} isLoading={isLoading} />
          
          <ExampleQueries queries={exampleQueries} onQuerySelect={setQuery} />
        </div>
      </div>
    </header>;
};