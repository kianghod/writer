import React from 'react';
import StoryCard from './StoryCard';
import IconButton from './IconButton';
import styles from './StoryDashboard.module.css';

// StoryDashboard: Header, add-story icon button, grid of story cards
// Strictly follow design.json for all styles and states
export default function StoryDashboard({ stories, onAdd, onSelect, onChangeCoverPattern }) {
  // Handler to update cover pattern for a story
  const handleCoverPatternChange = (id, pattern) => {
    if (onChangeCoverPattern) onChangeCoverPattern(id, pattern);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Write</div>
        <IconButton
          icon="plus"
          aria-label="Add story"
          onClick={onAdd}
          className={styles.addButton}
        />
      </div>
      {stories.length === 0 ? (
        <div className={styles.empty}>No stories yet. Tap + to add your first story.</div>
      ) : (
        <div className={styles.grid}>
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              onClick={() => onSelect(story)}
              coverPattern={story.coverPattern}
              onCoverPatternChange={pattern => handleCoverPatternChange(story.id, pattern)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 