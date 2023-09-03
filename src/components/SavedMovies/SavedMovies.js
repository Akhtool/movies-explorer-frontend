import { useCallback, useContext, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import auth from '../../utils/MainApi';
import { Context } from '../../context/Context';

// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и
// их количеством.
// MoviesCard — компонент одной карточки фильма.
const SavedMovies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  const [isShort, setIsShort] = useState(false);
  const { savedMovies } = useContext(Context);
  const [cards, setCards] = useState([])

  const handleSearchMovies = (e) => {
    setError('')
    setSearchValue(e.target.value);
  }

  const getIsShort = (e) => {
    const isChecked = e.target.checked;

    setIsShort(isChecked);
    localStorage.setItem('isSavedMoviesShortChecked', JSON.stringify(isChecked));

    if (e.target.checked) {
      savedMovies.setSavedMovies(savedMovies.savedMovies.filter((movie) => {
        return movie.duration <= 40
      }))
    } else {
      savedMovies.setSavedMovies(cards)
    }
  }

  const handleValidateMovieSearch = () => {
    if (!searchValue.length > 0) {
      setError('Нужно ввести ключевое слово.')
      return;
    }
  }

  const handleSearchClick = (e) => {
    handleValidateMovieSearch()

    e.preventDefault()
    setIsLoading(true);

    auth.getSavedMovies()
      .then((res) => {
        savedMovies.setSavedMovies(res.filter((movie) => {
          return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
        }));

        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err);
      })

    setIsLoading(false);
  }

  useEffect(() => {
    auth.getSavedMovies().then((res) => {
      if (res) {
        setIsLoading(false);
        savedMovies.setSavedMovies(res);
        setCards(res);
      }
    }).catch((err) => {
      setError(err);
    })
  }, [])

  useEffect(() => {
    setError('')
    let storedIsShort = JSON.parse(localStorage.getItem('isSavedMoviesShortChecked'));
    if (storedIsShort !== null) {
      setIsShort(storedIsShort);
    }
  }, []);


  return (
    <main>
      <SearchForm isShort={isShort} getIsShort={getIsShort} value={searchValue} handleChangeSearchValue={handleSearchMovies} handleSearchClick={handleSearchClick} error={error} />
      {isLoadind ? <Preloader /> : <MoviesCardList isSaved={true} error={error} cards={savedMovies.savedMovies} />}
    </main>
  );
};

export default SavedMovies;
