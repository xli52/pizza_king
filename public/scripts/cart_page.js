import { escapeText, getBillDetails } from "./tools.js";

//  Render cart page
export const renderCart = function(dishes) {
  $('main').empty();
  $(window).scrollTop(0);

  if (dishes.length === 0) {
    return;
  }

  const billDetails = getBillDetails(dishes);

  const $cartContainer = $(`
    <div class="cart-container">
      <div class="cart-title">
        <h1>My Cart</h1>
      </div>
      <article class="cart">
        <div class="cart-left">
          <table class="cart-table">
            <thead>
              <tr class="cart-table-header">
                <th scope="col" class="cart-table-column">Dish</th>
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
            <h3 class="bill-title">Billing Total</h3>
            <p class="bill-detail">Sub-Total<span class="cart-sub-total">$${billDetails.subTotal} CAD</span></p>
            <p class="bill-detail">GST 5%<span class="cart-gst">$${billDetails.gst} CAD</span></p>
            <p class="bill-detail">PST 7%<span class="cart-pst">$${billDetails.pst} CAD</span></p>
            <hr>
            <p class="bill-detail">Total<span class="cart-total">$${billDetails.total} CAD</span></p>
          </div>
          <div class="cart-place-order-box">
            <button class="cart-place-order">Place Order</button>
          </div>
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

  const $dishTable = $(
  `
  <tr id="cart-table-id-${dish.id}">
    <td><img class="cart-image" src=${escapeText(dish.photo_url)} alt=${escapeText(dish.name)}></td>
    <td>
      <div class="cart-dish-name">
        ${escapeText(dish.name.toUpperCase())}
      </div>
    </td>
    <td>
      <div class="cart-amount-editor">
        <i class="fa-solid fa-circle-minus cart-minus-button" id="cart-minus-id-${dish.id}"></i>
        <div class="cart-amount-text" id="cart-amount-id-${dish.id}">${dish.amount}</div>
        <i class="fa-solid fa-circle-plus cart-add-button" id="cart-add-id-${dish.id}"></i>
      </div>
    </td>
    <td>
      <div class="cart-price" id="cart-price-id-${dish.id}">
        $${dish.price * dish.amount / 100} CAD
      </div>
    </td>
    <td>
      <div class="cart-trash">
        <i class="fa-solid fa-trash-can cart-trash-button" id="cart-trash-${dish.id}"></i></td>
      </div>
  </tr>
  `);
  return $dishTable;
};

//  Render empty cart contains
export const renderEmptyCart =  function() {
  $('main').empty();
  $(window).scrollTop(0);

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
  $(window).scrollTop(0);

  const $orderSuccessPage = $(`
    <div class="order-success">
      <h1>Your order has been placed! 😊</h1>
      <button class="view-order">View Order Details</button>
    <div>
  `);
  $('main').append($orderSuccessPage);
}

export const updateBillDetails = function(dishes) {
  const billDetails = getBillDetails(dishes);
  $('.cart-sub-total').text(`$${billDetails.subTotal} CAD`);
  $('.cart-gst').text(`$${billDetails.gst} CAD`);
  $('.cart-pst').text(`$${billDetails.pst} CAD`);
  $('.cart-total').text(`$${billDetails.total} CAD`);
};
