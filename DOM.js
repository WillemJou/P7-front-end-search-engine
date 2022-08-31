
// input principal
const inputResearchBar = document.querySelector(".input-search");
// card's container
const recipesContainer = document.querySelector("#row_layout");
// chevrons
const chevrons = document.querySelectorAll(".chevron");
const ingredientsChevronsUp = document.querySelectorAll(".ingredients-chevron-up");
const ingredientsChevronsDown = document.querySelectorAll(".ingredients-chevron-down");
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
const ingdtsTagsContainer = document.querySelector(".ingredients-tags-container");
const applTagsContainer = document.querySelector(".appliances-tags-container");
const ustlsTagsContainer = document.querySelector(".ustensils-tags-container");


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
        ingdtsTagsContainer,
        applTagsContainer,
        ustlsTagsContainer,
        chevrons,
        ingredientsChevronsDown,
        ingredientsChevronsUp,
 };





