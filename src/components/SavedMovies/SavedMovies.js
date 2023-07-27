import './SavedMovies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и 
// их количеством.
// MoviesCard — компонент одной карточки фильма.
const SavedMovies = (props) => {
    return (
        <div>
            <MoviesCardList />
            <MoviesCard />
        </div>
    );
};

export default SavedMovies;