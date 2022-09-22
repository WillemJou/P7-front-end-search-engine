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
  createErrorMsg,
  createIngredientsSuggestContainer,
  createAppliancesSuggestContainer,
  createUstensilsSuggestContainer,
} from "./display.js";

// generic FUNCTIONS for working with arrays
const removeDuplicate = (list) => {
  return list.filter((element, index) => list.indexOf(element) === index);
};

const toStringAndToLowerCase = (item) => item.toString().toLowerCase();

const mappedIngredients = (recipe) => {
  return recipe.ingredients
    .map((i) => i.ingredient)
    .toString()
    .toLowerCase();
};


// Algo main bar
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
  if (!recipeFilter.length) {
    createErrorMsg();
    return [];
  };
  return recipeFilter;
};

const mainBarFilterFunction = () => {
  const inputValues = mainInput.value;
  const mainInputFiltered = mainSearchResult();
  const tagInputFiltered = tagSearchResult(mainInputFiltered);
  // Display result
  if (inputValues.length >= 3) {
    return createCards(tagInputFiltered);
    
  } else {
    if(tagsContainer.style.display != 'flex'){
      return createCards(tagInputFiltered);
    }
    return createCards(lists);
  }
};

mainInput.addEventListener("input", mainBarFilterFunction);

// FILTER TAG
// GETS ALL TAGS FROM NODES
const getTags = () => {
  const tags = document.querySelectorAll(".tags");
  const tagArr = Array.from(tags);
  const trimAndStringifyTagArr = tagArr.map((tag) => toStringAndToLowerCase(tag.innerText.trim()));
  return trimAndStringifyTagArr;
};

// MATCH TAG WITH RECIPE
const tagSearchResult = () => {
  const allRecipes = mainSearchResult();
  const tags = getTags();

  if (!tags.length) {
    return allRecipes;
  }
  // GET Arrays TO FILTER
  const recipesFilterWithTags = allRecipes.filter((recipes) => {
    const ingredients = recipes.ingredients.map((i) =>
      i.ingredient.toLowerCase()
    );
    const appliances = recipes.appliance.toString().toLowerCase();
    const ustensils = recipes.ustensils.map((item) => item.toString().toLowerCase());
   
    //  ! METHOD TO FIND IF TAGS ARE INCLUDES IN ARRAYS
    const elements = [...ingredients, appliances, ...ustensils];
    return tags.every((item) => elements.includes(item))  
  });
  if (!recipesFilterWithTags.length) {
     createErrorMsg();
  };
   return recipesFilterWithTags;
};

// research for advanced search inputs
//  GET INGREDIENTS
const findIngredients = (lowerCaseIngredientsSearch) => {
  const getIngredientsFromRecipeFilter = tagSearchResult().map((recipe) => {
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
  return {
    matchIngredientsWithInput,
    allIngredients,
    ingredientFilteredRecipes,
  };
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
  const { matchIngredientsWithInput, allIngredients } = ingredientsFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
});

ingredientsChevronsDown.addEventListener("click", () => {
  const { matchIngredientsWithInput, allIngredients } = ingredientsFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
});

// APPLIANCES LISTS
// GET APPLIANCES
const findAppliances = (lowerCaseAppliancesSearch) => {
  const appliances = tagSearchResult().map((list) => list.appliance);
  const allAppliances = removeDuplicate(appliances);
  const matchAppliancesWithMainInput = allAppliances.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseAppliancesSearch);
  });
  const appliancesfilteredRecipes = tagSearchResult().filter((f) => {
    const appl = f.appliance.toString().toLowerCase();
    return appl.includes(lowerCaseAppliancesSearch);
  });

  return {
    matchAppliancesWithMainInput,
    allAppliances,
    appliancesfilteredRecipes,
  };
};

const appliancesFilter = () => {
  const inputAppliancesValues = inputAppliances.value;
  const lowerCaseAppliancesSearch = inputAppliancesValues.toLowerCase();
  return findAppliances(lowerCaseAppliancesSearch);
};

// EVENT INPUT
mainInput.addEventListener("input", () => {
  const { matchAppliancesWithMainInput, allAppliances } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithMainInput, allAppliances);
});

inputAppliances.addEventListener("input", () => {
  const { matchAppliancesWithMainInput, allAppliances } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithMainInput, allAppliances);
});

appliancesChevronsDown.addEventListener("click", () => {
  const { matchAppliancesWithMainInput, allAppliances } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithMainInput, allAppliances);
});

//GET USTENSILS
const findUstensils = (lowerCaseUstensilsSearch) => {
  const ustensils = tagSearchResult().map((list) => list.ustensils);
  const flatUstensils = ustensils.flat();
  // USTENSILS LISTS
  const allUstensils = removeDuplicate(flatUstensils);
  const matchUstensilsWithInput = allUstensils.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseUstensilsSearch);
  });
  const ustensilsFilteredRecipes = tagSearchResult().filter((f) => {
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
  const { matchUstensilsWithInput, allUstensils } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allUstensils);
});

ustensilsChevronsDown.addEventListener("click", () => {
  const { matchUstensilsWithInput, allUstensils } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allUstensils);
});

export { mainBarFilterFunction, mainSearchResult, tagSearchResult };
