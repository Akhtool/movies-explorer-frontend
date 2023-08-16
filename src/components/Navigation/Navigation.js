import { NavLink, useLocation } from "react-router-dom";
import "./Navigation.css";

const Navigation = (props) => {
  const location = useLocation();
  const isActiveLink = (path) => {
    return location.pathname === path ? "navigation__link_active" : "";
  };
  return (
    <nav className={`navigation ${props.isOpen ? "navigation_opened" : ""}`}>
      <div className="navigation__overlay"></div>
      <button className="navigation__close" onClick={props.onClose}></button>
      <NavLink
        to="/"
        className={`navigation__link ${isActiveLink("/")}`}
        onClick={props.onClose}
      >
        Главная
      </NavLink>
      <NavLink
        to="/movies"
        className={`navigation__link ${isActiveLink("/movies")}`}
        onClick={props.onClose}
      >
        Фильмы
      </NavLink>
      <NavLink
        to="/saved-movies"
        className={`navigation__link ${isActiveLink("/saved-movies")}`}
        onClick={props.onClose}
      >
        Сохраненные фильмы
      </NavLink>
      <NavLink
        to="/profile"
        className="navigation__link"
        onClick={props.onClose}
      >
        Аккаунт
        <div className="navigation__link-user"></div>
      </NavLink>
    </nav>
  );
};

export default Navigation;
