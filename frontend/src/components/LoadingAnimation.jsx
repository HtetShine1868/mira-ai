import React from 'react';

/**
 * LoadingAnimation — Animated scanning indicator shown while Mira analyzes.
 */
export default function LoadingAnimation({ step }) {
  const message = step === 'analyze' 
    ? 'Analyzing screen with AI...' 
    : 'Capturing screen...';

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      {/* Animated shield */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-xl">🛡️</span>
        </div>
      </div>

      {/* Loading text */}
      <p className="text-sm font-medium text-gray-700">{message}</p>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full progress-shimmer" />
      </div>

      {/* Step indicators */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${step === 'capture' ? 'bg-indigo-500 animate-pulse' : 'bg-green-500'}`} />
        <span className="text-xs text-gray-500">Capture</span>
        <div className="w-4 h-px bg-gray-300" />
        <div className={`w-2 h-2 rounded-full ${step === 'analyze' ? 'bg-indigo-500 animate-pulse' : step === 'capture' ? 'bg-gray-300' : 'bg-green-500'}`} />
        <span className="text-xs text-gray-500">Analyze</span>
      </div>
    </div>
  );
}
