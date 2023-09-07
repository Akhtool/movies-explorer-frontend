import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useEffect, useState } from "react";
import { useResize } from "../../hooks/useResize";

// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
const MoviesCardList = ({ isSaved, cards, emptySearchMessage }) => {
  const [amountForShow, setAmountForShow] = useState();
  const resize = useResize();
  const [moreBtnVissible, setMoreBtnVissible] = useState(true);
  const [isClickOnMore, setIsClickOnMore] = useState(false);

  useEffect(() => {
    const totalShowedCardAmount = document.getElementsByClassName("card");
    if (cards.length < 6 || totalShowedCardAmount.length === cards.length) {
      setMoreBtnVissible(false);
    } else {
      setMoreBtnVissible(true);
    }
    if (isClickOnMore) {
      return;
    }
    setAmountForShow(getMoviesAmountOnPage);
    setIsClickOnMore(false);
  }, [resize, isClickOnMore, cards.length]);

  useEffect(() => {
    if (resize.mobile) {
      setAmountForShow(5);
    } 
    
    else if(resize.noteBook) {
      setAmountForShow(8);
    } else if (resize.PC) {
      setAmountForShow(12);
    }
  }, [resize.mobile, resize.noteBook, resize.PC]);

  const getMoviesAmountOnPage = () => {
    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      return 5;
    } else {
      if (Math.floor(window.innerWidth / 370) > 3) {
        return 4 * 3;
      }
      return 4 * Math.floor(window.innerWidth / 370);
    }
  };
  const handleGetMoreClick = () => {
    setIsClickOnMore(true);

    if (window.innerWidth >= 320 && window.innerWidth < 768) {
      setAmountForShow(amountForShow + 2);
    } else if (Math.floor(window.innerWidth / 370) >= 3) {
      setAmountForShow(amountForShow + 3);
    } else {
      setAmountForShow(amountForShow + 2);
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
          {emptySearchMessage ? emptySearchMessage : "Нужно ввести ключевое слово"}
        </span>
      )}
    </section>
  );
};

export default MoviesCardList;
