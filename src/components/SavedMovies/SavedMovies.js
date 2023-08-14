import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { saveCardList } from "../../utils/constants.js";
// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и
// их количеством.
// MoviesCard — компонент одной карточки фильма.
const SavedMovies = (props) => {
  const [isLoadind, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const loggedIn = true;
  useEffect(() => {
    if (loggedIn) {
      // Имитация задержки для Preloader
      setTimeout(() => {
        setCards(saveCardList);
        setIsLoading(false);
      }, 500);
    }
  }, [loggedIn]);
  return (
    <main>
      <Header />
      <SearchForm />
      {isLoadind ? <Preloader /> : <MoviesCardList cardList={cards} />}
      <Footer />
    </main>
  );
};

export default SavedMovies;
