import { SoundCloudIcon, SpotifyIcon, AppleMusicIcon, YouTubeIcon } from '../Icons';
import styles from './Music.module.css';

const musicLinks = [
  {
    label: 'SoundCloud',
    href: 'https://soundcloud.com/caleb_z',
    icon: <SoundCloudIcon size={20} />,
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/artist/564lyz9Wk0PY0XT6P6pnCk',
    icon: <SpotifyIcon size={20} />,
  },
  {
    label: 'Apple Music',
    href: 'https://music.apple.com/us/artist/calebz/1566040977',
    icon: <AppleMusicIcon size={20} />,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/c/CalebZaudio',
    icon: <YouTubeIcon size={20} />,
  },
];

export function Music() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2 className={styles.heading}>Music</h2>
          <p className={styles.tagline}>
            Electronic music, independently released.
          </p>
        </div>
        <div className={styles.links}>
          {musicLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label={item.label}
              title={item.label}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
