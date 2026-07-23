import React from 'react';

const TXS = [
  { icon: '🛒', merchant: 'Amazon.com', category: 'Shopping', date: 'Jul 21, 2026', amount: '-$34.99', status: 'Completed', type: 'debit' },
  { icon: '💳', merchant: 'Salary — Tech Corp', category: 'Income', date: 'Jul 20, 2026', amount: '+$4,200.00', status: 'Completed', type: 'credit' },
  { icon: '☕', merchant: 'Starbucks #4821', category: 'Food & Drink', date: 'Jul 20, 2026', amount: '-$6.50', status: 'Completed', type: 'debit' },
  { icon: '💡', merchant: 'National Electric Co.', category: 'Utilities', date: 'Jul 18, 2026', amount: '-$89.00', status: 'Completed', type: 'debit' },
  { icon: '🏠', merchant: 'Rent Payment — July', category: 'Housing', date: 'Jul 1, 2026', amount: '-$1,200.00', status: 'Completed', type: 'debit' },
];

export default function Banking() {
  return (
    <div className="flex h-full bg-[#f5f5f5]" style={{ fontFamily: '"SF Pro Display",-apple-system,BlinkMacSystemFont,sans-serif' }}>

      {/* ── Left nav ── */}
      <div className="w-60 bg-[#00274c] flex flex-col py-0 shrink-0">
        {/* Bank logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="#00274c" className="w-5 h-5"><path d="M11.5 2L2 7l1.63 1H2v2h20V8h-1.63L22 7 11.5 2zm5.5 11v5h2v2H3v-2h2v-5h2v5h2v-5h2v5h2v-5h2v5h2v-5h2z"/></svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm">CityBank</p>
            <p className="text-white/50 text-[10px]">Online Banking</p>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex-1 py-4 space-y-0.5 px-3">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>, label: 'Dashboard', active: true },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>, label: 'My Accounts' },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>, label: 'Transfers' },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>, label: 'Bill Pay' },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>, label: 'Statements' },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>, label: 'Security' },
            { icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>, label: 'Settings' },
          ].map(item => (
            <div key={item.label}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm ${item.active ? 'bg-white/15 text-white font-semibold' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>

        {/* User */}
        <div className="px-5 py-4 border-t border-white/10 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
          <div>
            <p className="text-white text-xs font-semibold">John Doe</p>
            <p className="text-white/40 text-[10px]">Premium Account</p>
          </div>
          <button className="ml-auto text-white/40 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>
          </button>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-7 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Account Overview</h1>
            <p className="text-xs text-gray-400">Wednesday, July 23, 2026</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs text-[#00274c] border border-[#00274c] rounded-lg px-3 py-1.5 hover:bg-[#00274c] hover:text-white transition-colors font-medium">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M14 6l-1-2H5v17h2v-7h5l1 2h7V6h-6zm4 8h-4l-1-2H7V6h5l1 2h5v6z"/></svg>
              Report Fraud
            </button>
            <div className="w-8 h-8 rounded-full bg-[#e8f0fe] flex items-center justify-center cursor-pointer relative">
              <svg viewBox="0 0 24 24" fill="#00274c" className="w-4 h-4"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Account cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Checking */}
            <div className="bg-gradient-to-br from-[#00274c] to-[#00467f] rounded-2xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Checking Account</p>
                  <p className="text-white/60 text-[11px] mt-0.5">••••  ••••  ••••  4521</p>
                </div>
                <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 opacity-40"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
              </div>
              <p className="text-2xl font-bold">$8,241.55</p>
              <p className="text-white/50 text-xs mt-1">Available Balance</p>
            </div>
            {/* Savings */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Savings Account</p>
              <p className="text-gray-400 text-[11px]">••••  ••••  ••••  7832</p>
              <p className="text-2xl font-bold text-gray-900 mt-5">$4,216.75</p>
              <p className="text-gray-400 text-xs mt-1">Available Balance</p>
            </div>
            {/* Credit */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Credit Card</p>
              <p className="text-gray-400 text-[11px]">••••  ••••  ••••  9104</p>
              <p className="text-2xl font-bold text-gray-900 mt-5">$1,840.00</p>
              <div className="flex justify-between items-center mt-1">
                <p className="text-gray-400 text-xs">Balance Due</p>
                <span className="text-orange-500 text-xs font-semibold">Due Aug 5</span>
              </div>
            </div>
          </div>

          {/* ⚠️ FRAUD ALERT */}
          <div className="bg-white border-2 border-red-400 rounded-2xl overflow-hidden shadow-md">
            <div className="bg-red-500 px-5 py-3 flex items-center gap-3">
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
              <p className="text-white font-bold text-sm">⚠ Security Alert — Unusual Activity Detected</p>
              <button className="ml-auto text-white/70 hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">An outgoing wire transfer request has been initiated from your account. Please review and confirm or decline immediately.</p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div><p className="text-xs text-gray-400 mb-1">Recipient</p><p className="font-semibold text-red-700">Unknown Merchant Ltd.</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Amount</p><p className="font-bold text-red-700 text-base">$2,499.00</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Reference</p><p className="font-medium text-gray-700">INV-VERIFY-8847</p></div>
                  <div><p className="text-xs text-gray-400 mb-1">Recipient Account</p><p className="font-medium text-gray-700">INTL-XX-8291</p></div>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
                <p className="text-xs text-yellow-800 leading-relaxed">
                  <strong>⚠ Warning:</strong> You did not initiate this transfer. This may be a fraudulent request. Confirm only if you recognize this transaction. This transfer cannot be reversed once processed.
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={e => e.preventDefault()} className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-bold transition-colors">
                  Confirm Transfer
                </button>
                <button onClick={e => e.preventDefault()} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-sm font-semibold transition-colors">
                  Decline & Report Fraud
                </button>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Recent Transactions</h3>
              <button className="text-xs text-[#00274c] font-semibold hover:underline">View All</button>
            </div>
            {TXS.map((t, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-50 hover:bg-gray-50 transition-colors last:border-0">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg shrink-0">{t.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{t.merchant}</p>
                  <p className="text-[11px] text-gray-400">{t.category} · {t.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-gray-900'}`}>{t.amount}</p>
                  <p className="text-[10px] text-gray-400">{t.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
