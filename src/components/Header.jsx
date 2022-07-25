import propTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import createTitle from './helpers/createTitle';
import './CSS/Header.css';

export default function Header(props) {
  const PATHSELECTED = 'header-selected-path';
  const {
    currentPage,
    history,
    isSearchBar,
  } = props;

  const { location: { pathname } } = history;

  const backGroundSwitch = () => {
    switch (pathname) {
    case '/foods':
      return 'food-background';
    case '/drinks':
      return 'drink-background';
    default:
      return '';
    }
  };

  return (
    <header
      className={ `header-container ${
        pathname === '/foods' || pathname === '/drinks'
          ? ''
          : 'header-container-red'}` }
    >
      <div className="profile-page-container">
        <div className={ `page-title-blur ${backGroundSwitch()}` } />
        <button
          type="button"
          className="profile-button-header"
          onClick={ pathname === '/profile'
            ? () => history.push('/foods')
            : () => history.push('/profile') }
        >
          <img
            src={ profileIcon }
            className="profile-button-img"
            alt="profileIcon"
            data-testid="profile-top-btn"
          />
        </button>
        <h3
          data-testid="page-title"
          className="page-title"
        >
          { createTitle(currentPage) }
        </h3>
      </div>
      <div className="path-container">
        <div className="path-inner-container">
          <button
            type="button"
            className={ `path-button-header ${pathname === '/favorite-recipes'
              ? PATHSELECTED
              : ''}` }
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite
          </button>
          <button
            type="button"
            className={ `path-button-header ${pathname === '/done-recipes'
              ? PATHSELECTED
              : ''}` }
            onClick={ () => history.push('/done-recipes') }
          >
            Done
          </button>
          <button
            type="button"
            className={ `path-button-header ${pathname === '/foods'
              ? PATHSELECTED
              : ''}` }
            onClick={ () => history.push('/foods') }
          >
            Home
          </button>
        </div>
      </div>
      { isSearchBar && <SearchBar
        history={ history }
        key={ currentPage }
        currentPage={ currentPage }
      /> }
    </header>
  );
}

Header.propTypes = {
  currentPage: propTypes.string.isRequired,
  history: propTypes.shape({
    location: propTypes.shape({
      pathname: propTypes.string.isRequired,
    }).isRequired,
    push: propTypes.func.isRequired,
  }).isRequired,
  isSearchBar: propTypes.bool.isRequired,
};
