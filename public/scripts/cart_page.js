import { getCurrentDate, escapeText, getBillDetails } from "./tools.js";

//  Render cart page
export const renderCart = function(dishes) {
  $('main').empty();

  if (dishes.length === 0) {
    return;
  }

  const billDetails = getBillDetails(dishes);

  const $cartContainer = $(`
    <div class="cart-container">
      <article class="cart">
        <div class="cart-left">
          <h2>My Cart</h2>
          <table>
            <thead>
              <tr class="cart-table-header">
                <th scope="col">Dish</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="cart-dish-table">
            </tbody>
          </table>
        </div>
        <div class="cart-right">
          <div class="cart-bill">
            <h3>Billing Total</h3>
            <p>Sub-Total<span class="cart-sub-total">$${billDetails.subTotal}</span></p>
            <p>GST 5%<span class="cart-gst">$${billDetails.gst}</span></p>
            <p>PST 7%<span class="cart-pst">$${billDetails.pst}</span></p>
            <hr>
            <p>Total<span class="cart-total">$${billDetails.total}</span></p>
          </div>
          <button class="cart-place-order">Place Order <i class="fa-solid fa-pizza-slice"></i></button>
        </div>
      </article>
    </div>
  `);

  $('main').append($cartContainer);

  for (const dish of dishes) {
    $('.cart-dish-table').append(createCartDishElement(dish));
  }
}

//  Create HTML table element for each dish item in cart
const createCartDishElement = function(dish) {
  const $dishTable =
  `
  <tr id="cart-table-id-${dish.id}">
    <td><img class="cart-image" src=${escapeText(dish.photo_url)} alt=${escapeText(dish.name)}></td>
    <td>${escapeText(dish.name.toUpperCase())}</td>
    <td>
      <div class="cart-amount-editor">
        <i class="fa-solid fa-circle-minus cart-minus-button" id="cart-minus-id-${dish.id}"></i>
        <div class="cart-amount-text" id="cart-amount-id-${dish.id}">${dish.amount}</div>
        <i class="fa-solid fa-circle-plus cart-add-button" id="cart-add-id-${dish.id}"></i>
      </div>
    </td>
    <td>
      <div id="cart-price-id-${dish.id}">
        $${dish.price * dish.amount / 100}
      </div>
    </td>
    <td><i class="fa-solid fa-trash-can cart-trash-button" id="cart-trash-${dish.id}"></i></td>
  </tr>
  `;
  return $dishTable;
};

//  Render empty cart contains
export const renderEmptyCart =  function() {
  $('main').empty();
  const $emptyCart = $(`
    <div class="empty-cart">
      <h1> Your cart is empty! 😬</h1>
      <button class="back-to-menu">Back To Menu <i class="fa-solid fa-pizza-slice"></i></button>
    <div>
  `);
  $('main').append($emptyCart);
}

//  Render order success page
export const renderOrderSuccessPage =  function() {
  $('main').empty();
  const $orderSuccessPage = $(`
    <div class="order-success">
      <h1>Your order has been placed! 😊</h1>
      <button class="view-orders">View Orders</button>
    <div>
  `);
  $('main').append($orderSuccessPage);
}

export const updateBillDetails = function(dishes) {
  const billDetails = getBillDetails(dishes);
  $('.cart-sub-total').text(`$${billDetails.subTotal}`);
  $('.cart-gst').text(`$${billDetails.gst}`);
  $('.cart-pst').text(`$${billDetails.pst}`);
  $('.cart-total').text(`$${billDetails.total}`);
};
