import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Home — Language selection landing page for Mira AI.
 */
export default function Home() {
  const [selectedLang, setSelectedLang] = useState('en');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate(`/demo?lang=${selectedLang}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900 text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 text-center pt-16 px-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20 mb-6">
          <span className="text-4xl filter drop-shadow">🛡️</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-100 to-purple-200 bg-clip-text text-transparent">
          Mira AI
        </h1>
        <p className="text-indigo-300/80 text-sm font-semibold tracking-wider uppercase mt-2">
          Cyber Awareness Assistant
        </p>
      </header>

      {/* Main Language Selector */}
      <main className="relative z-10 max-w-md w-full mx-auto px-6 py-8 flex flex-col items-center">
        <div className="w-full bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl text-center">
          <h2 className="text-xl font-bold mb-1 text-white">Select Language</h2>
          <h2 className="text-lg font-medium mb-6 text-indigo-300/60">ဘာသာစကား ရွေးချယ်ပါ</h2>

          {/* Languages Options */}
          <div className="space-y-4 mb-8">
            {/* English Card */}
            <button
              onClick={() => setSelectedLang('en')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 text-left ${
                selectedLang === 'en'
                  ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              <div>
                <p className="font-bold text-base text-white">English</p>
                <p className="text-xs text-gray-400 mt-0.5">Use English interface</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedLang === 'en' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-500'}`}>
                {selectedLang === 'en' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </button>

            {/* Myanmar Card */}
            <button
              onClick={() => setSelectedLang('mm')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 text-left ${
                selectedLang === 'mm'
                  ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500 shadow-lg shadow-indigo-500/10'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              <div>
                <p className="font-bold text-base text-white">မြန်မာဘာသာ</p>
                <p className="text-xs text-gray-400 mt-0.5">မြန်မာစာဖြင့် သုံးမည်</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedLang === 'mm' ? 'border-indigo-500 bg-indigo-500' : 'border-gray-500'}`}>
                {selectedLang === 'mm' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
              </div>
            </button>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-bold text-base"
          >
            {selectedLang === 'en' ? 'Get Started →' : 'စတင်အသုံးပြုမည် →'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-white/5">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Mira AI • Hackathon Prototype • Powered by Gemini Vision
        </p>
      </footer>
    </div>
  );
}
