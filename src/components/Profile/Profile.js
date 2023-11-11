import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import useAuth from '../../hooks/useAuth';
import useMainApi from '../../hooks/useMainApi';
import useForm from '../../hooks/useForm';
import useCurrentUser from '../../hooks/useCurrentUser';
import {RESPONSE_CODES} from "../../utils/constants";
import './Profile.css';
import '../../utils/utils.css';

export default function Profile() {
  const navigate = useNavigate()
  const {logout} = useAuth()
  const {currentUser} = useCurrentUser()
  const {mainApi} = useMainApi()
  const [apiError, setApiError] = useState('')
  const {formState, handleChange, resetForm} = useForm({
    name: false,
    email: false
  })

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email
    })
  }, [currentUser])

  const handleLogout = (event) => {
    event.preventDefault();
    mainApi.signout().then(() => logout(() => navigate("/")))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    mainApi.updateCurrentUser(formState.values.name, formState.values.email)
      .then(() => {
        currentUser.name = formState.values.name
        currentUser.email = formState.values.email
        setApiError('Данные изменены')
      })
      .catch((error) => {
        if (error.status === RESPONSE_CODES.HTTP_CONFLICT) setApiError("Пользователь с таким email уже существует.")
        else if (error.status === RESPONSE_CODES.HTTP_SERVER_ERROR) setApiError("На сервере произошла ошибка.")
        else setApiError("При обновлении профиля произошла ошибка.")
      })
  }

  const editEnabled = () => {
    return formState.isFormValid && (currentUser.name !== formState.values.name || currentUser.email !== formState.values.email)
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {currentUser.name}!</h1>
      <form className="profile__form" action="" noValidate={true} onSubmit={handleSubmit}>
        <label className="profile__label" htmlFor="name">
          <p className="profile__placeholder">Имя</p>
          <input
            className="profile__input"
            name="name"
            id="name"
            type="text"
            placeholder=""
            minLength="2"
            maxLength="40"
            value={formState.values.name}
            onChange={handleChange}
          />
        </label>
        <span className="profile__input-error">{ !formState.validity.name && formState.validationMessages.name }</span>
        <label className="profile__label" htmlFor="email">
          <p className="profile__placeholder">E&#8209;mail</p>
          <input 
            className="profile__input"
            name="email"
            id="email"
            type="email"
            placeholder=""
            value={formState.values.email}
            onChange={handleChange}
          />
        </label>
        <span className="profile__input-error">{ !formState.validity.email && formState.validationMessages.email }</span>
      </form>
      <section className="profile__nav">
        {apiError && <div className="form-error">{apiError}</div>}
        <button className={`profile__link link-style ${!editEnabled() && 'profile__link_disabled'}`} disabled={!editEnabled()} onClick={handleSubmit}>Редактировать</button>
        <button className="profile__link profile__link_type_exit link-style" onClick={handleLogout}>Выйти из аккаунта</button>
      </section>
    </section>
  );
}