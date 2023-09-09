import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { useResize } from "../../hooks/useResize";

// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
const MoviesCardList = ({
  isSaved,
  cards,
  emptySearchMessage,
  setIsLoggedIn,
}) => {
  const [amountForShow, setAmountForShow] = useState();
  const resize = useResize();
  const [moreBtnVissible, setMoreBtnVissible] = useState(true);
  const [isClickOnMore, setIsClickOnMore] = useState(false);

  //можно удалить
  useEffect(() => {
    if (resize.mobile) {
      setAmountForShow(5);
    } else if (resize.noteBook) {
      setAmountForShow(8);
    } else if (resize.PC) {
      setAmountForShow(12);
    }
  }, [cards]);

  //можно удалить
  useEffect(() => {
    setAmountForShow(getMoviesAmountOnPage);
  }, []);

  //если удалить, то что сверху, дописат cards в 51
  useEffect(() => {
    const totalShowedCardAmount = document.getElementsByClassName("card");
    if (cards.length < 6 || totalShowedCardAmount.length === cards.length) {
      setMoreBtnVissible(false);
    } else {
      setMoreBtnVissible(true);
    }
  }, [resize]);
  useEffect(() => {
    if (resize.mobile) {
      setAmountForShow(5);
    } else if (resize.noteBook) {
      setAmountForShow(8);
    } else if (resize.PC) {
      setAmountForShow(12);
    }
  }, [resize.mobile, resize.noteBook, resize.PC]);

  //можно удалить, если удалить всё остальное
  const getMoviesAmountOnPage = () => {
    if (isClickOnMore) {
      if (resize.mobile) {
        return amountForShow + 2;
      } else {
        if (resize.noteBook) {
          return amountForShow + 2;
        }

        return amountForShow + 2;
      }
    }
    if (resize.mobile) {
      return 5;
    } else {
      if (resize.noteBook) {
        return 8;
      }
      return 12;
    }
  };

  const handleGetMoreClick = () => {
    setIsClickOnMore(true);
    if (resize.mobile) {
      setAmountForShow(amountForShow + 2);
    } else if (resize.noteBook) {
      setAmountForShow(amountForShow + 2);
    } else {
      setAmountForShow(amountForShow + 3);
    }
  };

  return (
    <section className="movies-card">
      {!!cards.length ? (
        <>
          <ul className="movies-card__list">
            {cards
              .slice(0, Math.min(amountForShow, cards.length))
              .map((card) => (
                <MoviesCard
                  key={isSaved ? card._id : card.id}
                  card={card}
                  movieId={card.movieId}
                  duration={card.duration}
                  image={
                    isSaved
                      ? card.image
                      : `https://api.nomoreparties.co${card.image.url}`
                  }
                  name={card.nameRU}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ))}
          </ul>
          {moreBtnVissible && (
            <div className="movies-card__show-more">
              <button
                className="movies-card__button"
                onClick={handleGetMoreClick}
              >
                Еще
              </button>
            </div>
          )}
        </>
      ) : isSaved ? (
        ""
      ) : (
        <span className="movies-card__error">
          {" "}
          {emptySearchMessage
            ? emptySearchMessage
            : "Нужно ввести ключевое слово"}
        </span>
      )}
    </section>
  );
};

export default MoviesCardList;
