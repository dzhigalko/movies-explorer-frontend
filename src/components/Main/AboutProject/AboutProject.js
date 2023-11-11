import './AboutProject.css';
import '../../../utils/utils.css';

export default function AboutProject() {
  return (
    <section id="more" className="about-project">
      <h3 className="page__title">О проекте</h3>
      <div className="about-project__description">
        <h4 className="about-project__title">Дипломный проект включал 5 этапов</h4>
        <p className="about-project__subtitle">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        <h4 className="about-project__title">На выполнение диплома ушло 5 недель</h4>
        <p className="about-project__subtitle">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__bar">
        <div className="about-project__time">1 неделя</div>
        <div className="about-project__caption">Back-end</div>
        <div className="about-project__time about-project__time_theme_grey">4 недели</div>
        <div className="about-project__caption">Front-end</div>
      </div>
    </section>
  );
}