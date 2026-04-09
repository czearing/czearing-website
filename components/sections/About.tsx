import styles from './About.module.css';

export function About() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>About</h2>
      <div className={styles.prose}>
        <p>
          I&apos;m a software engineer at{' '}
          <span className={styles.highlight}>Microsoft</span>, building UI for
          Microsoft 365.
        </p>
        <p>
          I build production apps, ship open-source libraries, and make music
          independently.
        </p>
      </div>
    </section>
  );
}
