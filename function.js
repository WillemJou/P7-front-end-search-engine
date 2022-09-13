import { recipes as lists } from "/recipes.js";
import {
  inputIngredients,
  inputAppliances,
  inputUstensils,
  mainInput,
  ingredientsChevronsDown,
  appliancesChevronsDown,
  ustensilsChevronsDown,
  tagsContainer,
} from "./DOM.js";

import {
  createCards,
  createIngredientsSuggestContainer,
  createAppliancesSuggestContainer,
  createUstensilsSuggestContainer,
} from "./display.js";

// Message d'erreur si aucunes recettes n'est affichées ? A faire
const removeDuplicate = (list) =>
  list.filter((element, index) => list.indexOf(element) === index);

const mappedIngredients = (recipe) => {
  return recipe.ingredients
    .map((i) => i.ingredient)
    .toString()
    .toLowerCase();
};


const mainSearchResult = () => {
  const inputValues = mainInput.value;
  const lowerCaseSearch = inputValues.toLowerCase();
  const recipeFilter = lists.filter((recipe) => {
    const name = recipe.name.toLowerCase();
    const description = recipe.description.toLowerCase();
    const ingredient = mappedIngredients(recipe);
    return (
      name.includes(lowerCaseSearch) ||
      description.includes(lowerCaseSearch) ||
      ingredient.includes(lowerCaseSearch)
      );
    });
    return recipeFilter;
  };
  
  // Algo main bar
  const mainBarFilterFunction = () => {
    const inputValues = mainInput.value;
    if (inputValues.length >= 3) {
      // Display result or return all cards
      return createCards(mainSearchResult());
    } else {
    return createCards(lists);
  }
};
mainInput.addEventListener("input", mainBarFilterFunction);



// research for advanced search inputs
//  GET INGREDIENTS
const findIngredients = (lowerCaseIngredientsSearch) => {
  const getIngredientsFromRecipeFilter = mainSearchResult().map((recipe) => {
    const ingredients = recipe.ingredients.map((i) => i.ingredient);
    return ingredients;
  });
  // INGREDIENTS LISTS
  const flatIngredients = getIngredientsFromRecipeFilter.flat();
  const allIngredients = removeDuplicate(flatIngredients);              
const matchIngredientsWithInput = allIngredients.filter((f) => {
  return f.toString().toLowerCase().includes(lowerCaseIngredientsSearch);
});

  const ingredientFilteredRecipes = mainSearchResult().filter((f) => {
    return mappedIngredients(f).includes(lowerCaseIngredientsSearch);
  });
  const findAppliances = ingredientFilteredRecipes.map((list) => list.appliance);
  const matchAppliancesWithIngredientRecipes = removeDuplicate(findAppliances);
  
  return { matchIngredientsWithInput, matchAppliancesWithIngredientRecipes, 
    allIngredients, ingredientFilteredRecipes };
  
  };  
  const ingredientsFilter = () => {
    const inputIngredientsValues = inputIngredients.value;
    const lowerCaseIngredientsSearch = inputIngredientsValues.toLowerCase();
    return findIngredients(lowerCaseIngredientsSearch);
  };
  
  
  // EVENT INPUT
  mainInput.addEventListener("input", () => {
  const { matchIngredientsWithInput, allIngredients } = ingredientsFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
});

inputIngredients.addEventListener("input", () => {
  const { matchIngredientsWithInput, matchAppliancesWithIngredientRecipes, 
          allIngredients, ingredientFilteredRecipes } = ingredientsFilter();
  const { allAppliances } = appliancesFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
  createAppliancesSuggestContainer(matchAppliancesWithIngredientRecipes, allAppliances);
  createCards(ingredientFilteredRecipes);
});

ingredientsChevronsDown.addEventListener("click", () => {
  const { matchIngredientsWithInput, allIngredients } = ingredientsFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
});
// APPLIANCES LISTS
// GET APPLIANCES
const findAppliances = (lowerCaseAppliancesSearch ) => {
const appliances = mainSearchResult().map((list) => list.appliance);
  const allAppliances = removeDuplicate(appliances);
  const matchAppliancesWithInput = allAppliances.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseAppliancesSearch);
  });
  const appliancesfilteredRecipes = mainSearchResult().filter((f) => {
    const appl = f.appliance.toString().toLowerCase();
    return appl.includes(lowerCaseAppliancesSearch);
  });
  return {
    matchAppliancesWithInput,
    allAppliances,
    appliancesfilteredRecipes,
  };
};

const appliancesFilter = () => {
  const inputAppliancesValues = inputAppliances.value;
  const lowerCaseAppliancesSearch = inputAppliancesValues.toLowerCase();
  return findAppliances(lowerCaseAppliancesSearch );
};

// EVENT INPUT
mainInput.addEventListener("input", () => {
  const { matchAppliancesWithInput, allAppliances } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithInput, allAppliances);
});

inputAppliances.addEventListener("input", () => {
  const { matchAppliancesWithInput, allAppliances, appliancesfilteredRecipes } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithInput, allAppliances);
  createCards(appliancesfilteredRecipes);
});

appliancesChevronsDown.addEventListener("click", () => {
  const { matchAppliancesWithInput, allAppliances } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithInput, allAppliances);
});

//GET USTENSILS
const findUstensils = (lowerCaseUstensilsSearch) => {
  const ustensils = mainSearchResult().map((list) => list.ustensils);
  const flatUstensils = ustensils.flat();
  // USTENSILS LISTS
  const allUstensils = removeDuplicate(flatUstensils);
  const matchUstensilsWithInput = allUstensils.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseUstensilsSearch);
  });
  const ustensilsFilteredRecipes = mainSearchResult().filter((f) => {
    const ustensil = f.ustensils.toString().toLowerCase();
    return ustensil.includes(lowerCaseUstensilsSearch);
  });
  return { matchUstensilsWithInput, allUstensils, ustensilsFilteredRecipes };
};
const ustensilsFilter = () => {
  const inputUstensilsValues = inputUstensils.value;
  const lowerCaseUstensilsSearch = inputUstensilsValues.toLowerCase();
  return findUstensils(lowerCaseUstensilsSearch);
};

// EVENT INPUT
mainInput.addEventListener("input", () => {
  const { matchUstensilsWithInput, allUstensils } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allUstensils);
});
inputUstensils.addEventListener("input", () => {
  const { matchUstensilsWithInput, allUstensils, ustensilsFilteredRecipes } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allAppliances);
  createCards(ustensilsFilteredRecipes);
});

ustensilsChevronsDown.addEventListener("click", () => {
  const { matchUstensilsWithInput, allUstensils } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allUstensils);
});

export { mainBarFilterFunction, mainSearchResult };
