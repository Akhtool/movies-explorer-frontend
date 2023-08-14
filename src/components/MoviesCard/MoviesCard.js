import { useState } from "react";
import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
// MoviesCard — компонент одной карточки фильма.
const MoviesCard = ({ name, duration, image }) => {
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };
  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{name}</h2>
        <p className="card__duration">{duration} минут</p>
      </div>
      <img src={image} alt={name} className="card__image" />
      <div className="card__footer">
        {location.pathname === "/movies" &&
          (isSaved ? (
            <button
              className="card__button card_button_type_saved"
              onClick={handleSaveClick}
            ></button>
          ) : (
            <button className="card__button" onClick={handleSaveClick}>
              Сохранить
            </button>
          ))}
        {location.pathname === "/saved-movies" && (
          <button className="card__button card_button_type_delete"></button>
        )}
      </div>
    </li>
  );
};

export default MoviesCard;
