import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);


  //get from local storage
  useEffect(() => {
    const storeFavs = localStorage.getItem("favorites");
    if (storeFavs) setFavorites(JSON.parse(storeFavs));
  setLoaded(true);
    
  }, []);

  //save to local storage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("favorites", JSON.stringify(favorites));
    console.log('2');
    
  }, [favorites,loaded]);

  const addToFavorites = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };


  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
