import { recipes as lists } from "/recipes.js";
import {
  inputIngredients,
  inputAppliances,
  inputUstensils,
  inputResearchBar,
  ingredientsChevronsDown,
  ingredientsChevronsUp,
  ingredientsSuggestContainer,
  appliancesSuggestContainer,
  ustensilsSuggestContainer,
} from "./DOM.js";
import {
  createCards,
  createIngredientsSuggestContainer,
  createAppliancesSuggestContainer,
  createUstensilsSuggestContainer,
} from "./display.js";

// Message d'erreur si aucunes recettes n'est affichées ? A faire

const mappedIngredients = (recipe) => {
 return recipe.ingredients
    .map((i) => i.ingredient)
    .toString()
    .toLowerCase();
};
    const mainSearchResult = () => {
    const inputValues = inputResearchBar.value;
  const lowerCaseSearch = inputValues.toLowerCase();
  const recipeFilter = lists.filter((recipe) => {
    const name = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    const ingredient = mappedIngredients(recipe);
    return (
      name.includes(lowerCaseSearch) ||
      description.includes(lowerCaseSearch) ||
      ingredient.includes(lowerCaseSearch));
  });
  return recipeFilter;
};

// Algo main bar
const mainBarFilterFunction = () => {
  const inputValues = inputResearchBar.value;
  if (inputValues.length >= 3) {
    // Display result or return all cards
    return createCards(mainSearchResult(inputValues));
  } else {
    return createCards(lists);}};
inputResearchBar.addEventListener("input", mainBarFilterFunction);

// research for advanced search inputs 
// INGREDIENTS
const ingredientsFilterFunction = () => {
  const inputIngredientsValues = inputIngredients.value;
  const lowerCaseIngredientsSearch = inputIngredientsValues.toLowerCase();
  if (inputIngredientsValues.length > 0) {
    const findIngredients = () => {
      const getIngredientsFromRecipeFilter = mainSearchResult().map(
        (recipe) => {
          const ingredients = recipe.ingredients.map((i) => i.ingredient);
          return ingredients;
        } 
      );
      const flatIngredients = getIngredientsFromRecipeFilter.flat();
      const removeDuplicate = flatIngredients.filter((element, index) => {
        return flatIngredients.indexOf(element) === index;
      });
      const matchIngredientsWithInput = removeDuplicate.filter((f) => {
        return f.toString().toLowerCase().includes(lowerCaseIngredientsSearch);
      });
      const ingredientsFilter = mainSearchResult().filter((recipe) => {
        const ingredients = mappedIngredients(recipe);
        return ingredients.includes(lowerCaseIngredientsSearch);
      });
      return { displayCards: createCards(ingredientsFilter),
        Suggests: createIngredientsSuggestContainer(matchIngredientsWithInput)
      };
    };
    inputIngredients.addEventListener("input", findIngredients);
  } else {
    return mainBarFilterFunction();
  }
};
inputIngredients.addEventListener("input", ingredientsFilterFunction);

// APPLIANCES
const appliancesFilterFunction = () => {
  const inputAppliancesValues = inputAppliances.value;
  const lowerCaseAppliancesSearch = inputAppliancesValues.toLowerCase();
  if (inputAppliancesValues.length > 0) {
    const findAppliances = () => {
        const appliances = mainSearchResult().map((list) => list.appliance);
        const matchAppliancesWithInput = appliances.filter((f) => {
          return f.toString().toLowerCase().includes(lowerCaseAppliancesSearch);
        });
        const removeDuplicate = matchAppliancesWithInput.filter(
          (element, index) => {
            return matchAppliancesWithInput.indexOf(element) === index;});
    const appliancesFilter = mainSearchResult().filter((recipe) => {
      const appliances = recipe.appliance.toString().toLowerCase();
      return appliances.includes(lowerCaseAppliancesSearch);
    });
    // Display result of input inside dropdown
    return { displayCards: createCards(appliancesFilter),
            suggests: createAppliancesSuggestContainer(removeDuplicate)};
    };
    inputAppliances.addEventListener("input", findAppliances);
  } else { 
    return mainBarFilterFunction();
  }
};
inputAppliances.addEventListener("input", appliancesFilterFunction);

// USTENSILS
const ustensilsFilterFunction = () => {
  const inputUstensilsValues = inputUstensils.value;
  const lowerCaseUstensilsSearch = inputUstensilsValues.toLowerCase();
  if (inputUstensilsValues.length > 0) {
    const findUstensils = () => {
        const ustensils = mainSearchResult().map((list) => list.ustensils);
        const flatUstensils = ustensils.flat();
        const matchUstensilsWithInput = flatUstensils.filter((f) => {
          return f.toString().toLowerCase().includes(lowerCaseUstensilsSearch);
        });
        const removeDuplicate = matchUstensilsWithInput.filter(
          (element, index) => {
          return matchUstensilsWithInput.indexOf(element) === index;});
    const ustensilsFilter = mainSearchResult().filter((recipe) => {
      const ustensils = recipe.ustensils.toString().toLowerCase();
      return ustensils.includes(lowerCaseUstensilsSearch);
    });
    // Display result of input inside dropdown
    return { displayCards: createCards(ustensilsFilter),
             suggests: createUstensilsSuggestContainer(removeDuplicate)};
    };
    inputUstensils.addEventListener("input", findUstensils);
    } else {
    return mainBarFilterFunction();}};
inputUstensils.addEventListener("input", ustensilsFilterFunction);

// USTENSILS

