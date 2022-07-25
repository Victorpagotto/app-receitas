import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './CSS/Footer.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="footer-container"
    >
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        className="footer-button"
        onClick={ () => history.push('/drinks') }
        src={ drinkIcon }
      >
        <img src={ drinkIcon } alt="drinkIcon" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        className="footer-button"
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
