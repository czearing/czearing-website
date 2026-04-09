import Image from 'next/image';
import type { Article } from '../sections/Writing';
import styles from './ArticleCard.module.css';

type Props = {
  article: Article;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function ArticleCard({ article }: Props) {
  return (
    <a
      href={article.link}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      data-testid="article-card"
    >
      {article.thumbnail && (
        <div className={styles.thumbnail}>
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="(max-width: 720px) 100vw, 240px"
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{article.title}</h3>
        <time className={styles.date}>{formatDate(article.pubDate)}</time>
        {article.categories.length > 0 && (
          <div className={styles.tags}>
            {article.categories.slice(0, 3).map((cat) => (
              <span key={cat} className={styles.tag}>{cat}</span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
