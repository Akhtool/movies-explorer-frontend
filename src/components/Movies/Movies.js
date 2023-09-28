import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { useEffect, useState } from "react";
import { moviesApi } from "../../utils/MoviesApi";
import { moviesFilter } from "../../utils/MoviesFilter";
// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
// SearchForm — форма поиска, куда пользователь будет вводить запрос. Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.
const Movies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [searchErrorMessage, setSearchErrorMessage] = useState("");
  const [isShort, setIsShort] = useState(false);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const getAllMovies = () => {
    setIsLoading(true);

    moviesApi
      .getMovies()
      .then((res) => {
        setAllMovies(res);
        localStorage.setItem("allMovies", JSON.stringify(res));
        return;
      })
      .catch((err) => {
        setError(err);
        return [];
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearchMovies = (e) => {
    setError("");
    setSearchValue(e.target.value);
    localStorage.setItem("userSearchValue", e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (e.target.value.length === 0) {
      setError("Нужно ввести ключевое слово");
    } else {
      setError("");
    }
    setSearchValue(e.target.value);
    if (searchValue < 1) {
      setSearchErrorMessage("Нужно ввести ключевое слово");
      return;
    }

    if (localStorage.getItem("allMovies")) {
      showMovies();
      setError("");
      return;
    }
    setError("");
    getAllMovies();
  };
  const getIsShort = (e) => {
    setIsShort(e.target.checked);
    localStorage.setItem("isShortChecked", JSON.stringify(e.target.checked));
  };

  const showMovies = () => {
    if (!isShort) {
      setFilteredMovies(
        moviesFilter.filterMoviesForName(allMovies, searchValue)
      );
    } else {
      const temp = moviesFilter.filterMoviesForName(allMovies, searchValue);
      setFilteredMovies(moviesFilter.getShortMovies(temp));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("allMovies") && allMovies.length < 1) {
      setAllMovies(JSON.parse(localStorage.getItem("allMovies")));
      return;
    }
    if (localStorage.getItem("userSearchValue")) {
      setSearchValue(localStorage.getItem("userSearchValue"));
    }
    setSearchErrorMessage("");
    showMovies();
  }, [allMovies, isShort]);

  useEffect(() => {
    setIsShort(JSON.parse(localStorage.getItem("isShortChecked")) || false);
    setSearchValue(localStorage.getItem("userSearchValue"));
  }, [searchValue]);

  return (
    <main>
      <SearchForm
        isShort={isShort}
        getIsShort={getIsShort}
        value={searchValue}
        handleChangeSearchValue={handleSearchMovies}
        handleSearchClick={handleSearchClick}
        emptySearchMessage={setSearchErrorMessage}
        error={error}
      />
      {isLoadind ? (
        <Preloader />
      ) : (
        <MoviesCardList
          cards={filteredMovies}
          isSaved={false}
          emptySearchMessage={searchErrorMessage}
        />
      )}
    </main>
  );
};

export default Movies;
