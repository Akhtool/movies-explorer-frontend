import { useContext, useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import auth from '../../utils/MainApi';
import { Context } from '../../context/Context';
// MoviesCard — компонент одной карточки фильма.
const MoviesCard = ({ card, name, duration, image }) => {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const { savedMovies } = useContext(Context);

  const savedMovie = savedMovies.savedMovies.find((movie) => {
    return movie.nameRU === card.nameRU;
  });

  const handleSaveClick = () => {
    setIsSaved(true);
    if (isSaved) {
      return;
    }
    const movieCard = {
      ...card,
      movieId: card.id,
      image: `${'https://api.nomoreparties.co'}${card.image.url}`,
      thumbnail: `${'https://api.nomoreparties.co'}${card.image.formats.thumbnail.url}`,
    }

    delete movieCard.id;
    delete movieCard.created_at;
    delete movieCard.updated_at;

    if (!savedMovie) {
      auth.saveMovie(movieCard).catch((err) => {
        console.log(err);
      })
    }
  };

  const movie = savedMovies.savedMovies.find((movie) => {
    return movie._id === card._id;
  });

  const handleDeleteClick = () => {
    auth.deleteMovie(movie._id).then(() => {
      savedMovies.setSavedMovies(savedMovies.savedMovies.filter((movie) => {
        return movie._id !== card._id;
      }))
    }).catch((err) => {
      console.log(err);
    })
  }

  const isSavedMovie = () => {
    if (savedMovie) {
      return true
    } else {
      return false
    }
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{name}</h2>
        <p className="card__duration">{duration < 60 ? `${duration} минут` : `${Math.floor(duration / 60)}ч ${duration % 60}м`}</p>
      </div>
      <a href={card.trailerLink} style={{ margin: 0 }}>
        <img
            src={image}
            alt={`Постер к фильму ${name}`}
            className="card__image"
        />
      </a>

      <div className="card__footer">
        {location.pathname === "/movies" && (
          <button className={`card__button ${isSaved || isSavedMovie() ? 'card_button_type_saved' : ''}`} onClick={handleSaveClick}>
            {!isSaved && !isSavedMovie() ? 'Сохранить' : ''}
          </button>
        )}
        {location.pathname === "/saved-movies" && (
          <button onClick={handleDeleteClick} className="card__button card__button_type_delete"></button>
        )}
      </div>
    </li>
  );
};

export default MoviesCard;
