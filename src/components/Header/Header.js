import { Link, NavLink } from 'react-router-dom';

import './Header.css';
import '../../utils/utils.css';
import useAuth from '../../hooks/useAuth';
import Menu from './Menu';
import ProfileButton from './ProfileButton';

const AuthenticatedHeader = ({theme}) => {
  return (
    <>
      <div className="navigation">
        <nav className='navigation__links'>
          <NavLink to="/movies/list" className={({isActive}) => `navigation__link link-style ${theme && 'navigation__link_theme_' + theme} ${isActive ? 'navigation__link_current' : ''}`}>
            Фильмы
          </NavLink>
          <NavLink to="/movies/saved" className={({isActive}) => `navigation__link link-style ${theme && 'navigation__link_theme_' + theme} ${isActive ? 'navigation__link_current' : ''}`}>
            Сохранённые фильмы
          </NavLink>
        </nav>
        <ProfileButton theme={theme}/>
      </div>
      <Menu theme={theme}/>
    </>
  );
}

const SignHeader = () => {
  return (
    <>
      <div className="header__buttons">
        <Link to="/sign-up" className="header__button link-style" alt="Регистрация">Регистрация</Link>
        <Link to="/sign-in" className="header__button header__button_type_signin link-style" alt="Войти">Войти</Link>
      </div>
    </>
  );
}

export default function Header({ theme }) {
  const {isAuthenticated} = useAuth();

  return (
    <header className={`header ${theme && 'header_theme_' + theme}`}>
      <Link to="/" className="logo link-style" alt="Логотип"/>
      { isAuthenticated ? <AuthenticatedHeader theme={theme}/> : <SignHeader/> }
    </header>
  );
}