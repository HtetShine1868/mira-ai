import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useMira } from '../hooks/useMira';

const WIDGET_WIDTH = 300;
const COLLAPSED_WIDTH = 100;
const COLLAPSED_HEIGHT = 48;
const MARGIN = 20;

const getDefaultPosition = () => ({
  x: window.innerWidth - COLLAPSED_WIDTH - MARGIN,
  y: window.innerHeight - COLLAPSED_HEIGHT - MARGIN,
});

const clampPosition = (x, y, width, height) => ({
  x: Math.max(MARGIN, Math.min(x, window.innerWidth - width - MARGIN)),
  y: Math.max(MARGIN, Math.min(y, window.innerHeight - height - MARGIN)),
});

const getRiskDisplay = (riskScore) => {
  const score = Number(riskScore) || 0;
  if (score >= 80) return { label: 'HIGH RISK', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' };
  if (score >= 40) return { label: 'MODERATE RISK', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' };
  return { label: 'LOW RISK', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' };
};

const ErrorPanel = ({ error, onDismiss, onRetry }) => (
  <div style={styles.errorBox} role="alert">
    <div style={styles.errorHeader}>
      <strong style={styles.errorTitle}>{error.title}</strong>
      <button type="button" onClick={onDismiss} style={styles.dismissBtn} aria-label="Dismiss error">
        ×
      </button>
    </div>
    <p style={styles.errorMessage}>{error.message}</p>
    <p style={styles.errorHint}>{error.hint}</p>
    {error.retryable && (
      <button type="button" onClick={onRetry} style={styles.retryButton}>
        Try Again
      </button>
    )}
  </div>
);

const ResultPanel = ({ result }) => {
  const risk = getRiskDisplay(result.risk);

  return (
    <div
      style={{
        ...styles.resultBox,
        backgroundColor: risk.bg,
        borderColor: risk.border,
      }}
    >
      <div style={styles.resultHeader}>
        <span style={{ ...styles.riskBadge, color: risk.color, borderColor: risk.border }}>
          {risk.label}
        </span>
        <span style={{ ...styles.riskScore, color: risk.color }}>{result.risk}/100</span>
      </div>

      <div style={styles.riskBarTrack}>
        <div
          style={{
            ...styles.riskBarFill,
            width: `${result.risk}%`,
            backgroundColor: risk.color,
          }}
        />
      </div>

      {result.summary && (
        <p style={styles.summaryText}>{result.summary}</p>
      )}

      {result.threats?.length > 0 && (
        <div style={styles.threatsSection}>
          <strong style={styles.threatsTitle}>Detected issues</strong>
          <ul style={styles.threatsList}>
            {result.threats.map((threat) => (
              <li key={threat} style={styles.threatItem}>{threat}</li>
            ))}
          </ul>
        </div>
      )}

      {result.recommendation && (
        <div style={styles.recommendationBox}>
          <strong>Recommendation</strong>
          <p style={styles.recommendationText}>{result.recommendation}</p>
        </div>
      )}

      {result.scannedAt && (
        <p style={styles.scannedAt}>
          Scanned {new Date(result.scannedAt).toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};

export const MiraWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState(getDefaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const {
    scanScreen,
    isLoading,
    loadingStep,
    result,
    error,
    reset,
    dismissError,
  } = useMira();

  const dragRef = useRef({ active: false, offsetX: 0, offsetY: 0, moved: false });
  const containerRef = useRef(null);

  const getWidgetSize = useCallback(() => {
    if (containerRef.current) {
      return {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      };
    }
    return isExpanded
      ? { width: WIDGET_WIDTH, height: 320 }
      : { width: COLLAPSED_WIDTH, height: COLLAPSED_HEIGHT };
  }, [isExpanded]);

  const startDrag = (e, allowFromTarget = true) => {
    if (!allowFromTarget && e.target !== e.currentTarget) return;
    if (e.button !== 0) return;

    e.preventDefault();
    dragRef.current = {
      active: true,
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
      moved: false,
    };
    setIsDragging(true);
  };

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;

      dragRef.current.moved = true;
      const { width, height } = getWidgetSize();
      setPosition(
        clampPosition(
          e.clientX - dragRef.current.offsetX,
          e.clientY - dragRef.current.offsetY,
          width,
          height
        )
      );
    };

    const onUp = () => {
      dragRef.current.active = false;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [getWidgetSize]);

  useEffect(() => {
    const onResize = () => {
      const { width, height } = getWidgetSize();
      setPosition((prev) => clampPosition(prev.x, prev.y, width, height));
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [getWidgetSize]);

  const handleScan = () => {
    scanScreen();
  };

  const toggleWidget = () => {
    if (dragRef.current.moved) {
      dragRef.current.moved = false;
      return;
    }
    setIsExpanded(!isExpanded);
    if (isExpanded) reset();
  };

  const loadingMessage =
    loadingStep === 'analyze' ? 'Analyzing screen with AI...' : 'Capturing screen...';

  return (
    <div
      ref={containerRef}
      data-mira-widget
      style={{
        ...styles.widgetContainer,
        left: position.x,
        top: position.y,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {!isExpanded ? (
        <button
          onMouseDown={startDrag}
          onClick={toggleWidget}
          style={{
            ...styles.shieldButton,
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
        >
          🛡 Mira
        </button>
      ) : (
        <div style={styles.panel}>
          <div
            style={styles.header}
            onMouseDown={(e) => startDrag(e, false)}
          >
            <strong>🛡 Mira Security</strong>
            <button type="button" onClick={toggleWidget} style={styles.closeBtn}>×</button>
          </div>

          <div style={styles.content}>
            {error && !isLoading && (
              <ErrorPanel
                error={error}
                onDismiss={dismissError}
                onRetry={handleScan}
              />
            )}

            {isLoading && (
              <div style={styles.loadingBox}>
                <p style={styles.loadingText}>{loadingMessage}</p>
                <div style={styles.progressBar}>
                  <div style={styles.progressFill}></div>
                </div>
              </div>
            )}

            {result && !isLoading && !error && (
              <ResultPanel result={result} />
            )}

            {!isLoading && !result && !error && (
              <>
                <button type="button" onClick={handleScan} style={styles.scanButton}>
                  Scan Screen
                </button>
                <p style={styles.hint}>Choose &quot;Entire screen&quot; when prompted</p>
              </>
            )}

            {!isLoading && result && !error && (
              <button type="button" onClick={handleScan} style={styles.scanButton}>
                Scan Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  widgetContainer: {
    position: 'fixed',
    zIndex: 9999,
    fontFamily: 'sans-serif',
    userSelect: 'none',
  },
  shieldButton: {
    padding: '12px 24px',
    borderRadius: '30px',
    backgroundColor: '#1a1a1a',
    color: 'white',
    border: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    fontWeight: 'bold',
  },
  panel: {
    width: '300px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#f5f5f5',
    padding: '12px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eaeaea',
    cursor: 'grab',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left',
  },
  scanButton: {
    padding: '10px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
  },
  hint: {
    margin: 0,
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
  },
  errorBox: {
    padding: '12px',
    backgroundColor: '#fef2f2',
    color: '#991b1b',
    borderRadius: '8px',
    border: '1px solid #fecaca',
    fontSize: '14px',
  },
  errorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '6px',
  },
  errorTitle: {
    fontSize: '14px',
  },
  errorMessage: {
    margin: '0 0 6px',
    lineHeight: 1.4,
  },
  errorHint: {
    margin: '0 0 10px',
    fontSize: '12px',
    color: '#b91c1c',
    lineHeight: 1.4,
  },
  dismissBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#991b1b',
    lineHeight: 1,
    padding: 0,
  },
  retryButton: {
    padding: '8px 12px',
    backgroundColor: '#991b1b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    width: '100%',
  },
  loadingBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'center',
  },
  loadingText: {
    margin: 0,
    fontSize: '14px',
    color: '#444',
  },
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#0070f3',
    animation: 'loading 1.5s infinite ease-in-out',
  },
  resultBox: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid #eaeaea',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  riskBadge: {
    fontSize: '13px',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '999px',
    border: '1px solid',
    backgroundColor: 'white',
  },
  riskScore: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  riskBarTrack: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '12px',
  },
  riskBarFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.4s ease',
  },
  summaryText: {
    margin: '0 0 10px',
    fontSize: '14px',
    lineHeight: 1.45,
    color: '#374151',
  },
  threatsSection: {
    marginBottom: '10px',
  },
  threatsTitle: {
    display: 'block',
    fontSize: '13px',
    marginBottom: '6px',
    color: '#374151',
  },
  threatsList: {
    margin: 0,
    paddingLeft: '18px',
    fontSize: '13px',
    color: '#4b5563',
  },
  threatItem: {
    marginBottom: '4px',
  },
  recommendationBox: {
    padding: '10px',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: '6px',
    fontSize: '13px',
    marginBottom: '8px',
  },
  recommendationText: {
    margin: '6px 0 0',
    lineHeight: 1.4,
    color: '#374151',
  },
  scannedAt: {
    margin: 0,
    fontSize: '11px',
    color: '#6b7280',
    textAlign: 'right',
  },
};
