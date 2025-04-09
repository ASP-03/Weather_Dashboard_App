import { useState, useCallback } from 'react';
import axios from 'axios';
import { RETRY_CONFIG, ERROR_MESSAGES } from '../config/weatherConfig';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithRetry = useCallback(async (url, options = {}, retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios(url, options);
      return response.data;
    } catch (err) {
      if (retryCount < RETRY_CONFIG.maxRetries) {
        const delay = RETRY_CONFIG.retryDelay * Math.pow(RETRY_CONFIG.backoffFactor, retryCount);
        await sleep(delay);
        return fetchWithRetry(url, options, retryCount + 1);
      }
      
      let errorMessage = ERROR_MESSAGES.GENERIC_ERROR;
      
      if (err.response) {
        switch (err.response.status) {
          case 401:
            errorMessage = ERROR_MESSAGES.API_KEY_MISSING;
            break;
          case 404:
            errorMessage = ERROR_MESSAGES.CITY_NOT_FOUND;
            break;
          default:
            errorMessage = ERROR_MESSAGES.GENERIC_ERROR;
        }
      } else if (err.request) {
        errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    fetchWithRetry
  };
}; 