import React from 'react';
import propTypes from 'prop-types';

export default function RecipeCardAttribute(props) {
  const { index, items } = props;
  const [itemOne, itemTwo] = items;
  return (
    <span
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${itemOne} ${itemTwo}` }
    </span>
  );
}

RecipeCardAttribute.propTypes = {
  index: propTypes.number.isRequired,
  items: propTypes.arrayOf(propTypes.string).isRequired,
};
