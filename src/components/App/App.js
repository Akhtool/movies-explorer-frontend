import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import auth from "../../utils/MainApi";
import { Context } from "../../context/Context";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// App — корневой компонент приложения, его создаёт CRA.
const App = () => {
  const [currentUserData, setCurrentUserData] = React.useState({
    name: "",
    email: "",
    id: "",
  });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [getToken, setGetToken] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const hasToken = localStorage.getItem("token");

  const tokenCheck = React.useCallback(() => {
    const token = localStorage.getItem("token");

    if (token && !isLoggedIn) {
      auth
        .refreshUserData(token)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log("token check error:", err);
        });
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    tokenCheck();
    if (localStorage.getItem("token")) {
      auth
        .refreshUserData()
        .then((res) => {
          setGetToken(true);
          setCurrentUserData({
            name: res.name,
            id: res.id,
            email: res.email,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      auth
        .getSavedMovies()
        .then((res) => {
          if (res) {
            setSavedMovies(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  // // Функция-обработчик для события storage
  // const handleLocalStorageChange = (e) => {
  //   // Здесь вы можете проверить изменения в localStorage и выполнить необходимые действия.
  //   // Например, вы можете проверить, был ли удален токен, и перенаправить пользователя на главную страницу.
  //   if (e.key === "token" && !e.newValue) {
  //     // Токен был удален, выполните необходимые действия, например, перенаправление на главную страницу.
  //     navigate("/"); // Замените '/' на URL вашей главной страницы.
  //   }
  // };

  // // Добавление слушателя события storage
  // window.addEventListener("storage", handleLocalStorageChange);

  return (
    <Context.Provider
      value={{
        currentUserData,
        savedMovies: {
          savedMovies,
          setSavedMovies,
        },
      }}
    >
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Main  />
                <Footer />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                setCurrentUserData={setCurrentUserData}
                setSavedMovies={setSavedMovies}
                setGetToken={setGetToken}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Register
                setCurrentUserData={setCurrentUserData}
                setSavedMovies={setSavedMovies}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <>
                <Header isLoggedIn={isLoggedIn}/>
                <ProtectedRoute
                  element={Movies}
                  hasToken={hasToken}
                  getToken={getToken}
                  isLoggedIn={isLoggedIn}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header isLoggedIn={isLoggedIn}/>
                <ProtectedRoute
                  element={SavedMovies}
                  hasToken={hasToken}
                  getToken={getToken}
                  isLoggedIn={isLoggedIn}
                />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header isLoggedIn={isLoggedIn}/>
                <ProtectedRoute
                  element={Profile}
                  getToken={getToken}
                  setCurrentUserData={setCurrentUserData}
                  hasToken={hasToken}
                  setIsLoggedIn={setIsLoggedIn}
                  isLoggedIn={isLoggedIn}
                />
              </>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Context.Provider>
  );
};

export default App;
