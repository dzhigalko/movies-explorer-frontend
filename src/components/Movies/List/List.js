import { useEffect, useState } from 'react';

import Container from '../Container';
import Card from '../Card';
import SeachForm from '../SearchForm';
import usePageWidth from '../../../hooks/usePageWidth';
import { PAGE_WIDTH_CARDS, PAGE_WIDTH_MORE_CARDS_COUNT } from '../../../utils/constants';
import useMoviesApi from '../../../hooks/useMoviesApi';
import useSavedData from '../../../hooks/useSavedData';
import Preloader from '../../Preloader';
import useMainApi from '../../../hooks/useMainApi';
import './List.css';
import '../../../utils/utils.css';

export default function List() {
  const { savedMoviesSearch, saveMoviesSearch } = useSavedData()
  const { pageWidth: [pageWidthId, pageWidth] } = usePageWidth();
  const { moviesApi } = useMoviesApi();
  const { mainApi } = useMainApi()
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState(savedMoviesSearch.filteredMovies)
  const [cards, setCards] = useState([]);
  const [hasMore, setHasMore] = useState(false)
  const [moreCardsCount, setMoreCardsCount] = useState(PAGE_WIDTH_MORE_CARDS_COUNT.lg)
  const [filterState, setFilterState] = useState({searchFilter: savedMoviesSearch.searchFilter, shortsFilter: savedMoviesSearch.shortsFilter})
  const [searchError, setSearchError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const showedCards = filteredMovies.slice(0, PAGE_WIDTH_CARDS[pageWidthId])
    setCards(showedCards)
    setMoreCardsCount(PAGE_WIDTH_MORE_CARDS_COUNT[pageWidthId])
    setHasMore(showedCards.length < filteredMovies.length)
  }, [filteredMovies, pageWidthId, pageWidth])

  const handleFilterChange = (searchFilter, shortsFilter) => {
    setFilterState({...filterState, searchFilter: searchFilter, shortsFilter: shortsFilter})
  }

  const handleMoreClick = () => {
    if (!hasMore) return

    const cardsCount = cards.length + moreCardsCount
    const showedCards = filteredMovies.slice(0, cardsCount)
    setCards(showedCards)
    setHasMore(cardsCount < filteredMovies.length)
  }

  useEffect(() => {
    if (!filterState.searchFilter) {
      setFilteredMovies([])
      return
    }

    setIsLoading(true)
    let getMovies = Promise.resolve(movies)

    if (movies.length === 0) {      
      getMovies = Promise.all([moviesApi.getMovies(), mainApi.getFavoriteMovies()])
        .then(([movies, favoriteMovies]) => {
          const favoriteMoviesIds = new Map(favoriteMovies.map((m) => [m.movieId, m._id]))
          const moviesModified = movies.map((m) => {
            return {
              ...m,
              isLiked: favoriteMoviesIds.has(m.id),
              isShort: m.duration <= 40,
              favoriteId: favoriteMoviesIds.get(m.id)
            }
          })

          setMovies(moviesModified)
          return moviesModified
        })
    }

    getMovies
      .then((movies) => {
        const filtered = movies
          .map((m) => {
            const nameRuIncludes = m.nameRU.toLowerCase().includes(filterState.searchFilter.toLowerCase())
            const nameEnIncludes = m.nameEN.toLowerCase().includes(filterState.searchFilter.toLowerCase())

            m.filteredBy = nameRuIncludes ? m.nameRU.toLowerCase().indexOf(filterState.searchFilter.toLowerCase()) : (nameEnIncludes ? m.nameEN.toLowerCase().indexOf(filterState.searchFilter.toLowerCase()) : null)
            return m
          })
          .filter((m) => {
            return m.filteredBy !== null && (!filterState.shortsFilter || (filterState.shortsFilter && m.isShort))
          })
          .sort((a, b) => {
            if (a.filteredBy < b.filteredBy) return -1
            else if (a.filteredBy > b.filteredBy) return 1
            return 0
          })

        setFilteredMovies(filtered)
        saveMoviesSearch(filterState.searchFilter, filterState.shortsFilter, filtered)

        if (filtered.length === 0) {
          setSearchError('Ничего не найдено')
        } else {
          setSearchError('')
        }
      }).catch((error) => {
        setSearchError("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.")
        console.log(error)
      }).finally(() => {
        setIsLoading(false)
      })
  }, [filterState])

  const handleLike = (m) => {
    const isLiked = !m.isLiked
    let makeRequest = () => mainApi.likeMovie(
      m,
      moviesApi.normalizeAssetUrl(m.image.url),
      moviesApi.normalizeAssetUrl(m.image.formats.thumbnail.url)
    )

    if (!isLiked) {
      makeRequest = () => mainApi.dislikeMovie(m.favoriteId)
    }

    makeRequest().then((response) => {
      setMovies(movies.map((c) => {
        return { ...c, isLiked: c.id === m.id ? isLiked : c.isLiked, favoriteId: c.id === m.id ? response._id : c.favoriteId }
      }))

      // update cards inplace
      m.isLiked = isLiked
      m.favoriteId = response._id
    }).catch((error) => {
      console.log("Ошибка запроса лайка карточки")
    })
  }

  return (
    <>
      <SeachForm handleFilterChange={handleFilterChange} seachFilterDefaultValue={filterState.searchFilter} shortsFilterDefaultValue={filterState.shortsFilter}/>
      {isLoading ? <Preloader/> : (
          searchError ? <div className="movies__list__error">{searchError}</div> :
          <>
            <Container>
              {cards.map((m, i) => {
                return <Card 
                  key={i}
                  image={moviesApi.normalizeAssetUrl(m.image.formats.thumbnail.url)}
                  name={m.nameRU}
                  duration={m.duration}
                  alt={m.image.alternativeText}
                  trailerLink={m.trailerLink}
                  isLiked={m.isLiked}
                  handleLikeButtonClick={() => handleLike(m)}
                  showLike
                />
              })}
            </Container>
            {hasMore && <section className="more">
              <button className="more__button link-style" onClick={handleMoreClick}>Ещё</button>
            </section>}
          </>
        )
      }
    </>
  )
} 