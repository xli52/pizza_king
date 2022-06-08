/*
*  Client facing scripts here
*/

import {
  setAddToCartEventListener,
  setCartButtonEventListener,
  setOrderButtonEventListener
} from "./event.js";

// Validate input text from cross-scripting attack
const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const capFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//  Create dish HTML JQuery element
const createDishElement = function(dish) {
  const $dish = $(
    `
    <div class="dish-box">
      <div class="dish">
        <picture class="dish-image-box">
          <img class="dish-image" src=${escapeText(dish.photo_url)} alt=${escapeText(dish.name)}>
        </picture>
        <div class="dish-name">${escapeText(dish.name)}</div>
        <div class="dish-details">
          <div class="dish-price">$${escapeText(dish.price / 100)}</div>
          <div class="dish-dot-spacer">•</div>
          <div class="dish-calorie">${escapeText(dish.calorie)} Cal.</div>
        </div>
        <i class="fa-solid fa-circle-plus quick-add-to-cart" id="dish-id-${escapeText(dish.id)}"></i>
      </div>
    </div>
    `
  );
  return $dish;
};

//  Create menu HTML JQuery element
const createMenuElement = function(dishes) {
  const menus  = {};
  let currentType = dishes[0].type;
  menus[currentType] = $(
    `
    <div class="menu-by-type">
    <div class="type-header"> ${escapeText(capFirstLetter(currentType))} </div>
    <div class="dish-list"></div>
    </div>
    `
  );
  for (const dish of dishes) {
    const $dish = createDishElement(dish);
    if (dish.type !== currentType) {
      currentType = dish.type;
      if (!menus[currentType]) {
        menus[currentType] = $(
          `
          <div class="menu-by-type">
          <div class="type-header"> ${escapeText(capFirstLetter(currentType))} </div>
          <div class="dish-list"></div>
          </div>
          `
        );
      }
    }
    menus[currentType].children('.dish-list').append($dish);
  }
  return menus;
}

// Create HTML elements for all menus and append them to the menu container
const renderMenus = function(data) {
  const $menuContainer = $('<div class="menu-container"></div>');
  const menus = createMenuElement(data);
  for (const index in menus) {
    $menuContainer.append(menus[index]);
  }
  $('main').append($menuContainer);
}

//  Load menu and all dishes using AJAX request and setup all event listeners
const loadMenus = function() {
  $.get('/menus', (data) => {
    renderMenus(data[0]);
    $('.cart-counter').text(data[1]);
    setAddToCartEventListener();
    setCartButtonEventListener();
    setOrderButtonEventListener();
  });
};

//  Load page
$(document).ready(function() {
  loadMenus();
  // When the "Yummy" logo is clicked
  $('.nav-logo').on('click', () => {
    $('main').empty();
    loadMenus();
  });
});
