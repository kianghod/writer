import React from 'react';
import styles from './NumericKeypad.module.css';

const KEYS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [0]
];

// NumericKeypad: For passcode input, with all states
// Strictly follow design.json for all styles and states
export default function NumericKeypad({ onKeyPress, disabled }) {
  return (
    <div className={styles.keypad} role="group" aria-label="Numeric keypad">
      {KEYS.map((row, i) => (
        <div className={styles.row} key={i}>
          {row.map((num) => (
            <button
              key={num}
              className={styles.button}
              type="button"
              tabIndex={0}
              disabled={disabled}
              aria-label={`Key ${num}`}
              onClick={() => !disabled && onKeyPress(num.toString())}
            >
              {num}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
} 