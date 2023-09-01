import React from 'react';

import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header__logo.svg";
import auth from '../../utils/MainApi';
import Preloader from '../Preloader/Preloader';

// Login — компонент страницы авторизации.
const Login = ({ setGetToken, setCurrentUserData, setSavedMovies }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const navigate = useNavigate()

  const handeSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true);
    auth.login({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setGetToken(true);
          navigate('/movies');
          getData();
        }
      })
      .catch(() => {
        setError('Неправильный логин или пароль')
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const getData = () => {
    auth.refreshUserData().then((res) => {
      setGetToken(true);
      setCurrentUserData({
        name: res.name,
        email: res.email
      })
    }).catch((err) => {
      console.log(err);
    })

    auth.getSavedMovies().then((res) => {
      if (res) {
        setSavedMovies(res);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleChangeEmail = (target) => {
    setEmail(target.value);
    setEmailError(target.validationMessage);
  }

  const handleChangePassword = (target) => {
    setPassword(target.value);
  }

  const disabled = !email || !password || emailError || isLoading;

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
                onChange={(e) => handleChangeEmail(e.target)}
                value={email}
                type="email"
                className="login__input"
                required
              />
              <span className="login__input-error">{emailError}</span>
            </div>
            <div className="login__input-container">
              <label className="login__input-label">Пароль</label>
              <input
                onChange={(e) => handleChangePassword(e.target)}
                value={password}
                type="password"
                className="login__input"
                required
              />
              <span className="login__input-error">{error}</span>
            </div>
            {isLoading && <Preloader />}
            <button disabled={disabled} onClick={(e) => handeSubmit(e)} className={`${disabled ? 'login__button login__button_disabled' : 'login__button'}`}>Войти</button>
          </form>

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
