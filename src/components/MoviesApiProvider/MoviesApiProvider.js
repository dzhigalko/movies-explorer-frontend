import { useMemo } from "react";
import MoviesApiContext from "../../contexts/MoviesApiContext";
import MoviesApi from "../../utils/MoviesApi";

const moviesApiUrl = process.env.REACT_APP_MOVIES_API_URL || 'https://api.nomoreparties.co/';

export default function MoviesApiProvider({children}) {
  const moviesApi = useMemo(function() {
    return new MoviesApi({ baseUrl: moviesApiUrl })
  }, [])

  return (
    <MoviesApiContext.Provider value={{ moviesApi }}>
      {children}
    </MoviesApiContext.Provider>
  );
}
