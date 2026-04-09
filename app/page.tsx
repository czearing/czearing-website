import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Writing } from '@/components/sections/Writing';
import { Music } from '@/components/sections/Music';
import { Connect } from '@/components/sections/Connect';
import type { Article } from '@/components/sections/Writing';

function extractFirstImage(content: string): string {
  return /<img[^>]+src="([^"]+)"/.exec(content)?.[1] ?? '';
}

async function getRecentArticles(): Promise<Article[]> {
  try {
    const res = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@czearing',
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.items || []).slice(0, 3).map((item: any) => ({
      ...item,
      thumbnail: item.thumbnail || extractFirstImage(item.content ?? ''),
    }));
  } catch {
    return [];
  }
}

export default async function Home() {
  const articles = await getRecentArticles();

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Writing articles={articles} />
      <Music />
      <Connect />
    </>
  );
}
