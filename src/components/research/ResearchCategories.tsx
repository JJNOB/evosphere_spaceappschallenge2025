import { Card } from "@/components/ui/card";
import { ResearchCategory } from "@/types/research";
import styles from './ResearchCategories.module.css';

interface ResearchCategoriesProps {
  categories: ResearchCategory[];
}

export const ResearchCategories = ({ categories }: ResearchCategoriesProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Research Categories</h2>
      <div className={styles.grid}>
        {categories.map((category, i) => (
          <Card key={i} className={styles.card}>
            <div 
              className={styles.iconWrapper}
              style={{
                background: `linear-gradient(to bottom right, ${category.color.replace('from-', 'hsl(var(--').replace('to-', 'hsl(var(--').replace('-500', '))')})`
              }}
            >
              <category.icon className={styles.icon} />
            </div>
            <h3 className={styles.categoryName}>{category.name}</h3>
            <p className={styles.categoryCount}>{category.count} publications</p>
          </Card>
        ))}
      </div>
    </section>
  );
};
