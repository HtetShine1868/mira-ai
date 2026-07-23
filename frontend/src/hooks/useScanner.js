import { useState, useCallback } from 'react';
import { captureDeviceScreen } from '../utils/capture';
import { analyzeScreenshot } from '../services/api';
import { getErrorDisplay } from '../utils/errors';

/**
 * useScanner – Custom hook for the Mira scan workflow.
 * Handles: capture device screen → send to backend → parse result.
 */
export const useScanner = (appId, lang) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(null); // 'capture' | 'analyze'
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const scanScreen = useCallback(async () => {
    setIsLoading(true);
    setLoadingStep('capture');
    setError(null);
    setResult(null);

    try {
      // Step 1: Capture the device frame using html2canvas
      const imageBlob = await captureDeviceScreen();

      // Step 2: Send to backend for AI analysis
      setLoadingStep('analyze');
      const analysisResult = await analyzeScreenshot(imageBlob, appId, lang);

      setResult(analysisResult);
    } catch (err) {
      setError(getErrorDisplay(err));
    } finally {
      setIsLoading(false);
      setLoadingStep(null);
    }
  }, [appId, lang]);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoadingStep(null);
  }, []);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  return {
    scanScreen,
    isLoading,
    loadingStep,
    result,
    error,
    reset,
    dismissError,
  };
};
