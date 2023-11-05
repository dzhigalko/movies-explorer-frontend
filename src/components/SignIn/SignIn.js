import { Link, useNavigate } from 'react-router-dom';

import '../../utils/utils.css';
import {Form, Input, Button, Controls, Link as FormLink, Navigation} from '../Form';
import useAuth from '../../hooks/useAuth';

export default function SignIn() {
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    login(() => navigate("/"))
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
          <Button text="Войти"/>
          <Navigation>Ещё не зарегистрированы? <FormLink to="/signup">Регистрация</FormLink></Navigation>
        </Controls>
      </Form>
    </>
  );
}