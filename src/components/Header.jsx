import propTypes from 'prop-types';
import React from 'react';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import createTitle from './helpers/createTitle';
import './CSS/Header.css';

export default function Header(props) {
  const {
    currentPage,
    history,
    isSearchBar,
  } = props;

  const { location: { pathname } } = history;

  return (
    <header className="header-container">
      <div className="profile-page-container">
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
            className="path-button-header"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite
          </button>
          <button
            type="button"
            className="path-button-header"
            onClick={ () => history.push('/done-recipes') }
          >
            Done
          </button>
          <button
            type="button"
            className="path-button-header"
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
