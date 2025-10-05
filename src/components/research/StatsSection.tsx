import { Card } from "@/components/ui/card";
import { StatItem } from "@/types/research";
import styles from './StatsSection.module.css';

interface StatsSectionProps {
  stats: StatItem[];
}

export const StatsSection = ({ stats }: StatsSectionProps) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Database Overview</h2>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <Card key={i} className={styles.card}>
            <stat.icon className={styles.icon} />
            <div className={styles.value}>{stat.value}</div>
            <div className={styles.label}>{stat.label}</div>
          </Card>
        ))}
      </div>
    </section>
  );
};
