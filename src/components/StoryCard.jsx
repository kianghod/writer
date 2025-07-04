import React, { useState } from 'react';
import styles from './StoryCard.module.css';

const PATTERNS = [
  { key: 'dots', label: 'Dots' },
  { key: 'stripes', label: 'Stripes' },
  { key: 'grid', label: 'Grid' },
  { key: 'zigzag', label: 'Zigzag' }
];

function PatternBackground({ pattern }) {
  // Only solid color backgrounds per design.json, but allow patterns
  if (pattern === 'dots') {
    return <div className={styles.dotsPattern} />;
  }
  if (pattern === 'stripes') {
    return <div className={styles.stripesPattern} />;
  }
  if (pattern === 'grid') {
    return <div className={styles.gridPattern} />;
  }
  if (pattern === 'zigzag') {
    return <div className={styles.zigzagPattern} />;
  }
  // fallback
  return <div className={styles.dotsPattern} />;
}

function PaletteIcon({ color = '#222' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.5" fill="#FFF" />
      <circle cx="7" cy="8" r="1" fill={color} />
      <circle cx="13" cy="8" r="1" fill={color} />
      <circle cx="10" cy="13" r="1" fill={color} />
    </svg>
  );
}

// StoryCard: For each story in the grid
// Strictly follow design.json for all styles and states
export default function StoryCard({ title, onClick, disabled, coverPattern, onCoverPatternChange }) {
  const [active, setActive] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <button
        className={
          `${styles.card} ${active ? styles.active : ''}`
        }
        type="button"
        disabled={disabled}
        onClick={onClick}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        onMouseLeave={() => setActive(false)}
        aria-label={title}
        tabIndex={0}
      >
        <PatternBackground pattern={coverPattern} />
        <div className={styles.spine} aria-hidden="true" />
        <div className={styles.pageEdge} aria-hidden="true" />
        <span className={styles.title}>{title}</span>
        <button
          type="button"
          className={styles.themeIconBtn}
          tabIndex={0}
          aria-label="Change cover pattern"
          onClick={e => { e.stopPropagation(); setShowDropdown(v => !v); }}
        >
          <PaletteIcon />
        </button>
        {showDropdown && (
          <div className={styles.patternDropdown} onClick={e => e.stopPropagation()}>
            {PATTERNS.map(p => (
              <button
                key={p.key}
                className={styles.patternSwatch + (coverPattern === p.key ? ' ' + styles.selected : '')}
                type="button"
                aria-label={p.label}
                tabIndex={0}
                onClick={() => { onCoverPatternChange && onCoverPatternChange(p.key); setShowDropdown(false); }}
              >
                <span className={styles['preview_' + p.key]} />
              </button>
            ))}
          </div>
        )}
      </button>
    </div>
  );
} 