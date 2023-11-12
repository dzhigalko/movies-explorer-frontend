import { useEffect, useState } from 'react';

import Container from '../Container';
import Card from '../Card';
import SeachForm from '../SearchForm';
import useMainApi from '../../../hooks/useMainApi';
import Preloader from '../../Preloader';
import { SHORT_MOVIE_TIME } from '../../../utils/constants';

export default function Saved() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [searchError, setSearchError] = useState('')
  const [filterState, setFilterState] = useState({searchFilter: '', shortsFilter: false})
  const [isLoading, setIsLoading] = useState(false)
  const {mainApi} = useMainApi()

  useEffect(() => {
    setIsLoading(true)

    mainApi.getFavoriteMovies()
      .then((movies) => {
        setMovies(movies.map((m) => {
          return {...m, isShort: m.duration <= SHORT_MOVIE_TIME}
        }))
      })
      .catch((error) => {
        setSearchError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    const filtered = movies
      .map((m) => {
        if (filterState.searchFilter) {
          const nameRuIncludes = m.nameRU.toLowerCase().includes(filterState.searchFilter.toLowerCase())
          const nameEnIncludes = m.nameEN.toLowerCase().includes(filterState.searchFilter.toLowerCase())

          m.filteredBy = nameRuIncludes ? m.nameRU.toLowerCase().indexOf(filterState.searchFilter.toLowerCase()) : (nameEnIncludes ? m.nameEN.toLowerCase().indexOf(filterState.searchFilter.toLowerCase()) : null)
        }

        return m
      })
      .filter((m) => {
        return (!filterState.searchFilter || (filterState.searchFilter && m.filteredBy !== null)) && (!filterState.shortsFilter || (filterState.shortsFilter && m.isShort))
      })
      .sort((a, b) => {
        if (!filterState.searchFilter) return a.nameRU >= b.nameRU ? -1 : 1

        if (a.filteredBy < b.filteredBy) return -1
        else if (a.filteredBy > b.filteredBy) return 1
        return 0
      })

      setFilteredMovies(filtered)

      if (filtered.length === 0) {
        setSearchError('Ничего не найдено')
      } else {
        setSearchError('')
      }
  }, [movies, filterState])

  const handleSearchFormSubmit = (searchFilter, shortsFilter) => {
    setFilterState({...filterState, searchFilter: searchFilter, shortsFilter: shortsFilter})
  }

  const handleDislikeButtonClick = (movie) => {
    mainApi.dislikeMovie(movie._id)
      .then(() => {
        setMovies(movies.filter((m) => m._id !== movie._id))
      })
      .catch((error) => {
        console.log("Ошибка запроса лайка карточки")
      })
  }

  return (
    <>
      <SeachForm handleSubmit={handleSearchFormSubmit} seachFilterDefaultValue={filterState.searchFilter} shortsFilterDefaultValue={filterState.shortsFilter}/>
      {isLoading ? <Preloader/> : 
      (searchError ? <div className="movies__list__error">{searchError}</div> :
        <Container>
          {filteredMovies.map((m, i) => {
            return <Card
              key={m._id}
              image={m.thumbnail}
              name={m.nameRU}
              duration={m.duration}
              trailerLink={m.trailerLink}
              handleLikeButtonClick={() => handleDislikeButtonClick(m)}
              showDislike/>
          })}
        </Container>
      )}
    </>
  )
} 