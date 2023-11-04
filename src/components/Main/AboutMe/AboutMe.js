import './AboutMe.css';
import '../../../utils/utils.css';
import photo from '../../../images/photo.jpg';

export default function AboutMe() {
  return (
    <section className="about-me">
      <h3 className="page__title">Студент</h3>
      <div className="about-me__info">
        <article className="about-me__bio">
          <h2 className="about-me__title">Виталий</h2>
          <h5 className="about-me__subtitle">Фронтенд-разработчик, 30 лет</h5>
          <p className="about-me__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
            После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            
          </p>
          <a className="about-me__link link-style" href="https://github.com/dzhigalko" target="_blank" rel="noreferrer">Github</a>
        </article>
        <img className="about-me__foto" src={photo} alt="Фото студента"/>
      </div>
    </section>
  )
}