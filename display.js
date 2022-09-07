import { recipes as lists } from "/recipes.js";
import {
  recipesContainer,
  ingredientsSuggestContainer,
  appliancesSuggestContainer,
  ustensilsSuggestContainer,
  inputResearchBar,
  inputIngredients,
  inputUstensils,
  inputAppliances,
  tagsContainer,
  ingredientsChevronsDown,
  ingredientsChevronsUp,
  appliancesChevronsDown,
  appliancesChevronsUp,
  ustensilsChevronsDown,
  ustensilsChevronsUp
} from "/DOM.js";
import { mainSearchResult } from "/function.js";

// RECIPES SECTION
// Create initial cards
const createCards = (recipes) => {
  recipesContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.setAttribute("id", "recipe_card");
    recipeCard.classList.add("col-md-3", "d-flex", "flex-column", "my-5");
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

// FONCTION REMOVETAG
const crossRemoveTag = (node) => {
  const crossesTag = document.querySelectorAll(".cross-tag");
  crossesTag.forEach((cross) => {
    cross.style.cursor = "pointer";
    cross.style.paddingLeft = "5px";
    cross.addEventListener("click", (e) => closeLastSearch(cross));
    cross.addEventListener("click", (e) => node.style.display = "block");
    
  });
};
// return to cards according to inputmain or any recipe
const closeLastSearch = (cross) => {
  cross.parentNode.remove();
  if (inputResearchBar.value.length >= 3) {
    return createCards(mainSearchResult());
  } else {
    return createCards(lists);
  }
};

// Chevron part
const chevronEvents = () => {
  console.log("coco");
  ingredientsChevronsUp.addEventListener("click", (e) =>
  closeSuggestContainer(ingredientsSuggestContainer, ingredientsChevronsUp, ingredientsChevronsDown));
  ingredientsChevronsDown.addEventListener("click", (e) =>
    openSuggestContainer(ingredientsSuggestContainer, ingredientsChevronsUp, ingredientsChevronsDown));
    appliancesChevronsUp.addEventListener("click", (e) =>
    closeSuggestContainer(appliancesSuggestContainer, appliancesChevronsUp, appliancesChevronsDown));
    appliancesChevronsDown.addEventListener("click", (e) =>
    openSuggestContainer(appliancesSuggestContainer, appliancesChevronsUp, appliancesChevronsDown));
    ustensilsChevronsUp.addEventListener("click", (e) =>
    closeSuggestContainer(ustensilsSuggestContainer, ustensilsChevronsUp, ustensilsChevronsDown));
    ustensilsChevronsDown.addEventListener("click", (e) =>
    openSuggestContainer(ustensilsSuggestContainer, ustensilsChevronsUp, ustensilsChevronsDown));
};
  
const closeSuggestContainer = (suggestContainer, chevronUp, chevronDown) => {
    suggestContainer.style.display = "none";
    (chevronUp.style.display = "none"),
    (chevronDown.style.display = "flex");
};
  
const openSuggestContainer = (suggestContainer, chevronUp, chevronDown) => {
    suggestContainer.style.display = "flex";
    (chevronUp.style.display = "flex"),
    (chevronDown.style.display = "none");};
    // End chevron's part

const createIngredientsSuggestContainer = (ingredients, allIngredients) => {
  const mapped = ingredients
  .map(
    (ingdt) =>
    `<option class="suggestions-ingredients-words suggestions-words">${ingdt}</option>`)
    .join(" ");
  const mappedAll = allIngredients
  .map(
    (ingdt) =>
    `<option class="suggestions-ingredients-words suggestions-words">${ingdt}</option>`)
    .join(" ");
    chevronEvents();
    if (!inputIngredients.value.includes(ingredients)) {
      (ingredientsSuggestContainer.style.display = "flex"),
      (ingredientsChevronsUp.style.display = "flex"),
      (ingredientsChevronsDown.style.display = "none");
      ingredientsSuggestContainer.innerHTML = mapped;
      };
   if (inputIngredients.value == 0){
    ingredientsChevronsDown.addEventListener("click", chevronEvents),
    (ingredientsSuggestContainer.style.display = "flex"),
      (ingredientsChevronsUp.style.display = "flex"),
      (ingredientsChevronsDown.style.display = "none");
    ingredientsSuggestContainer.innerHTML = mappedAll;};

  const nodes = [
    ...document.querySelectorAll(".suggestions-ingredients-words"),];
    nodes.forEach((node) => {

      node.addEventListener("click", (e) => addIngredientsTags(node));});
    };

const addIngredientsTags = (node) => {
  const tagText = node.innerText;
  tagsContainer.innerHTML += `
        <div class="tags tag-ingredients">${tagText}
        <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-ingredients");
  const tag = tags.forEach((tag) => {
    tag.style.background = "#3282F7";
    node.style.display = "none";
    crossRemoveTag(node);
  });
};

const createAppliancesSuggestContainer = (appliances, allAppliances) => {
  const mapped = appliances
    .map(
      (appl) => `<option class="suggestions-appliances-words">${appl}</option>`)
    .join(" ");
    const mappedAll = allAppliances
    .map(
      (ingdt) =>
        `<option class="suggestions-ingredients-words suggestions-words">${ingdt}</option>`)
    .join(" ");
    chevronEvents();
    if (!inputAppliances.value.includes(appliances)) {
      (appliancesSuggestContainer.style.display = "flex"),
        (appliancesChevronsUp.style.display = "flex"),
        (appliancesChevronsDown.style.display = "none");
      appliancesSuggestContainer.innerHTML = mapped;
    };
    if (!inputAppliances.value == 0) {
      (appliancesSuggestContainer.style.display = "flex"),
        (appliancesChevronsUp.style.display = "flex"),
        (appliancesChevronsDown.style.display = "none");
      appliancesSuggestContainer.innerHTML = mappedAll;
    };
  const nodes = [...document.querySelectorAll(".suggestions-appliances-words")];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => addAppliancesTags(node));});
};

const addAppliancesTags = (node) => {
  const tagText = node.innerText;
  tagsContainer.innerHTML += `
  <div class="tags tag-appliances">${tagText}
  <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-appliances");
  crossRemoveTag();
  const tagStyle = tags.forEach((tag) => {
    tag.style.background = "#68D9A4";
    node.style.display = "none";
    crossRemoveTag(node);
  });
};

const createUstensilsSuggestContainer = (ustensils, allUstensils) => {
  const mapped = ustensils
  .map(
    (ustensil) =>
    `<option class="suggestions-ustensils-words">${ustensil}</option>`)
    .join(" ");
    const mappedAll = allUstensils
    .map(
      (ingdt) =>
        `<option class="suggestions-ingredients-words suggestions-words">${ingdt}</option>`)
    .join(" ");
    chevronEvents();
    if (!inputUstensils.value.includes(ustensils)) {
      (ustensilsSuggestContainer.style.display = "flex"),
        (ustensilsChevronsUp.style.display = "flex"),
        (ustensilsChevronsDown.style.display = "none");
      ustensilsSuggestContainer.innerHTML = mapped;
    };
    if (!inputUstensils.value == 0) {
      (ustensilsSuggestContainer.style.display = "flex"),
        (ustensilsChevronsUp.style.display = "flex"),
        (ustensilsChevronsDown.style.display = "none");
      ustensilsSuggestContainer.innerHTML = mappedAll;
    };
  const nodes = [...document.querySelectorAll(".suggestions-ustensils-words")];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => addUstensilsTags(node));});
};


const addUstensilsTags = (node) => {
  const tagText = node.innerText;
  tagsContainer.innerHTML += `
  <div class="tags tag-ustensils">${tagText}
  <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-ustensils");
  crossRemoveTag();
  const tagStyle = tags.forEach((tag) => {
    tag.style.background = "#ED6454";
    crossRemoveTag(node);

  });
};
export {
  createCards,
  createIngredientsSuggestContainer,
  createUstensilsSuggestContainer,
  createAppliancesSuggestContainer,
};
