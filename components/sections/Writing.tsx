import Link from 'next/link';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import styles from './Writing.module.css';

export type Article = {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  categories: string[];
};

type WritingProps = {
  articles: Article[];
};

export function Writing({ articles }: WritingProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>Writing</h2>
        <Link href="/articles" className={styles.viewAll}>
          View all
        </Link>
      </div>
      {articles.length > 0 ? (
        <div className={styles.grid}>
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article.link} article={article} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Articles loading&hellip;</p>
      )}
    </section>
  );
}
