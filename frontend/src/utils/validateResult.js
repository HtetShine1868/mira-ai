import { createAppError, ERROR_CODES } from './errors';

/**
 * Normalizes and validates the API analysis payload.
 * Accepts common field aliases from the backend.
 */
export const normalizeAnalysisResult = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw createAppError(
      ERROR_CODES.API_INVALID_RESPONSE,
      'Server returned an invalid response.'
    );
  }

  // Support both wrapped { success, data } and raw response
  const result = data.data || data;

  return {
    isSafe: result.isSafe ?? true,
    riskLevel: result.riskLevel || 'Safe',
    confidenceScore: Number(result.confidenceScore) || 0,
    attackType: result.attackType || 'Unknown',
    indicators: Array.isArray(result.indicators) ? result.indicators : [],
    explanation: result.explanation || '',
    recommendedActions: Array.isArray(result.recommendedActions) ? result.recommendedActions : [],
    affectedElements: Array.isArray(result.affectedElements) ? result.affectedElements : [],
    severityBreakdown: result.severityBreakdown || { urgency: 'None', dataRisk: 'None', financialRisk: 'None' },
    scenarioType: result.scenarioType || (result.isSafe ? 'safe' : result.riskLevel === 'Critical' || result.riskLevel === 'High' ? 'danger' : 'warning'),
    miraMessage: result.miraMessage || '',
    scannedAt: new Date().toISOString(),
  };
};
