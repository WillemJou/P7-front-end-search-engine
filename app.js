import { recipes } from "/recipes.js"

const body = document.body;

// main div for contain all elements 
const mainContainer = document.createElement("div");
mainContainer.className ="container";

// HEADER 
// Create Dom 
const header = document.createElement("header");
const logo = document.createElement("img");
const h1 = document.createElement("h1");
const linkHome = document.createElement("a");
// src,link,text
logo.src = "/icons/cheef-hat.png";
linkHome.href = "/index.html";
h1.innerHTML = "Les petits plats";
// Class
h1.classList.add("title", "h3");
logo.className = "logo";
linkHome.classList.add("link");
// append
linkHome.append(logo, h1);
header.append(linkHome);

const main = document.createElement("main");

// NAV (Search) 
// Create Dom
const nav = document.createElement("nav");
const divSearch = document.createElement("div");
const inputSearch = document.createElement("input");
const glassIcon = document.createElement("i");
const buttonSearch = document.createElement("button");

divSearch.className = "search";
inputSearch.className = "input-search";
inputSearch.placeholder = "Rechercher une recette";
glassIcon.classList.add("glass-icon", "fa-solid", "fa-magnifying-glass");

// Nav (dropdown menus)
const dropdownDiv = document.createElement("div");
const ingredients = document.createElement("button");
const appliances = document.createElement("button");
const ustensils = document.createElement("button");
const chevronDownIngdts = document.createElement("img");
const chevronDownAplcs = document.createElement("img");
const chevronDownUstls = document.createElement("img");
// ID menus
ingredients.setAttribute("id", "ingredients");
appliances.setAttribute("id", "appliances");
ustensils.setAttribute("id", "ustensils");
// class
chevronDownIngdts.className = "chevron";
chevronDownAplcs.className = "chevron";
chevronDownUstls.className = "chevron";
dropdownDiv.classList.add("btn-group", "dropdown-grp");
ingredients.classList.add("btn", "dropdown-btn");
appliances.classList.add("btn", "dropdown-btn");
ustensils.classList.add("btn", "dropdown-btn");
// text
ingredients.innerHTML = "Ingredients";
ustensils.innerHTML = "Ustensils";
appliances.innerHTML = "Appareils";
// SRC
chevronDownIngdts.src =  "/icons/chevron-down-solid.png";
chevronDownAplcs.src = "/icons/chevron-down-solid.png";
chevronDownUstls.src = "/icons/chevron-down-solid.png";
// append 
ingredients.append(chevronDownIngdts);
appliances.append(chevronDownAplcs);
ustensils.append(chevronDownUstls);
dropdownDiv.append(ingredients, appliances, ustensils);
divSearch.append(inputSearch, buttonSearch);
buttonSearch.append(glassIcon);
nav.append(divSearch, dropdownDiv);
main.append(nav);
mainContainer.append(header, nav);
body.append(mainContainer);