import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = (props) => {
  return (
    <nav className={`navigation ${props.isOpen ? "navigation_opened" : ""}`}>
      <div className="navigation__overlay"></div>
      <button className="navigation__close" onClick={props.onClose}></button>
      <NavLink
        exact="true"
        to="/"
        activeclassname="navigation__link_active"
        className="navigation__link"
        onClick={props.onClose}
      >
        Главная
      </NavLink>
      <NavLink
        exact="true"
        to="/movies"
        activeclassname="navigation__link_active"
        className="navigation__link"
        onClick={props.onClose}
      >
        Фильмы
      </NavLink>
      <NavLink
        exact="true"
        to="/saved-movies"
        activeclassname="navigation__link_active"
        className="navigation__link"
        onClick={props.onClose}
      >
        Сохраненные фильмы
      </NavLink>
      <NavLink
        exact="true"
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
