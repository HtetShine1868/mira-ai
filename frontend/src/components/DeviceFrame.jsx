import React from 'react';

/**
 * DeviceFrame — Simulated Laptop/Desktop monitor frame wrapping the app content.
 * The id="device-frame" is what html2canvas targets for screenshot capture.
 */
export default function DeviceFrame({ children, currentApp, onBack }) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="relative w-full max-w-[850px] mx-auto flex flex-col items-center select-none">
      {/* Laptop Screen Bezel */}
      <div className="w-full bg-slate-900 border-t-8 border-x-8 border-slate-800 rounded-t-3xl p-1.5 shadow-2xl relative">
        
        {/* Screen area — THIS is what gets captured */}
        <div
          id="device-frame"
          className="bg-[#f3f4f6] rounded-xl overflow-hidden relative flex flex-col w-full border border-slate-950"
          style={{ height: '480px' }}
        >
          {/* OS Title Bar / Top Panel (macOS inspired) */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-slate-300 text-xs border-b border-slate-950">
            {/* Window controls */}
            <div className="flex items-center gap-1.5 flex-1">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            
            {/* App title bar */}
            <div className="text-slate-400 font-medium text-[11px] bg-slate-950 px-6 py-0.5 rounded-md border border-slate-800/50">
              {currentApp ? `Mira Simulator — ${currentApp}` : "Mira OS Desktop"}
            </div>

            {/* Right side status indicators */}
            <div className="flex items-center gap-3 flex-1 justify-end font-medium text-[11px]">
              <span>📶 Wi-Fi</span>
              <span>🔋 100%</span>
              <span>{time}</span>
            </div>
          </div>

          {/* App Header Bar (when an app is open) */}
          {currentApp && (
            <div className="flex items-center gap-3 px-4 py-2 bg-white border-b border-gray-200 shadow-sm z-10">
              <button
                onClick={onBack}
                className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-lg text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-all active:scale-95 duration-100"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Close App
              </button>
              <div className="h-4 w-px bg-gray-200" />
              <span className="text-xs text-gray-500 font-bold tracking-wide uppercase">{currentApp}</span>
            </div>
          )}

          {/* Content Area */}
          <div className="flex-1 relative overflow-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Laptop Keyboard Base & Hinge */}
      <div className="w-[102%] bg-gradient-to-b from-slate-400 to-slate-500 h-4 rounded-b-2xl border-t border-slate-300 relative z-10 shadow-lg flex justify-center">
        {/* Hinge Opening Notch */}
        <div className="w-20 h-1.5 bg-slate-600 rounded-b-md" />
      </div>
      <div className="w-[90%] bg-gradient-to-b from-slate-500 to-slate-600 h-1 shadow-md rounded-b-md" />
    </div>
  );
}
