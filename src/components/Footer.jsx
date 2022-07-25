import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './CSS/Footer.css';

export default function Footer() {
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <footer
      data-testid="footer"
      className="footer-container"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        className={ `footer-button ${pathname === '/drinks'
          ? 'selected-footer'
          : ''}` }
        onClick={ () => history.push('/drinks') }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        className={ `footer-button ${pathname === '/foods'
          ? 'selected-footer'
          : ''}` }
        onClick={ () => history.push('/foods') }
        src={ mealIcon }
      >
        <img src={ mealIcon } alt="mealIcon" />
      </button>
    </footer>
  );
}

Footer.propTypes = {

};
