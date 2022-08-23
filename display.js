import { recipes as lists } from "/recipes.js";
import { recipesContainer,
        ingredientsSuggestContainer,
        inputIngredients,
        tagsContainer,
        suggestKeywords,


 } from "/DOM.js";


// RECIPES SECTION
// Create initial cards
const createCards = (recipes) => {
  recipesContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.setAttribute("id", "recipe_card");
    recipeCard.classList.add(
      "col-md-3",
      "d-flex",
      "flex-column",
      "mx-4",
      "my-5"
    );
    recipeCard.innerHTML = `
      <div id="img_card" class="w-100 h-50"></div>
      <div id="info_recipe" class="p-4">
      <div id="title_time_container" class="d-flex justify-content-between">
      <div id="title_container">
      <span id="title">${recipe.name}</span>
      </div>
      <div id="time_container" class="d-flex">
      <div><i id="clock" class="fa-regular fa-clock"></i></div>
      <div id="time">${recipe.time} min</div>
      </div>
      </div>
      <div id="ingredients_and_description_container" class="d-flex">
      <div id="ingredients_container">
      <ul id="ingredients_list">
      ${recipe.ingredients
        .map(
          (i) =>
            `<li>${i.ingredient}: ${i.quantity === undefined ? `` : i.quantity} 
          ${i.unit === undefined ? `` : i.unit}</li>`
        )
        .join("")}
          </ul>
          </div>
          <div id="description_container">
          <article id="article">${recipe.description}
          </article>
          </div>
          </div>
          </div>
          `;

    recipesContainer.append(recipeCard);
  });
};
createCards(lists);

const displaySuggestContainer = (ingredients) => {
  ingredientsSuggestContainer.innerHTML = `${ingredients.map((ingdt) => 
    `<option class="suggestions-words">${ingdt}</option>`).join(" ")}`;
  !inputIngredients.value.includes(ingredients) ? ingredientsSuggestContainer.style.display = "flex" : 
  ingredientsSuggestContainer.style.display = "none";
};

const displayTags = (tags) => {
  tagsContainer.innerHTML = `${tags.map((tag) => `<div class="tag">${tag}</div>`)}`;
};

const eventTag =() => {
  suggestKeywords.forEach((keyword) => {
  keyword.addEventListener("click", displayTags);
});
};
eventTag();







export { createCards, displaySuggestContainer };
