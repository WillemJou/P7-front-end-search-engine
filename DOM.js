
// input principal
const inputResearchBar = document.querySelector(".input-search");
// card's container
const recipesContainer = document.querySelector("#row_layout");
// chevrons
const ingredientsChevronsUp = document.querySelector(".ingredients-chevron-up");
const ingredientsChevronsDown = document.querySelector(".ingredients-chevron-down");
const appliancesChevronsUp = document.querySelector(".appliances-chevron-up");
const appliancesChevronsDown = document.querySelector(".appliances-chevron-down");
const ustensilsChevronsUp = document.querySelector(".ustensils-chevron-up");
const ustensilsChevronsDown = document.querySelector(".ustensils-chevron-down");
// input tags
const inputIngredients = document.querySelector(".ingredients-input");
const inputAppliances = document.querySelector(".appliances-input");
const inputUstensils = document.querySelector(".ustensils-input");
// dropdown btn
const ingredientsBtn = document.querySelector("#ingredients_btn");
const appliancesBtn = document.querySelector("#appliances_btn");
const ustensilsBtn = document.querySelector("#ustensils_btn");

// DIV ingredient suggest
const ingredientsSuggestContainer = document.querySelector(".ingredients-keywords");
const appliancesSuggestContainer = document.querySelector(".appliances-keywords");
const ustensilsSuggestContainer = document.querySelector(".ustensils-keywords");
const suggestKeywords = document.querySelectorAll(".suggestions-words");
const tagsContainer = document.querySelector((".tags-container"));


export {inputResearchBar, 
        recipesContainer, 
        inputAppliances, 
        inputIngredients, 
        inputUstensils,
         ingredientsBtn,
          appliancesBtn,
           ustensilsBtn,
        ingredientsSuggestContainer,
        appliancesSuggestContainer,
        ustensilsSuggestContainer,
        suggestKeywords,
        tagsContainer,
        ingredientsChevronsDown,
        ingredientsChevronsUp,
        appliancesChevronsDown,
        appliancesChevronsUp,
        ustensilsChevronsDown,
        ustensilsChevronsUp,
 };





