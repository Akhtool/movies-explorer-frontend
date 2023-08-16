import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/header__logo.svg";
// Login — компонент страницы авторизации.
const Login = (props) => {
  return (
    <main>
      <section className="login">
        <div className="login__container">
          <Link to="/" className="login__link">
            <img className="login__logo" src={logo} alt="Логотип" />
          </Link>
          <h2 className="login__title">Рады видеть!</h2>
          <form className="login__form">
            <div className="login__input-container">
              <label className="login__input-label">E-mail</label>
              <input
                defaultValue={"pochta@yandex.ru"}
                type="email"
                className="login__input"
                required
              />
            </div>
            <div className="login__input-container">
              <label className="login__input-label">Пароль</label>
              <input
                defaultValue="••••••••••••••"
                type="password"
                className="login__input"
                required
              />
            </div>
          </form>
          <button className="login__button">Войти</button>
          <div className="login__text-container">
            <p className="login__text">Ещё не зарегистрированы?</p>
            <Link
              to="/signup"
              className="login__link login__link_type_register"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
