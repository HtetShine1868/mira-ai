import { createAppError, ERROR_CODES } from '../utils/errors';
import { normalizeAnalysisResult } from '../utils/validateResult';

const API_URL = import.meta.env.VITE_API_URL || '/api/analyze';
const REQUEST_TIMEOUT_MS = 15000;

const parseErrorBody = async (response) => {
  try {
    const body = await response.json();
    return body?.error || body?.message || null;
  } catch {
    return null;
  }
};

/**
 * Sends the Base64 image to the backend for analysis.
 * @param {string} imageBase64
 * @returns {Promise<{ risk: number, summary: string|null, threats: string[], recommendation: string|null, scannedAt: string }>}
 */
export const analyzeScreen = async (imageBase64) => {
  if (!navigator.onLine) {
    throw createAppError(
      ERROR_CODES.NETWORK_OFFLINE,
      'Internet lost. Please check your connection.'
    );
  }

  if (!imageBase64 || typeof imageBase64 !== 'string') {
    throw createAppError(
      ERROR_CODES.API_CLIENT_ERROR,
      'No image was captured to analyze.'
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageBase64 }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const serverMessage = await parseErrorBody(response);

      if (response.status >= 500) {
        throw createAppError(
          ERROR_CODES.API_SERVER_ERROR,
          serverMessage || 'Backend is unavailable. Please try again later.'
        );
      }

      throw createAppError(
        ERROR_CODES.API_CLIENT_ERROR,
        serverMessage || 'Invalid image or bad request.'
      );
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw createAppError(
        ERROR_CODES.API_INVALID_RESPONSE,
        'Server returned a response that is not valid JSON.'
      );
    }

    return normalizeAnalysisResult(data);
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.code) {
      throw error;
    }

    if (error.name === 'AbortError') {
      throw createAppError(
        ERROR_CODES.API_TIMEOUT,
        'AI timeout. The server took too long to respond.'
      );
    }

    if (error instanceof TypeError) {
      throw createAppError(
        ERROR_CODES.NETWORK_FAILED,
        'Could not reach the server. Check your connection or API URL.'
      );
    }

    throw createAppError(
      ERROR_CODES.UNKNOWN,
      error.message || 'An unexpected error occurred.'
    );
  }
};
