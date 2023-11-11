import './Footer.css'
import '../../utils/utils.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__caption">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__copyright">&#169; 2023</p>
        <nav className="footer__links">
          <a className="footer__link link-style" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link link-style" href="https://github.com/yandex-praktikum" target="_blank" rel="noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  );
}