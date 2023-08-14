import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
const MoviesCardList = ({ cardList }) => {
  const location = useLocation();
  return (
    <section className="movies-card">
      <ul className="movies-card__list">
        {cardList.map((card) => (
          <MoviesCard
            key={card.movieId}
            movieId={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
          />
        ))}
      </ul>
      {location.pathname !== "/saved-movies" && (
        <div className="movies-card__show-more">
          <button className="movies-card__button">Еще</button>
        </div>
      )}
    </section>
  );
};

export default MoviesCardList;
