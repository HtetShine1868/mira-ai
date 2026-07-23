// ─── Analysis Types ───────────────────────────────────────────────────────────
// Type definitions for the cybersecurity analysis result.

/**
 * @typedef {Object} SeverityBreakdown
 * @property {'Immediate'|'High'|'Moderate'|'Low'|'None'} urgency
 * @property {'High'|'Medium'|'Low'|'None'} dataRisk
 * @property {'High'|'Medium'|'Low'|'None'} financialRisk
 */

/**
 * @typedef {Object} AnalysisResult
 * @property {boolean} isSafe
 * @property {'Critical'|'High'|'Medium'|'Low'|'Safe'} riskLevel
 * @property {number} confidenceScore
 * @property {string} attackType
 * @property {string[]} indicators
 * @property {string} explanation
 * @property {string[]} recommendedActions
 * @property {string[]} affectedElements
 * @property {SeverityBreakdown} severityBreakdown
 * @property {string} [scenarioType]
 * @property {string} [miraMessage]
 */

export const RISK_COLORS = {
  Critical: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', badge: '#991b1b' },
  High:     { bg: '#fff7ed', border: '#fed7aa', text: '#ea580c', badge: '#9a3412' },
  Medium:   { bg: '#fffbeb', border: '#fde68a', text: '#d97706', badge: '#92400e' },
  Low:      { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', badge: '#166534' },
  Safe:     { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a', badge: '#166534' },
};
