let localPath = '/recipes.js';


// // DOM 

const ingredientsButton = document.getElementById("ingredients");
const equipmentsButton = document.getElementById("equipments");
const ustensilsButton = document.getElementById("ustensils");

// bootstrap function for dropdowns 
$('.dropdown-toggle').dropdown();

async function getRecipes() {
    const res = await fetch(localPath);
    const data = await res.json()
    return ({data})  
} 

function displayData(recipes) {
    const recipesSection = document.querySelector(".recipes-section");
        
    recipes.forEach((recipe) => {
        const recipeModel = recipesClass(recipe); 
        const recipesCardDOM = recipeModel.getRecipesCardDOM();
        recipesSection.appendChild(recipesCardDOM);
    });
};
    
async function init() {
    // retrieve data recipes  
    const { data } = await getRecipes();
    displayData(data.recipes);
};
    
init();
