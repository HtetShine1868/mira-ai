import React from 'react';

// Colors from the real Telegram Desktop dark theme
const BG      = '#1d2d3a';   // overall bg
const PANEL   = '#17212b';   // chat list bg
const HEADER  = '#1c2b3a';   // header bars
const ACTIVE  = '#2b5278';   // selected chat row
const BUBBLE  = '#182533';   // incoming bubble

const CHATS = [
  { name: 'X-Alpha Crypto VIP 🪙', sub: 'Admin: New pump starting soon...', time: '12:57 AM', badge: 14, group: true, color: '#f1c40f', initials: 'XA' },
  { name: 'System Software Updates ⚙️', sub: 'Please install the critical update patch...', time: '12:55 AM', badge: 1, group: false, color: '#34495e', initials: 'SU' },
  { name: 'Community Alpha leaks 🔓', sub: 'User_902: Download the leaks file now...', time: '12:42 AM', badge: 182, group: true, color: '#e74c3c', initials: 'AL' },
  { name: 'Arbitrage Trade Bot 🤖', sub: 'Bot: Deposit completed successfully...', time: '12:41 AM', badge: null, group: false, color: '#2ecc71', initials: 'TB' },
  { name: 'Premium Modded Apps Store', sub: 'New Mod: Unlocked Premium features free...', time: '12:31 AM', badge: 77, group: true, color: '#1abc9c', initials: 'MA' },
  { name: '📢 Global Crypto Arbitrage 🚀', sub: '🎬 Earn up to 200% daily returns automatically...', time: '11:49 PM', badge: 8, active: true, group: true, color: '#e67e22', initials: 'CA', avatar: 'globe' },
  { name: 'Support Assistance Desk 🛠️', sub: 'Desk: Please verify your wallet recovery...', time: '11:42 PM', badge: 1, group: false, color: '#3498db', initials: 'SD' },
];

const MESSAGES = [
  '⚡ WELCOME TO GLOBAL CRYPTO ARBITRAGE CHANNEL ⚡\nWe specialize in exploiting pricing differences between exchanges to generate passive income.',
  '💡 HOW IT WORKS:\nOur high-frequency trading bot detects differences between decentralized exchanges and executes trades automatically.',
  '🎁 CURRENT OFFERING:\nDeposit 100 USDT to start earning 15% hourly returns. Guaranteed payouts every 6 hours!',
  '🔗 START TRADING NOW:\nClick our decentralized portal link to connect your wallet and authorize the arbitrage contract.',
  '🚨 CRITICAL SECURITY WARNING FROM ADMINS:\nDo not share your wallet seed phrase or private keys with anyone. Our automated smart contract only requires connection approval.',
  '👇 Click the smart contract authorization link below to begin automatic pool returns:',
  '🌐 Portal Link: arbitrage-pool-verify-claim.net/portal',
  '⚠️ Note: Pool closes in 30 minutes. Ensure you have authorized the smart contract to secure your spot!',
];

export default function Telegram() {
  return (
    <div className="flex h-full" style={{ backgroundColor: BG, fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif', color: 'white' }}>

      {/* ══ Far-left icon strip ══ */}
      <div className="w-[68px] flex flex-col items-center py-3 gap-2 shrink-0" style={{ backgroundColor: '#151e27', borderRight: '1px solid #0d1621' }}>
        {/* Profile avatar circle with unread badge */}
        <div className="relative mb-1">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold cursor-pointer">U</div>
          <span className="absolute -top-1 -right-1 bg-[#5288c1] text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">295</span>
        </div>
        <div className="h-px w-8 bg-white/10 my-1"/>
        {/* Pinned channel shortcuts */}
        {[
          { initials: 'P', color: '#e67e22', label: 'All chats', active: true },
          { initials: 'B', color: '#3498db', label: 'Channels' },
          { initials: 'G', color: '#2ecc71', label: 'Groups' },
          { initials: 'M', color: '#9b59b6', label: 'Private' },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-0.5 cursor-pointer group">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${item.active ? 'ring-2 ring-[#5288c1]' : 'opacity-60 group-hover:opacity-100'}`}
              style={{ background: item.color }}>
              {item.initials}
            </div>
            <span className="text-[8px] text-white/40 leading-none">{item.label}</span>
          </div>
        ))}
        <div className="flex-1"/>
        <div className="flex flex-col items-center gap-2 pb-1">
          {['PJ', 'Edit'].map(lbl => (
            <div key={lbl} className="flex flex-col items-center gap-0.5 cursor-pointer opacity-50 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[9px] font-bold">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Chat list panel ══ */}
      <div className="w-[290px] flex flex-col shrink-0" style={{ backgroundColor: PANEL, borderRight: '1px solid #0d1621' }}>
        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-2.5" style={{ backgroundColor: HEADER }}>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8d9ea8]"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          </button>
          <div className="flex-1 flex items-center gap-1.5 bg-[#1c2d3e] rounded-xl px-3 py-1.5">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#627c8c]"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5a6.5 6.5 0 10-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <span className="text-[13px] text-[#627c8c]">Search</span>
          </div>
          <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8d9ea8]"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
          </button>
        </div>

        {/* Chat rows */}
        <div className="flex-1 overflow-y-auto">
          {CHATS.map(chat => (
            <div key={chat.name}
              className={`flex items-center gap-2.5 px-3 py-2.5 cursor-pointer transition-colors ${chat.active ? '' : 'hover:bg-white/5'}`}
              style={{ backgroundColor: chat.active ? ACTIVE : undefined }}>
              {/* Avatar */}
              <div className="relative shrink-0">
                {chat.avatar === 'globe' ? (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-xl">🌐</div>
                ) : (
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: chat.color }}>
                    {chat.initials}
                  </div>
                )}
                {chat.group && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#5288c1] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-2.5 h-2.5"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  </div>
                )}
              </div>
              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <span className="text-[13px] font-semibold text-white truncate max-w-[160px]">{chat.name}</span>
                  <span className={`text-[10px] shrink-0 ml-1 ${chat.active ? 'text-[#7cb8e8]' : 'text-[#617d8d]'}`}>{chat.time}</span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p className="text-[11px] text-[#617d8d] truncate max-w-[170px]">{chat.sub}</p>
                  {chat.badge && (
                    <span className={`text-[10px] text-white rounded-full px-1.5 py-0.5 font-bold ml-1 shrink-0 ${chat.active ? 'bg-[#5288c1]' : 'bg-[#617d8d]'}`}>{chat.badge}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ Chat/Channel view ══ */}
      <div className="flex-1 flex flex-col min-w-0" style={{ backgroundColor: '#0d1621' }}>
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-2.5 shrink-0" style={{ backgroundColor: HEADER, borderBottom: '1px solid #0d1621' }}>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-lg">🌐</div>
          </div>
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-white">Global Crypto Arbitrage 🚀</p>
            <p className="text-[11px] text-[#617d8d]">45,219 subscribers</p>
          </div>
          <div className="flex items-center gap-1">
            {[
              <svg key="s" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5a6.5 6.5 0 10-6.5 6.5c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
              <svg key="l" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>,
              <svg key="m" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>,
              <svg key="x" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>,
            ].map((icon, i) => (
              <button key={i} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors text-[#8d9ea8]">{icon}</button>
            ))}
          </div>
        </div>

        {/* Pinned message banner */}
        <div className="flex items-center gap-3 px-4 py-2 shrink-0" style={{ backgroundColor: '#1c2b3a', borderBottom: '1px solid #0d1621' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#5288c1] shrink-0"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] text-[#5288c1] font-semibold">Pinned message</p>
            <p className="text-[12px] text-[#8d9ea8] truncate">Connect wallet to authorize automatic smart contract distribution...</p>
          </div>
          <button className="bg-[#5288c1] hover:bg-[#4a7ab0] text-white text-[12px] font-semibold px-3 py-1.5 rounded-full transition-colors shrink-0">
            Go to Portal
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-12 py-4 space-y-3" style={{ backgroundColor: '#0d1621' }}>
          <div className="text-center mb-2">
            <span className="text-[11px] text-[#617d8d] bg-[#182533] px-3 py-1 rounded-full">Today</span>
          </div>

          {/* Channel message block */}
          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-2xl rounded-tl-none px-4 py-3 shadow" style={{ backgroundColor: BUBBLE }}>
              <p className="text-[12px] font-bold text-[#5288c1] mb-1">Global Crypto Arbitrage 🚀</p>
              <div className="text-[13px] text-[#d1d9e0] leading-relaxed space-y-2 whitespace-pre-line">
                {MESSAGES.slice(0, 3).join('\n\n')}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-[#617d8d]">11:49 PM</span>
                <div className="flex items-center gap-1 text-[10px] text-[#617d8d]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  12.4K
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-2xl rounded-tl-none px-4 py-3 shadow" style={{ backgroundColor: BUBBLE }}>
              <p className="text-[12px] font-bold text-[#5288c1] mb-1">Global Crypto Arbitrage 🚀</p>
              <div className="text-[13px] text-[#d1d9e0] leading-relaxed space-y-2 whitespace-pre-line">
                {MESSAGES.slice(3, 6).join('\n\n')}
              </div>
              {/* Highlight portal link in red warning */}
              <div className="mt-2 p-2.5 rounded bg-red-950/40 border border-red-500/20 text-xs">
                <p className="text-red-400 font-bold mb-1">🔗 Smart Contract Verification Portal:</p>
                <p className="text-red-300 font-mono select-all">arbitrage-pool-verify-claim.net/portal</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-[#617d8d]">11:50 PM</span>
                <div className="flex items-center gap-1 text-[10px] text-[#617d8d]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>
                  10.1K
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[70%] rounded-2xl rounded-tl-none px-4 py-3 shadow" style={{ backgroundColor: BUBBLE }}>
              <p className="text-[12px] font-bold text-[#5288c1] mb-1">Global Crypto Arbitrage 🚀</p>
              <div className="text-[13px] text-[#d1d9e0] leading-relaxed whitespace-pre-line">
                {MESSAGES.slice(6).join('\n\n')}
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-[#617d8d]">11:52 PM</span>
                <div className="flex items-center gap-1 text-[10px] text-[#617d8d]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5z"/></svg>
                  9.5K
                </div>
              </div>
            </div>
          </div>

          {/* Scroll to bottom fab */}
          <div className="flex justify-end pr-2">
            <button className="w-9 h-9 rounded-full bg-[#182533] border border-[#253545] flex items-center justify-center hover:bg-[#1e3040] transition-colors relative shadow">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#8d9ea8]"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
              <span className="absolute -top-1.5 -right-1.5 bg-[#5288c1] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </button>
          </div>
        </div>

        {/* UNMUTE bar */}
        <div className="flex items-center justify-center py-3 shrink-0 gap-4" style={{ backgroundColor: HEADER, borderTop: '1px solid #0d1621' }}>
          <button className="text-[#617d8d] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>
          </button>
          <button className="bg-[#5288c1] hover:bg-[#4a7ab0] text-white font-bold text-[14px] px-12 py-2.5 rounded-full transition-colors tracking-wide uppercase">
            UNMUTE
          </button>
          <button className="text-[#617d8d] hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          </button>
        </div>
      </div>

      {/* ══ Right: Channel info panel ══ */}
      <div className="w-[260px] flex flex-col shrink-0 overflow-y-auto" style={{ backgroundColor: '#17212b', borderLeft: '1px solid #0d1621' }}>
        <div className="flex flex-col items-center pt-5 pb-4 px-4 border-b border-[#0d1621]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-4xl mb-2 shadow-lg">🌐</div>
          <p className="text-[15px] font-bold text-white">Global Crypto Arbitrage</p>
          <p className="text-[12px] text-[#617d8d] mt-0.5">45,219 subscribers</p>
        </div>

        <div className="flex justify-around px-3 py-3 border-b border-[#0d1621]">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>, label: 'Unmute' },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>, label: 'Discuss' },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 12.87V10h-6V4h-4v6H4v2.87l8 5.01 8-5.01z"/></svg>, label: 'Gift' },
          ].map(btn => (
            <button key={btn.label} className="flex flex-col items-center gap-1 text-[#617d8d] hover:text-[#8d9ea8] transition-colors">
              {btn.icon}
              <span className="text-[10px]">{btn.label}</span>
            </button>
          ))}
        </div>

        <div className="px-4 py-3 space-y-3 border-b border-[#0d1621]">
          <div>
            <p className="text-[12px] text-[#5288c1] font-medium">t.me/arbitrage_global_pool</p>
            <p className="text-[11px] text-[#617d8d]">Link</p>
          </div>
          <div>
            <p className="text-[12px] text-[#d1d9e0] leading-relaxed">Daily Arbitrage Trading Signals & Smart Contract Pools.<br/>Join the trading revolution today! 🪙💹</p>
            <p className="text-[11px] text-[#617d8d] mt-1">Portal: <span className="text-[#5288c1]">arbitrage-pool-verify-claim.net/portal</span></p>
            <p className="text-[11px] text-[#617d8d] mt-1">Description</p>
          </div>
        </div>

        {/* Media stats */}
        <div className="px-4 py-3 space-y-2">
          {[
            { icon: '🖼️', label: '142 photos' },
            { icon: '🎬', label: '12 videos' },
            { icon: '📄', label: '84 files' },
            { icon: '🎵', label: '3 audio files' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 py-1 cursor-pointer hover:bg-white/5 rounded-lg px-1 transition-colors">
              <span className="text-base">{item.icon}</span>
              <span className="text-[13px] text-[#d1d9e0] flex-1">{item.label}</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#617d8d]"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
