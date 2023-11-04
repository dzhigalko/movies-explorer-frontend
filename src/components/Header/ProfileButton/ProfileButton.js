import { Link } from 'react-router-dom';

import './ProfileButton.css';
import '../../../utils/utils.css';
import profileIcon from '../../../images/profile-button-icon.svg';

 
export default function ProfileButton({theme}) {
  return (
    <Link to="/profile" className={`profile-button link-style ${theme && 'profile-button_theme_' + theme}`}>Аккаунт
          <img className="profile-button__icon" src={profileIcon} alt=""/>
    </Link>
    );
}