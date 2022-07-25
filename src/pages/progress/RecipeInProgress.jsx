import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import mealAPI from '../../services/mealAPI';
import drinkAPI from '../../services/drinkAPI';
import NotFound from '../notFound';
import shareIcon from '../../images/shareIcon.svg';
import getProgress, { addItem, removeItem } from './getProgress';
import readsFavorite,
{ addFavorite, removeFavorite } from '../../components/helpers/readsfavorite';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './CSS/Progress.css';
import IngredientsList from './IngredientsList';
import addDoneRecipe from './addDoneRecipe';
import unDoneRecipe from './unDoneRecipe';
import '../../components/CSS/Recipe.css';

const copy = require('clipboard-copy');

export default function Progress() {
  if (!localStorage.inProgressRecipes) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
  const history = useHistory();
  const { location: { pathname } } = history;
  const params = pathname.split('/').filter((item) => item);
  const [page, id] = params;
  const funcMap = page === 'foods' ? mealAPI : drinkAPI;
  const type = page === 'foods' ? 'meals' : 'cocktails';
  const [progressState, setProgressState] = useState({
    prodInfo: {},
    checkList: getProgress(type, id),
    isFavorite: readsFavorite(id),
  });
  const [popUp, setPopUp] = useState(false);
  const { prodInfo, checkList, isFavorite } = progressState;
  let timerID = null;
  useEffect(() => {
    const callRecipe = async () => {
      const response = await funcMap.getById(id);
      if (response) {
        setProgressState({ ...progressState, prodInfo: response });
      } else {
        setProgressState({ ...progressState, prodInfo: 'notFound' });
      }
    };
    callRecipe();
    clearTimeout(timerID);
  }, []);
  const checkHandle = ({ target: { value } }) => {
    if (checkList.includes(value)) {
      removeItem(value, type, id);
      setProgressState({
        ...progressState,
        checkList: checkList.filter((item) => item !== value),
      });
    } else {
      addItem(value, type, id);
      setProgressState({
        ...progressState,
        checkList: [...checkList, value],
      });
    }
  };
  const shareHandle = async () => {
    const treatedHREF = window.location.href.split('/in-progress')[0];
    copy(treatedHREF);
    setPopUp(true);
    timerID = setTimeout(() => {
      setPopUp(false);
    }, +'1000');
  };
  const favoriteHandle = () => {
    if (isFavorite) removeFavorite(id);
    else addFavorite(prodInfo);
    setProgressState({ ...progressState, isFavorite: !progressState.isFavorite });
  };
  const categoryText = () => (
    `${prodInfo.Alcoholic || prodInfo.Category} ${prodInfo.Meal
      ? 'dish'
      : 'drink'}`
  );
  if (prodInfo === 'notFound') {
    return <NotFound />;
  }
  if (!prodInfo.Meal && !prodInfo.Drink) {
    return <h1>Loading...</h1>;
  }
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
            { prodInfo.Drink || prodInfo.Meal }
          </h3>
        </div>
        <img
          src={ prodInfo.DrinkThumb || prodInfo.MealThumb }
          alt={ prodInfo.Drink || prodInfo.Meal }
          data-testid="recipe-photo"
          className="recipe-image"
        />
      </div>
      <div className="details-button-container">
        <button
          type="button"
          onClick={ favoriteHandle }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
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
      <IngredientsList
        ingredients={ prodInfo.ingredients }
        checkList={ checkList }
        checkHandle={ checkHandle }
      />
      <div className="instructions-container-details">
        { prodInfo.Instructions.split('\r\n').map((item, i) => (
          <p
            className="instructions-details"
            data-testid="instructions"
            key={ `instruction-item-${i}` }
          >
            { item }
          </p>
        ))}
      </div>
      <div className="finish-button-container">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-button"
          disabled={ prodInfo.ingredients.length !== checkList.length }
          onClick={ () => {
            addDoneRecipe(prodInfo);
            unDoneRecipe(prodInfo);
            history.push('/done-recipes');
          } }
        >
          Finish
        </button>
      </div>
    </div>
  );
}
