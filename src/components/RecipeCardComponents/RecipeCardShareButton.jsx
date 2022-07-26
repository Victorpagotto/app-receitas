import React from 'react';
import propTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import getFavorites from '../helpers/getFavorites';

const copy = require('clipboard-copy');

export const setPopUpInit = () => {
  const favList = getFavorites();
  return favList.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});
};

const popUpMessage = (id, state, setState) => {
  setState({ ...state, [id]: true });
  setTimeout(() => {
    setState({ ...state, [id]: false });
  }, +'500');
};

export const popUpUpdate = (popUp, setState) => {
  const favList = getFavorites();
  const newPopUpList = Object.entries(popUp).reduce((acc, item) => {
    if (favList.some((recipe) => recipe.id === item[0])) {
      const [id, value] = item;
      acc[id] = value;
      return acc;
    }
    return acc;
  }, {});
  setState(newPopUpList);
};

export default function RecipeCardShareButton(props) {
  const { id, state, setState, popUp, type, index, page } = props;
  return (
    <div className="share-button-container">
      <button
        type="button"
        onClick={ async () => {
          copy(`${window.location.href
            .split(page)[0]}/${type}s/${id}`);
          popUpMessage(id, state, setState);
        } }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share"
          width="17px"
        />
      </button>
      {
        popUp && (
          <div className="share-button-popUp-container">
            <span data-testid="span-shared">Link copied!</span>
          </div>
        )
      }
    </div>
  );
}

RecipeCardShareButton.propTypes = {
  id: propTypes.string.isRequired,
  state: propTypes.shape({}).isRequired,
  setState: propTypes.func.isRequired,
  popUp: propTypes.bool.isRequired,
  type: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  page: propTypes.string.isRequired,
};
