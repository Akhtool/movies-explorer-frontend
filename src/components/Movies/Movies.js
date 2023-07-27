import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from 'MoviesCard';
// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
    // SearchForm — форма поиска, куда пользователь будет вводить запрос. Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
    // Preloader — отвечает за работу прелоадера.
    // MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
    // MoviesCard — компонент одной карточки фильма.
const Movies = (props) => {
    return (
        <div>
            <SearchForm />
            <Preloader />
            <MoviesCardList />
            <MoviesCard />
        </div>
    );
};

export default Movies;