import React, { useState, useRef } from 'react';
import NumericKeypad from './NumericKeypad';
import styles from './PasscodeScreen.module.css';

const PASSCODE_LENGTH = 4;
const CORRECT_PASSCODE = '1234';

// PasscodeScreen: Numeric keypad, passcode dots, error state
// Strictly follow design.json for all styles and states
export default function PasscodeScreen({ onSubmit }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  // Handle keypad or keyboard input
  const handleInput = (num) => {
    if (input.length < PASSCODE_LENGTH) {
      setInput(input + num);
    }
  };

  // Handle backspace (keyboard only)
  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  // Handle submit
  React.useEffect(() => {
    if (input.length === PASSCODE_LENGTH) {
      if (input === CORRECT_PASSCODE) {
        setTimeout(() => {
          setError('');
          setInput('');
          onSubmit(input);
        }, 200);
      } else {
        setError('Incorrect passcode');
        setTimeout(() => {
          setInput('');
          setError('');
        }, 1200);
      }
    }
  }, [input, onSubmit]);

  // Keyboard support
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleInput(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className={styles.container}>
      <div className={styles.title}>Enter Passcode</div>
      <div className={styles.dots} aria-label={`Passcode, ${input.length} of ${PASSCODE_LENGTH} digits entered`}>
        {[...Array(PASSCODE_LENGTH)].map((_, i) => (
          <span
            key={i}
            className={
              i < input.length ? styles.dotFilled : styles.dot
            }
            aria-hidden="true"
          />
        ))}
      </div>
      {error && <div className={styles.error} role="alert">{error}</div>}
      <NumericKeypad
        onKeyPress={handleInput}
        disabled={input.length === PASSCODE_LENGTH}
        aria-label="Numeric keypad"
      />
    </div>
  );
} 