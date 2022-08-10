import {recipes} from "/recipes.js";
import { inputResearchBar} from "./DOM.js"

// Algo barre de recherche

export const filterFunction = () => {
    const inputValues = inputResearchBar.value;
    const filterRecipes = () => {
        if (inputResearchBar.textLength >= 3){
            recipes.filter( recipe => {
                recipe.name.includes(inputValues);
            });
        };
    }; 
    return filterRecipes;
};
export const eventFilter = inputResearchBar.addEventListener("input", filterFunction);