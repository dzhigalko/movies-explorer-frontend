import './Card.css';
import '../../../utils/utils.css';

export default function Card({ name, duration, image, isLiked, showLike, showDislike }) {
  return (
    <li className="movie">
      <img className="movie__pic" src={image} alt=""/>
      <div className="movie__info">
        <h3 className="movie__name">{name}</h3>
        {showLike && <button className={`movie__like link-style ${isLiked && 'movie__like_active'}`}></button>}
        {showDislike && <button className="movie__dislike link-style"></button>}
      </div>
      <div className="movie__duration">{duration}</div>
    </li>
  )
}