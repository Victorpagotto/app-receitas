import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Carousel({ recommendation }) {
  const [recommend, setRecommend] = useState([]);

  useEffect(() => {
    const fill = () => {
      const newResult = recommendation.filter((_item, index) => index <= +'5');
      setRecommend(newResult);
    };
    fill();
  }, [recommendation]);

  return (
    <div
      className="carousel-track"
      // data-testid="recomendation-card"
    >
      { recommend.map((item, index) => (
        <div
          key={ index }
          className="carousel-slide"
          data-testid={ `${index}-recomendation-card` }
        >
          <img
            className="carousel-image"
            src={ item.MealThumb || item.DrinkThumb }
            alt={ item.Meal || item.Drink }
          />
          <div className="carousel-titles">
            <p>{ item.Category }</p>
            <h5
              data-testid={ `${index}-recomendation-title` }
            >
              { item.Meal || item.Drink }
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
}

Carousel.propTypes = {
  recommendation: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
