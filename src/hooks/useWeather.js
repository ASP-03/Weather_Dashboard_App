import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast } from '../services/weatherService';

const MAX_HISTORY = 5;

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState('');
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const addToHistory = (city) => {
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== city.toLowerCase());
      return [city, ...filtered].slice(0, MAX_HISTORY);
    });
  };

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      setCurrentCity(city);
      addToHistory(city);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    forecast,
    loading,
    error,
    searchHistory,
    currentCity,
    fetchWeather
  };
}; 