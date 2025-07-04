import styles from './StoryEditor.module.css';
import clsx from 'clsx';

export default function StoryScreen({ story, onBack, onUpdate, onDelete }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={onBack} aria-label="Back to stories">
          {/* Back icon (SVG or text) */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 18l-6-6 6-6" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <input
          className={styles.titleInput}
          value={title}
          onChange={handleTitleChange}
          aria-label="Story title"
          maxLength={60}
        />
        <div className={styles.settingsWrap}>
          <button
            className={styles.settingsBtn}
            onClick={toggleSettings}
            aria-label="Story settings"
            aria-haspopup="true"
            aria-expanded={settingsOpen}
          >
            {/* Gear icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.06a1 1 0 0 0 .25-1.09l-1-1.73a1 1 0 0 1 0-.94l1-1.73a1 1 0 0 0-.25-1.09l-2-2a1 1 0 0 0-1.09-.25l-1.73 1a1 1 0 0 1-.94 0l-1.73-1a1 1 0 0 0-1.09.25l-2 2a1 1 0 0 0-.25 1.09l1 1.73a1 1 0 0 1 0 .94l-1 1.73a1 1 0 0 0 .25 1.09l2 2a1 1 0 0 0 1.09.25l1.73-1a1 1 0 0 1 .94 0l1.73 1a1 1 0 0 0 1.09-.25l2-2z" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          {settingsOpen && (
            <div className={styles.patternMenu} role="menu">
              {patterns.map((pattern) => (
                <button
                  key={pattern}
                  className={clsx(styles.patternBtn, { [styles.selected]: story.pattern === pattern })}
                  onClick={() => handlePatternChange(pattern)}
                  role="menuitemradio"
                  aria-checked={story.pattern === pattern}
                >
                  <span className={styles[`preview_${pattern}`]} aria-hidden="true" />
                  {pattern.charAt(0).toUpperCase() + pattern.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.paper}>
        <div className={styles.lines} aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <div className={styles.line} key={i} />
          ))}
        </div>
        <textarea
          className={styles.textarea}
          value={body}
          onChange={handleBodyChange}
          placeholder="Start writing your story..."
          aria-label="Story body"
        />
      </div>
    </div>
  );
} 