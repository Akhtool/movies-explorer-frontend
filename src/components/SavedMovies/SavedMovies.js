import { useContext, useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import auth from "../../utils/MainApi";
import { Context } from "../../context/Context";

// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и
// их количеством.
// MoviesCard — компонент одной карточки фильма.
const SavedMovies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [isShort, setIsShort] = useState(false);
  const { savedMovies } = useContext(Context);
  const [cards, setCards] = useState([]);

  const handleSearchMovies = (e) => {
    setError("");
    setSearchValue(e.target.value);
    localStorage.setItem("searchValue", JSON.stringify(searchValue));
  };

  const getIsShort = (e) => {
    const isChecked = e.target.checked;

    setIsShort(isChecked);
    localStorage.setItem(
      "isSavedMoviesShortChecked",
      JSON.stringify(isChecked)
    );

    if (e.target.checked) {
      setCards(
        savedMovies.savedMovies.filter((movie) => {
          return movie.duration <= 40;
        })
      );
    } else {
      setCards(savedMovies.savedMovies);
    }
  };

  const handleValidateMovieSearch = () => {
    if (!searchValue.length > 0) {
      setError("Нужно ввести ключевое слово.");
      return;
    }
  };

  const handleSearchClick = (e) => {
    handleValidateMovieSearch();

    e.preventDefault();
    localStorage.setItem("searchValue", JSON.stringify(searchValue));
    if (isShort) {
      setCards(
        savedMovies.savedMovies.filter((movie) => {
          return (
            movie.duration <= 40 &&
            (movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
              movie.nameEN.toLowerCase().includes(searchValue.toLowerCase()))
          );
        })
      );
    } else {
      setCards(
        savedMovies.savedMovies.filter((movie) => {
          return (
            movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
          );
        })
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    auth
      .getSavedMovies()
      .then((res) => {
        if (res) {
          setIsLoading(false);
          savedMovies.setSavedMovies(res);

          if (
            JSON.parse(localStorage.getItem("isSavedMoviesShortChecked")) ||
            false
          ) {
            setCards(
              res.filter((movie) => {
                return movie.duration <= 40;
              })
            );
          } else {
            setCards(res);
          }
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    setError("");
    localStorage.setItem("searchValue", JSON.stringify("a"));
  }, []);

  useEffect(() => {
    if (isShort) {
      setCards(
        savedMovies.savedMovies.filter((movie) => {
          return (
            movie.duration <= 40 &&
            (movie.nameRU
              .toLowerCase()
              .includes(
                JSON.parse(localStorage.getItem("searchValue")).toLowerCase()
              ) ||
              movie.nameEN
                .toLowerCase()
                .includes(
                  JSON.parse(localStorage.getItem("searchValue")).toLowerCase()
                ))
          );
        })
      );
      return;
    } else if (!isShort) {
      setCards(
        savedMovies.savedMovies.filter((movie) => {
          return (
            movie.nameRU
              .toLowerCase()
              .includes(
                JSON.parse(localStorage.getItem("searchValue")).toLowerCase()
              ) ||
            movie.nameEN
              .toLowerCase()
              .includes(
                JSON.parse(localStorage.getItem("searchValue")).toLowerCase()
              )
          );
        })
      );
      return;
    }
    setCards(savedMovies.savedMovies);
  }, [savedMovies.savedMovies]);

  return (
    <main>
      <SearchForm
        isShort={isShort}
        getIsShort={getIsShort}
        value={searchValue}
        handleChangeSearchValue={handleSearchMovies}
        handleSearchClick={handleSearchClick}
        error={error}
      />
      {isLoadind ? (
        <Preloader />
      ) : (
        <MoviesCardList isSaved={true} error={error} cards={cards} />
      )}
    </main>
  );
};

export default SavedMovies;
