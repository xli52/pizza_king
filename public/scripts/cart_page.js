import { getCurrentDate, escapeText } from "./tools.js";

//  Render cart contains
export const renderCart = (dishes) => {
  $('main').empty();



  const $cartContainer = $(`
    <div class="cart-container">
      <article class="cart">
        <div class="cart-left">
          <div>My Cart</div>
          <div>Customer: Xiang  Date: ${getCurrentDate()}</div>
          <table>
            <thead>
              <tr>
                <th scope="col">Dish</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody class="cart-dish-table">
            </tbody>
          </table>
        </div>
        <div class="cart-right">
          <div class="cart-bill">
            <h3>Billing Total</h3>
            <p>Sub-Total<span>$85.96</span></p>
            <p>GST 5%<span>$4.30</span></p>
            <p>PST 7%<span>$6.02</span></p>
            <hr>
            <p>Total<span>$96.28</span></p>
          </div>
          <div class="cart-placeorder">
            <form action="/user/orders" method="GET">
              <button>Place Order!</button>
            </form>
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
  const $dishTable =
  `
  <tr>
    <td><img class="cart-image" src=${escapeText(dish.photo_url)} alt=${escapeText(dish.name)}></td>
    <td>${escapeText(dish.name.toUpperCase())}</td>
    <td><input class="cart-amount-input" id="cart-input-id-${dish.id}" type="number" min="0" value=${dish.amount} name="amount"></td>
    <td>$${escapeText(dish.price * dish.amount / 100)}</td>
    <td><button class="cart-update-button" id="cart-update-${dish.id}">Update</button></td>
    <td><button class="cart-remove-button" id="cart-update-${dish.id}">Remove</button></td>
  </tr>
  `;
  return $dishTable;
};
