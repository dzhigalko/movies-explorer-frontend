import { Link } from 'react-router-dom';

import './Card.css';
import '../../../utils/utils.css';

export default function Card({ name, duration, image, alt, trailerLink, isLiked, showLike, showDislike, handleLikeButtonClick }) {
  const durationHours = Math.floor(duration / 60);
  const durationMinutes = duration - (durationHours * 60);

  return (
    <li className="movie">
      <Link to={trailerLink} target="_blank"><img className="movie__pic" src={image} alt={alt}/></Link>
      <div className="movie__info">
        <h3 className="movie__name">{name}</h3>
        {showLike && <button className={`movie__like link-style ${isLiked && 'movie__like_active'}`} onClick={handleLikeButtonClick}></button>}
        {showDislike && <button className="movie__dislike link-style" onClick={handleLikeButtonClick}></button>}
      </div>
      <div className="movie__duration">{durationHours}ч {durationMinutes}м</div>
    </li>
  )
}