import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import Carousel from './components/Carousel';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import getFavorites from '../../components/helpers/getFavorites';
import { addFavorite, removeFavorite } from '../../components/helpers/readsfavorite';
import './RecipeDetails.css';
import '../../components/CSS/Recipe.css';

const copy = require('clipboard-copy');

export default function RecipeDetails(props) {
  if (!localStorage.doneRecipes) localStorage.setItem('doneRecipes', JSON.stringify([]));
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }

  const [recommendation, setRecommendation] = useState([]);
  const [foodObject, setFoodObject] = useState({
    DrinkThumb: '',
    Drink: '',
    Alcoholic: '',
    ingredients: [],
    Instructions: '',
  });
  const [popUp, setPopUp] = useState(false);
  const { history, match: { params: { id } } } = props;
  const { location: { pathname } } = useHistory();
  const path = pathname.split('/').filter((item) => item);
  const funcMap = path[0] === 'foods' ? mealAPI : drinkAPI;
  const recommendMap = (path[0] !== 'foods') ? mealAPI : drinkAPI;
  const [heartImg, setHeartImg] = useState(getFavorites().some((item) => item.id === id));

  const recipeState = () => {
    const idKeys = Object.values(JSON.parse(localStorage.getItem('inProgressRecipes')));
    const accKeys = idKeys.reduce((acc, item) => {
      acc = [...acc, ...Object.keys(item)];
      return acc;
    }, []);
    return accKeys.includes(id);
  };

  const doneState = () => (
    !JSON.parse(localStorage.getItem('doneRecipes')).map((item) => item.id).includes(id)
  );

  // console.log(doneState());

  let timerID;

  useEffect(() => {
    const firstCall = async () => {
      const result = await funcMap.getById(id);
      setFoodObject(result);
    };
    const recommend = async () => {
      const result = await recommendMap.name('');
      setRecommendation(result);
    };
    recommend();
    firstCall();
    clearTimeout(timerID);
  }, []);

  function onFavoriteBtnClick() {
    if (heartImg) {
      removeFavorite(id);
    } else {
      addFavorite(foodObject);
    }
    setHeartImg(!heartImg);
  }

  const shareHandle = async () => {
    copy(window.location.href);
    setPopUp(true);
    setTimeout(() => {
      setPopUp(false);
    }, +'2000');
  };

  const categoryText = () => (
    `${foodObject.Alcoholic || foodObject.Category} ${foodObject.Meal
      ? 'dish'
      : 'drink'}`
  );

  const instructionsFormat = (str) => (
    str.split('\r\n')
  );

  return (
    <div className="details-page-container">
      <div className="recipe-container">
        <div className="upper-body-recipe">
          <p
            data-testid="recipe-category"
            className="recipe-category"
          >
            {categoryText()}
          </p>
          <h3
            data-testid="recipe-title"
            className="recipe-name"
          >
            { foodObject.Drink || foodObject.Meal }
          </h3>
        </div>
        <img
          src={ foodObject.DrinkThumb || foodObject.MealThumb }
          alt={ foodObject.Drink || foodObject.Meal }
          data-testid="recipe-photo"
          className="recipe-image"
        />
        <div className="details-button-container">
          <button
            type="button"
            onClick={ onFavoriteBtnClick }
          >
            <img
              data-testid="favorite-btn"
              src={ heartImg ? blackHeartIcon : whiteHeartIcon }
              alt="favorite"
              width="17px"
            />
          </button>
          <button
            type="button"
            onClick={ shareHandle }
          >
            <img
              data-testid="share-btn"
              src={ shareIcon }
              alt="share"
              width="17px"
            />
          </button>
          <div className="popUp-container">
            {
              popUp && (
                <span>Link copied!</span>
              )
            }
          </div>
        </div>
        <div className="ingredient-list-container-details">
          <div className="list-inner-container">
            <ul className="ingredient-list-details">
              {
                foodObject.ingredients.map((item, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `${item.measure} of ${item.ingredient}` }
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="instructions-container-details">
          { instructionsFormat(foodObject.Instructions).map((item, i) => (
            <p
              className="instructions-details"
              data-testid="instructions"
              key={ `instruction-item${i}` }
            >
              { item }
            </p>
          ))}
        </div>
        <div className="video-container-details">
          {
            path[0] === 'foods' && <iframe
              title={ `${foodObject.Meal || foodObject.Drink}-video` }
              width="420"
              height="315"
              data-testid="video"
              src={ foodObject.Youtube }
            />
          }
        </div>
      </div>
      <Carousel recommendation={ recommendation } />
      <div className="button-start-continue-contaier">
        {
          doneState() && (
            <button
              type="button"
              data-testid="start-recipe-btn"
              onClick={ () => history.push(`${pathname}/in-progress`) }
            >
              { recipeState() ? 'Continue Recipe' : 'Start Recipe'}
            </button>)
        }
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape(
    PropTypes.func.isRequired,
  ).isRequired,
};
