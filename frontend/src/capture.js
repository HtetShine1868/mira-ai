import { createAppError, ERROR_CODES } from './errors';

/**
 * Captures the full laptop screen via the Screen Capture API.
 * The user must choose "Entire screen" in the browser picker.
 * @returns {Promise<string>} Base64 encoded PNG image.
 */
export const captureFullScreen = async () => {
  if (!navigator.mediaDevices?.getDisplayMedia) {
    throw createAppError(
      ERROR_CODES.CAPTURE_UNSUPPORTED,
      'Screen capture is not supported in this browser.'
    );
  }

  let stream;
  try {
    stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: 'monitor',
        width: { ideal: 3840 },
        height: { ideal: 2160 },
      },
      audio: false,
      preferCurrentTab: false,
    });
  } catch (err) {
    if (err.name === 'NotAllowedError') {
      throw createAppError(
        ERROR_CODES.CAPTURE_CANCELLED,
        'Screen capture was cancelled or denied.'
      );
    }
    throw createAppError(
      ERROR_CODES.CAPTURE_FAILED,
      'Failed to start screen capture: ' + err.message
    );
  }

  const video = document.createElement('video');
  video.srcObject = stream;
  video.muted = true;

  try {
    await video.play();
    await new Promise((resolve) => {
      if (video.readyState >= 2) {
        resolve();
      } else {
        video.onloadeddata = resolve;
      }
    });

    if (!video.videoWidth || !video.videoHeight) {
      throw createAppError(
        ERROR_CODES.CAPTURE_FAILED,
        'Could not read screen dimensions from the capture.'
      );
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);

    const base64Image = canvas.toDataURL('image/png');

    if (!base64Image || base64Image === 'data:,') {
      throw createAppError(
        ERROR_CODES.CAPTURE_FAILED,
        'Invalid image generated from screen capture.'
      );
    }

    return base64Image;
  } catch (error) {
    if (error.code) {
      throw error;
    }
    throw createAppError(
      ERROR_CODES.CAPTURE_FAILED,
      'Failed to capture screen: ' + error.message
    );
  } finally {
    stream.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
  }
};
