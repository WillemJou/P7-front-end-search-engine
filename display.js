import { recipes as lists } from "/recipes.js";
import {
  recipesContainer,
  ingredientsSuggestContainer,
  appliancesSuggestContainer,
  ustensilsSuggestContainer,
  inputIngredients,
  inputUstensils,
  inputAppliances,
  tagsContainer,
  ingdtsTagsContainer,
  applTagsContainer,
  ustlsTagsContainer,
  chevrons,
  ingredientsChevronsDown,
  ingredientsChevronsUp,
  ingredientsBtn,
  appliancesBtn,
  ustensilsBtn,
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

const addIngredientsTags = (node) => {
  const tagText = node.innerText;
  console.log(tagText);
  ingdtsTagsContainer.innerHTML += `
    <div class="tag-ingredients">${tagText}
    <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-ingredients");
  crossStyle();
  const tagStyle = tags.forEach((tag) => {
    tag.style.background = "#3282F7";
    tag.style.color = "white";
    tag.style.borderRadius = "5px";
    tag.style.width = "max-content";
    tag.style.margin = "5px";
    tag.style.padding = "5px";
  });
};

const addAppliancesTags = (node) => {
  const tagText = node.innerText;
  applTagsContainer.innerHTML += `
  <div class="tag-appliances">${tagText}
  <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-appliances");
  crossStyle();
  const tagStyle = tags.forEach((tag) => {
    tag.style.background = "#68D9A4";
    tag.style.color = "white";
    tag.style.borderRadius = "5px";
    tag.style.width = "max-content";
    tag.style.margin = "5px";
    tag.style.padding = "5px";
  });
};
const addUstensilsTags = (node) => {
  const tagText = node.innerText;
  ustlsTagsContainer.innerHTML += `
  <div class="tag-ustensils">${tagText}
  <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-ustensils");
  crossStyle();
  const tagStyle = tags.forEach((tag) => {
    tag.style.background = "#ED6454";
    tag.style.color = "white";
    tag.style.borderRadius = "5px";
    tag.style.width = "max-content";
    tag.style.margin = "5px";
    tag.style.padding = "5px";
  });
};
// FONCTION REMOVETAG FOR ALL TAGS
const crossStyle = () => {
  const crossesTag = document.querySelectorAll(".cross-tag");
  crossesTag.forEach((cross) => {
    cross.style.cursor = "pointer";
    cross.style.paddingLeft = "5px";
    cross.addEventListener("click", (e) => cross.parentNode.remove());
  });
};

const createIngredientsSuggestContainer = (ingredients) => {
  ingredientsSuggestContainer.style.display = !inputIngredients.value.includes(ingredients)
    ? "flex"
    : "none";
  const mapped = ingredients
    .map(
      (ingdt) => `<option class="suggestions-ingredients-words suggestions-words">${ingdt}</option>`)
    .join(" ");
  ingredientsSuggestContainer.innerHTML = mapped;
  const nodes = [...document.querySelectorAll(".suggestions-ingredients-words")];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => addIngredientsTags(node));
  });
};

const openSuggestsWithChevron = () => {
  if ((ingredientsSuggestContainer.style.display = "flex")) {
    // ingredientsChevronsUp.style.display ="block";
    // //ingredientsChevronsDown.addEventListener("click", ingredientsSuggestContainer.style.display = "flex");
    // ingredientsChevronsDown.style.display = "none";
  }
};
openSuggestsWithChevron();

const createAppliancesSuggestContainer = (appliances) => {
  const mapped = appliances
    .map(
      (appl) => `<option class="suggestions-appliances-words">${appl}</option>`
    )
    .join(" ");
  appliancesSuggestContainer.innerHTML = mapped;
  const nodes = [...document.querySelectorAll(".suggestions-appliances-words")];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => addAppliancesTags(node));
  });
  appliancesSuggestContainer.style.display = !inputAppliances.value.includes(
    appliances
  )
    ? "flex"
    : "none";
};

const createUstensilsSuggestContainer = (ustensils) => {
  const mapped = ustensils
    .map(
      (ustensil) =>
        `<option class="suggestions-ustensils-words">${ustensil}</option>`
    )
    .join(" ");
  ustensilsSuggestContainer.innerHTML = mapped;
  const nodes = [...document.querySelectorAll(".suggestions-ustensils-words")];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => addUstensilsTags(node));
  });
  ustensilsSuggestContainer.style.display = !inputUstensils.value.includes(
    ustensils
  )
    ? "flex"
    : "none";
};

export {
  createCards,
  createIngredientsSuggestContainer,
  createUstensilsSuggestContainer,
  createAppliancesSuggestContainer,
};
