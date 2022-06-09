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
  for (const key in cart) {
    count += cart[key];
  }
  return count;
};

//  Get the string of current date in the format of year-mm-dd
export const getCurrentDate = function() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

//  Calculate total price and taxes from an array of dishes
export const getBillDetails = function(dishes) {
  let subTotal = 0;
  for (const dish of dishes) {
    subTotal += dish.price * dish.amount;
  };
  let gst = (Math.round(subTotal * 0.05 * 100) / 10000);
  let pst = (Math.round(subTotal * 0.07 * 100) / 10000);
  subTotal /= 100;
  gst = Number(gst.toFixed(2));
  pst = Number(pst.toFixed(2));
  const total = Number((subTotal + gst + pst).toFixed(2));

  return { subTotal, gst, pst, total };
};

//  Get the id number from a html id attribute
export const getIDFromAttr = function(idString) {
  const array = idString.split('-');
  return array[array.length - 1];
};

// Get an order's order_id, username, and date for order detail page
export const getOrderHeading = function (dishes) {
  const orderID = escapeText(dishes[0].order_id);
  const userName = escapeText(dishes[0].user_name);
  const date = escapeText(dishes[0].date).substring(0, 10);

  return { orderID, userName, date };
}

// Get detail info of each dish user ordered
export const getOrderDetails = function (dish) {
  const url = escapeText(dish.url);
  const dishName = escapeText(dish['dish_name'].toUpperCase());
  const amount = escapeText(dish.amount);
  const price = escapeText(dish.price / 100);

  return { url, dishName, amount, price};
};

