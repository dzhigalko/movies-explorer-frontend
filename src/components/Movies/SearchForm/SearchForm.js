import { useState } from 'react';

import './SearchForm.css';
import '../../../utils/utils.css';

export default function SeachForm({ handleSubmit, seachFilterDefaultValue, shortsFilterDefaultValue }) {
  const [searchFilter, setSearchFilter] = useState(seachFilterDefaultValue || '');
  const [shortsFilter, setShortsFilter] = useState(shortsFilterDefaultValue || false);

  const handleSearchFilterChange = (event) => {
    const value = event.target.value
    setSearchFilter(value)
  }

  const handleShortsFilterChange = () => {
    const value = !shortsFilter
    setShortsFilter(value)
  }

  const handleSubmitInternal = (event) => {
    event.preventDefault()
    handleSubmit(searchFilter, shortsFilter)
  } 

  return (
    <section className="search">
      <form className="search__form" noValidate={true} onSubmit={handleSubmitInternal}>
        <input className="search__input" type="text" placeholder="Фильм" value={searchFilter} onChange={handleSearchFilterChange}/>
        <button className="search__button link-style" type="submit" aria-label="Найти">Найти</button>
      </form>
      <div className="search__checkbox-container">
        <label className="checkbox">
          <input className="checkbox__input" type="checkbox" checked={shortsFilter} onChange={handleShortsFilterChange}/>
          <span className="checkbox__slider"></span>
        </label>
        <span className="search__checkbox-sub">Короткометражки</span>
      </div>
    </section>
  );
}