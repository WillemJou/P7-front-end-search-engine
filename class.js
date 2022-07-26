function recipesClass(data) {
    const { id, name, servings, ingredients, time, description, appliance, ustensils} = data; 

    
function getRecipesCardDOM() {
    const recipeContainer = document.createElement("div");
    const img = document.createElement("div");
    img.setAttribute("class", "img-div");
    const titleAndTimeContainer = document.createElement("div");
    titleAndTimeContainer.setAttribute("class", "title-and-time-div");
    const title = document.createElement("h3");
    title.textContent = name;
    const timeSpan = document.createElement("span");
    timeSpan.textContent = time;
    const ingredientsAndDescriptionContainer = document.createElement("div");
    const ingredientsList = document.createElement("ul");
    ingredientsList.textContent = ingredients;
    const descriptionArticle = document.createElement("article");
    descriptionArticle.textContent = description;
    recipeContainer.appendChild(img, titleAndTimeContainer, ingredientsAndDescriptionContainer);
    titleAndTimeContainer.appendChild(title, timeSpan);
    ingredientsAndDescriptionContainer.appendChild(ingredientsList, descriptionArticle);

    return recipeContainer;
};
return {name, getRecipesCardDOM}
}