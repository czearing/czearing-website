import Link from 'next/link';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          czearing
        </Link>
        <div className={styles.links}>
          <Link href="/articles" className={styles.link}>Articles</Link>
          <Link href="/videos" className={styles.link}>Videos</Link>
        </div>
      </nav>
    </header>
  );
}
