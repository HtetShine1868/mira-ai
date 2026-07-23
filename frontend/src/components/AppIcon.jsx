import React from 'react';

/**
 * AppIcon — A clickable app icon in the device home screen.
 */
export default function AppIcon({ name, icon, color, onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all duration-200
        hover:bg-white/10 hover:scale-105 active:scale-95
        ${isActive ? 'bg-white/15 ring-2 ring-white/30' : ''}
      `}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-transform"
        style={{ background: color }}
      >
        {icon}
      </div>
      <span className="text-[11px] text-white/90 font-medium">{name}</span>
    </button>
  );
}
