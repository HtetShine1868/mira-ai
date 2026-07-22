import { useState, useCallback } from 'react';
import { captureFullScreen } from '../utils/capture';
import { analyzeScreen } from '../services/api';
import { getErrorDisplay } from '../utils/errors';

const setWidgetVisibility = (visible) => {
  const widget = document.querySelector('[data-mira-widget]');
  if (widget) {
    widget.style.visibility = visible ? 'visible' : 'hidden';
  }
};

export const useMira = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const scanScreen = useCallback(async () => {
    setIsLoading(true);
    setLoadingStep('capture');
    setError(null);
    setResult(null);

    try {
      setWidgetVisibility(false);

      const base64Image = await captureFullScreen();

      setLoadingStep('analyze');
      setWidgetVisibility(true);

      const data = await analyzeScreen(base64Image);
      setResult(data);
    } catch (err) {
      setError(getErrorDisplay(err));
    } finally {
      setWidgetVisibility(true);
      setIsLoading(false);
      setLoadingStep(null);
    }
  }, []);

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
