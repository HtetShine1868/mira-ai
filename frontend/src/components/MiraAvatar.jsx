// ─── Mira Avatar ─────────────────────────────────────────────────────────────
// The core Mira mascot: white rounded body, large black face screen, white eyes.
// Driven by CSS animation classes that swap based on `state` prop.
// All four states (normal, scanning, warning, danger) share the same SVG shape
// — only colour, expression, and animation change.

const STATE_CFG = {
  normal: {
    bodyClass: 'mira-float',
    glowColor: '#a78bfa',
    faceColor: '#111827',
    eyeColor: '#ffffff',
    badge: null,
    scannerVisible: false,
  },
  scanning: {
    bodyClass: 'mira-scan',
    glowColor: '#818cf8',
    faceColor: '#111827',
    eyeColor: '#ffffff',
    badge: null,
    scannerVisible: true,
  },
  warning: {
    bodyClass: 'mira-tilt',
    glowColor: '#fbbf24',
    faceColor: '#1c1400',
    eyeColor: '#ffffff',
    badge: 'warning',
    scannerVisible: false,
  },
  danger: {
    bodyClass: 'mira-shake',
    glowColor: '#f87171',
    faceColor: '#1a000a',
    eyeColor: '#fca5a5',
    badge: 'danger',
    scannerVisible: false,
  },
};

export default function MiraAvatar({ state = 'normal', size = 80 }) {
  const cfg = STATE_CFG[state] ?? STATE_CFG.normal;
  const h = Math.round(size * 1.22);

  return (
    <div style={{ position: 'relative', width: size, height: h, flexShrink: 0 }}>
      {/* Glow circle behind body */}
      <div
        className="mira-glow mira-pulse"
        style={{
          width:  size * 1.6,
          height: size * 1.6,
          background: `radial-gradient(circle, ${cfg.glowColor}55 0%, transparent 68%)`,
          transition: 'background 0.6s ease',
        }}
      />

      {/* Scanning rings */}
      {cfg.scannerVisible && (
        <>
          <div className="scan-ring scan-ring-1" style={{ width: size * 1.15, height: size * 1.15 }} />
          <div className="scan-ring scan-ring-2" style={{ width: size * 1.15, height: size * 1.15 }} />
        </>
      )}

      {/* The Mira SVG — same shape, colour-driven by state */}
      <div
        className={cfg.bodyClass}
        style={{ position: 'absolute', top: 0, left: 0, transition: 'animation 0.4s' }}
      >
        <svg viewBox="0 0 100 122" width={size} height={h} xmlns="http://www.w3.org/2000/svg">
          {/* Drop shadow under body */}
          <ellipse cx="50" cy="118" rx="21" ry="4.5" fill="rgba(0,0,0,0.07)" />

          {/* ── White body ── */}
          <path
            d="M50 9
               C28 9 17 24 17 44
               L17 86
               C17 101 31 113 50 113
               C69 113 83 101 83 86
               L83 44
               C83 24 72 9 50 9Z"
            fill="white"
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="1"
          />

          {/* Top horn / pointed shape */}
          <path
            d="M46 11 C45 3 50 -1 55 3 C57 6 54 11 50 11Z"
            fill="white"
          />

          {/* Left mini arm / wing */}
          <path
            d="M17 58 C9 53 5 64 13 70 L17 66Z"
            fill="white"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="1"
          />

          {/* Right mini arm / wing */}
          <path
            d="M83 58 C91 53 95 64 87 70 L83 66Z"
            fill="white"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="1"
          />

          {/* ── Face screen ── */}
          <rect
            x="22" y="27" width="56" height="58"
            rx="11"
            fill={cfg.faceColor}
            style={{ transition: 'fill 0.5s ease' }}
          />

          {/* Subtle screen shine */}
          <rect x="22" y="27" width="56" height="14" rx="11" fill="rgba(255,255,255,0.045)" />

          {/* ── Eyes ── */}
          {/* Left eye */}
          <rect
            className={state === 'scanning' ? 'mira-blink' : ''}
            x="31" y="40" width="14" height="25" rx="7"
            fill={cfg.eyeColor}
            style={{
              transformOrigin: '38px 52.5px',
              transition: 'fill 0.4s ease',
            }}
          />

          {/* Right eye */}
          <rect
            className={state === 'scanning' ? 'mira-blink' : ''}
            x="55" y="40" width="14" height="25" rx="7"
            fill={cfg.eyeColor}
            style={{
              transformOrigin: '62px 52.5px',
              animationDelay: state === 'scanning' ? '0.12s' : '0s',
              transition: 'fill 0.4s ease',
            }}
          />

          {/* ── Warning / Danger badge ── */}
          {cfg.badge === 'warning' && (
            <g>
              <circle cx="81" cy="22" r="11.5" fill="#f59e0b" />
              <text x="81" y="27.5" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold" fontFamily="sans-serif">!</text>
            </g>
          )}
          {cfg.badge === 'danger' && (
            <g>
              <circle cx="81" cy="22" r="11.5" fill="#ef4444" />
              <text x="81" y="27.5" textAnchor="middle" fill="white" fontSize="15" fontWeight="bold" fontFamily="sans-serif">!</text>
            </g>
          )}

          {/* ── Scanning magnifier ── */}
          {cfg.scannerVisible && (
            <g>
              <circle cx="76" cy="20" r="8.5" stroke="#818cf8" strokeWidth="2.5" fill="none" />
              <line x1="82.5" y1="26.5" x2="88" y2="32" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
