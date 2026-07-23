import React from 'react';

/**
 * WarningPopup — Small toast-like warning that appears near the widget after scan.
 */
export default function WarningPopup({ result, visible, onClick }) {
  if (!visible || !result) return null;

  const bgColor = result.isSafe ? 'bg-green-50 border-green-200' : 
    result.riskLevel === 'Critical' || result.riskLevel === 'High' 
      ? 'bg-red-50 border-red-200' 
      : 'bg-yellow-50 border-yellow-200';

  const icon = result.isSafe ? '✅' : 
    result.riskLevel === 'Critical' ? '🚨' : '⚠️';

  return (
    <div
      onClick={onClick}
      className={`
        absolute bottom-full right-0 mb-3 px-4 py-3 rounded-xl 
        border shadow-lg cursor-pointer transition-all duration-300
        hover:scale-[1.02] animate-[slideUp_0.3s_ease-out]
        ${bgColor} min-w-[220px] max-w-[280px]
      `}
    >
      <div className="flex items-start gap-2">
        <span className="text-lg flex-shrink-0">{icon}</span>
        <div>
          <p className="text-sm font-bold text-gray-900">
            {result.isSafe ? 'All Clear!' : `${result.riskLevel} Risk Detected`}
          </p>
          <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
            {result.attackType !== 'Safe' ? `${result.attackType} — ` : ''}
            Tap to see full report
          </p>
        </div>
      </div>
      {/* Tail arrow */}
      <div className={`absolute -bottom-1.5 right-6 w-3 h-3 rotate-45 border-r border-b ${bgColor}`} />
    </div>
  );
}
