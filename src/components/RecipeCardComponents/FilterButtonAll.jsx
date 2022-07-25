import React from 'react';
import propTypes from 'prop-types';

function filteredAll(target) {
  return JSON.parse(localStorage.getItem(target));
}

export default function FilterButtonAll(props) {
  const { setState, target, chosenFilter, setFilter } = props;
  return (
    <button
      type="button"
      data-testid="filter-by-all-btn"
      className={ `filter-button ${chosenFilter === 'all'
        ? 'selected-filter-button'
        : ''}` }
      onClick={ () => {
        setState(filteredAll(target));
        setFilter('all');
      } }
    >
      All
    </button>
  );
}

FilterButtonAll.propTypes = {
  setState: propTypes.func.isRequired,
  target: propTypes.string.isRequired,
  chosenFilter: propTypes.string.isRequired,
  setFilter: propTypes.func.isRequired,
};
