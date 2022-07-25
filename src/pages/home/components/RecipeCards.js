import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../../store';
import '../CSS/RecipeCards.css';

export default function RecipeCards() {
  const { context } = useContext(AppContext);
  const { productList } = context;
  const { location: { pathname } } = useHistory();

  if (productList.length === 0
    || productList[0][`${pathname === '/foods' ? 'idMeal' : 'idDrink'}`] === undefined) {
    return (
      <div className="recipe-cards-container">
        <h2 className="recipe-card-loading">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="recipe-cards-container">
      {
        productList.map((product, index) => (
          <Link
            key={ product.idMeal || product.idDrink }
            to={ `${pathname}/${product.idMeal || product.idDrink}` }
            className="recipe-card-link"
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="recipe-card-home"
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ product.MealThumb || product.DrinkThumb }
                alt={ product.Meal || product.Drink }
                className="recipe-card-img"
              />
              <div className="recipe-card-text">
                <p
                  className="recipe-card-name"
                  data-testid={ `${index}-card-name` }
                >
                  { product.Meal || product.Drink }
                </p>
                {
                  (product.Area || product.Category) && (
                    <div className="recipe-card-extra">
                      { product.Area && (
                        <p>{ product.Area }</p>
                      ) }
                      { product.Category && (
                        <p>{ product.Category }</p>
                      ) }
                    </div>
                  )
                }
              </div>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

RecipeCards.propTypes = {

};
