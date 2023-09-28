import { useNavigate } from "react-router-dom";
import "./Profile.css";
import React, { useContext, useEffect } from 'react';
import { Context } from '../../context/Context';
import auth from '../../utils/MainApi';


// Profile — компонент страницы изменения профиля.
const Profile = ({ setCurrentUserData, setIsLoggedIn, isLoggedIn }) => {
  const { currentUserData } = useContext(Context);
  const navigate = useNavigate();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const [isChange, setIsChange] = React.useState(true);

  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');

  const [notification, setNotification] = React.useState('');

  const onChangeName = (target) => {
    setName(target.value);
    setNameError(target.validationMessage)
  }

  const onChangeEmail = (target) => {
    setEmail(target.value)
    setEmailError(target.validationMessage)
  }

  const handeEditUserData = (e) => {
    setIsChange(false);

    if (!nameError && !emailError) {
      if (!isChange) {
        auth.editProfile({ name: name || currentUserData.name, email: email || currentUserData.email })
          .then((res) => {
            setCurrentUserData({
              name: res.name,
              email: res.email
            })

            setNotification('Данные успешно изменены');

            setTimeout(() => {
              setNotification('');
            }, 2000)
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();

    setCurrentUserData({
      name: '',
      email: ''
    })

    navigate('/', { replace: true });
  }



  useEffect(() => {
    auth.refreshUserData().then((res) => {
      setCurrentUserData({
        name: res.name,
        email: res.email
      })
    }).catch((err) => {
      console.log(err);
    })
    setName(currentUserData.name);
    setEmail(currentUserData.email);

  }, [currentUserData.email, currentUserData.name, isLoggedIn])

  const disabled = name === currentUserData.name && email === currentUserData.email || nameError || emailError;

  return (
    isLoggedIn && 
    <main className="profile">
      <h2 className="profile__title">{`Привет, ${currentUserData.name}!`}</h2>
      <form
        id="profile__form"
        className="profile__form"
      >
        <label className="profile__input-container">
          <span className="profile__input-label">Имя</span>
          <input
            type="text"
            name="profile-input-name"
            id="profile-input-name"
            className="profile__input"
            value={name || currentUserData.name}
            onChange={(e) => onChangeName(e.target)}
            minLength={2}
            maxLength={30}
            required={true}
            disabled={isChange}
          />
        </label>
        <span className="profile__input-error">{nameError}</span>
        <span className="profile__brake-line" />
        <label className="profile__input-container">
          <span className="profile__input-label">E-mail</span>
          <input
            type="email"
            name="profile-input-email"
            id="profile-input-email"
            className="profile__input"
            value={email || currentUserData.email}
            onChange={(e) => onChangeEmail(e.target)}
            required={true}
            disabled={isChange}
          />
        </label>
        <span className="profile__input-error">{emailError}</span>
      </form>

      <span className="profile__input-notitification">{notification}</span>
      <div className="profile__btn-container">
        <button
          type="submit"
          className="profile__btn-submit"
          onClick={handeEditUserData}
          disabled={!isChange ? disabled : false}
          style={{ opacity: !isChange ? disabled ? '0.5' : '1' : '', cursor: !isChange ? disabled ? 'default' : 'pointer' : '' }}
        >
          {isChange ? 'Редактировать' : 'Сохранить'}
        </button>
        <button onClick={handleLogout} className="profile__btn-exit">
          Выйти из аккаунта
        </button>
      </div>
    </main>
  );
};

export default Profile;
