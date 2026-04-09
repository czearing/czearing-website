import Image from 'next/image';
import styles from './VideoCard.module.css';

export type Video = {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: { high: { url: string } };
  };
};

type Props = {
  video: Video;
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function VideoCard({ video }: Props) {
  const url = `https://www.youtube.com/watch?v=${video.id.videoId}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
      data-testid="video-card"
    >
      <div className={styles.thumbnail}>
        <Image
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          fill
          sizes="(max-width: 720px) 100vw, 240px"
          style={{ objectFit: 'cover' }}
          unoptimized
        />
        <div className={styles.playOverlay}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{video.snippet.title}</h3>
        <time className={styles.date}>{formatDate(video.snippet.publishedAt)}</time>
      </div>
    </a>
  );
}
