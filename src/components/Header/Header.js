import { Link, useLocation, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/header__logo.svg";
import Navigation from "../Navigation/Navigation";
import { useState } from "react";
//Header — компонент, который отрисовывает шапку сайта на страницу. Шапка на главной странице, как и на
//других страницах, должна менять отображение, если пользователь авторизован или не авторизован  Такое
//поведение нужно сразу предусмотреть в вёрстке, даже несмотря на то, что сама авторизация ещё
//не реализована.
const Header = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div
      className={
        location.pathname === "/" ? "header" : "header header_type_logged-in"
      }
    >
      <Link to="/" className="header__link">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>

      {isLoggedIn ? (
        <ul className="header__nav">
          <li className="header__nav-item">
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                isActive
                  ? "header__nav-films header__nav-films_active"
                  : "header__nav-films"
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                isActive
                  ? "header__nav-saved-films header__nav-saved-films_active"
                  : "header__nav-saved-films"
              }
            >
              Сохраненные фильмы
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/profile" className="header__nav-profile">
              <p className="header__nav-profile-text">Аккаунт</p>
              <div className="header__nav-profile-logo"></div>
            </NavLink>
          </li>
          <li className="header__menu-item">
            <button className="header__menu" onClick={openMenu}></button>
          </li>
        </ul>
      ) : (
        <ul className="header__auth">
          <li className="header__auth-item">
            <Link to="/signup" className="header__auth-register-link">
              Регистрация
            </Link>
          </li>
          <li className="header__auth-item">
            <Link to="/signin" className="header__auth-login-link">
              Войти
            </Link>
          </li>
        </ul>
      )}
      {<Navigation isOpen={isMenuOpen} onClose={closeMenu} />}
    </div>
  );
};

export default Header;
