import {useContext} from "react";
import moviesApiContext from "../contexts/MoviesApiContext";

export default function useMoviesApi() {
  return useContext(moviesApiContext);
}