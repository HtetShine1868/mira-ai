import React from 'react';

export default function Browser() {
  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* ── Chrome UI ── */}
      <div className="bg-[#dee1e6] flex flex-col shrink-0">
        {/* Window controls + tab strip */}
        <div className="flex items-end px-2 pt-2 gap-0">
          {/* macOS traffic lights */}
          <div className="flex items-center gap-1.5 px-3 pb-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-90 cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-90 cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f] hover:brightness-90 cursor-pointer" />
          </div>

          {/* Background (inactive) tab */}
          <div className="flex items-center gap-2 bg-[#cfd2d6] rounded-t-lg px-3 py-1.5 text-[12px] text-[#5f6368] max-w-[160px] cursor-pointer hover:bg-[#d8dade]">
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 shrink-0 text-[#4285f4]"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14.5C4.4 14.5 1.5 11.6 1.5 8S4.4 1.5 8 1.5 14.5 4.4 14.5 8 11.6 14.5 8 14.5zm-.8-9.3L3.4 8.8l1.1 1.1L8 6.5l3.5 3.5 1.1-1.1-4.4-3.7z"/></svg>
            <span className="truncate">New Tab</span>
            <span className="ml-auto text-[#5f6368] hover:bg-[#bfc2c6] rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">×</span>
          </div>

          {/* Active (suspicious) tab */}
          <div className="flex items-center gap-2 bg-white rounded-t-lg px-3 py-1.5 text-[12px] text-[#202124] max-w-[220px] shadow-sm border-t border-x border-[#c8cacd] relative z-10">
            <div className="w-3.5 h-3.5 bg-[#0067b8] rounded-sm flex items-center justify-center shrink-0">
              <span className="text-white text-[7px] font-bold">M</span>
            </div>
            <span className="truncate font-medium">Microsoft — Sign in</span>
            <span className="ml-auto text-[#5f6368] hover:bg-[#e8eaed] rounded-full w-4 h-4 flex items-center justify-center cursor-pointer">×</span>
          </div>

          {/* New tab button */}
          <button className="w-7 h-7 flex items-center justify-center text-[#5f6368] hover:bg-[#d8dade] rounded-full transition-colors text-lg ml-1 mb-1">+</button>
        </div>

        {/* Toolbar row */}
        <div className="flex items-center gap-1.5 px-3 pb-2 bg-[#dee1e6]">
          {/* Nav buttons */}
          <button className="w-8 h-8 flex items-center justify-center text-[#202124] hover:bg-[#c8cacd] rounded-full transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#bdc1c6] hover:bg-[#c8cacd] rounded-full transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-[#202124] hover:bg-[#c8cacd] rounded-full transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/></svg>
          </button>

          {/* Omnibox (URL bar) */}
          <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-1.5 border border-[#c8cacd] hover:border-[#b0b3b8] hover:shadow-sm transition-all cursor-text">
            {/* Lock / Not secure */}
            <div className="flex items-center gap-1.5 shrink-0">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#c5221f]"><path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2z"/></svg>
              <span className="text-[11px] text-[#c5221f] font-medium">Not secure</span>
              <span className="text-[#dadce0] text-sm">|</span>
            </div>
            <div className="flex-1 min-w-0 text-[12.5px] flex items-center gap-0.5 truncate">
              <span className="text-[#5f6368]">http://</span>
              <span className="text-[#c5221f] font-semibold">secure-microsoft-login.account-verify.xyz</span>
              <span className="text-[#5f6368]">/auth/signin?token=mfa_required</span>
            </div>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#5f6368] shrink-0 cursor-pointer hover:text-[#202124]"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
          </div>

          {/* Right toolbar */}
          <div className="flex items-center gap-0.5">
            {[
              <svg key="ext" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"/></svg>,
              <svg key="prof" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>,
              <svg key="menu" viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>,
            ].map((icon, i) => (
              <button key={i} className="w-8 h-8 flex items-center justify-center text-[#5f6368] hover:bg-[#c8cacd] rounded-full transition-colors">{icon}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="flex-1 overflow-y-auto bg-[#f8f9fa]">
        {/* Full-page Microsoft login clone */}
        <div className="min-h-full flex items-start justify-center px-8 pt-12 pb-8">
          <div className="w-full max-w-[400px]">
            {/* Card */}
            <div className="bg-white border border-[#d2d2d2] rounded-sm p-10 shadow-sm">
              {/* Microsoft Logo */}
              <div className="mb-6">
                <svg viewBox="0 0 23 23" className="w-6 h-6 mb-5">
                  <rect x="1" y="1" width="10" height="10" fill="#f25022"/>
                  <rect x="12" y="1" width="10" height="10" fill="#7fba00"/>
                  <rect x="1" y="12" width="10" height="10" fill="#00a4ef"/>
                  <rect x="12" y="12" width="10" height="10" fill="#ffb900"/>
                </svg>
                <h1 className="text-[21px] font-semibold text-[#1b1b1b] leading-tight">Sign in</h1>
                <p className="text-[13px] text-[#1b1b1b] mt-1">to continue to Microsoft 365</p>
              </div>

              {/* Alert */}
              <div className="flex gap-2 bg-[#fde7e9] border border-[#d83b01] rounded-sm p-3 mb-5">
                <span className="text-[#d83b01] shrink-0">⚠</span>
                <p className="text-[12px] text-[#201f1e] leading-relaxed">
                  <strong>Security alert:</strong> A suspicious sign-in was detected from Moscow, Russia. Verify your account to prevent suspension.
                </p>
              </div>

              {/* Email field */}
              <div className="mb-4">
                <label className="text-[13px] font-semibold text-[#201f1e] block mb-1">Email, phone, or Skype</label>
                <input type="text" defaultValue="user@outlook.com" readOnly
                  className="w-full border border-[#605e5c] rounded-sm px-3 py-2.5 text-[14px] text-[#201f1e] bg-white outline-none focus:border-[#0067b8] focus:ring-1 focus:ring-[#0067b8]"/>
              </div>

              {/* Password field */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <label className="text-[13px] font-semibold text-[#201f1e]">Password</label>
                  <a href="#" onClick={e=>e.preventDefault()} className="text-[13px] text-[#0067b8] hover:underline">Forgot password?</a>
                </div>
                <input type="password" readOnly placeholder="••••••••••••"
                  className="w-full border border-[#605e5c] rounded-sm px-3 py-2.5 text-[14px] bg-white outline-none focus:border-[#0067b8] focus:ring-1 focus:ring-[#0067b8]"/>
              </div>

              {/* Card number — SUSPICIOUS field */}
              <div className="mb-5">
                <label className="text-[13px] font-semibold text-[#d83b01] block mb-1">Credit Card Number (Account Verification)</label>
                <input type="text" readOnly placeholder="XXXX  XXXX  XXXX  XXXX"
                  className="w-full border-2 border-[#d83b01] rounded-sm px-3 py-2.5 text-[14px] bg-[#fde7e9] text-[#201f1e] outline-none"/>
                <p className="text-[11px] text-[#d83b01] mt-1">Required for identity verification — your card will not be charged</p>
              </div>

              <button onClick={e=>e.preventDefault()}
                className="w-full bg-[#0067b8] hover:bg-[#005a9e] active:bg-[#004e8c] text-white font-semibold py-2.5 rounded-sm text-[14px] transition-colors">
                Sign in
              </button>

              <div className="flex items-center gap-4 mt-4">
                <div className="h-px bg-[#d2d2d2] flex-1"/>
                <span className="text-[12px] text-[#605e5c]">No account?</span>
                <div className="h-px bg-[#d2d2d2] flex-1"/>
              </div>

              <button onClick={e=>e.preventDefault()}
                className="w-full mt-3 border border-[#0067b8] text-[#0067b8] hover:bg-[#f3f2f1] py-2.5 rounded-sm text-[14px] font-semibold transition-colors">
                Create one
              </button>
            </div>

            <p className="text-center text-[12px] text-[#605e5c] mt-6 leading-relaxed">
              <a href="#" onClick={e=>e.preventDefault()} className="hover:underline">Terms of use</a>
              {' · '}
              <a href="#" onClick={e=>e.preventDefault()} className="hover:underline">Privacy & cookies</a>
              {' · '}
              © 2026 Microsoft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
