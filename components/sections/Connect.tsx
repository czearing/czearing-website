import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon, YouTubeIcon, MediumIcon } from '../Icons';
import styles from './Connect.module.css';

const links = [
  { label: 'GitHub', href: 'https://github.com/czearing', icon: <GitHubIcon size={20} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/caleb-zearing/', icon: <LinkedInIcon size={20} /> },
  { label: 'Twitter', href: 'https://twitter.com/czearing_', icon: <TwitterIcon size={20} /> },
  { label: 'Medium', href: 'https://medium.com/@czearing', icon: <MediumIcon size={20} /> },
  { label: 'YouTube', href: 'https://www.youtube.com/c/CalebZaudio', icon: <YouTubeIcon size={20} /> },
  { label: 'Email', href: 'mailto:czearing@outlook.com', icon: <MailIcon size={20} /> },
];

export function Connect() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Connect</h2>
        <div className={styles.links}>
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
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
