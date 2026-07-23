import React from 'react';
import { RISK_COLORS } from '../types/analysis';

/**
 * RiskGauge — Animated circular SVG gauge that displays risk percentage.
 * Color-coded by risk level with smooth fill animation.
 */
export default function RiskGauge({ score, riskLevel, isSafe }) {
  const colors = RISK_COLORS[riskLevel] || RISK_COLORS.Safe;
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const fillPercent = Math.min(Math.max(score, 0), 100);
  const dashOffset = circumference - (fillPercent / 100) * circumference;

  // For safe results, use green tones; for danger, use the risk color
  const gaugeColor = isSafe ? '#22c55e' : colors.text;
  const trackColor = isSafe ? '#dcfce7' : colors.bg;

  const icon = isSafe ? '✅' : riskLevel === 'Critical' ? '🚨' : '⚠️';

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="transform -rotate-90"
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          {/* Animated fill arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={gaugeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            className="gauge-fill"
            style={{
              '--gauge-circumference': circumference,
              '--gauge-target': dashOffset,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gauge-number">
          <span className="text-lg">{icon}</span>
          <span
            className="text-xl font-bold leading-none"
            style={{ color: gaugeColor }}
          >
            {fillPercent}%
          </span>
        </div>
      </div>
    </div>
  );
}
