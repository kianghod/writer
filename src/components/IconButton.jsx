import React, { useState } from 'react';
import styles from './IconButton.module.css';

function PlusIcon({ fill }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function BackIcon({ fill }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 19l-7-7 7-7" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function IconButton({ icon, onClick, disabled, className, ...props }) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);

  let fill = '#222222';
  let bg = 'none';
  if (disabled) fill = '#CCCCCC';
  else if (active) { fill = '#0055AA'; bg = '#E5E5E5'; }
  else if (hover) { fill = '#007AFF'; bg = '#F0F0F0'; }

  return (
    <button
      className={`${styles.button} ${className || ''}`}
      type="button"
      disabled={disabled}
      style={{ background: bg, outline: focus ? '2px solid #007AFF' : 'none' }}
      onClick={onClick}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => { setActive(false); setHover(false); }}
      onMouseEnter={() => setHover(true)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      tabIndex={0}
      aria-label={icon === 'plus' ? 'Add' : 'Back'}
      {...props}
    >
      {icon === 'plus' ? <PlusIcon fill={fill} /> : <BackIcon fill={fill} />}
    </button>
  );
} 