import type { Metadata } from 'next';
import { VideoList } from '@/components/VideoList/VideoList';
import type { Video } from '@/components/VideoCard/VideoCard';
import styles from './videos.module.css';

export const metadata: Metadata = {
  title: 'Videos | Caleb Zearing',
  description: 'Music production tutorials and educational content.',
};

async function getVideos(): Promise<Video[] | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=UC31v1AyV3iRiq3eGRN4l-RQ&part=snippet,id&order=date&maxResults=50`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.items || []).filter(
      (item: Video) => item.id.videoId
    );
  } catch {
    return [];
  }
}

export default async function VideosPage() {
  const videos = await getVideos();

  if (videos === null) {
    return (
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Videos</h1>
          <p className={styles.subtitle}>Music production tutorials and educational content.</p>
        </div>
        <p className={styles.notice}>
          Configure <code>NEXT_PUBLIC_GOOGLE_API_KEY</code> in your environment to load videos.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Videos</h1>
        <p className={styles.subtitle}>Music production tutorials and educational content.</p>
      </div>
      <VideoList videos={videos} />
    </div>
  );
}
