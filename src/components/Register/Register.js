import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header__logo.svg";
import auth from "../../utils/MainApi";
import Preloader from "../Preloader/Preloader";
// Register — компонент страницы регистрации.
const Register = ({ setSavedMovies, setCurrentUserData }) => {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const validateEmail = (email) => {
    const regexPattern = new RegExp(/[a-z0-9]+@[a-z]+\.{1,1}[a-z]{2,}/);
    return regexPattern.test(email);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    if (!nameError && !emailError && !passwordError) {
      auth
        .register({ name, email, password })
        .then((res) => {
          setCurrentUserData({
            name: res.name,
            email: res.email,
          });
        })
        .then(() => {
          auth.login({ email, password }).then((res) => {
            if (res.token) {
              localStorage.setItem("token", res.token);
              if (localStorage.getItem("token")) {
                navigate("/movies");
                window.location.reload();
              }
            }

            setIsLoading(false);
          });

          setSavedMovies([]);
        })
        .catch((err) => {
          console.log(err);
          if (err.includes("Ошибка: 409")) {
            setEmailError("Такая почта уже зарегестриована");
          }
        });
    }
  };

  const handleChangeName = (target) => {
    setName(target.value);
    setNameError(target.validationMessage);
  };

  const handleChangeEmail = (target) => {
    setEmail(target.value);
    if (target.validationMessage) {
      setEmailError(target.validationMessage);
    } else if (!validateEmail(target.value)) {
      setEmailError("Укажите домен первого уровня");
    } else {
      setEmailError("");
    }
  };

  const handleChangePassword = (target) => {
    setPassword(target.value);
    setPasswordError(target.validationMessage);
  };

  const disabled =
    !name ||
    !email ||
    !password ||
    nameError ||
    emailError ||
    passwordError ||
    isLoading;

  return (
    <main>
      <section className="register">
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
                className="register__input register__input_type_name"
                required
                minLength={2}
                maxLength={30}
                value={name}
                onChange={(e) => handleChangeName(e.target)}
              />

              <span className="register__input-error">{nameError}</span>
            </div>
            <div className="register__input-container">
              <label className="register__input-label">E-mail</label>
              <input
                type="email"
                className="register__input register__input_type_email"
                required
                value={email}
                onChange={(e) => handleChangeEmail(e.target)}
              />
              <span className="register__input-error">{emailError}</span>
            </div>
            <div className="register__input-container">
              <label className="register__input-label">Пароль</label>
              <input
                type="password"
                className={`register__input ${
                  passwordError ? "register__input_type_password" : ""
                }`}
                required
                minLength={8}
                value={password}
                onChange={(e) => handleChangePassword(e.target)}
              />
              <span className="register__input-error">{passwordError}</span>
            </div>
          </form>
          {isLoading && <Preloader />}
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className={`${
              disabled
                ? "register__button register__button_disabled"
                : "register__button"
            }`}
          >
            Зарегистрироваться
          </button>
          <div className="register__text-container">
            <p className="register__text">Уже зарегистрированы?</p>
            <Link
              to="/signin"
              className="register__link register__link_type_login"
            >
              Войти
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Register;
