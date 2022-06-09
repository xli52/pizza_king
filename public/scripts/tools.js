// Validate input text from cross-scripting attack
export const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


export const capFirstLetter = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Count the total number of item in the cart object
export const countAllDishes = function(cart) {
  let count = 0;
  for (const index in cart) {
    count += cart[index];
  }
  return count;
};

export const getCurrentDate = function() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};
