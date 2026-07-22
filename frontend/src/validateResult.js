import { createAppError, ERROR_CODES } from './errors';

/**
 * Normalizes and validates the API analysis payload.
 * Accepts common field aliases (riskScore, score, message, advice).
 */
export const normalizeAnalysisResult = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw createAppError(
      ERROR_CODES.API_INVALID_RESPONSE,
      'Server returned an invalid response.'
    );
  }

  const rawRisk = data.risk ?? data.riskScore ?? data.score;

  if (rawRisk === undefined || rawRisk === null || rawRisk === '') {
    throw createAppError(
      ERROR_CODES.API_INVALID_RESPONSE,
      'Server response is missing a risk score.'
    );
  }

  const risk = Number(rawRisk);

  if (Number.isNaN(risk)) {
    throw createAppError(
      ERROR_CODES.API_INVALID_RESPONSE,
      'Server returned a non-numeric risk score.'
    );
  }

  const threats = Array.isArray(data.threats)
    ? data.threats.filter(Boolean).map(String)
    : Array.isArray(data.issues)
      ? data.issues.filter(Boolean).map(String)
      : [];

  return {
    risk: Math.min(100, Math.max(0, Math.round(risk))),
    summary: data.summary || data.message || data.description || null,
    threats,
    recommendation: data.recommendation || data.advice || data.action || null,
    scannedAt: new Date().toISOString(),
  };
};
