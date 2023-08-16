import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { cardList } from "../../utils/constants.js";
// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
// SearchForm — форма поиска, куда пользователь будет вводить запрос. Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.
const Movies = () => {
  const [isLoadind, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const loggedIn = true;
  useEffect(() => {
    if (loggedIn) {
      // Имитация задержки для Preloader
      setTimeout(() => {
        setCards(cardList);
        setIsLoading(false);
      }, 500);
    }
  }, [loggedIn]);

  return (
    <main>
      <SearchForm />
      {isLoadind ? <Preloader /> : <MoviesCardList cardList={cards} />}
    </main>
  );
};

export default Movies;
