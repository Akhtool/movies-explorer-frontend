import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
const MoviesCardList = ({ cardList }) => {
  return (
    <ul>
      <MoviesCard
        key={11}
        movieId={11}
        duration={120}
        image={
          "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/02636f2c-4a48-4a9c-a160-c3c60f732064/1920x"
        }
        name={"Бла Бла Бла"}
      />
      <MoviesCard
        key={11}
        movieId={11}
        duration={120}
        image={
          "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/02636f2c-4a48-4a9c-a160-c3c60f732064/1920x"
        }
        name={"Бла Бла Бла"}
      />
      <MoviesCard
        key={11}
        movieId={11}
        duration={120}
        image={
          "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/02636f2c-4a48-4a9c-a160-c3c60f732064/1920x"
        }
        name={"Бла Бла Бла"}
      />
      <MoviesCard
        key={11}
        movieId={11}
        duration={120}
        image={
          "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/02636f2c-4a48-4a9c-a160-c3c60f732064/1920x"
        }
        name={"Бла Бла Бла"}
      />
      <MoviesCard
        key={11}
        movieId={11}
        duration={120}
        image={
          "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/02636f2c-4a48-4a9c-a160-c3c60f732064/1920x"
        }
        name={"Бла Бла Бла"}
      />
      <MoviesCard
        key={11}
        movieId={11}
        duration={120}
        image={
          "https://avatars.mds.yandex.net/get-kinopoisk-image/1773646/02636f2c-4a48-4a9c-a160-c3c60f732064/1920x"
        }
        name={"Бла Бла Бла"}
      />
    </ul>
  );
};

export default MoviesCardList;
