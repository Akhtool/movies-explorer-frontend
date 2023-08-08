import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/header__logo.svg";
// Register — компонент страницы регистрации.
const Register = (props) => {
  return (
    <>
      <div className="register">
        <div className="register__container">
          <Link to="/" className="register__link">
            <img className="register__logo" src={logo} alt="Логотип" />
          </Link>
          <h2 className="register__title">Добро пожаловать!</h2>
          <form className="register__form">
            <div className="register__input-container">
              <label className="register__input-label">Имя</label>
              <input
                type="text"
                className="register__input register_input_type_name"
                required
                defaultValue={"Ибрагим"}
                minLength="2"
                maxLength="30"
              />
            </div>
            <div className="register__input-container">
              <label className="register__input-label">E-mail</label>
              <input
                type="email"
                className="register__input register_input_type_email"
                required
                defaultValue={"pochta@yandex.ru"}
              />
            </div>
            <div className="register__input-container">
              <label className="register__input-label">Пароль</label>
              <input
                type="password"
                className="register__input register_input_type_password"
                required
                defaultValue="••••••••••••••"
                minLength={8}
              />
              <span className="register__input-error">
                Что-то пошло не так...
              </span>
            </div>
          </form>
          <button className="register__button">Зарегистрироваться</button>
          <div className="register__text-container">
            <p className="register__text">Уже зарегистрированы?</p>
            <Link to="/signin" className="register_link_type_login">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
