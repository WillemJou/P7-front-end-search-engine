import { recipes } from "/recipes.js";
import {inputIngredients, inputAppliances, inputUstensils, inputResearchBar, recipesContainer} from "./DOM.js";
import { GenerateCards} from "/display.js";

// Algo barre de recherche principale
const mainBarfilterFunction = () => {
    const inputValues = inputResearchBar.value;
    console.log(inputValues);
    const lowerCaseSearch = inputValues.toLowerCase();

    if (inputResearchBar.textLength >= 3) {

      recipesContainer.innerHTML = "";
    
      const recipeFilter = recipes.filter((recipe) => {
        const name = recipe.name.toLowerCase();
        const description = recipe.description.toLowerCase();
        const ingredients = recipe.ingredients.map(i => i.ingredient).toString().toLowerCase();
         return (
           name.includes(lowerCaseSearch) ||
           description.includes(lowerCaseSearch) ||
           ingredients.includes(lowerCaseSearch)
           );
          });
        //   if (recipeFilter.length = 0) {
        //    return recipesContainer.innerHTML = `"Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson »..."`
        // }
        //   else {
          console.log(recipeFilter);
          return GenerateCards(recipeFilter);
          
        };
    };
    inputResearchBar.addEventListener("input", mainBarfilterFunction);


    // Algo Key-Words
    // INGREDIENTS
    const ingredientsFilterInput = () => {
        const inputValues = inputIngredients.value;
        const lowerCaseSearch = inputValues.toLowerCase();
        if (inputIngredients.textLength >= 3) {
            
            const ingredientsFilter = recipes.filter(recipe => {
                const ingredients = recipe.ingredients.map(i => i.ingredient).toString().toLowerCase();
                return (ingredients.includes(lowerCaseSearch));
            });
            console.log(ingredientsFilter);
             // Display result of input inside dropdown
            return recipesContainer.innerHTML =+ `<div>${ingredientsFilter}</div>`;
        };
    };
    inputIngredients.addEventListener("input", ingredientsFilterInput);

    // APPLIANCES
    const appliancesFilterInput = () => {
        const inputValues = inputAppliances.value;
        const lowerCaseSearch = inputValues.toLowerCase();
        if (inputAppliances.textLength >= 3) {
            
            const appliancesFilter = recipes.filter(recipe => {
                const appliances = recipe.appliance.toString().toLowerCase();
                return (appliances.includes(lowerCaseSearch));
            });
            console.log(appliancesFilter);
                // Display result of input inside dropdown
            return recipesContainer.innerHTML =+ `<div>${appliancesFilter}</div>`;
        };
    };
    inputAppliances.addEventListener("input", appliancesFilterInput);

    // USTENSILS
    const ustensilsFilterInput = () => {
        const inputValues = inputUstensils.value;
        const lowerCaseSearch = inputValues.toLowerCase();
        if (inputUstensils.textLength >= 3) {
            
            const ustensilsFilter = recipes.filter(recipe => {
                const ustensils = recipe.ustensils.toString().toLowerCase();
                return (ustensils.includes(lowerCaseSearch));
            });
            console.log(ustensilsFilter);
             // Display result of input inside dropdown
             return recipesContainer.innerHTML =+ `<div>${ustensilsFilter}</div>`;
        };
    };
    inputUstensils.addEventListener("input", ustensilsFilterInput);

    
    









   
