import { useState, useEffect } from 'react';
import { ERROR_MESSAGES } from '../config/weatherConfig';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError(ERROR_MESSAGES.LOCATION_ERROR);
      setLoading(false);
      return;
    }

    const successHandler = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setLoading(false);
    };

    const errorHandler = (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError(ERROR_MESSAGES.LOCATION_ERROR);
          break;
        case error.POSITION_UNAVAILABLE:
          setError('Location information is unavailable.');
          break;
        case error.TIMEOUT:
          setError('Location request timed out.');
          break;
        default:
          setError(ERROR_MESSAGES.LOCATION_ERROR);
      }
      setLoading(false);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, options);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return { location, error, loading };
}; 