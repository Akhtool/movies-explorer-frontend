import Header from "../Header/Header";
import "./Profile.css";
// Profile — компонент страницы изменения профиля.
const Profile = (props) => {
  const name = "Ибрагим";
  const email = "pochta@yandex.ru";
  return (
    <>
      <Header />
      <section className="profile">
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
              name="profile-input-name"
              id="profile-input-name"
              className="profile__input"
              placeholder="Имя"
              value={email}
              //   onChange={handleChange}
              required={true}
            />
          </label>
        </form>
        <div className="profile__wrapper">
          <button
            type="submit"
            form="profile__form"
            className="profile__btn-submit"
          >
            Редактировать
          </button>
          <button className="profile__btn-exit">Выйти из аккаунта</button>
        </div>
      </section>
    </>
  );
};

export default Profile;
