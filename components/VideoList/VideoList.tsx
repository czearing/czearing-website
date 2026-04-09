'use client';

import { useState } from 'react';
import { SearchInput } from '../SearchInput/SearchInput';
import { VideoCard, type Video } from '../VideoCard/VideoCard';
import styles from './VideoList.module.css';

type Props = {
  videos: Video[];
};

export function VideoList({ videos }: Props) {
  const [query, setQuery] = useState('');

  const filtered = videos.filter((v) =>
    v.snippet.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <SearchInput value={query} onChange={setQuery} placeholder="Search videos..." />
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((video) => (
            <VideoCard key={video.id.videoId} video={video} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>
          {query ? 'No videos match your search.' : 'No videos found.'}
        </p>
      )}
    </div>
  );
}
