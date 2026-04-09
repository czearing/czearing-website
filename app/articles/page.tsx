import type { Metadata } from 'next';
import { ArticleList } from '@/components/ArticleList/ArticleList';
import type { Article } from '@/components/sections/Writing';
import styles from './articles.module.css';

export const metadata: Metadata = {
  title: 'Articles | Caleb Zearing',
  description: 'Writing on software engineering, UI systems, and developer tooling.',
};

function extractFirstImage(content: string): string {
  return /<img[^>]+src="([^"]+)"/.exec(content)?.[1] ?? '';
}

async function getAllArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@czearing',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.items || []).map((item: any) => ({
      ...item,
      thumbnail: item.thumbnail || extractFirstImage(item.content ?? ''),
    }));
  } catch {
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Articles</h1>
        <p className={styles.subtitle}>
          Writing on software engineering, UI systems, and developer tooling.
        </p>
      </div>
      <ArticleList articles={articles} />
    </div>
  );
}
