import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

export default function RecipeCardImg(props) {
  const history = useHistory();
  const { image, recipe, index, type, id } = props;
  return (
    <button
      type="button"
      onClick={ () => history.push(`/${type}s/${id}`) }
      className="recipeCard-image"
    >
      <img
        src={ image }
        alt={ recipe }
        data-testid={ `${index}-horizontal-image` }
      />
    </button>
  );
}

RecipeCardImg.propTypes = {
  image: propTypes.oneOfType([
    propTypes.string,
  ]).isRequired,
  recipe: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  type: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
};
