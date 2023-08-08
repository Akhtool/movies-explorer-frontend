import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/header__logo.svg';
//Header — компонент, который отрисовывает шапку сайта на страницу. Шапка на главной странице, как и на
 //других страницах, должна менять отображение, если пользователь авторизован или не авторизован  Такое
 //поведение нужно сразу предусмотреть в вёрстке, даже несмотря на то, что сама авторизация ещё
 //не реализована.
const Header = (props) => {
    const location = useLocation();
    return (
        <div className={location.pathname === '/' ? 'header' : 'header_type_logged-in'}>
            <Link to='/' className='header__link'>
                <img className='header__logo' src={logo} alt='Логотип'/>
            </Link>
            {location.pathname === '/' && (
                <ul className='header__auth'>
                    <li className='header__auth-item'>
                        <Link to='/signup' className='header__auth-register-link'>Регистрация</Link>
                    </li>
                    <li className='header__auth-item'>
                        <Link to='/signin' className='hededer__auth-login-link'>Войти</Link>
                    </li>
                </ul>
            )}
            {location.pathname !== '/' && (
                <ul className='header__nav'>
                    <li className='header__nav-item'>
                        <Link to='/films' className='header__nav-films'>Фильмы</Link>
                    </li>
                    <li className='header__nav-item'>
                        <Link to='/saved-films' className='hededer__nav-saved-films'>Сохраненные фильмы</Link>
                    </li>
                    <li className='header__nav-item'>
                        <Link to='/profile' className='hededer__nav-profile'>
                            <p className='header__nav-profile-text'>Аккаунт</p>
                            <div className='header__nav-profile-logo'></div>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Header;