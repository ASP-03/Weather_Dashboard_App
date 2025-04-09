import { useState, useEffect } from 'react';

const STORAGE_KEY = 'weather_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (location) => {
    if (!favorites.some(fav => fav.id === location.id)) {
      setFavorites(prev => [...prev, location]);
    }
  };

  const removeFavorite = (locationId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== locationId));
  };

  const isFavorite = (locationId) => {
    return favorites.some(fav => fav.id === locationId);
  };

  const toggleFavorite = (location) => {
    if (isFavorite(location.id)) {
      removeFavorite(location.id);
    } else {
      addFavorite(location);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };
}; 