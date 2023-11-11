import { Link } from 'react-router-dom';

import './Error.css';
import '../../utils/utils.css';

export default function Error() {
  return (
    <section className="error-page">
      <h1 className="error-page__number">404</h1>
      <p className="error-page__sub">Страница не найдена</p>
      <Link to={-1} className="error-page__link link-style">Назад</Link>
    </section>
  );
}