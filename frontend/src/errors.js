export const ERROR_CODES = {
  CAPTURE_CANCELLED: 'CAPTURE_CANCELLED',
  CAPTURE_UNSUPPORTED: 'CAPTURE_UNSUPPORTED',
  CAPTURE_FAILED: 'CAPTURE_FAILED',
  NETWORK_OFFLINE: 'NETWORK_OFFLINE',
  NETWORK_FAILED: 'NETWORK_FAILED',
  API_TIMEOUT: 'API_TIMEOUT',
  API_SERVER_ERROR: 'API_SERVER_ERROR',
  API_CLIENT_ERROR: 'API_CLIENT_ERROR',
  API_INVALID_RESPONSE: 'API_INVALID_RESPONSE',
  UNKNOWN: 'UNKNOWN',
};

export const createAppError = (code, message, details = null) => {
  const error = new Error(message);
  error.code = code;
  error.details = details;
  return error;
};

export const getErrorDisplay = (error) => {
  const code = error?.code || ERROR_CODES.UNKNOWN;
  const message = error?.message || 'Something went wrong. Please try again.';

  const titles = {
    [ERROR_CODES.CAPTURE_CANCELLED]: 'Screen capture cancelled',
    [ERROR_CODES.CAPTURE_UNSUPPORTED]: 'Capture not supported',
    [ERROR_CODES.CAPTURE_FAILED]: 'Capture failed',
    [ERROR_CODES.NETWORK_OFFLINE]: 'No internet connection',
    [ERROR_CODES.NETWORK_FAILED]: 'Connection failed',
    [ERROR_CODES.API_TIMEOUT]: 'Request timed out',
    [ERROR_CODES.API_SERVER_ERROR]: 'Server unavailable',
    [ERROR_CODES.API_CLIENT_ERROR]: 'Request rejected',
    [ERROR_CODES.API_INVALID_RESPONSE]: 'Invalid server response',
    [ERROR_CODES.UNKNOWN]: 'Unexpected error',
  };

  const hints = {
    [ERROR_CODES.CAPTURE_CANCELLED]: 'Select "Entire screen" in the browser prompt to scan.',
    [ERROR_CODES.CAPTURE_UNSUPPORTED]: 'Use Chrome, Edge, or Firefox on localhost or HTTPS.',
    [ERROR_CODES.CAPTURE_FAILED]: 'Try scanning again or refresh the page.',
    [ERROR_CODES.NETWORK_OFFLINE]: 'Check your Wi‑Fi or mobile data, then try again.',
    [ERROR_CODES.NETWORK_FAILED]: 'Ensure the API server is running and reachable.',
    [ERROR_CODES.API_TIMEOUT]: 'The analysis took too long. Try again in a moment.',
    [ERROR_CODES.API_SERVER_ERROR]: 'The backend may be down. Try again later.',
    [ERROR_CODES.API_CLIENT_ERROR]: 'The image may be invalid or the request was malformed.',
    [ERROR_CODES.API_INVALID_RESPONSE]: 'The server returned data in an unexpected format.',
    [ERROR_CODES.UNKNOWN]: 'If this keeps happening, contact support.',
  };

  return {
    code,
    title: titles[code] || titles[ERROR_CODES.UNKNOWN],
    message,
    hint: hints[code] || hints[ERROR_CODES.UNKNOWN],
    retryable: code !== ERROR_CODES.CAPTURE_UNSUPPORTED,
  };
};
