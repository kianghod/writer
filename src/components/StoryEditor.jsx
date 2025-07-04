import React, { useState, useEffect, useRef } from 'react';
import IconButton from './IconButton';
import styles from './StoryEditor.module.css';

const LINES = 16;
const PATTERNS = [
  { key: 'dots', label: 'Dots' },
  { key: 'stripes', label: 'Stripes' },
  { key: 'grid', label: 'Grid' },
  { key: 'zigzag', label: 'Zigzag' }
];

function GearIcon({ color = '#222' }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 8.6 15a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 15 8.6a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 15z" stroke={color} strokeWidth="2" />
    </svg>
  );
}

// StoryEditor: Back button, title, lined paper text area
// Strictly follow design.json for all styles and states
export default function StoryEditor({ story, onBack, onSave }) {
  const [content, setContent] = useState(story.content || '');
  const [title, setTitle] = useState(story.title || '');
  const [coverPattern, setCoverPattern] = useState(story.coverPattern || 'dots');
  const [showSettings, setShowSettings] = useState(false);
  const textareaRef = useRef(null);
  const titleRef = useRef(null);

  // Autosave on content, title, or coverPattern change
  useEffect(() => {
    if (story && onSave) {
      onSave(story.id, content, title, coverPattern);
    }
    // eslint-disable-next-line
  }, [content, title, coverPattern]);

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current && textareaRef.current.focus();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <IconButton icon="back" aria-label="Back" onClick={onBack} className={styles.backBtn} />
        <input
          ref={titleRef}
          className={styles.titleInput}
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={40}
          aria-label="Story title"
          spellCheck={true}
        />
        <div className={styles.settingsWrap}>
          <button
            className={styles.settingsBtn}
            aria-label="Settings"
            type="button"
            onClick={() => setShowSettings(v => !v)}
          >
            <GearIcon />
          </button>
          {showSettings && (
            <div className={styles.patternMenu}>
              {PATTERNS.map(p => (
                <button
                  key={p.key}
                  className={styles.patternBtn + (coverPattern === p.key ? ' ' + styles.selected : '')}
                  type="button"
                  aria-label={p.label}
                  onClick={() => { setCoverPattern(p.key); setShowSettings(false); }}
                >
                  <span className={styles['preview_' + p.key]} /> {p.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.paper}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={LINES}
          aria-label="Story content"
          spellCheck={true}
        />
        <div className={styles.lines} aria-hidden="true">
          {[...Array(LINES)].map((_, i) => (
            <div key={i} className={styles.line} />
          ))}
        </div>
      </div>
    </div>
  );
} 