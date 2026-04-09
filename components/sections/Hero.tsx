'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { FlowField } from '../FlowField/FlowField';
import styles from './Hero.module.css';

export function Hero() {
  const innerRef = useRef<HTMLDivElement>(null);
  return (
    <section className={styles.section}>
      <FlowField avoidRef={innerRef} />
      <div ref={innerRef} className={styles.inner}>
        <h1 className={styles.name}>Caleb Zearing</h1>
        <div className={styles.currently}>
          <span className={styles.currentlyLabel}>Currently</span>
          <span className={styles.currentlyText}>
            Building UI systems at Microsoft. Writing. Making music.
          </span>
        </div>
        <div className={styles.actions}>
          <Link href="/articles" className={styles.actionPrimary}>
            Read my writing
          </Link>
          <a
            href="https://github.com/czearing"
            className={styles.actionSecondary}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
