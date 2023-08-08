import "./MoviesCard.css";
// MoviesCard — компонент одной карточки фильма.
const MoviesCard = ({ name, duration, img }) => {
  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">{name}</h2>
        <p className="card__duration">{duration}</p>
      </div>
      <img src={img} alt={name} className="card__image" />
      <button className="card__button">Сохранить</button>
    </li>
  );
};

export default MoviesCard;
