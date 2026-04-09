'use client';

import { useState } from 'react';
import { SearchInput } from '../SearchInput/SearchInput';
import { ArticleCard } from '../ArticleCard/ArticleCard';
import type { Article } from '../sections/Writing';
import styles from './ArticleList.module.css';

type Props = {
  articles: Article[];
};

export function ArticleList({ articles }: Props) {
  const [query, setQuery] = useState('');

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <SearchInput value={query} onChange={setQuery} placeholder="Search articles..." />
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((article) => (
            <ArticleCard key={article.link} article={article} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          {query ? 'No articles match your search.' : 'No articles found.'}
        </p>
      )}
    </div>
  );
}
