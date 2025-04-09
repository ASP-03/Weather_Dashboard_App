export const WEATHER_TYPES = {
  CLEAR: 'Clear',
  CLOUDS: 'Clouds',
  RAIN: 'Rain',
  SNOW: 'Snow',
  THUNDERSTORM: 'Thunderstorm',
  MIST: 'Mist'
};

export const API_ENDPOINTS = {
  WEATHER: 'https://api.openweathermap.org/data/2.5/weather',
  FORECAST: 'https://api.openweathermap.org/data/2.5/forecast',
  GEOCODING: 'https://api.openweathermap.org/geo/1.0/direct'
};

export const BACKGROUND_STYLES = {
  [WEATHER_TYPES.CLEAR]: {
    day: {
      gradient: 'linear(to-b, blue.400, blue.200)',
      overlay: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
      image: 'https://images.unsplash.com/photo-1622278647429-71bc97e904e8?auto=format&fit=crop&w=1200&q=60',
    },
    night: {
      gradient: 'linear(to-b, gray.900, blue.900)',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
      image: 'https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=1200&q=60',
    },
  },
  [WEATHER_TYPES.CLOUDS]: {
    day: {
      gradient: 'linear(to-b, gray.400, gray.300)',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)',
      image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&w=1200&q=60',
    },
    night: {
      gradient: 'linear(to-b, gray.800, gray.700)',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)',
      image: 'https://images.unsplash.com/photo-1594156596782-656c93e4d504?auto=format&fit=crop&w=1200&q=60',
    },
  },
  [WEATHER_TYPES.RAIN]: {
    day: {
      gradient: 'linear(to-b, gray.600, blue.600)',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%)',
      image: 'https://images.unsplash.com/photo-1428592953211-077101b2021b?auto=format&fit=crop&w=1200&q=80',
    },
    night: {
      gradient: 'linear(to-b, gray.900, blue.900)',
      overlay: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
      image: 'https://images.unsplash.com/photo-1501691223387-dd0500403074?auto=format&fit=crop&w=1200&q=80',
    },
  },
  default: {
    day: {
      gradient: 'linear(to-b, blue.400, blue.200)',
      overlay: 'none',
      image: 'https://images.unsplash.com/photo-1598717123623-994ab270a08e?auto=format&fit=crop&w=1200&q=60',
    },
    night: {
      gradient: 'linear(to-b, gray.800, gray.700)',
      overlay: 'none',
      image: 'https://images.unsplash.com/photo-1532978379173-523e16f371f9?auto=format&fit=crop&w=1200&q=60',
    },
  },
};

export const ERROR_MESSAGES = {
  API_KEY_MISSING: 'Weather API key is missing. Please check your environment variables.',
  NETWORK_ERROR: 'Unable to fetch weather data. Please check your internet connection.',
  LOCATION_ERROR: 'Unable to get your location. Please enable location services or search manually.',
  CITY_NOT_FOUND: 'City not found. Please try another search term.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
};

export const RETRY_CONFIG = {
  maxRetries: 3,
  retryDelay: 1000, // milliseconds
  backoffFactor: 2,
}; 