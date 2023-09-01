import React from 'react';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import auth from '../../utils/MainApi';
import { Context } from '../../context/Context';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';



// App — корневой компонент приложения, его создаёт CRA.
const App = () => {
  const [currentUserData, setCurrentUserData] = React.useState({ name: '', email: '', id: '' });
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [getToken, setGetToken] = React.useState(false);


  const hasToken = localStorage.getItem('token');

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      auth.refreshUserData().then((res) => {
        setGetToken(true);
        setCurrentUserData({
          name: res.name,
          id: res.id,
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
  }, [])

  return (
    <Context.Provider value={{
      currentUserData, savedMovies: {
        savedMovies,
        setSavedMovies
      }
    }}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          />
          <Route path="/signin" element={<Login setCurrentUserData={setCurrentUserData} setSavedMovies={setSavedMovies} setGetToken={setGetToken} />} />
          <Route path="/signup" element={<Register setCurrentUserData={setCurrentUserData} setSavedMovies={setSavedMovies} />} />
          <Route
            path="/movies"
            element={
              <>
                <Header />
                <ProtectedRoute element={Movies} hasToken={hasToken} getToken={getToken} />
                <Footer />
              </>

            }
          />
          <Route
            path="/saved-movies"
            element={
              <>
                <Header />
                <ProtectedRoute element={SavedMovies} hasToken={hasToken} getToken={getToken} />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <ProtectedRoute element={Profile} getToken={getToken} setCurrentUserData={setCurrentUserData} hasToken={hasToken} />
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
