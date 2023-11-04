import './SearchForm.css';
import '../../../utils/utils.css';

export default function SeachForm() {
  return (
    <section className="search">
      <form className="search__form" action="">
        <input className="search__input" type="text" placeholder="Фильм"/>
        <button className="search__button link-style" type="submit" aria-label="Найти">Найти</button>
      </form>
      <div className="search__checkbox-container">
        <label className="checkbox">
          <input className="checkbox__input" type="checkbox"/>
          <span className="checkbox__slider"></span>
        </label>
        <span className="search__checkbox-sub">Короткометражки</span>
      </div>
    </section>
  );
}