import { recipes } from "/recipes.js"
console.log(recipes); 

// RECIPES SECTION
// Create initial cards
recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.setAttribute("id", "recipe_card")
    recipeCard.classList.add("col-md-3", "d-flex", "flex-column", "mx-4", "my-5");
    const rowLayout = document.getElementById("row_layout");    
    rowLayout.append(recipeCard);

    recipeCard.innerHTML = `
    <div id="img_card" class="w-100 h-25"></div>
        <div id="info_recipe" class="p-4">
            <div id="title_time_container" class="d-flex justify-content-between">
                <div id="title_container">
                    <span id="title">${[recipe.name]}</span>
                </div>
                <div id="time_container" class="d-flex">
                    <div><i id="time_icon" class="fa-solid fa-timer"></i></div>
                    <div id="time">${recipe.time}</div>
                </div>
            </div>
            <div id="ingredients_and_description_container" class="d-flex">
                <div id="ingredients_container">
                    <ul id="ingredients_list">
                    </ul>
                </div>
                <div id="description_container">
                    <article id="article">${recipe.description}
                    </article>
                </div>
            </div>
        </div>
        `
        let AllUl = document.querySelectorAll("#ingredients_list");
        AllUl.forEach(ul => {
            
            recipe.ingredients.forEach( ingredient => {
                let li = document.createElement("li");  
                let liIngredientsContent = document.createTextNode(ingredient.ingredient);
                let liQuantityContent = document.createTextNode(ingredient.quantity);
                
                let liUnitsContent = document.createTextNode(ingredient.unit);

                if(ingredient.ingredient && ingredient.quantity && ingredient.unit) {
                li.appendChild((liIngredientsContent) || (liQuantityContent) || (liUnitsContent));
                ul.append(li);
                } 
            });
        });
    });