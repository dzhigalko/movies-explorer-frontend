import { useLocation, NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";

import "./Menu.css";
import menuCloseImg from "../../../images/menu-close.svg";
import ProfileButton from '../ProfileButton';
import '../../../utils/utils.css';

export default function Menu({ theme }) {
  const [isOpen, setIsOpen] = useState(false)
  const {pathname} = useLocation(); 

  const toggleState = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const onOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false)
    }
  } 

  return (
    <div className="menu">
      <div className="menu__btn" alt="" onClick={toggleState}>
        <span className={`menu__btn-line ${theme && 'menu__btn-line_' + theme}`}></span>
        <span className={`menu__btn-line ${theme && 'menu__btn-line_' + theme}`}></span>
        <span className={`menu__btn-line ${theme && 'menu__btn-line_' + theme}`}></span>
      </div>
      <div className={`menu__overlay ${isOpen && 'menu__overlay_visible'}`} onClick={onOverlayClick}>
        <div className={`menu__content`}>
          <img className="menu__btn-close" src={menuCloseImg} alt="" onClick={toggleState}/>
          <div className='menu__links-container'>
            <ul className='menu__links'>
              <li className="menu__link">
                <NavLink to="/" className={({isActive}) => `menu__link link-style ${isActive && 'menu__link_active'}`}>Главная</NavLink>
              </li>
              <li className="menu__link">
                <NavLink to="/movies" className={({isActive}) => `menu__link link-style ${isActive && 'menu__link_active'}`}>Фильмы</NavLink>
              </li>
              <li className="menu__link">
                <NavLink to="/saved-movies" className={({isActive}) => `menu__link link-style ${isActive && 'menu__link_active'}`}>Сохранённые фильмы</NavLink>
              </li>
            </ul>
            <ProfileButton theme="white"/>
          </div>
        </div>
      </div>
    </div>
  );
}