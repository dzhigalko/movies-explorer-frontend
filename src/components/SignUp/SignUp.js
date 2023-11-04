import { Link, useNavigate } from 'react-router-dom';

import '../../utils/utils.css';
import {Form, Input, Button, Controls, Link as FormLink, Navigation} from '../Form';

export default function SignUp() {
  const navigate = useNavigate()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/sign-in")
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
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          type="email"
          placeholder="Введите E-mail"
        />
        <Input
          label="Пароль"
          name="password"
          id="password"
          type="password"
          placeholder="Придумайте пароль"
          minLength="7"
        />
        <Controls>
          <Button text="Зарегистрироваться"/>
          <Navigation>Уже зарегистрированы? <FormLink to="/sign-in">Войти</FormLink></Navigation>
        </Controls>
      </Form>
    </>
  );
}