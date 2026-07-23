import React from 'react';
import { RISK_COLORS } from '../types/analysis';
import { getTranslation } from '../utils/translations';

/**
 * RiskCard — Displays the cybersecurity analysis result as a visual card.
 */
export default function RiskCard({ result, onClose, lang }) {
  if (!result) return null;

  const colors = RISK_COLORS[result.riskLevel] || RISK_COLORS.Safe;

  const translateSeverityValue = (val) => {
    const mappings = {
      High: lang === 'mm' ? 'မြင့်မားသည်' : 'High',
      Immediate: lang === 'mm' ? 'ချက်ချင်းလုပ်ဆောင်ရန်' : 'Immediate',
      Medium: lang === 'mm' ? 'အလယ်အလတ်' : 'Medium',
      Moderate: lang === 'mm' ? 'သင့်တော်သည်' : 'Moderate',
      Low: lang === 'mm' ? 'နိမ့်ပါးသည်' : 'Low',
      None: lang === 'mm' ? 'မရှိပါ' : 'None',
    };
    return mappings[val] || val;
  };

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto animate-[slideUp_0.3s_ease-out]"
        style={{ border: `2px solid ${colors.border}` }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl px-5 pt-5 pb-3 border-b border-gray-100 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: colors.bg }}
              >
                {result.isSafe ? '✅' : result.riskLevel === 'Critical' ? '🚨' : '⚠️'}
              </div>
              <div>
                <span
                  className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {getTranslation(lang, result.riskLevel.toLowerCase())} {lang === 'mm' ? 'အန္တရာယ်' : 'RISK'}
                </span>
                <p className="text-sm text-gray-600 mt-0.5">{result.attackType}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-lg"
            >
              ×
            </button>
          </div>

          {/* Confidence Bar */}
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{getTranslation(lang, 'confidence')}</span>
              <span className="font-bold" style={{ color: colors.text }}>{result.confidenceScore}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${result.confidenceScore}%`,
                  backgroundColor: colors.text,
                }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {/* Explanation */}
          <div>
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-1.5">
              {lang === 'mm' 
                ? (result.isSafe ? 'အဘယ်ကြောင့် လုံခြုံသနည်း' : 'အဘယ်ကြောင့် အန္တရာယ်ရှိသနည်း') 
                : `Why this is ${result.isSafe ? 'safe' : 'dangerous'}`
              }
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">{result.explanation}</p>
          </div>

          {/* Indicators */}
          {result.indicators?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-400 mb-1.5">🚩 {getTranslation(lang, 'indicators')}</h4>
              <div className="space-y-1.5">
                {result.indicators.map((indicator, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-red-500 flex-shrink-0 mt-0.5">•</span>
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended Actions */}
          {result.recommendedActions?.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-400 mb-1.5">✅ {getTranslation(lang, 'actions')}</h4>
              <div className="space-y-1.5">
                {result.recommendedActions.map((action, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Severity Breakdown */}
          {result.severityBreakdown && (
            <div>
              <h4 className="text-xs font-bold uppercase text-gray-400 mb-1.5">📊 {lang === 'mm' ? 'အသေးစိတ် ဆန်းစစ်ချက်' : 'Severity Breakdown'}</h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(result.severityBreakdown).map(([key, value]) => {
                  const sevColor = value === 'High' || value === 'Immediate' ? '#ef4444' : value === 'Medium' || value === 'Moderate' ? '#f59e0b' : '#6b7280';
                  return (
                    <div key={key} className="text-center bg-gray-50 rounded-lg py-2 px-1">
                      <p className="text-[10px] uppercase text-gray-400">
                        {getTranslation(lang, key)}
                      </p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: sevColor }}>
                        {translateSeverityValue(value)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-5">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
            style={{ backgroundColor: colors.text }}
          >
            {result.isSafe 
              ? (lang === 'mm' ? 'နားလည်ပါပြီ — ဘေးကင်းစွာ ဆက်သွားမည်' : 'Got it — Continue Safely') 
              : (lang === 'mm' ? 'နားလည်ပါပြီ — ဂရုစိုက်ပါမည်' : 'I Understand — Stay Safe')
            }
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-2">
            {lang === 'mm' ? 'မိုင်ရာ AI က စိစစ်တင်ပြသည် • Gemini စနစ်သုံး' : 'Analysis by Mira AI • Gemini Vision'}
          </p>
        </div>
      </div>
    </div>
  );
}
