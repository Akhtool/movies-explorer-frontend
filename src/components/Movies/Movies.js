import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { moviesApi } from '../../utils/MoviesApi';
import { useResize } from '../../hooks/useResize';
// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
// SearchForm — форма поиска, куда пользователь будет вводить запрос. Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.
const Movies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [updateCards, setUpdateCards] = useState([])
  const [searchValue, setSearchValue] = useState('');
  const [moviesAmount, setMoviesAmount] = useState(12);
  const [error, setError] = useState('');
  const [emptySearchMessage, setEmptySearchMessage] = useState('');
  const [isShort, setIsShort] = useState(false);

  const resize = useResize();

  const handleSearchMovies = (e) => {
    setError('')
    setSearchValue(e.target.value);
    localStorage.setItem('searchValue', e.target.value);
  }


  const filterMovies = (movies, query) => {
    let filteredMovies = movies;

    if (isShort) {
      filteredMovies = movies.filter(movie => {
        return movie.duration <= 40 && (movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase()));
      })
    }

    return filteredMovies.filter((movie) => {
      return movie.nameRU.toLowerCase().includes(query.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(query.toLowerCase())
    });
  }

  useEffect(() => {
    setIsShort(JSON.parse(localStorage.getItem('isShortChecked')) || false);

    if (localStorage.getItem('movies')) {
      const filterMoviesInStorage = filterMovies(JSON.parse(localStorage.getItem('movies')), localStorage.getItem('searchValue'));

      setMoviesAmount(Math.min(12, filterMovies.length));
      setCards(filterMoviesInStorage.slice(0, resize.mobile ? 5 : 12))
      setUpdateCards(filterMoviesInStorage.slice(12, filterMoviesInStorage.length));
      setSearchValue(localStorage.getItem('searchValue'));
    }
    setError('')
    if (searchValue.length < 1 && cards.length < 1) {
      setEmptySearchMessage('Нужно ввести ключевое слово');
    }

  }, [isShort])

  const getIsShort = (e) => {
    const isChecked = e.target.checked;

    setIsShort(isChecked);
    localStorage.setItem('isShortChecked', JSON.stringify(isChecked));

    if (isChecked) {
      setCards(updateCards.filter((movie) => {
        return movie.duration <= 40 && (movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase()));
      }));
    } else {
      setCards(updateCards.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase());
      }));
    }
  }

  const handleGetMore = () => {
    if (resize.mobile || resize.noteBook) {
      setMoviesAmount((prev) => prev + 2);
      setCards([...cards, ...updateCards.slice(moviesAmount, moviesAmount + 2)])
      return;
    } else {
      setMoviesAmount((prev) => prev + 3);
      setCards([...cards, ...updateCards.slice(moviesAmount, moviesAmount + 3)])
      return;
    }
  }

  const handleValidateMovieSearch = () => {
    if (!searchValue.length > 0) {
      setError('Нужно ввести ключевое слово.')
      return;
    }
  }

  const searchMovies = () => {
    setIsLoading(true);
    return moviesApi.getMovies()
      .then((res) => {

        localStorage.setItem('movies', JSON.stringify(res));
        const filteredMovies = filterMovies(res, searchValue);
        setMoviesAmount(Math.min(12, filteredMovies.length));
        setUpdateCards(filteredMovies.slice(12, res.length)); // Сохраняем список отфильтрованных карточек
        setCards(filteredMovies.slice(0, moviesAmount)); // Показываем только первые 'moviesAmount' карточек
        return filteredMovies;
      })
      .catch((err) => {
        setError(err);
        return [];
      })
      .finally(() => {
        setIsLoading(false);
      });
  }



  const handleSearchClick = (e) => {
    e.preventDefault();

    handleValidateMovieSearch()

    if (!searchValue) {
      setEmptySearchMessage('Нужно ввести ключевое слово');
      return;
    }

    const currentCards = JSON.parse(localStorage.getItem('movies'));

    if (currentCards && currentCards.length > 0) {
      const filteredMovies = filterMovies(currentCards, searchValue);

      if (filteredMovies.length < 1) {
        setEmptySearchMessage('Ничего не найдено')
      }

      setMoviesAmount(Math.min(12, filteredMovies.length));

      setCards(filteredMovies.slice(0, Math.min(12, filteredMovies.length)));
      setUpdateCards(filteredMovies.slice(12, filteredMovies.length));
    } else {
      searchMovies();
    }

  }

  return (
    <main>
      <SearchForm isShort={isShort} getIsShort={getIsShort} value={searchValue} handleChangeSearchValue={handleSearchMovies} handleSearchClick={handleSearchClick} emptySearchMessage={emptySearchMessage} error={error} />
      {isLoadind ? <Preloader /> : <MoviesCardList updateCards={updateCards} error={error} cards={cards} isSaved={false} handleGetMore={handleGetMore} emptySearchMessage={emptySearchMessage} isShowMoreButtonVisible={cards.length !== updateCards.length && !!updateCards.length} />}
    </main>
  );
};

export default Movies;
