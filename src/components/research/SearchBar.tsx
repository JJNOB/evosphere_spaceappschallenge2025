import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import styles from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchBar = ({ value, onChange, onSearch, isLoading }: SearchBarProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glow}></div>
      <div className={styles.searchWrapper}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything about space bioscience research..."
          className={styles.input}
        />
        <Button 
          size="lg" 
          className={styles.button}
          onClick={onSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className={styles.icon} />
              Processing...
            </>
          ) : (
            <>
              <Search className={styles.icon} />
              Search
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
