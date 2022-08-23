import { recipes as lists } from "/recipes.js";
import {
  inputIngredients,
  inputAppliances,
  inputUstensils,
  inputResearchBar,
  ingredientsSuggestContainer,
} from "./DOM.js";
import { 
   createCards,
   displaySuggestContainer,

  } from "./display.js";

// Message d'erreur si aucunes recettes n'est affichées ? A faire 

// Algo barre de recherche principale
const mainBarFilterFunction = () => {
  const inputValues = inputResearchBar.value;
  if (inputValues.length >= 3) {
    const lowerCaseSearch = inputValues.toLowerCase();
    const recipeFilter = lists.filter((recipe) => {
      const name = recipe.name.toLowerCase();
      const description = recipe.description.toLowerCase();
      const ingredients = recipe.ingredients
        .map((i) => i.ingredient)
        .toString()
        .toLowerCase();
      return (
        name.includes(lowerCaseSearch) ||
        description.includes(lowerCaseSearch) ||
        ingredients.includes(lowerCaseSearch)
      );
    });

    console.log(recipeFilter);
    // Display result or return all cards
    return createCards(recipeFilter);
  } else {
    return createCards(lists);
  }
};
inputResearchBar.addEventListener("input", mainBarFilterFunction);


// Algo Key-Words
// INGREDIENTS
const findIngredients = () => {
  const inputIngredientValues = inputIngredients.value;
  const lowerCaseIngredientSearch = inputIngredientValues.toLowerCase();
  if (inputIngredientValues.length >= 3) {
  const getAllIngredients = lists.map((recipe) => {
    const ingredients = recipe.ingredients.map((i) => i.ingredient);
    return ingredients;
  });
  const flatIngredients = getAllIngredients.flat();
  console.log(flatIngredients);
  const matchIngredientsWithInput = flatIngredients.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseIngredientSearch);
  });
  const removeDuplicate = matchIngredientsWithInput.filter((element, index) => {
   return matchIngredientsWithInput.indexOf(element) === index;
  });
  const layoutSuggestions = removeDuplicate;
  console.log(layoutSuggestions);
  return displaySuggestContainer(layoutSuggestions);
} else {
  ingredientsSuggestContainer.style.display = "none";
}};
inputIngredients.addEventListener("input", findIngredients);



// APPLIANCES


// USTENSILS








const ingredientsFilterFunction = () => {
  const inputIngredientValues = inputIngredients.value;
  const lowerCaseIngredientSearch = inputIngredientValues.toLowerCase();
  if (inputIngredientValues.length >= 3) {
      const ingredientsFilterRecipes = lists.filter((recipe) => {
        const ingredients = recipe.ingredients
        .map((i) => i.ingredient)
        .toString()
        .toLowerCase();
        return ingredients.includes(lowerCaseIngredientSearch);
      });
   console.log(ingredientsFilterRecipes);
      return createCards(ingredientsFilterRecipes);
    } else {
      return createCards(lists);
    }
  };
inputIngredients.addEventListener("input", ingredientsFilterFunction);


// APPLIANCES
const appliancesFilterFunction = () => {
  const inputValues = inputAppliances.value;
  const lowerCaseSearch = inputValues.toLowerCase();
  if (inputValues.length >= 3) {
    const appliancesFilter = lists.filter((recipe) => {
      const appliances = recipe.appliance.toString().toLowerCase();
      return appliances.includes(lowerCaseSearch);
    });
    console.log(appliancesFilter);
    // Display result of input inside dropdown
    return createCards(appliancesFilter);
  } else {
    return createCards(lists);
  }
};
inputAppliances.addEventListener("input", appliancesFilterFunction);

// USTENSILS
const ustensilsFilterFunction = () => {
  const inputValues = inputUstensils.value;
  const lowerCaseSearch = inputValues.toLowerCase();
  if (inputValues.length >= 3) {
    const ustensilsFilter = lists.filter((recipe) => {
      const ustensils = recipe.ustensils.toString().toLowerCase();
      return ustensils.includes(lowerCaseSearch);
    });
    console.log(ustensilsFilter);
    // Display result of input inside dropdown
    return createCards(ustensilsFilter);
  } else {
    return createCards(lists);
  }
};
inputUstensils.addEventListener("input", ustensilsFilterFunction);

export { mainBarFilterFunction, findIngredients };


