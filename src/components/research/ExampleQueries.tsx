import { Badge } from "@/components/ui/badge";
import styles from './ExampleQueries.module.css';

interface ExampleQueriesProps {
  queries: string[];
  onQuerySelect: (query: string) => void;
}

export const ExampleQueries = ({ queries, onQuerySelect }: ExampleQueriesProps) => {
  return (
    <div className={styles.container}>
      {queries.map((example, i) => (
        <Badge
          key={i}
          variant="secondary"
          className={styles.badge}
          onClick={() => onQuerySelect(example)}
        >
          {example}
        </Badge>
      ))}
    </div>
  );
};
