import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import FilterButtonAll from '../../components/RecipeCardComponents/FilterButtonAll';
import FilterButtonType from '../../components/RecipeCardComponents/FilterButtonType';
import RecipeCardAttribute
from '../../components/RecipeCardComponents/RecipeCardAttrbiute';
import RecipeCardGoToButton
from '../../components/RecipeCardComponents/RecipeCardGoToButton';
import RecipeCardImg from '../../components/RecipeCardComponents/RecipeCardImg';
import RecipeCardShareButton, { setPopUpInit }
from '../../components/RecipeCardComponents/RecipeCardShareButton';
import '../../components/CSS/done-favorite.css';

export default function DoneRecipes() {
  const getDone = () => {
    if (localStorage.doneRecipes) {
      return JSON.parse(localStorage.getItem('doneRecipes'));
    }
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    return [];
  };
  const [data, setData] = useState(getDone());
  const [popUp, setPopUp] = useState(setPopUpInit());
  const [filterSelect, setFilterSelect] = useState('all');
  const history = useHistory();

  return (
    <div className="done-page">
      <Header
        currentPage="Done Recipes"
        history={ history }
        isSearchBar={ false }
      />
      <div className="filter-buttons-list">
        <FilterButtonAll
          setState={ setData }
          target="doneRecipes"
          chosenFilter={ filterSelect }
          setFilter={ setFilterSelect }
        />
        <FilterButtonType
          type="food"
          setState={ setData }
          target="doneRecipes"
          chosenFilter={ filterSelect }
          setFilter={ setFilterSelect }
        />
        <FilterButtonType
          type="drink"
          setState={ setData }
          target="doneRecipes"
          chosenFilter={ filterSelect }
          setFilter={ setFilterSelect }
        />
      </div>
      <div className="recipe-cards-container">
        {
          data.map((item, index) => (
            <div key={ item.id } className="recipe-card">
              <div className="date-container">
                <span
                  className="done-date"
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  <span>Made in</span>
                  { item.doneDate }
                </span>
              </div>
              <div className="recipe-card-inner-container">
                <div className="recipe-img-container">
                  <RecipeCardImg
                    image={ item.image }
                    recipe={ item.name }
                    index={ index }
                    type={ item.type }
                    id={ item.id }
                  />
                </div>
                <div className="recipe-card-text-container">
                  <div className="attribute-container">
                    <RecipeCardAttribute
                      index={ index }
                      items={ [item.nationality || item.alcoholicOrNot, item.category] }
                    />
                  </div>
                  <div className="recipe-card-name-container">
                    <RecipeCardGoToButton
                      index={ index }
                      type={ item.type }
                      id={ item.id }
                      itemName={ item.name }
                    />
                  </div>
                  {
                    item.tags.length > 0 && (
                      <div className="tag-list">
                        {
                          item.tags.map((tag) => (
                            <span
                              data-testid={ `${index}-${tag}-horizontal-tag` }
                              key={ `${index}-${tag}` }
                            >
                              { tag }
                            </span>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
              <RecipeCardShareButton
                id={ item.id }
                state={ popUp }
                setState={ setPopUp }
                popUp={ popUp[item.id] || false }
                type={ item.type }
                index={ index }
                page="/done-recipes"
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}
