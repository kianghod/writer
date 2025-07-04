import React, { useState, useEffect } from 'react';
import { PasscodeScreen, StoryDashboard, StoryEditor } from './components';

const STORAGE_KEY = 'writing-app-stories';
const DEFAULT_PATTERN = 'dots';

// Main App: Handles navigation and state
export default function App() {
  // State: passcode, stories, current screen, selected story
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stories, setStories] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('passcode'); // 'passcode' | 'dashboard' | 'editor'
  const [selectedStory, setSelectedStory] = useState(null);

  // Load stories from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setStories(JSON.parse(saved));
      } catch (e) {
        setStories([]);
      }
    }
  }, []);

  // Save stories to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stories));
  }, [stories]);

  // Passcode check (for demo, hardcoded to '1234')
  const handlePasscodeSubmit = (input) => {
    if (input === '1234') {
      setIsAuthenticated(true);
      setCurrentScreen('dashboard');
    } else {
      // TODO: Show error state in PasscodeScreen
    }
  };

  // Add new story
  const handleAddStory = () => {
    const newStory = { id: Date.now(), title: `Story ${stories.length + 1}`, content: '', coverPattern: DEFAULT_PATTERN };
    setStories([newStory, ...stories]);
    setSelectedStory(newStory);
    setCurrentScreen('editor');
  };

  // Select story
  const handleSelectStory = (story) => {
    setSelectedStory(story);
    setCurrentScreen('editor');
  };

  // Save story content
  const handleSaveStory = (id, content, title, coverPattern) => {
    setStories(stories.map(s => s.id === id ? { ...s, content, title, coverPattern: coverPattern || s.coverPattern || DEFAULT_PATTERN } : s));
  };

  // Update only the coverPattern for a story
  const handleChangeCoverPattern = (id, pattern) => {
    setStories(stories.map(s => s.id === id ? { ...s, coverPattern: pattern } : s));
  };

  // Back to dashboard
  const handleBack = () => {
    setCurrentScreen('dashboard');
    setSelectedStory(null);
  };

  // Render screens
  return (
    <div className="App"> {/* TODO: Apply app background from design.json */}
      {currentScreen === 'passcode' && (
        <PasscodeScreen onSubmit={handlePasscodeSubmit} />
      )}
      {currentScreen === 'dashboard' && (
        <StoryDashboard
          stories={stories}
          onAdd={handleAddStory}
          onSelect={handleSelectStory}
          onChangeCoverPattern={handleChangeCoverPattern}
        />
      )}
      {currentScreen === 'editor' && selectedStory && (
        <StoryEditor
          story={selectedStory}
          onBack={handleBack}
          onSave={handleSaveStory}
        />
      )}
    </div>
  );
} 