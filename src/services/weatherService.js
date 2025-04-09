import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Validate API key
const validateApiKey = () => {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error('OpenWeatherMap API key is not configured. Please add your API key to the .env file.');
  }
};

export const getCurrentWeather = async (city) => {
  validateApiKey();
  
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
    } else if (error.response?.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    } else {
      throw new Error(error.response?.data?.message || 'Failed to fetch weather data');
    }
  }
};

export const getForecast = async (city) => {
  validateApiKey();
  
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
    } else if (error.response?.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    } else {
      throw new Error(error.response?.data?.message || 'Failed to fetch forecast data');
    }
  }
}; 