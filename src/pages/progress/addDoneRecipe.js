const formatTags = (tagStr) => {
  if (tagStr === '') return [];
  const tagArray = tagStr.split(',');
  return tagArray;
};

const addDoneRecipe = (prodInfo) => {
  let doneRecipes;
  const date = new Date();
  const newItem = {
    id: prodInfo.idMeal || prodInfo.idDrink,
    type: prodInfo.Meal ? 'food' : 'drink',
    nationality: prodInfo.Area || '',
    category: prodInfo.Category || '',
    alcoholicOrNot: prodInfo.Alcoholic || '',
    name: prodInfo.Meal || prodInfo.Drink,
    image: prodInfo.MealThumb || prodInfo.DrinkThumb,
    doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    tags: formatTags(prodInfo.Tags || ''),
  };
  if (localStorage.doneRecipes) {
    doneRecipes = [...JSON.parse(localStorage.getItem('doneRecipes')), newItem];
  } else {
    doneRecipes = [newItem];
  }
  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
};

export default addDoneRecipe;
