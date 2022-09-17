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
  let recipeFilter = [];
  let ingArr = [];
  for (let i = 0; i < lists.length; i ++) {
    for (let ing of lists[i].ingredients) {
      ingArr.push(ing.ingredient.toLowerCase());
    }
    if (
      lists[i].name.toLowerCase().includes(lowerCaseSearch) ||
      ingArr.includes(lowerCaseSearch ) ||
      lists[i].description.toLowerCase().includes(lowerCaseSearch)
    ) {
      return recipeFilter.push(lists[i]);
    };
    console.log(recipeFilter);
};
};


  // Algo main bar
  const mainBarFilterFunction = () => {
    const inputValues = mainInput.value;
    const mainInputFiltered = mainSearchResult();
   // const tagInputFiltered = tagSearchResult(mainInputFiltered);
  // Display result
  if (inputValues.length >= 3) {
    return createCards(mainInputFiltered);
  } else { createCards(lists)
  };
};

// FILTER TAG
const getTags = () => {
  const tags = document.querySelectorAll(".tag-ingredients");
 const lowerCaseTags = Array.from(tags).map(tg => tg.innerText);
 return lowerCaseTags.toString().toLowerCase();
};
// MATCH TAG WITH RECIPE
const tagSearchResult = () => {
  const recipes = mainSearchResult();
  const tags = getTags();
  console.log(tags);
  console.log(recipes);
  if (!tags.length){
    return recipes;
  };
  const filterTag =  recipes.filter(recipe => {
    const ingredientRecipes = recipes.map(recipe => recipe.ingredients.map( i => i.ingredient));
    console.log(ingredientRecipes);
    const l = ingredientRecipes.map(i => i.toString().toLowerCase());
    console.log(l);
    const matchTags = l.includes(tags);
    console.log(matchTags);
    return recipe.includes(matchTags);
  });
  console.log(filterTag); 
  return filterTag; 
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
  const {
    matchIngredientsWithInput,
    allIngredients,
  } = ingredientsFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
});
ingredientsChevronsDown.addEventListener("click", () => {
  const { matchIngredientsWithInput, allIngredients } = ingredientsFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
  tagSearchResult();
});

// APPLIANCES LISTS
// GET APPLIANCES
const findAppliances = (lowerCaseAppliancesSearch) => {
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
  return findAppliances(lowerCaseAppliancesSearch);
};

// EVENT INPUT
mainInput.addEventListener("input", () => {
  const { matchAppliancesWithInput, allAppliances } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithInput, allAppliances);
});

inputAppliances.addEventListener("input", () => {
  const { matchAppliancesWithInput, allAppliances, appliancesfilteredRecipes } =
    appliancesFilter();
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
  const { matchUstensilsWithInput, allUstensils, ustensilsFilteredRecipes } =
    ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allAppliances);
  createCards(ustensilsFilteredRecipes);
});

ustensilsChevronsDown.addEventListener("click", () => {
  const { matchUstensilsWithInput, allUstensils } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allUstensils);
});

export { mainBarFilterFunction, mainSearchResult };
