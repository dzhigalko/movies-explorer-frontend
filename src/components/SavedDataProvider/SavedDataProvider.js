import { useState } from "react";

import SavedDataContext from "../../contexts/SavedDataContext";

const DEFAULT_MOVIES_SEARCH = {
  searchFilter: '',
  shortsFilter: false,
  filteredMovies: []
}

export default function SavedDataProvider({children}) {
  let lsSavedMoviesSearch = localStorage.getItem('moviesSearch')
  if (lsSavedMoviesSearch !== null) {
    lsSavedMoviesSearch = JSON.parse(lsSavedMoviesSearch)
  }

  const [savedMoviesSearch, setSavedMoviesSearch] = useState(lsSavedMoviesSearch || DEFAULT_MOVIES_SEARCH)

  const saveMoviesSearch = (searchFilter, shortsFilter, filteredMovies) => {
    const data = {
      searchFilter: searchFilter,
      shortsFilter: shortsFilter,
      filteredMovies: filteredMovies
    }
    localStorage.setItem('moviesSearch', JSON.stringify(data))
    setSavedMoviesSearch(data)
  }

  const resetSavedMoviesSearch = () => {
    localStorage.removeItem('moviesSearch')
    setSavedMoviesSearch(DEFAULT_MOVIES_SEARCH)
  }

  return (
    <SavedDataContext.Provider value={{ savedMoviesSearch, saveMoviesSearch, resetSavedMoviesSearch }}>
      {children}
    </SavedDataContext.Provider>
  )
}