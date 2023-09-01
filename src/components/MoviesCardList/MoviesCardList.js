import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
const MoviesCardList = ({ isSaved, updateCards = [], error, cards, handleGetMore }) => {
  return (
    <section className="movies-card">
      {!!cards.length ?
        <>
          <ul className="movies-card__list">
            {cards.map((card) => (
              <MoviesCard
                key={isSaved ? card._id : card.id}
                card={card}
                movieId={card.movieId}
                duration={card.duration}
                image={isSaved ? card.image : `https://api.nomoreparties.co${card.image.url}`}
                name={card.nameRU} />
            ))}
          </ul>
          {isSaved ? '' : updateCards.length === cards.length ? '' : <div className="movies-card__show-more">
            <button onClick={handleGetMore} className="movies-card__button">Еще</button>
          </div>}
        </> : isSaved ? '' : <span className="movies-card__error"> {error ? error : ''}</span>
      }
    </section>
  );
};

export default MoviesCardList;
