import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MiraWidget from '../components/MiraWidget';
import { getTranslation } from '../utils/translations';

// Simulated Apps
import Gmail     from '../simulatedApps/Gmail';
import Telegram  from '../simulatedApps/Telegram';
import Browser   from '../simulatedApps/Browser';
import Banking   from '../simulatedApps/Banking';
import SocialMedia from '../simulatedApps/SocialMedia';

const APPS = [
  { id: 'gmail',    name: 'Gmail',    icon: '📧', color: '#EA4335', bg: '#fce8e6', component: Gmail },
  { id: 'telegram', name: 'Telegram', icon: '✈️',  color: '#2AABEE', bg: '#e3f2fd', component: Telegram },
  { id: 'browser',  name: 'Browser',  icon: '🌐', color: '#4285F4', bg: '#e8f0fe', component: Browser },
  { id: 'banking',  name: 'Banking',  icon: '🏦', color: '#34a853', bg: '#e6f4ea', component: Banking },
  { id: 'social',   name: 'Social',   icon: '📸', color: '#E1306C', bg: '#fce4ec', component: SocialMedia },
  { id: 'maps',     name: 'Maps',     icon: '🗺️',  color: '#FBBC04', bg: '#fff8e1', component: null },
  { id: 'youtube',  name: 'YouTube',  icon: '▶️',  color: '#FF0000', bg: '#ffebee', component: null },
  { id: 'settings', name: 'Settings', icon: '⚙️',  color: '#9e9e9e', bg: '#f5f5f5', component: null },
];

/* ── Clock ───────────────────────────────────────────────────────── */
function useClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/* ── Android status bar icons ────────────────────────────────────── */
function StatusBar({ light = false }) {
  const time = useClock();
  const fg   = light ? 'text-white' : 'text-gray-800';
  return (
    <div className={`flex items-center justify-between px-4 pt-2 pb-1 select-none ${fg}`}
         style={{ fontSize: 11, fontWeight: 600 }}>
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        {/* Signal bars */}
        <svg width="14" height="11" viewBox="0 0 14 11" fill="currentColor">
          <rect x="0"  y="7" width="2.5" height="4"  rx="0.5" opacity="1"/>
          <rect x="3"  y="5" width="2.5" height="6"  rx="0.5" opacity="1"/>
          <rect x="6"  y="3" width="2.5" height="8"  rx="0.5" opacity="1"/>
          <rect x="9"  y="1" width="2.5" height="10" rx="0.5" opacity="0.4"/>
          <rect x="12" y="0" width="2"   height="11" rx="0.5" opacity="0.4"/>
        </svg>
        {/* WiFi */}
        <svg width="14" height="11" viewBox="0 0 24 18" fill="currentColor">
          <path d="M12 14.5a2 2 0 110 4 2 2 0 010-4zm0-5.5a8 8 0 016.36 3.14l-1.79 1.79A5.5 5.5 0 0012 11.5a5.5 5.5 0 00-4.57 2.43L5.64 12.14A8 8 0 0112 9zm0-5.5c4.42 0 8.41 1.79 11.31 4.69l-1.8 1.8A13.5 13.5 0 0012 6a13.5 13.5 0 00-9.51 3.99L.69 8.19A15.96 15.96 0 0112 3.5z"/>
        </svg>
        {/* Battery */}
        <svg width="18" height="11" viewBox="0 0 20 12" fill="currentColor">
          <rect x="0" y="1" width="17" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <rect x="1.5" y="2.5" width="13" height="7" rx="1.2"/>
          <rect x="17" y="3.5" width="3" height="5" rx="1"/>
        </svg>
      </div>
    </div>
  );
}

/* ── Android Nav Bar ─────────────────────────────────────────────── */
function NavBar({ onBack, hasApp, light = false }) {
  const fg = light ? 'bg-white/25' : 'bg-gray-400/50';
  return (
    <div className="flex items-center justify-around px-10 py-3 flex-shrink-0 select-none">
      {/* Back chevron */}
      <button onClick={hasApp ? onBack : undefined}
              className={`w-5 h-5 opacity-70 flex items-center justify-center ${hasApp ? 'cursor-pointer' : 'opacity-30'}`}
              style={{ color: light ? '#fff' : '#555' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>
      {/* Home pill */}
      <div className={`h-1 w-16 rounded-full ${fg}`}/>
      {/* Recents (square) */}
      <div className={`w-4 h-4 rounded-sm border-2 opacity-70`} style={{ borderColor: light ? '#fff' : '#888' }}/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════
   Main Demo component
═══════════════════════════════════════════════════════════════════ */
export default function Demo() {
  const [activeApp, setActiveApp]   = useState(null);
  const [searchParams]              = useSearchParams();
  const lang                        = searchParams.get('lang') || 'en';
  const navigate                    = useNavigate();

  const openApp  = (app) => { if (app.component) setActiveApp(app); };
  const closeApp = ()    => setActiveApp(null);

  const ActiveComponent = activeApp?.component;

  return (
    /* ── Page background ── */
    <div className="min-h-screen flex flex-col items-center justify-center py-8 px-4"
         style={{ background: 'linear-gradient(135deg,#0f0c29,#302b63,#24243e)' }}>

      {/* Back button outside phone */}
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
        {getTranslation(lang, 'back')}
      </button>

      {/* ════ Android Phone Shell ════ */}
      <div className="relative select-none"
           style={{
             width: 375,
             /* outer phone body */
             background: 'linear-gradient(160deg,#2d2d2d 0%,#1a1a1a 60%,#111 100%)',
             borderRadius: 52,
             padding: '10px 6px',
             boxShadow: '0 0 0 1.5px #444, 0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)',
           }}>

        {/* Side buttons — power */}
        <div className="absolute right-[-4px] top-28 w-1.5 h-14 bg-gray-700 rounded-r-sm"/>
        {/* Volume up */}
        <div className="absolute left-[-4px] top-24 w-1.5 h-10 bg-gray-700 rounded-l-sm"/>
        {/* Volume down */}
        <div className="absolute left-[-4px] top-36 w-1.5 h-10 bg-gray-700 rounded-l-sm"/>

        {/* ── Inner screen glass ── */}
        <div
          style={{
            borderRadius: 44,
            overflow: 'hidden',
            background: '#fff',
            height: 760,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── Active App ─────────────────────────────── */}
          {activeApp && ActiveComponent ? (
            <>
              {/* Status bar — dark on white app bg */}
              <div className="flex-shrink-0 bg-white">
                <StatusBar light={false}/>
              </div>

              {/* App chrome bar */}
              <div className="flex items-center gap-3 px-4 py-2 bg-white border-b border-gray-100 flex-shrink-0 shadow-sm">
                <button
                  onClick={closeApp}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <span className="text-sm font-bold text-gray-700">{activeApp.name}</span>
              </div>

              {/* App content + Mira widget — THIS is screenshot target */}
              <div id="device-frame" className="flex-1 overflow-hidden relative">
                <ActiveComponent/>
                <MiraWidget activeApp={activeApp.id} lang={lang}/>
              </div>

              {/* Android nav */}
              <div className="flex-shrink-0 bg-white border-t border-gray-100">
                <NavBar onBack={closeApp} hasApp={true} light={false}/>
              </div>
            </>
          ) : (
            /* ── Android Home Screen ─────────────────── */
            <div
              id="device-frame"
              className="flex-1 flex flex-col overflow-hidden"
              style={{
                background: 'linear-gradient(160deg,#1a237e 0%,#283593 40%,#1565c0 100%)',
              }}
            >
              {/* Status bar — light on dark bg */}
              <StatusBar light={true}/>

              {/* Date + greeting */}
              <div className="text-center mt-3 mb-6 select-none">
                <p className="text-white/60 text-xs font-medium">
                  {new Date().toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-white text-5xl font-thin tracking-tight mt-1">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              {/* App grid */}
              <div className="flex-1 px-6 pt-2">
                <div className="grid grid-cols-4 gap-x-3 gap-y-5">
                  {APPS.map(app => (
                    <button
                      key={app.id}
                      onClick={() => openApp(app)}
                      className="flex flex-col items-center gap-1.5 group"
                      disabled={!app.component}
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg transition-all duration-150
                          ${app.component ? 'group-hover:scale-110 group-active:scale-90' : 'opacity-50'}
                        `}
                        style={{ backgroundColor: app.bg, border: `1px solid ${app.color}33` }}
                      >
                        {app.icon}
                      </div>
                      <span className="text-white/80 text-[10px] font-medium text-center leading-tight">{app.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mira hint */}
              <div className="mx-5 mb-3 mt-4 bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl px-4 py-2.5 flex items-center gap-3">
                <span className="text-lg">🛡️</span>
                <p className="text-white/70 text-[11px] leading-snug">
                  {getTranslation(lang, 'hint')}
                </p>
              </div>

              {/* Dock */}
              <div className="mx-5 mb-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl px-6 py-3 flex justify-around">
                {APPS.slice(0, 4).map(app => (
                  <button
                    key={app.id + '_dock'}
                    onClick={() => openApp(app)}
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-md transition-all hover:scale-110 active:scale-90"
                    style={{ backgroundColor: app.bg }}
                    disabled={!app.component}
                  >
                    {app.icon}
                  </button>
                ))}
              </div>

              {/* Nav bar */}
              <NavBar onBack={null} hasApp={false} light={true}/>

              {/* Mira widget on home screen */}
              <MiraWidget activeApp={null} lang={lang}/>
            </div>
          )}
        </div>
      </div>

      {/* Caption below phone */}
      <p className="mt-6 text-white/30 text-xs text-center">
        🛡️ {getTranslation(lang, 'miraSecurity')} · Tap an app to simulate a threat scan
      </p>
    </div>
  );
}


// Simulated Apps
import Gmail from '../simulatedApps/Gmail';
import Telegram from '../simulatedApps/Telegram';
import Browser from '../simulatedApps/Browser';
import Banking from '../simulatedApps/Banking';
import SocialMedia from '../simulatedApps/SocialMedia';

const APPS = [
  { id: 'gmail',    name: 'Gmail',    icon: '📧', color: '#EA4335', component: Gmail },
  { id: 'telegram', name: 'Telegram', icon: '💬', color: '#2AABEE', component: Telegram },
  { id: 'browser',  name: 'Browser',  icon: '🌐', color: '#4285F4', component: Browser },
  { id: 'banking',  name: 'Banking',  icon: '🏦', color: '#16213e', component: Banking },
  { id: 'social',   name: 'Social',   icon: '📱', color: '#E1306C', component: SocialMedia },
];

export default function Demo() {
  const [activeApp, setActiveApp] = useState(null);
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || 'en';
  const navigate = useNavigate();

  const openApp  = (app) => setActiveApp(app);
  const closeApp = ()    => setActiveApp(null);

  const ActiveComponent = activeApp?.component;
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-[#1e1e2e] flex flex-col overflow-hidden">
      {/* ── OS-style top bar ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#13131f] border-b border-white/5 text-white/70 text-[11px] font-medium select-none">
        {/* Left: Back + Mira logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            ← {getTranslation(lang, 'back')}
          </button>
          <span className="text-white/20">|</span>
          <span className="flex items-center gap-1.5 text-white/60">🛡️ {getTranslation(lang, 'title')}</span>
        </div>

        {/* Center: status bar */}
        <div className="flex items-center gap-4 text-white/50 text-[11px]">
          {activeApp
            ? getTranslation(lang, 'viewingApp', { app: activeApp.name })
            : getTranslation(lang, 'chooseAppDesc')}
        </div>

        {/* Right: time, battery, wifi */}
        <div className="flex items-center gap-3 text-white/50">
          <span>📶</span>
          <span>🔋</span>
          <span>{time}</span>
        </div>
      </div>

      {/* ── Main area ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar taskbar */}
        <div className="w-16 bg-[#13131f] border-r border-white/5 flex flex-col items-center py-4 gap-3 select-none">
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => openApp(app)}
              title={app.name}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-150 relative group ${
                activeApp?.id === app.id
                  ? 'ring-2 ring-white/30 scale-110'
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: app.color + '33' }}
            >
              {app.icon}
              {/* Active dot */}
              {activeApp?.id === app.id && (
                <span className="absolute -right-1 w-1.5 h-1.5 rounded-full bg-white" />
              )}
              {/* Tooltip */}
              <span className="absolute left-14 bg-gray-900 text-white text-[10px] font-semibold px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg">
                {app.name}
              </span>
            </button>
          ))}
        </div>

        {/* ── Screen Content ─────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden relative">

          {activeApp && ActiveComponent ? (
            <>
              {/* App window title bar */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-white/60 select-none">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={closeApp}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 transition-all"
                    title="Close"
                  />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="mx-auto font-medium">{activeApp.name}</span>
              </div>

              {/* The actual app — this is the id="device-frame" target */}
              <div
                id="device-frame"
                className="flex-1 overflow-hidden relative bg-white"
              >
                <ActiveComponent />
                {/* Floating Mira Widget — lives inside the capture area */}
                <MiraWidget activeApp={activeApp.id} lang={lang} />
              </div>
            </>
          ) : (
            /* Desktop home launcher */
            <div
              id="device-frame"
              className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] relative overflow-hidden"
            >
              {/* Subtle radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />

              <div className="text-center mb-10 z-10">
                <div className="text-5xl mb-3">🛡️</div>
                <h2 className="text-2xl font-bold text-white">{getTranslation(lang, 'chooseApp')}</h2>
                <p className="text-sm text-indigo-300/70 mt-2">{getTranslation(lang, 'hint')}</p>
              </div>

              {/* App launcher grid */}
              <div className="grid grid-cols-5 gap-6 z-10">
                {APPS.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => openApp(app)}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:shadow-2xl group-active:scale-95 transition-all duration-200"
                      style={{ backgroundColor: app.color + '22', border: `1.5px solid ${app.color}55` }}
                    >
                      {app.icon}
                    </div>
                    <span className="text-xs text-white/70 font-medium">{app.name}</span>
                  </button>
                ))}
              </div>

              {/* Mira hint bubble */}
              <div className="mt-10 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl px-5 py-3 z-10">
                <p className="text-xs text-white/50 text-center">
                  {getTranslation(lang, 'hint')}
                </p>
              </div>

              {/* Widget on home screen too */}
              <MiraWidget activeApp={null} lang={lang} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
