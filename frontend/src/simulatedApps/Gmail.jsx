import React, { useState } from 'react';

const SIDEBAR_ITEMS = [
  { label: 'Inbox',     count: 12, bold: true },
  { label: 'Starred' },
  { label: 'Snoozed' },
  { label: 'Sent' },
  { label: 'Drafts',    count: 2 },
  { label: 'Purchases', count: 8 },
  { label: 'Bills' },
];

/* ---------- icons ---------- */
const MenuIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>;
const BackIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>;
const ArchIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM12 17.5L6.5 12H10v-2h4v2h3.5L12 17.5zM5.12 5l.81-1h12l.94 1H5.12z"/></svg>;
const DelIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>;
const SnoozeIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7zm5-3H14v2h6V4h-2.5z"/></svg>;
const MoveIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.34C18 2.99 16.5 2 15 2c-.98 0-1.81.46-2.41 1.17L12 3.94l-.59-.77C10.81 2.46 9.98 2 9 2 7.5 2 6 2.99 6 4.66 6 5.12 6.11 5.56 6.18 6H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM15 4c.55 0 1 .45 1 1.01 0 .65-.5 1.29-2.12 2.35C12.3 6.23 12 5.57 12 4.98 12 4.45 12.41 4 15 4zm-6 0c2.59 0 3 .45 3 .98 0 .59-.3 1.25-1.88 2.38C8.5 6.3 8 5.66 8 5.01 8 4.45 8.45 4 9 4zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>;
const StarIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const EmojiIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>;
const ReplyIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>;
const FwdIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 8V4l8 8-8 8v-4H4V8z"/></svg>;
const PrintIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>;
const OpenIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>;
const ChevLeft   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>;
const ChevRight  = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>;
const MoreIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>;

export default function Gmail() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-full bg-[#f6f8fc]" style={{ fontFamily: "'Google Sans',Roboto,Arial,sans-serif" }}>

      {/* ══ Left sidebar ══ */}
      <div className="w-[256px] flex flex-col shrink-0 bg-[#f6f8fc] py-1">
        <div className="flex items-center gap-1 px-4 py-3 mb-1">
          <button className="p-2 hover:bg-[#e8eaed] rounded-full transition-colors text-[#444746]"><MenuIcon/></button>
          <div className="flex items-center gap-1 ml-1">
            <svg viewBox="52 42 88 66" className="h-[22px] w-[35px]">
              <path fill="#4285f4" d="M58 108h14V74L52 59v43c0 3.32 2.69 6 6 6z"/>
              <path fill="#34a853" d="M120 108h14c3.32 0 6-2.69 6-6V59l-20 15z"/>
              <path fill="#fbbc04" d="M120 48v26l20-15v-8c0-7.42-8.47-11.65-14.4-7.2z"/>
              <path fill="#ea4335" d="M72 74V48l24 18 24-18v26L96 92z"/>
              <path fill="#c5221f" d="M52 51v8l20 15V48l-5.6-4.2C60.47 39.35 52 43.58 52 51z"/>
            </svg>
            <span className="text-[22px] text-[#202124] font-normal leading-none ml-0.5" style={{letterSpacing:-0.5}}>Gmail</span>
          </div>
        </div>

        <div className="px-3 mb-2">
          <button className="flex items-center gap-3 bg-[#c2e7ff] hover:shadow-md text-[#001d35] font-medium pl-4 pr-6 py-[18px] rounded-2xl shadow-sm transition-shadow w-full text-[14px]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
            Compose
          </button>
        </div>

        <div className="flex-1 px-2 space-y-0.5 overflow-y-auto">
          {SIDEBAR_ITEMS.map(item => (
            <div key={item.label} className={`flex items-center px-4 py-1.5 rounded-r-full cursor-pointer text-[14px] transition-colors ${item.bold ? 'bg-[#d3e3fd] font-bold text-[#202124]' : 'text-[#444746] hover:bg-[#e8eaed]'}`}>
              <span className="flex-1">{item.label}</span>
              {item.count && <span className="text-[12px] font-bold">{item.count}</span>}
            </div>
          ))}
          <div className="flex items-center px-4 py-1.5 cursor-pointer text-[14px] text-[#444746] hover:bg-[#e8eaed] rounded-r-full">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
            More
          </div>
          <div className="px-4 py-2 mt-3">
            <div className="flex items-center gap-2 text-[12px] text-[#444746] font-semibold">
              <span>Labels</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-auto"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* ══ Main email pane ══ */}
      <div className="flex-1 flex flex-col min-w-0 bg-white m-2 ml-0 rounded-2xl border border-[#e0e0e0] overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center px-4 py-2 border-b border-[#e0e0e0] gap-1">
          <div className="flex items-center gap-0.5">
            <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><BackIcon/></button>
            <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><ArchIcon/></button>
            <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><DelIcon/></button>
            <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><SnoozeIcon/></button>
            <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><MoveIcon/></button>
            <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><MoreIcon/></button>
          </div>
          <div className="flex-1"/>
          <span className="text-[13px] text-[#444746] mr-1">1 of 12</span>
          <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><ChevLeft/></button>
          <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><ChevRight/></button>
        </div>

        {/* Email content */}
        <div className="flex-1 overflow-y-auto px-8 pt-5 pb-24 relative">
          {/* Subject */}
          <div className="flex items-start gap-3 mb-4">
            <h1 className="text-[22px] font-normal text-[#202124] flex-1 leading-snug">
              ⚠️ Action Required: Your PayPal account has been permanently limited
            </h1>
            <div className="flex items-center gap-1 shrink-0 mt-1">
              <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><PrintIcon/></button>
              <button className="p-1.5 hover:bg-[#f1f3f4] rounded-full transition-colors text-[#444746]"><OpenIcon/></button>
            </div>
          </div>

          {/* Inbox chip */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] bg-[#e8eaed] text-[#444746] rounded px-2 py-0.5 flex items-center gap-1">
              Inbox
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </span>
          </div>

          {/* Sender row */}
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#003087] flex items-center justify-center text-white text-sm font-bold shrink-0">P</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[14px] font-bold text-[#202124]">PayPal Security Center</span>
                  {/* Suspicious spoofed sender */}
                  <span className="text-[12px] text-[#5f6368] ml-1">&lt;service@paypal-secure-alert<span className="text-[#c5221f] font-bold">.net</span>&gt;</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[12px] text-[#5f6368] whitespace-nowrap">Wed, Jul 23, 7:12 AM (1 hour ago)</span>
                  <button className="text-[#444746] hover:bg-[#f1f3f4] p-1 rounded-full transition-colors"><StarIcon/></button>
                  <button className="text-[#444746] hover:bg-[#f1f3f4] p-1 rounded-full transition-colors"><EmojiIcon/></button>
                  <button className="text-[#444746] hover:bg-[#f1f3f4] p-1 rounded-full transition-colors"><ReplyIcon/></button>
                  <button className="text-[#444746] hover:bg-[#f1f3f4] p-1 rounded-full transition-colors"><MoreIcon/></button>
                </div>
              </div>
              <p className="text-[12px] text-[#5f6368] mt-0.5">to me ▾</p>
            </div>
          </div>

          {/* Email body */}
          <div className="max-w-[600px]">
            <div className="border border-[#e0e0e0] rounded-lg overflow-hidden">
              {/* PayPal-style header bar */}
              <div className="bg-[#003087] px-6 py-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-[22px] font-bold text-white italic">Pay</span>
                  <span className="text-[22px] font-bold text-[#009cde] italic">Pal</span>
                </div>
              </div>

              <div className="bg-white px-6 py-6 space-y-4">
                <p className="text-[15px] font-semibold text-[#202124]">Hello, valued customer,</p>
                <p className="text-[14px] text-[#5f6368] leading-relaxed">
                  We have noticed <strong className="text-[#202124]">unusual activity</strong> originating from your PayPal account. As a precautionary measure, we have <strong className="text-[#d32f2f]">temporarily limited your account access</strong> until you verify your identity.
                </p>

                {/* Alert box */}
                <div className="bg-[#fff3e0] border border-[#ffb300] rounded-lg p-4 space-y-2">
                  <p className="text-[13px] font-bold text-[#e65100] flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                    Account Limitation Notice
                  </p>
                  <div className="text-[12px] text-[#5f6368] space-y-1">
                    <div className="flex gap-2"><span className="text-[#e65100] font-bold">•</span><span>Suspicious login from <strong>IP 45.33.32.156 — Lagos, Nigeria</strong></span></div>
                    <div className="flex gap-2"><span className="text-[#e65100] font-bold">•</span><span>3 failed password attempts detected</span></div>
                    <div className="flex gap-2"><span className="text-[#e65100] font-bold">•</span><span>Unrecognized device added to account</span></div>
                  </div>
                </div>

                <p className="text-[14px] text-[#5f6368] leading-relaxed">
                  <strong className="text-[#d32f2f]">You must restore your account within 24 hours</strong>, or your funds may be frozen and the account permanently closed. Please provide the following to verify your identity:
                </p>

                {/* Fake form fields inside email */}
                <div className="bg-[#f8f9fa] border border-[#e0e0e0] rounded-lg p-4 space-y-3">
                  <p className="text-[12px] font-semibold text-[#202124] mb-2">Identity Verification Form</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-[#5f6368]">Full Legal Name</label>
                      <div className="border border-[#dadce0] rounded px-2 py-1.5 text-[12px] text-[#9aa0a6] bg-white mt-0.5">Enter your full name</div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#5f6368]">Date of Birth</label>
                      <div className="border border-[#dadce0] rounded px-2 py-1.5 text-[12px] text-[#9aa0a6] bg-white mt-0.5">MM / DD / YYYY</div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#5f6368]">Social Security Number</label>
                      <div className="border border-[#d32f2f] rounded px-2 py-1.5 text-[12px] text-[#9aa0a6] bg-[#fce8e6] mt-0.5">XXX-XX-XXXX</div>
                    </div>
                    <div>
                      <label className="text-[11px] text-[#5f6368]">Credit Card Number</label>
                      <div className="border border-[#d32f2f] rounded px-2 py-1.5 text-[12px] text-[#9aa0a6] bg-[#fce8e6] mt-0.5">XXXX XXXX XXXX XXXX</div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-center pt-2">
                  <a href="#" onClick={e => e.preventDefault()}
                    className="inline-block bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold px-10 py-3 rounded-full text-[14px] transition-colors">
                    Restore My Account Now
                  </a>
                  <p className="text-[10px] text-[#9aa0a6] mt-2 font-mono">https://paypal-account-restore.secure-verify-now.xyz/auth</p>
                </div>

                <hr className="border-[#e0e0e0]"/>
                <p className="text-[11px] text-[#9aa0a6] leading-relaxed text-center">
                  This email was sent by PayPal Holdings, Inc. · 2211 North First Street · San Jose, CA 95131<br/>
                  © 2026 PayPal, Inc. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom floating action bar */}
        <div className="absolute bottom-4 left-[280px] flex items-center gap-2 px-8">
          <button className="flex items-center gap-2 bg-white border border-[#dadce0] hover:bg-[#f1f3f4] text-[#444746] text-[14px] font-medium px-5 py-2.5 rounded-full shadow-sm transition-colors">
            <ReplyIcon/> Reply
          </button>
          <button className="flex items-center gap-2 bg-white border border-[#dadce0] hover:bg-[#f1f3f4] text-[#444746] text-[14px] font-medium px-5 py-2.5 rounded-full shadow-sm transition-colors">
            <FwdIcon/> Forward
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-white border border-[#dadce0] hover:bg-[#f1f3f4] rounded-full shadow-sm transition-colors">
            <EmojiIcon/>
          </button>
        </div>
      </div>

      {/* ══ Right icon strip ══ */}
      <div className="w-[56px] flex flex-col items-center pt-3 gap-1 bg-[#f6f8fc] shrink-0">
        {[
          { color: '#1a73e8', label: 'Meet' },
          { color: '#fbbc04', label: 'Tasks' },
          { color: '#34a853', label: 'Contacts' },
          { color: '#ea4335', label: 'Calendar' },
        ].map(app => (
          <button key={app.label} title={app.label}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#e8eaed] transition-colors cursor-pointer">
            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: app.color }}>
              <span className="text-white text-[8px] font-bold">{app.label[0]}</span>
            </div>
          </button>
        ))}
        <div className="flex-1"/>
        <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#e8eaed] transition-colors mb-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#444746]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
        </button>
      </div>
    </div>
  );
}
