import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import '../../utils/utils.css';
import {Form, Input, Button, Controls, Link as FormLink, Navigation, Error} from '../Form';
import useForm from '../../hooks/useForm';
import useMainApi from '../../hooks/useMainApi';
import useAuth from '../../hooks/useAuth';
import {RESPONSE_CODES} from "../../utils/constants";

export default function SignUp() {
  const navigate = useNavigate()
  const {mainApi} = useMainApi()
  const {login, isAuthenticated} = useAuth()
  const [apiError, setApiError] = useState('')
  const {formState, handleChange} = useForm({
    name: true,
    email: true,
    password: true
  })

  if (isAuthenticated) {
    return navigate("/movies")
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    mainApi.signup(formState.values.name, formState.values.email, formState.values.password)
      .then(() => {
        return mainApi.signin(formState.values.email, formState.values.password)
      })
      .then(() => {
        login(() => navigate("/movies"))
      })
      .catch((error) => {
        if (error.status === RESPONSE_CODES.HTTP_CONFLICT) setApiError("Пользователь с таким email уже существует.")
        else if (error.status === RESPONSE_CODES.HTTP_SERVER_ERROR) setApiError("На сервере произошла ошибка.")
        else setApiError("При регистрации пользователя произошла ошибка.")
      })
  }

  return (
    <>
      <section className="welcome">
        <Link to="/">
          <div className="logo link-style"></div>
        </Link>
        <h1 className="welcome__text">Добро пожаловать!</h1>
      </section>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Имя"
          name="name"
          id="name"
          type="text"
          placeholder="Ваше имя"
          minLength="2"
          maxLength="40"
          isValid={formState.validity.name}
          validationMessage={formState.validationMessages.name}
          value={formState.values.name}
          onChange={handleChange}
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          type="email"
          placeholder="Введите E-mail"
          isValid={formState.validity.email}
          validationMessage={formState.validationMessages.email}
          value={formState.values.email}
          onChange={handleChange}
          pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}"
        />
        <Input
          label="Пароль"
          name="password"
          id="password"
          type="password"
          placeholder="Придумайте пароль"
          minLength="7"
          isValid={formState.validity.password}
          validationMessage={formState.validationMessages.password}
          value={formState.values.password}
          onChange={handleChange}
        />
        <Controls>
          <Error>{apiError}</Error>
          <Button text="Зарегистрироваться" disabled={!formState.isFormValid}/>
          <Navigation>Уже зарегистрированы? <FormLink to="/signin">Войти</FormLink></Navigation>
        </Controls>
      </Form>
    </>
  );
}