import './Portfolio.css';
import '../../../utils/utils.css';

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link link-style" href="https://github.com/dzhigalko/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт<span>↗</span></a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link link-style" href="https://github.com/dzhigalko/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт<span>↗</span></a>
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link link-style" href="https://github.com/dzhigalko/movies-explorer-frontend" target="_blank" rel="noreferrer">Одностраничное приложение<span>↗</span></a>
        </li>
      </ul>
    </section>
  );
}