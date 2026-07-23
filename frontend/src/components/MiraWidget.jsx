import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScanner } from '../hooks/useScanner';
import LoadingAnimation from './LoadingAnimation';
import MiraChatPanel from './MiraChatPanel';
import { QUICK_QUESTIONS } from '../services/mockAI';
import { RISK_COLORS } from '../types/analysis';
import { getTranslation } from '../utils/translations';

/**
 * MiraWidget — Floating cybersecurity assistant widget.
 *
 * Phase 1 (summary): Full rich risk report — explanation, indicators,
 *   recommended actions, severity grid — with question bubbles + chat input.
 * Phase 2 (chat): Slides in from the right. Mira answers and you can keep chatting.
 */
export default function MiraWidget({ activeApp, lang }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'summary' | 'chat'
  const [chatInitialQuestion, setChatInitialQuestion] = useState('');
  const [chatInputValue, setChatInputValue] = useState('');

  const { scanScreen, isLoading, loadingStep, result, error, reset, dismissError } =
    useScanner(activeApp, lang);

  // Derived: only go to summary/chat once we actually have a result
  const effectivePhase =
    result && !isLoading && !error
      ? phase === 'chat' ? 'chat' : 'summary'
      : 'idle';

  /* ── handlers ─────────────────────────────────────────────────── */
  const handleScan = () => { setPhase('idle'); setChatInitialQuestion(''); scanScreen(); };

  const toggleWidget = () => {
    setIsExpanded(v => !v);
    if (isExpanded) { reset(); setPhase('idle'); setChatInitialQuestion(''); setChatInputValue(''); }
  };

  const openChat = (question) => { setChatInitialQuestion(question); setPhase('chat'); };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInputValue.trim()) { openChat(chatInputValue.trim()); setChatInputValue(''); }
  };

  const handleBackToSummary = () => { setPhase('summary'); setChatInitialQuestion(''); };

  /* ── quick-question bubbles ───────────────────────────────────── */
  const bubbles = [
    { label: '❓ Why?',         full: QUICK_QUESTIONS[0] },
    { label: '🔧 What to do?',  full: QUICK_QUESTIONS[1] },
    { label: '🤔 Is it fake?',  full: QUICK_QUESTIONS[2] },
    { label: '👀 How to spot?', full: QUICK_QUESTIONS[3] },
    { label: '📚 Teach me',     full: QUICK_QUESTIONS[4] },
  ];

  /* ── risk colour tokens ───────────────────────────────────────── */
  const rc      = result ? (RISK_COLORS[result.riskLevel] || RISK_COLORS.Safe) : RISK_COLORS.Safe;
  const isSafe  = result?.isSafe;
  const icon    = isSafe ? '✅' : result?.riskLevel === 'Critical' ? '🚨' : '⚠️';

  const sevColor = (v) =>
    v === 'High' || v === 'Immediate' ? '#ef4444'
    : v === 'Medium' || v === 'Moderate' ? '#f59e0b'
    : '#6b7280';

  /* ─────────────────────────────────────────────────────────────── */
  return (
    <>
      <motion.div
        drag dragMomentum={false}
        data-mira-widget
        className="absolute bottom-5 right-5 z-[99] cursor-grab active:cursor-grabbing"
        style={{ userSelect: 'none' }}
      >
        {/* ── Collapsed FAB ──────────────────────────────────────── */}
        {!isExpanded ? (
          <button
            onClick={toggleWidget}
            className="w-14 h-14 rounded-full flex items-center justify-center
              bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white
              shadow-2xl shadow-indigo-500/50 hover:scale-110 active:scale-90
              transition-all duration-200 ring-4 ring-white/30 relative
              animate-[miraFloat_3s_ease-in-out_infinite]"
            title={getTranslation(lang, 'miraSecurity')}
          >
            <span className="text-2xl filter drop-shadow">🛡️</span>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
            </span>
          </button>

        ) : (
          /* ── Expanded Panel ──────────────────────────────────── */
          <div
            className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-200
              animate-[slideUp_0.25s_ease-out] flex flex-col overflow-hidden"
            style={{
              width: 320,
              height: effectivePhase === 'chat' ? 460 : 'auto',
              maxHeight: '88vh',
            }}
          >
            {/* ── Header ─────────────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">🛡️</span>
                <span className="font-bold text-sm tracking-wide">{getTranslation(lang, 'miraSecurity')}</span>
                {effectivePhase === 'chat' && (
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-medium">Chat</span>
                )}
              </div>
              <button
                onClick={toggleWidget}
                className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors text-sm font-bold"
              >×</button>
            </div>

            {/* ══════════════════════════════════════════════════
                CHAT PHASE — slides in from the right
            ══════════════════════════════════════════════════ */}
            <AnimatePresence mode="wait">
              {effectivePhase === 'chat' && (
                <motion.div
                  key="chat"
                  initial={{ x: '100%', opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '100%', opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                  className="flex-1 flex flex-col min-h-0"
                >
                  <MiraChatPanel
                    result={result}
                    onBack={handleBackToSummary}
                    initialQuestion={chatInitialQuestion}
                    lang={lang}
                  />
                </motion.div>
              )}

              {/* ══════════════════════════════════════════════
                  SUMMARY / IDLE / LOADING
              ══════════════════════════════════════════════ */}
              {effectivePhase !== 'chat' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="flex flex-col flex-1 min-h-0 overflow-hidden"
                >
                  {/* Error */}
                  {error && !isLoading && (
                    <div className="m-4 bg-red-50 border border-red-200 rounded-xl p-3">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-bold text-red-800">{error.title}</p>
                        <button onClick={dismissError} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
                      </div>
                      <p className="text-xs text-red-700 mb-1">{error.message}</p>
                      <p className="text-xs text-red-500">{error.hint}</p>
                      {error.retryable && (
                        <button onClick={handleScan} className="mt-2 w-full py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors">
                          Try Again
                        </button>
                      )}
                    </div>
                  )}

                  {/* Loading */}
                  {isLoading && (
                    <div className="p-4"><LoadingAnimation step={loadingStep} /></div>
                  )}

                  {/* ── RISK SUMMARY (Phase 1) ──────────────── */}
                  {effectivePhase === 'summary' && result && (
                    <div className="flex flex-col flex-1 min-h-0">

                      {/* Risk badge strip */}
                      <div
                        className="mx-4 mt-4 rounded-xl px-3 py-2.5 flex items-center gap-3 flex-shrink-0"
                        style={{ backgroundColor: rc.bg, border: `1.5px solid ${rc.border}` }}
                      >
                        <span className="text-2xl flex-shrink-0">{icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: rc.text + '22', color: rc.text }}
                            >
                              {getTranslation(lang, result.riskLevel.toLowerCase()) || result.riskLevel} RISK
                            </span>
                            <span className="text-[10px] font-bold" style={{ color: rc.text }}>
                              {result.confidenceScore}% confidence
                            </span>
                          </div>
                          <p className="text-xs font-bold text-gray-800 mt-0.5 truncate">{result.attackType}</p>
                        </div>
                      </div>

                      {/* Scrollable detail area */}
                      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-1 space-y-3 min-h-0">

                        {/* Explanation */}
                        <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                          <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                            🔍 {isSafe ? "Why it's safe" : 'What we found'}
                          </h4>
                          <p className="text-xs text-gray-700 leading-relaxed">{result.explanation}</p>
                        </div>

                        {/* Indicators */}
                        {result.indicators?.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                              🚩 {getTranslation(lang, 'indicators') || 'Red Flags'}
                            </h4>
                            <ul className="space-y-1.5">
                              {result.indicators.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                  <span className="mt-0.5 flex-shrink-0" style={{ color: rc.text }}>•</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Recommended Actions */}
                        {result.recommendedActions?.length > 0 && (
                          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                            <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1.5">
                              ✅ {getTranslation(lang, 'actions') || 'What to do'}
                            </h4>
                            <ul className="space-y-1.5">
                              {result.recommendedActions.map((action, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                                  <span className="mt-0.5 text-green-500 flex-shrink-0">✓</span>
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Severity breakdown grid */}
                        {result.severityBreakdown && (
                          <div className="grid grid-cols-3 gap-2">
                            {Object.entries(result.severityBreakdown).map(([key, val]) => (
                              <div key={key} className="bg-gray-50 border border-gray-100 rounded-xl py-2 px-1 text-center">
                                <p className="text-[9px] uppercase font-bold text-gray-400 leading-tight">
                                  {getTranslation(lang, key) || key}
                                </p>
                                <p className="text-[11px] font-black mt-0.5" style={{ color: sevColor(val) }}>{val}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Fixed bottom dock: bubbles + input + scan again */}
                      <div className="px-4 pt-3 pb-4 flex-shrink-0 border-t border-gray-100 space-y-2.5 bg-white">

                        {/* Label */}
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Ask Mira about this
                        </p>

                        {/* Question bubbles */}
                        <div className="flex flex-wrap gap-1.5">
                          {bubbles.map(({ label, full }) => (
                            <button
                              key={label}
                              onClick={() => openChat(full)}
                              className="text-[10px] font-semibold px-3 py-1.5 rounded-full
                                border border-indigo-200 bg-indigo-50 text-indigo-700
                                hover:bg-indigo-100 hover:border-indigo-300 hover:scale-105
                                active:scale-95 transition-all cursor-pointer"
                            >
                              {label}
                            </button>
                          ))}
                        </div>

                        {/* Chat text input */}
                        <form onSubmit={handleChatSubmit} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={chatInputValue}
                            onChange={e => setChatInputValue(e.target.value)}
                            placeholder="Ask Mira anything..."
                            className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-full
                              px-3 py-2 outline-none focus:border-indigo-400 focus:ring-1
                              focus:ring-indigo-200 transition-all placeholder:text-gray-400"
                          />
                          <button
                            type="submit"
                            disabled={!chatInputValue.trim()}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600
                              text-white flex items-center justify-center text-sm
                              hover:shadow-md hover:shadow-indigo-300/50 transition-all
                              disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                          >↑</button>
                        </form>

                        {/* Scan again */}
                        <button
                          onClick={handleScan}
                          className="w-full py-2 bg-gray-100 text-gray-600 text-xs font-medium rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          {getTranslation(lang, 'scanAgain')}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Idle state */}
                  {!isLoading && !result && !error && (
                    <div className="p-4 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mx-auto">
                        <span className="text-2xl">🛡️</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-700">{getTranslation(lang, 'readyToScan')}</p>
                      <p className="text-xs text-gray-400">{getTranslation(lang, 'readyDesc')}</p>
                      <button
                        onClick={handleScan}
                        className="w-full py-3 rounded-xl text-white text-sm font-bold
                          bg-gradient-to-r from-indigo-600 to-purple-600
                          hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98] transition-all"
                      >
                        {getTranslation(lang, 'scanNow')}
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </>
  );
}
