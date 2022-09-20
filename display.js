import { recipes as lists } from "/recipes.js";
import {
  recipesContainer,
  ingredientsSuggestContainer,
  appliancesSuggestContainer,
  ustensilsSuggestContainer,
  mainInput,
  inputIngredients,
  inputUstensils,
  inputAppliances,
  tagsContainer,
  ingredientsChevronsDown,
  ingredientsChevronsUp,
  appliancesChevronsDown,
  appliancesChevronsUp,
  ustensilsChevronsDown,
  ustensilsChevronsUp,
} from "/DOM.js";
import { tagSearchResult } from "/function.js";


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
      
      // ERROR MESSAGE
      const createErrorMsg = () => {
        return recipesContainer.innerHTML = 
        `<div class="error-msg">"Aucune recette ne correspond à votre critère...
        vous pouvez chercher tarte aux pommes, poisson, etc."
        </div>`;
      };
      
// FONCTION REMOVETAG
const crossRemoveTag = (node) => {
  const crossesTag = document.querySelectorAll(".cross-tag");
  crossesTag.forEach((cross) => {
    cross.style.cursor = "pointer";
    cross.style.paddingLeft = "5px";
    cross.addEventListener("click", (e) => {
      closeLastSearch(cross);
      ingredientsSuggestContainer.append(node);
    });
  });
};
// return to cards according to filters tags 
const closeLastSearch = (cross) => {
  cross.parentNode.remove();
    return createCards(tagSearchResult());
  };

// Chevron part
const chevronEvents = () => {
  ingredientsChevronsUp.addEventListener("click", (e) => {
    closeSuggestContainer(
      ingredientsSuggestContainer,
      ingredientsChevronsUp,
      ingredientsChevronsDown
    )
    })
  ingredientsChevronsDown.addEventListener("click", (e) =>
    openSuggestContainer(
      ingredientsSuggestContainer,
      ingredientsChevronsUp,
      ingredientsChevronsDown
    )
  );
  appliancesChevronsUp.addEventListener("click", (e) =>
    closeSuggestContainer(
      appliancesSuggestContainer,
      appliancesChevronsUp,
      appliancesChevronsDown
    )
  );
  appliancesChevronsDown.addEventListener("click", (e) =>
    openSuggestContainer(
      appliancesSuggestContainer,
      appliancesChevronsUp,
      appliancesChevronsDown
    )
  );
  ustensilsChevronsUp.addEventListener("click", (e) =>
    closeSuggestContainer(
      ustensilsSuggestContainer,
      ustensilsChevronsUp,
      ustensilsChevronsDown
    )
  );
  ustensilsChevronsDown.addEventListener("click", (e) =>
    openSuggestContainer(
      ustensilsSuggestContainer,
      ustensilsChevronsUp,
      ustensilsChevronsDown
    )
  );
};

const closeSuggestContainer = (suggestContainer, chevronUp, chevronDown) => {
  suggestContainer.style.display = "none";
  (chevronUp.style.display = "none"), (chevronDown.style.display = "flex");
};

const openSuggestContainer = (suggestContainer, chevronUp, chevronDown) => {
  suggestContainer.style.display = "flex";
  (chevronUp.style.display = "flex"), (chevronDown.style.display = "none");
};
chevronEvents();
// End chevron's part

//  INGREDIENTS SUGGESTIONS 
const createIngredientsSuggestContainer = (ingredients, allIngredients) => {
  const mapped = ingredients
    .map(
      (ingdt) =>
        `<option class="suggestions-ingredients-words suggestions-words">${ingdt}</option>`
    )
    .join(" ");
  const mappedAll = allIngredients
    .map(
      (ingdt) =>
        `<option class="suggestions-ingredients-words suggestions-words">${ingdt}</option>`
    )
    .join(" ");
  chevronEvents();
  ingredientsSuggestContainer.innerHTML = mappedAll;
  ingredientsSuggestContainer.innerHTML = mapped;
  
  // CONDITIONS FOR CHEVRONS AND DISPLAY SUGGESTIONS CONTAINER
  if (
    (mainInput.value == 0 && inputIngredients.value == 0) ||
    (mainInput.value != 0 && inputIngredients.value == 0)
    ) {
      closeSuggestContainer(ingredientsSuggestContainer, ingredientsChevronsUp, ingredientsChevronsDown);
    }
    if (
      (mainInput.value != 0 && inputIngredients.value != 0) ||
      (mainInput.value == 0 && inputIngredients.value != 0)
      ) {
        openSuggestContainer(ingredientsSuggestContainer, ingredientsChevronsUp, ingredientsChevronsDown);
      }

      // GET NODE SUGGESTIONS FOR TAGS
  const nodes = [
    ...document.querySelectorAll(".suggestions-ingredients-words"),
  ];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => {
      createIngredientsTags(node);
      createCards(tagSearchResult());
      node.remove();
      closeSuggestContainer(ingredientsSuggestContainer, ingredientsChevronsUp, ingredientsChevronsDown);
    });
  });
};
    
   // INGREDIENTS TAGS
const createIngredientsTags = (node) => {
  const tagText = node.innerText;
  tagsContainer.innerHTML += `
        <div class="tags tag-ingredients">${tagText}
        <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-ingredients");
  const tag = tags.forEach((tag) => {
    tag.style.background = "#3282F7";
    crossRemoveTag(node);
  });
};


const createAppliancesSuggestContainer = (appliances, allAppliances) => {
  const mapped = appliances
    .map(
      (appl) => `<option class="suggestions-appliances-words suggestions-words">${appl}</option>`
    )
    .join(" ");
  const mappedAll = allAppliances
    .map(
      (ingdt) =>
        `<option class="suggestions-appliances-words suggestions-words">${ingdt}</option>`
    )
    .join(" ");
  chevronEvents();
  appliancesSuggestContainer.innerHTML = mappedAll;
  appliancesSuggestContainer.innerHTML = mapped;

  if (
    (mainInput.value == 0 && inputAppliances.value == 0) ||
    (mainInput.value != 0 && inputAppliances.value == 0)
  ) {
    closeSuggestContainer(appliancesSuggestContainer, appliancesChevronsUp, appliancesChevronsDown)
    }
  if (
    (mainInput.value != 0 && inputAppliances.value != 0) ||
    (mainInput == 0 && inputAppliances != 0)
  ) {
    openSuggestContainer(appliancesSuggestContainer, appliancesChevronsUp, appliancesChevronsDown)
  }
  const nodes = [...document.querySelectorAll(".suggestions-appliances-words")];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => {
      createAppliancesTags(node);
      createCards(tagSearchResult());
      node.remove();
      closeSuggestContainer(appliancesSuggestContainer, appliancesChevronsUp, appliancesChevronsDown);
    })
    })
  };

const createAppliancesTags = (node) => {
  const tagText = node.innerText;
  tagsContainer.innerHTML += `
  <div class="tags tag-appliances">${tagText}
  <i class="fa-regular fa-circle-xmark cross-tag"></i></div>`;
  const tags = document.querySelectorAll(".tag-appliances");
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
        `<option class="suggestions-ustensils-words suggestions-words">${ustensil}</option>`
    )
    .join(" ");
  const mappedAll = allUstensils
    .map(
      (ingdt) =>
        `<option class="suggestions-ustensils-words suggestions-words">${ingdt}</option>`
    )
    .join(" ");
  chevronEvents();
  ustensilsSuggestContainer.innerHTML = mappedAll;
  ustensilsSuggestContainer.innerHTML = mapped;

  if (
    (mainInput.value == 0 && inputUstensils.value == 0) ||
    (mainInput.value != 0 && inputUstensils.value == 0)
  ) {
   closeSuggestContainer(ustensilsSuggestContainer, ustensilsChevronsUp, ustensilsChevronsDown)
  }
  if (
    (mainInput.value != 0 && inputUstensils.value != 0) ||
    (mainInput.value == 0 && inputUstensils.value != 0)
  ) {
    openSuggestContainer(ustensilsSuggestContainer, ustensilsChevronsUp, ustensilsChevronsDown)
  }
  
  const nodes = [...document.querySelectorAll(".suggestions-ustensils-words")];
  nodes.forEach((node) => {
    node.addEventListener("click", (e) => {
      createUstensilsTags(node);
      createCards(tagSearchResult());
      node.remove();
      closeSuggestContainer(ustensilsSuggestContainer, ustensilsChevronsUp, ustensilsChevronsDown);
    })
    })
  };

const createUstensilsTags = (node) => {
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
  createErrorMsg,
};
