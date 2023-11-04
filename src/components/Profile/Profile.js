import { useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import './Profile.css';
import '../../utils/utils.css';

export default function Profile() {
  const navigate = useNavigate()
  const { logout } = useAuth();

  const handleLogout = (event) => {
    event.preventDefault();
    logout(() => navigate("/"))
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form" action="">
        <label className="profile__label" for="name">
          <p className="profile__placeholder">Имя</p>
          <input
          className="profile__input"
          name="name"
          id="name"
          type="text"
          placeholder=""
          minLength="2"
          maxLength="40"/>
        </label>
        <span className="profile__input-error"></span>
        <label className="profile__label" for="email">
          <p className="profile__placeholder">E&#8209;mail</p>
          <input 
          className="profile__input"
          name="email"
          id="email"
          type="email"
          placeholder=""/>
        </label>
        <span className="profile__input-error"></span>
      </form>
      <section className="profile__nav">
        <a className="profile__link link-style" href={() => false}>Редактировать</a>
        <a className="profile__link profile__link_type_exit link-style" href={() => false} onClick={handleLogout}>Выйти из аккаунта</a>
      </section>
    </section>
  );
}