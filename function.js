import { recipes as lists } from "/recipes.js";
import {
  inputIngredients,
  inputAppliances,
  inputUstensils,
  mainInput,
  ingredientsChevronsDown,
  appliancesChevronsDown,
  ustensilsChevronsDown,
} from "./DOM.js";

import {
  createCards,
  createErrorMsg,
  createIngredientsSuggestContainer,
  createAppliancesSuggestContainer,
  createUstensilsSuggestContainer,
} from "./display.js";

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
  if (recipeFilter == false) {
    return createErrorMsg();
  } else return recipeFilter;
};

// Algo main bar
const mainBarFilterFunction = () => {
  const inputValues = mainInput.value;
  const mainInputFiltered = mainSearchResult();
  const tagInputFiltered = tagSearchResult(mainInputFiltered);
  // Display result
  if (inputValues.length >= 3) {
    return createCards(tagInputFiltered);
  } else {
    createCards(lists);
  }
};

mainInput.addEventListener("input", mainBarFilterFunction);

// FILTER TAG
// GETS ALL TAGS FROM NODES
const getTags = () => {
  const tags = document.querySelectorAll(".tags");
  const tagArr = Array.from(tags).map((tag) => tag.innerText);
  return toStringAndToLowerCase(tagArr);
};

// MATCH TAG WITH RECIPE
const tagSearchResult = () => {
  const recipes = mainSearchResult();
  const tags = getTags();
  console.log(tags);
  if (!tags.length) {
    return recipes;
  }
  // GET Arrays TO FILTER
  const recipesFilterWithTags = recipes.filter((recipe) => {
    const ingredients = recipe.ingredients.map((i) =>
      i.ingredient.toLowerCase()
    );
    const appliances = recipe.appliance.toLowerCase();
    console.log(ingredients);
    console.log(appliances);
    const ustensils = recipe.ustensils.toString().toLowerCase();
    console.log(ustensils);

    // METHOD TO FIND IF TAGS ARE INCLUDES IN ARRAYS
    const filterTags = () => {
      const ingredientsfilterTag = ingredients.includes(tags);
      console.log(ingredientsfilterTag);
      const appliancesfilterTag = appliances.includes(tags);
      console.log(appliancesfilterTag);
      const ustensilsfilterTag = ustensils.includes(tags);
      console.log(ustensilsfilterTag);
    };
    return filterTags;
  });
  if (recipesFilterWithTags == false) {
    return createErrorMsg();
  } else return recipesFilterWithTags;
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
  console.log(allIngredients);
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
  const appliancesfilteredRecipes = mainSearchResult().filter((f) => {
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
  const { matchUstensilsWithInput } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allAppliances);
});

ustensilsChevronsDown.addEventListener("click", () => {
  const { matchUstensilsWithInput, allUstensils } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allUstensils);
});

export { mainBarFilterFunction, mainSearchResult, tagSearchResult };
