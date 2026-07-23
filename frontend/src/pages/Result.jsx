import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Result — Standalone result page (accessible via direct navigation if needed).
 * In practice, the result is shown via the RiskCard modal overlay on the Demo page.
 */
export default function Result() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center space-y-4">
        <span className="text-4xl block">🛡️</span>
        <h1 className="text-xl font-bold text-gray-900">Analysis Complete</h1>
        <p className="text-sm text-gray-500">
          Your security report was displayed on the demo screen.
          Return to the demo to run another scan.
        </p>
        <button
          onClick={() => navigate('/demo')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Demo
        </button>
      </div>
    </div>
  );
}
