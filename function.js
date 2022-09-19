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
    } else
    return recipeFilter;
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
 const tagArr = Array.from(tags).map(tag => tag.innerText);
 return toStringAndToLowerCase(tagArr); 
};

// MATCH TAG WITH RECIPE
const tagSearchResult = () => {
  const recipes = mainSearchResult();
  const tags = getTags();
  if (!tags.length){
    return recipes;
  };  
  const recipesFilterWithTags = recipes.filter( recipe => {
    const ingredientRecipes = recipe.ingredients.map( (i) => i.ingredient.toLowerCase());
   console.log(ingredientRecipes);
    const filterTag = ingredientRecipes.includes(tags);
   console.log(filterTag);
    return filterTag;
  });
  return recipesFilterWithTags;
}

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

  return { matchIngredientsWithInput, 
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
  const { matchIngredientsWithInput, 
          allIngredients } = ingredientsFilter();
  createIngredientsSuggestContainer(matchIngredientsWithInput, allIngredients);
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
  const { matchAppliancesWithInput, allAppliances } = appliancesFilter();
  createAppliancesSuggestContainer(matchAppliancesWithInput, allAppliances);
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
  const { matchUstensilsWithInput } = ustensilsFilter();
    createUstensilsSuggestContainer(matchUstensilsWithInput, allAppliances);
});

ustensilsChevronsDown.addEventListener("click", () => {
  const { matchUstensilsWithInput, allUstensils } = ustensilsFilter();
  createUstensilsSuggestContainer(matchUstensilsWithInput, allUstensils);
});

export { mainBarFilterFunction, mainSearchResult, tagSearchResult  };
