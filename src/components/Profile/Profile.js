import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Profile.css";
// Profile — компонент страницы изменения профиля.
const Profile = (props) => {
  const name = "Ибрагим";
  const email = "pochta@yandex.ru";
  return (
    <main className="profile">
      <h2 className="profile__title">{`Привет, ${name}!`}</h2>
      <form
        id="profile__form"
        className="profile__form"
        //   onSubmit={handleSubmit}
      >
        <label className="profile__input-container">
          <span className="profile__input-label">Имя</span>
          <input
            type="text"
            name="profile-input-name"
            id="profile-input-name"
            className="profile__input"
            placeholder="Имя"
            value={name}
            //   onChange={handleChange}
            minLength={2}
            maxLength={30}
            required={true}
          />
        </label>
        <span className="profile__brake-line" />
        <label className="profile__input-container">
          <span className="profile__input-label">E-mail</span>
          <input
            type="email"
            name="profile-input-email"
            id="profile-input-email"
            className="profile__input"
            placeholder="E-mail"
            value={email}
            //   onChange={handleChange}
            required={true}
          />
        </label>
      </form>
      <div className="profile__btn-container">
        <button
          type="submit"
          form="profile__form"
          className="profile__btn-submit"
        >
          Редактировать
        </button>
        <Link to="/" className="profile__btn-exit">
          Выйти из аккаунта
        </Link>
      </div>
    </main>
  );
};

export default Profile;
