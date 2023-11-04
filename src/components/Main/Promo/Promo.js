import { HashLink } from 'react-router-hash-link';

import './Promo.css';
import '../../../utils/utils.css';
import PromoLogo from '../../../images/promo-logo.svg';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__description">
        <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
        <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        <HashLink to="#more" className="promo__link link-style" alt="Узнать больше">Узнать больше</HashLink>
      </div>
      <img className="promo__logo" src={PromoLogo} alt="Изображение земного шара"/>
    </section>
  )
}