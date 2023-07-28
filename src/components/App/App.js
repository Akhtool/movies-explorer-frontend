import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
// App — корневой компонент приложения, его создаёт CRA.
const App = (props) => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/saved-movies' element={<SavedMovies />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/signin' element={<Login />} />
                <Route path='/signup' element={<Register />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;