import { recipes as lists } from "/recipes.js";
import { inputIngredients, inputAppliances, inputUstensils, inputResearchBar, recipesContainer} from "./DOM.js";
import { createCards } from "./display.js";



// Algo barre de recherche principale
const mainBarFilterFunction = () => {
    const inputValues = inputResearchBar.value;
    
    if (inputValues.length >= 3) {
        const lowerCaseSearch = inputValues.toLowerCase();
        
        const recipeFilter = lists.filter((recipe) => {
            const name = recipe.name.toLowerCase();
            const description = recipe.description.toLowerCase();
            const ingredients = recipe.ingredients.map((i) => i.ingredient).toString().toLowerCase();
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
                    return createCards(recipeFilter);
                };
    };
    inputResearchBar.addEventListener("input", mainBarFilterFunction);


    // Algo Key-Words
    // INGREDIENTS
    const ingredientsFilterInput = () => {
        const inputValues = inputIngredients.value;
        const lowerCaseSearch = inputValues.toLowerCase();
        if (inputIngredients.textLength >= 3) {
            
            const ingredientsFilter = lists.filter(recipe => {
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
            
            const appliancesFilter = lists.filter(recipe => {
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
            
            const ustensilsFilter = lists.filter(recipe => {
                const ustensils = recipe.ustensils.toString().toLowerCase();
                return (ustensils.includes(lowerCaseSearch));
            });
            console.log(ustensilsFilter);
             // Display result of input inside dropdown
             return recipesContainer.innerHTML =+ `<div>${ustensilsFilter}</div>`;
        };
    };
    inputUstensils.addEventListener("input", ustensilsFilterInput);

    
    
export { mainBarFilterFunction };








   
