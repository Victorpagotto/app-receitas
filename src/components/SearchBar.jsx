import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import mealAPI from '../services/mealAPI';
import drinkAPI from '../services/drinkAPI';
import { AppContext } from '../store';
import eyeIcon from '../images/CSS/eye-icon.png';
import searchIcon from '../images/searchIcon.svg';
import CategoryBar from './CategoryBar';
import './CSS/SearchBar.css';

export default function SearchBar(props) {
  const LABELSELECT = 'search-radio-selected';
  const LABELNOTSELECTED = 'search-radio-label';
  const { changeContext } = useContext(AppContext);
  const [searchState, setSearchState] = useState({
    showSearch: false,
    searchType: 'byName',
    searchInput: '',
    filter: '',
  });
  const { searchType, searchInput, showSearch, filter } = searchState;
  const history = useHistory();
  const { currentPage } = props;
  const searchMap = {
    foods: mealAPI,
    drinks: drinkAPI,
  };

  useEffect(() => {
    const firstCall = async () => {
      changeContext({
        key: 'productList',
        info: await searchMap[currentPage].name('').then((res) => res.slice(0, +'12')),
      });
    };
    firstCall();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setSearchState({ ...searchState, [name]: value });
  };

  const readsSearch = () => {
    switch (searchType) {
    case 'byIngredient':
      return searchMap[currentPage].filterByIngredient(searchInput);
    case 'byName':
      return searchMap[currentPage].name(searchInput);
    default:
      return searchMap[currentPage].firstLetter(searchInput);
    }
  };

  const searchRecipe = async () => {
    const info = await readsSearch();
    if (info.length === 0) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    const pathFunc = currentPage === 'foods' ? 'Meal' : 'Drink';
    if (info.length === 1) history.push(`/${currentPage}/${info[0][`id${pathFunc}`]}`);
    changeContext({
      key: 'productList',
      info: info.length >= +'12' ? info.slice(0, +'12') : info,
    });
  };

  const setFilter = (selectedFilter) => {
    setSearchState({ ...searchState, filter: selectedFilter });
  };

  const getPlaceholder = () => {
    switch (searchType) {
    case 'byIngredient':
      return 'Search ingredient';
    case 'byLetter':
      return 'Search first letter';
    default:
      return 'Search name';
    }
  };

  return (
    <div className="search-container">
      <div className="search-inner-container">
        { showSearch && (
          <div className="search-options-container">
            <div className="search-text">
              <input
                type="text"
                data-testid="search-input"
                className="search-text-input"
                placeholder={ getPlaceholder() }
                name="searchInput"
                value={ searchInput }
                onChange={ handleChange }
              />
            </div>
            <div className="search-radio-container">
              <label
                htmlFor="ingredientSearch"
                className={ searchType === 'byIngredient'
                  ? LABELSELECT
                  : LABELNOTSELECTED }
              >
                <input
                  type="radio"
                  className="search-radio"
                  id="ingredientSearch"
                  name="searchType"
                  data-testid="ingredient-search-radio"
                  onChange={ handleChange }
                  value="byIngredient"
                  checked={ searchType === 'byIngredient' }
                />
                Ingredient
              </label>
              <label
                htmlFor="nameSearch"
                className={ searchType === 'byName'
                  ? LABELSELECT
                  : LABELNOTSELECTED }
              >
                <input
                  type="radio"
                  className="search-radio"
                  id="nameSearch"
                  name="searchType"
                  data-testid="name-search-radio"
                  onChange={ handleChange }
                  value="byName"
                  checked={ searchType === 'byName' }
                />
                Name
              </label>
              <label
                htmlFor="firstLetterSearch"
                className={ searchType === 'byLetter'
                  ? LABELSELECT
                  : LABELNOTSELECTED }
              >
                <input
                  type="radio"
                  className="search-radio"
                  id="firstLetterSearch"
                  name="searchType"
                  data-testid="first-letter-search-radio"
                  onChange={ handleChange }
                  value="byLetter"
                  checked={ searchType === 'byLetter' }
                />
                First Letter
              </label>
            </div>
          </div>
        ) }
        <div className="search-button-container">
          <button
            type="button"
            className={ `search-button ${showSearch
              ? 'selected-button'
              : ''}` }
            onClick={ () => setSearchState({ ...searchState, showSearch: !showSearch }) }
          >
            <img
              src={ eyeIcon }
              alt="searchIcon"
              data-testid="search-top-btn"
            />
          </button>
          { showSearch && (
            <button
              type="button"
              className="search-button"
              data-testid="exec-search-btn"
              onClick={ () => {
                setFilter('');
                if (searchInput.length > 1 && searchType === 'byLetter') {
                  global.alert('Your search must have only 1 (one) character');
                } else {
                  searchRecipe();
                }
              } }
            >
              <img src={ searchIcon } alt="search button" />
            </button>
          )}
        </div>
      </div>
      { showSearch && (
        <CategoryBar
          currentPage={ currentPage }
          setFilter={ setFilter }
          filter={ filter }
        />
      )}
    </div>
  );
}

SearchBar.propTypes = {
  currentPage: propTypes.string.isRequired,
};
