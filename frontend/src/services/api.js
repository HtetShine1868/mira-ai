import { createAppError, ERROR_CODES } from '../utils/errors';
import { normalizeAnalysisResult } from '../utils/validateResult';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/analyze';
const REQUEST_TIMEOUT_MS = 20000;

/**
 * Sends a screenshot blob to the backend for cybersecurity analysis.
 * @param {Blob} imageBlob - The captured screenshot as a PNG blob
 * @returns {Promise<Object>} Normalized analysis result
 */
export const analyzeScreenshot = async (imageBlob, appId, lang) => {
  if (!navigator.onLine) {
    throw createAppError(
      ERROR_CODES.NETWORK_OFFLINE,
      'No internet connection. Please check your network.'
    );
  }

  if (!imageBlob || !(imageBlob instanceof Blob)) {
    throw createAppError(
      ERROR_CODES.API_CLIENT_ERROR,
      'No screenshot was captured to analyze.'
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    // Send as multipart form-data (backend expects multer file upload)
    const formData = new FormData();
    // CRITICAL: Text fields must be appended BEFORE files for Multer to read them into req.body!
    if (appId) {
      formData.append('appId', appId);
    }
    if (lang) {
      formData.append('lang', lang);
    }
    formData.append('image', imageBlob, 'screenshot.png');

    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let serverMessage = null;
      try {
        const body = await response.json();
        serverMessage = body?.error || body?.message || null;
      } catch { /* ignore parse errors */ }

      if (response.status >= 500) {
        throw createAppError(
          ERROR_CODES.API_SERVER_ERROR,
          serverMessage || 'Backend server error. Please try again later.'
        );
      }

      throw createAppError(
        ERROR_CODES.API_CLIENT_ERROR,
        serverMessage || 'Invalid request. Please try again.'
      );
    }

    let data;
    try {
      data = await response.json();
    } catch {
      throw createAppError(
        ERROR_CODES.API_INVALID_RESPONSE,
        'Server returned invalid JSON.'
      );
    }

    return normalizeAnalysisResult(data);
  } catch (error) {
    clearTimeout(timeoutId);

    // Re-throw our custom errors
    if (error.code) throw error;

    if (error.name === 'AbortError') {
      throw createAppError(
        ERROR_CODES.API_TIMEOUT,
        'Analysis timed out. The server took too long to respond.'
      );
    }

    if (error instanceof TypeError) {
      throw createAppError(
        ERROR_CODES.NETWORK_FAILED,
        'Could not reach the backend server. Make sure it is running on port 5000.'
      );
    }

    throw createAppError(
      ERROR_CODES.UNKNOWN,
      error.message || 'An unexpected error occurred.'
    );
  }
};
