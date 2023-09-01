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
  const [isShort, setIsShort] = useState(false);
  const [response, setResponse] = useState([]);

  const resize = useResize();

  const handleSearchMovies = (e) => {
    setSearchValue(e.target.value);
    localStorage.setItem('searchValue', e.target.value);
  }

  useEffect(() => {
    moviesApi.getMovies()
      .then((res) => {
        setResponse(res);
        if (!searchValue) {
          setError('Нужно ввести ключевое слово');
        }
      })
      .catch((err) => {
        setError(err);
      })

    if (localStorage.getItem('movies')) {
      setCards(JSON.parse(localStorage.getItem('movies')).slice(0, resize ? 5 : 12))
      setUpdateCards(JSON.parse(localStorage.getItem('movies')))
      setSearchValue(localStorage.getItem('searchValue'));
    }
  }, [resize])

  const getIsShort = (e) => {
    setIsShort(e.target.checked);

    if (e.target.checked) {
      setCards(updateCards.filter((movie) => {
        return movie.duration <= 40 && (movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase()))
      }))
    } else {
      setCards(updateCards.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      }))
    }
  }

  const handleGetMore = () => {
    if (resize) {
      setMoviesAmount((prev) => prev + 2);
      setCards([...cards, ...updateCards.slice(moviesAmount, moviesAmount + 2)])
      return;
    } else {
      setMoviesAmount((prev) => prev + 3);
      setCards([...cards, ...updateCards.slice(moviesAmount, moviesAmount + 3)])
      return;
    }
  }

  const handleSearchClick = (e) => {
    e.preventDefault()
    setIsLoading(true);

    // if (!searchValue) {
    //   setError('Нужно ввести ключевое слово');
    //   setIsLoading(false);
    //   return;
    // }

    if (searchValue) {
      setCards(response.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      }).slice(0, resize ? 5 : 12));

      setUpdateCards(response.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      }))

      localStorage.setItem('movies', JSON.stringify(response.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) || movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      })))
    }
    setIsLoading(false);
  }

  return (
    <main>
      <SearchForm isShort={isShort} getIsShort={getIsShort} value={searchValue} setValue={handleSearchMovies} handleSearchClick={handleSearchClick} />
      {isLoadind ? <Preloader /> : <MoviesCardList updateCards={updateCards} error={error} cards={cards} isSaved={false} handleGetMore={handleGetMore} />}
    </main>
  );
};

export default Movies;
