import React, { useContext, useEffect, useState } from 'react';
import propTypes from 'prop-types';
import mealAPI from '../services/mealAPI';
import drinkAPI from '../services/drinkAPI';
import { AppContext } from '../store';

export default function CategoryBar(props) {
  const { currentPage, setFilter, filter } = props;
  const { changeContext } = useContext(AppContext);
  const [categoryState, setCategoryState] = useState({
    categories: [],
  });
  const { categories } = categoryState;
  const funcMap = currentPage === 'foods' ? mealAPI : drinkAPI;

  useEffect(() => {
    const callCategories = async () => {
      const categoryList = await funcMap.getCategories()
        .then((res) => res.slice(0, +'5'));
      setCategoryState({ ...categoryState, categories: categoryList });
    };
    callCategories();
  }, []);

  const filterCategory = async ({ target: { value } }) => {
    const info = await funcMap.filterByCategory(value);
    changeContext({
      key: 'productList',
      info: info.length >= +'12' ? info.slice(0, +'12') : info,
    });
  };

  const searchAll = async () => {
    const info = await funcMap.name('');
    changeContext({
      key: 'productList',
      info: info.length >= +'12' ? info.slice(0, +'12') : info,
    });
  };

  if (categories.length === 0) {
    return (
      <div className="categories-container">
        <p className="loading-categories">Loading...</p>
      </div>
    );
  }

  return (
    <div className="categories-container">
      <button
        type="button"
        data-testid="All-category-filter"
        className={ `category-button ${filter === ''
          ? 'selected-category'
          : ''}` }
        onClick={ () => {
          setFilter('');
          searchAll();
        } }
      >
        All
      </button>
      {
        categories.map((item, i) => (
          <button
            type="button"
            data-testid={ `${item.Category}-category-filter` }
            key={ `${item.Category}-${i}` }
            value={ item.Category }
            className={ `category-button ${filter === item.Category
              ? 'selected-category'
              : ''}` }
            onClick={ (e) => {
              if (filter === e.target.value) {
                setFilter('');
                searchAll();
              } else {
                setFilter(e.target.value);
                filterCategory(e);
              }
            } }
          >
            { item.Category }
          </button>
        ))
      }
    </div>
  );
}

CategoryBar.propTypes = {
  currentPage: propTypes.string.isRequired,
  setFilter: propTypes.func.isRequired,
  filter: propTypes.string.isRequired,
};
