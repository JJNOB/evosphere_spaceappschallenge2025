import styles from './BackgroundStars.module.css';

export const BackgroundStars = () => {
  return (
    <div className={styles.container}>
      <div className={styles.star1}></div>
      <div className={styles.star2}></div>
      <div className={styles.star3}></div>
      <div className={styles.star4}></div>
    </div>
  );
};
