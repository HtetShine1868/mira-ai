import html2canvas from 'html2canvas';
import { createAppError, ERROR_CODES } from './errors';

/**
 * Captures ONLY the simulated device area using html2canvas.
 * Looks for the element with id="device-frame" in the DOM.
 * Returns a Blob (image/png) suitable for FormData upload.
 */
export const captureDeviceScreen = async () => {
  const deviceEl = document.getElementById('device-frame');

  if (!deviceEl) {
    throw createAppError(
      ERROR_CODES.CAPTURE_FAILED,
      'Device frame not found. Please open a simulated app first.'
    );
  }

  try {
    const canvas = await html2canvas(deviceEl, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f5f3ff',
      scale: 2, // Higher quality capture
      logging: false,
      // Ignore the Mira widget overlay so it doesn't appear in the capture
      ignoreElements: (el) => el.hasAttribute('data-mira-widget'),
    });

    // Convert canvas to Blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(
              createAppError(
                ERROR_CODES.CAPTURE_FAILED,
                'Failed to convert screenshot to image data.'
              )
            );
            return;
          }
          resolve(blob);
        },
        'image/png',
        0.95
      );
    });
  } catch (error) {
    if (error.code) throw error;
    throw createAppError(
      ERROR_CODES.CAPTURE_FAILED,
      'Screenshot capture failed: ' + error.message
    );
  }
};
