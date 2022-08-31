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

// Algo main bar 
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

    // Display result or return all cards
    return createCards(recipeFilter);
  } else {
    return createCards(lists);
  }
};
inputResearchBar.addEventListener("input", mainBarFilterFunction);


// research for advanced search inputs
// INGREDIENTS
const ingredientsFilterFunction = () => {
  const inputValues = inputResearchBar.value;
  const inputIngredientValues = inputIngredients.value;
  const lowerCaseIngredientSearch = inputIngredientValues.toLowerCase();
  if (inputIngredientValues.length >= 3) {
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
    const ingredientsFilter = recipeFilter.filter((recipe) => {
      const ingredients = recipe.ingredients
      .map((i) => i.ingredient)
      .toString()
      .toLowerCase();
      return ingredients.includes(lowerCaseIngredientSearch);
    });
      return createCards(ingredientsFilter);
    } else {
      return mainBarFilterFunction();
    }
  };
  inputIngredients.addEventListener("input", ingredientsFilterFunction);
  

 
  


// APPLIANCES
const appliancesFilterFunction = () => {
  const inputValues = inputResearchBar.value;
  const inputAppliancesValues = inputAppliances.value;
  const lowerCaseAppliancesSearch = inputValues.toLowerCase();
  if (inputAppliancesValues.length >= 3) {
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
    const appliancesFilter = recipeFilter.filter((recipe) => {
      const appliances = recipe.appliance.toString().toLowerCase();
      return appliances.includes(lowerCaseAppliancesSearch);
    });
    console.log(appliancesFilter);
    // Display result of input inside dropdown
    return createCards(appliancesFilter);
  } else {
    return mainBarFilterFunction();
  }
};
inputAppliances.addEventListener("input", appliancesFilterFunction);

// USTENSILS
const ustensilsFilterFunction = () => {
  const inputValues = inputResearchBar.value;
  const inputUstensilsValues = inputUstensils.value;
  const lowerCaseUstensilsSearch = inputValues.toLowerCase();
  if (inputUstensilsValues.length >= 3) {
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
    const ustensilsFilter = recipeFilter.filter((recipe) => {
      const ustensils = recipe.ustensils.toString().toLowerCase();
      return ustensils.includes(lowerCaseUstensilsSearch);
    });
    // Display result of input inside dropdown
    return createCards(ustensilsFilter);
  } else {
    return mainBarFilterFunction();
  }
};
inputUstensils.addEventListener("input", ustensilsFilterFunction);
















// Algo Key-Words
// INGREDIENTS
const findIngredients = () => {
  const inputValues = inputResearchBar.value;
  const inputIngredientsValues = inputIngredients.value;
  const lowerCaseIngredientsSearch = inputIngredientsValues.toLowerCase();
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
const getIngredientsFromRecipeFilter = recipeFilter.map((recipe) => {
  const ingredients = recipe.ingredients.map((i) => i.ingredient);
  return ingredients;
});
const flatIngredients = getIngredientsFromRecipeFilter.flat();
const removeDuplicate = flatIngredients.filter((element, index) => {
  return flatIngredients.indexOf(element) === index;
});
if (inputIngredientsValues.length >= 1) {
  const matchIngredientsWithInput = removeDuplicate.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseIngredientsSearch);
  });
  const layoutSuggestions = matchIngredientsWithInput;
  
  return createIngredientsSuggestContainer(layoutSuggestions);

} else {
    ingredientsSuggestContainer.style.display = "none";
}};
inputIngredients.addEventListener("input", findIngredients);


// APPLIANCES
const findAppliances = () => {
  const inputValues = inputResearchBar.value;
  const inputAppliancesValues = inputAppliances.value;
  const lowerCaseAppliancesSearch = inputAppliancesValues.toLowerCase();
  if (inputAppliancesValues.length >= 3) {
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
  const appliances = recipeFilter.map((list) => list.appliance);
  console.log(appliances);
  const matchAppliancesWithInput = appliances.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseAppliancesSearch);
  });
  const removeDuplicate = matchAppliancesWithInput.filter((element, index) => {
   return matchAppliancesWithInput.indexOf(element) === index;
  });
  const layoutSuggestions = removeDuplicate;
  
  return createAppliancesSuggestContainer(layoutSuggestions);
} else {
  appliancesSuggestContainer.style.display = "none";
}};
inputAppliances.addEventListener("input", findAppliances);

// USTENSILS
const findUstensils = () => {
  const inputValues = inputResearchBar.value;
  const inputUstensilsValues = inputUstensils.value;
  const lowerCaseUstensilsSearch = inputUstensilsValues.toLowerCase();
  if (inputUstensilsValues.length >= 3) {
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
  const ustensils = lists.map((list) => list.ustensils);
  const flatIngredients = ustensils.flat();
  const matchUstensilsWithInput = flatIngredients.filter((f) => {
    return f.toString().toLowerCase().includes(lowerCaseUstensilsSearch);
  });
  const removeDuplicate = matchUstensilsWithInput.filter((element, index) => {
    return matchUstensilsWithInput.indexOf(element) === index;
  });
  const layoutSuggestions = removeDuplicate;
  
  return createUstensilsSuggestContainer(layoutSuggestions);
} else {
  ustensilsSuggestContainer.style.display = "none";
}};

inputUstensils.addEventListener("input", findUstensils);
