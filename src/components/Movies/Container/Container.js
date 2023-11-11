import React from 'react';

import './Container.css';

export default function Container({children}) {
  return (
    <section className="movies">
      <ul className="movies__list">
        {React.Children.map(children, child => <>{child}</>)}
      </ul>
    </section>
  );
}