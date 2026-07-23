import React, { useState } from 'react';

const POSTS = [
  {
    user: 'john_dev',
    verified: false,
    avatar: 'J',
    avatarBg: '#833ab4',
    time: '2 hours ago',
    caption: 'Beautiful sunset after a long day 🌅 #nature #photography #sunset',
    likes: '1,842',
    comments: 18,
    emoji: '🌅',
    bg: 'linear-gradient(135deg,#667eea,#764ba2)',
    scam: false,
  },
  {
    user: 'free_giveaway_official',
    verified: true,
    avatar: '🎁',
    avatarBg: '#f09433',
    time: 'Sponsored',
    caption: '🎉 WIN a FREE iPhone 16 Pro MAX! Just follow + like + click link below. HURRY — only 2 hours left! DM us your email to confirm! 📲 iphone-giveaway-2026.xyz',
    likes: '12,431',
    comments: 847,
    emoji: null,
    scam: true,
  },
];

export default function SocialMedia() {
  const [liked, setLiked] = useState({});

  return (
    <div className="flex h-full bg-white" style={{ fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* ── Left sidebar ── */}
      <div className="w-[244px] border-r border-[#dbdbdb] flex flex-col py-6 px-3 shrink-0">
        {/* Instagram wordmark */}
        <div className="px-3 mb-7">
          <svg viewBox="0 0 132 42" fill="none" className="h-7" xmlns="http://www.w3.org/2000/svg">
            <text x="0" y="34" fontFamily="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" fontSize="32" fontWeight="700" fill="#262626" style={{ letterSpacing: -1 }}>Instagram</text>
          </svg>
        </div>

        {/* Nav items */}
        <div className="flex-1 space-y-1">
          {[
            { label: 'Home', active: true, icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg> },
            { label: 'Search', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="10.5" cy="10.5" r="7.5"/><line x1="21" y1="21" x2="15.8" y2="15.8"/></svg> },
            { label: 'Explore', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg> },
            { label: 'Reels', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg> },
            { label: 'Messages', badge: 3, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> },
            { label: 'Notifications', badge: 12, icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg> },
            { label: 'Create', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> },
            { label: 'Profile', avatar: true },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer transition-all hover:bg-[#f2f2f2] ${item.active ? 'font-bold' : ''}`}>
              {item.avatar ? (
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">U</div>
              ) : item.icon}
              <span className={`text-[15px] text-[#262626] ${item.active ? 'font-bold' : 'font-normal'}`}>{item.label}</span>
              {item.badge && <span className="ml-auto text-[10px] bg-[#ff3040] text-white font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">{item.badge}</span>}
            </div>
          ))}
        </div>

        {/* More */}
        <div className="px-3 pt-3 border-t border-[#dbdbdb] mt-2">
          <div className="flex items-center gap-4 py-3 cursor-pointer hover:bg-[#f2f2f2] rounded-xl px-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#262626]"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <span className="text-[15px] text-[#262626]">More</span>
          </div>
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="flex-1 overflow-y-auto bg-[#fafafa]">
        <div className="max-w-[470px] mx-auto pt-6 pb-8 space-y-5 px-4">

          {/* Stories strip */}
          <div className="bg-white border border-[#dbdbdb] rounded-xl p-4">
            <div className="flex gap-4 overflow-x-auto pb-1 scrollbar-none">
              {[
                { name: 'Your story', self: true },
                { name: 'alex_k', grad: 'from-yellow-400 via-pink-500 to-purple-600' },
                { name: 'sarah_m', grad: 'from-pink-400 to-red-500' },
                { name: 'mike.j', grad: 'from-blue-400 to-indigo-500' },
                { name: 'emma_w', grad: 'from-green-400 to-teal-500' },
                { name: 'james', grad: 'from-orange-400 to-yellow-400' },
              ].map(s => (
                <div key={s.name} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer">
                  <div className={`w-[62px] h-[62px] rounded-full ${s.self ? 'border-2 border-dashed border-[#dbdbdb]' : `p-[2px] bg-gradient-to-tr ${s.grad}`}`}>
                    <div className="w-full h-full rounded-full bg-[#e8e8e8] flex items-center justify-center text-sm font-bold text-gray-500">
                      {s.self ? <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#0095f6]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg> : s.name[0].toUpperCase()}
                    </div>
                  </div>
                  <span className="text-[11px] text-[#262626] text-center max-w-[66px] truncate">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {POSTS.map((post, idx) => (
            <div key={idx} className={`bg-white border rounded-xl overflow-hidden ${post.scam ? 'border-[#ff3040] border-2' : 'border-[#dbdbdb]'}`}>
              {/* Post header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-base ${post.scam ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-600' : ''}`} style={!post.scam ? { background: post.avatarBg } : {}}>
                  {post.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[14px] font-semibold text-[#262626]">{post.user}</span>
                    {post.verified && <svg viewBox="0 0 24 24" fill="#0095f6" className="w-3.5 h-3.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>}
                    {post.scam && <span className="text-[10px] bg-[#ffebe8] text-[#ff3040] font-bold px-1.5 py-0.5 rounded-full ml-1">SPONSORED</span>}
                  </div>
                  <p className="text-[12px] text-[#737373]">{post.time}</p>
                </div>
                <button className="text-[#262626] text-xl">⋯</button>
              </div>

              {/* Post image area */}
              {post.scam ? (
                <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 py-12 px-6 text-center text-white">
                  <p className="text-4xl mb-3">🎉</p>
                  <p className="text-2xl font-black mb-1">iPhone 16 Pro MAX</p>
                  <p className="text-lg font-bold text-yellow-100">FREE GIVEAWAY!</p>
                  <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-2xl p-4 space-y-2">
                    <p className="text-sm font-semibold">1️⃣ Follow  @free_giveaway_official</p>
                    <p className="text-sm font-semibold">2️⃣ Like & Share this post</p>
                    <p className="text-sm font-semibold">3️⃣ Click link & enter your details</p>
                  </div>
                  <a href="#" onClick={e => e.preventDefault()} className="mt-4 inline-block bg-white text-orange-600 font-black rounded-full px-8 py-2.5 text-sm shadow-lg">
                    🔗 Claim Now
                  </a>
                  <p className="text-[11px] text-white/60 mt-2 font-mono">iphone-giveaway-2026.xyz/enter</p>
                  <p className="text-xs font-bold text-red-100 mt-1">⏰ ONLY 2 HOURS LEFT!</p>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-6xl" style={{ background: post.bg }}>
                  {post.emoji}
                </div>
              )}

              {/* Action bar */}
              <div className="px-4 pt-3 pb-1">
                <div className="flex items-center gap-4 mb-2">
                  <button onClick={() => setLiked(l => ({ ...l, [idx]: !l[idx] }))} className="transition-transform active:scale-125">
                    {liked[idx]
                      ? <svg viewBox="0 0 24 24" fill="#ff3040" className="w-6 h-6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#262626]"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    }
                  </button>
                  <button>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#262626]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </button>
                  <button>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#262626]"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                  <button className="ml-auto">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-[#262626]"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                  </button>
                </div>
                <p className="text-[13px] font-semibold text-[#262626] mb-1">{post.likes} likes</p>
                <p className="text-[14px] text-[#262626] leading-snug">
                  <span className="font-semibold">{post.user}</span>{' '}
                  <span className="text-[#737373]">{post.caption}</span>
                </p>
                <p className="text-[13px] text-[#737373] mt-1 cursor-pointer">View all {post.comments} comments</p>
                <div className="flex items-center gap-2 mt-2 pb-3 border-b border-[#f0f0f0]">
                  <div className="w-6 h-6 rounded-full bg-[#e8e8e8] flex items-center justify-center text-[10px] font-bold text-gray-500">U</div>
                  <span className="text-[13px] text-[#737373]">Add a comment...</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right sidebar: suggestions ── */}
      <div className="w-[300px] pt-6 px-6 border-l border-[#dbdbdb] flex flex-col gap-5 shrink-0">
        {/* Profile mini */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-sm font-bold">U</div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-[#262626]">you_user</p>
            <p className="text-[13px] text-[#737373]">Your Name</p>
          </div>
          <button className="text-[13px] font-semibold text-[#0095f6] hover:text-[#00376b] transition-colors">Switch</button>
        </div>

        {/* Suggestions */}
        <div>
          <div className="flex justify-between mb-3">
            <p className="text-[13px] font-semibold text-[#737373]">Suggested for you</p>
            <button className="text-[12px] font-semibold text-[#262626] hover:text-[#737373] transition-colors">See All</button>
          </div>
          <div className="space-y-3">
            {[
              { user: 'crypto_profits_daily', tag: 'Followed by alex_k', grad: 'from-yellow-400 to-orange-500' },
              { user: 'prize_center_vip', tag: 'New to Instagram', grad: 'from-purple-500 to-pink-500' },
              { user: 'invest_fast_2026', tag: 'Suggested for you', grad: 'from-blue-400 to-indigo-500' },
              { user: 'free_iphone_giveaway', tag: 'Followed by john_dev', grad: 'from-red-400 to-pink-500' },
            ].map(s => (
              <div key={s.user} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-tr ${s.grad} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {s.user[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-[#262626] truncate">{s.user}</p>
                  <p className="text-[11px] text-[#737373] truncate">{s.tag}</p>
                </div>
                <button className="text-[12px] font-semibold text-[#0095f6] hover:text-[#00376b] transition-colors shrink-0">Follow</button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-[#c7c7c7] leading-relaxed">
          About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified
          <br/><br/>
          © 2026 INSTAGRAM FROM META
        </div>
      </div>
    </div>
  );
}
