import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import '../../utils/utils.css';
import {Form, Input, Button, Controls, Link as FormLink, Navigation, Error} from '../Form';
import useForm from '../../hooks/useForm';
import useMainApi from '../../hooks/useMainApi';
import useAuth from '../../hooks/useAuth';
import {RESPONSE_CODES} from "../../utils/constants";

export default function SignIn() {
  const navigate = useNavigate()
  const {login, isAuthenticated} = useAuth();
  const [apiError, setApiError] = useState('')
  const {mainApi} = useMainApi()
  const {formState, handleChange} = useForm({
    email: true,
    password: true
  })

  if (isAuthenticated) {
    return navigate("/movies")
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    mainApi.signin(formState.values.email, formState.values.password)
      .then(() => {
        login(() => navigate("/movies"))
      })
      .catch((error) => {
        if (error.status === RESPONSE_CODES.HTTP_UNAUTHORIZED) setApiError("Вы ввели неправильный логин или пароль.")
        else if (error.status === RESPONSE_CODES.HTTP_SERVER_ERROR) setApiError("На сервере произошла ошибка.")
        else setApiError("При авторизации произошла ошибка.")
      })
  }

  return (
    <>
      <section className="welcome">
        <Link to="/">
          <div className="logo link-style"></div>
        </Link>
        <h1 className="welcome__text">Рады видеть!</h1>
      </section>
      <Form onSubmit={handleSubmit}>
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
          <Button text="Войти" disabled={!formState.isFormValid}/>
          <Navigation>Ещё не зарегистрированы? <FormLink to="/signup">Регистрация</FormLink></Navigation>
        </Controls>
      </Form>
    </>
  );
}