// ─── Mira Speech Bubble ───────────────────────────────────────────────────────
// Appears above/beside the floating Mira widget when she has something to say.

import { useEffect, useRef } from 'react';

export default function MiraSpeechBubble({ message, visible, onClick }) {
  const ref = useRef(null);

  useEffect(() => {
    if (visible && ref.current) {
      ref.current.style.opacity = '0';
      ref.current.style.transform = 'translateY(10px) scale(0.93)';
      requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transition = 'all 0.28s cubic-bezier(0.34,1.56,0.64,1)';
          ref.current.style.opacity = '1';
          ref.current.style.transform = 'translateY(0) scale(1)';
        }
      });
    }
  }, [visible, message]);

  if (!visible || !message) return null;

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 14px)',
        right: 0,
        background: 'white',
        borderRadius: '16px 16px 4px 16px',
        padding: '12px 16px',
        boxShadow: '0 6px 24px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.06)',
        fontSize: 13.5,
        lineHeight: 1.55,
        color: '#374151',
        maxWidth: 230,
        whiteSpace: 'pre-wrap',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        zIndex: 10,
        border: '1.5px solid #ede9fe',
      }}
    >
      {message}
      {/* Tail */}
      <div style={{
        position: 'absolute',
        bottom: -9,
        right: 20,
        width: 0,
        height: 0,
        borderLeft:  '9px solid transparent',
        borderTop:   '9px solid white',
        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.05))',
      }} />
      <div style={{
        position: 'absolute',
        bottom: -11,
        right: 19,
        width: 0,
        height: 0,
        borderLeft:  '10px solid transparent',
        borderTop:   '11px solid #ede9fe',
        zIndex: -1,
      }} />
    </div>
  );
}
