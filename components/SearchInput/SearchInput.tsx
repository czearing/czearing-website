'use client';

import { SearchIcon } from '../Icons';
import styles from './SearchInput.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = 'Search...' }: Props) {
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>
        <SearchIcon size={16} />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}
