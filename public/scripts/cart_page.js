import { getCurrentDate } from "./tools.js";

//  Render cart contains
export const renderCart = (dishes) => {
  $('main').empty();
  const $cartContainer = $(`
    <div class="cart-container">
      <article class="cart">
        <div class="cart-left">
          <div>My Cart</div>
          <div>Customer: John Doe  Date: ${getCurrentDate()}</div>
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
    <td><img class="cart-image" src="https://d1ralsognjng37.cloudfront.net/0c9767c4-442b-4715-ab37-476a61ba2aaf.jpeg" alt=""></td>
    <td>THE ORIGINAL BBQ SHICKEN PIZZA</td>
    <td><input class="dish_id" type="number" min="0" value="2" name="amount"></td>
    <td>$19.99</td>
    <td><button id="dish_id">Update</button></td>
    <td><button class="dish_id" id="delete">Remove</button></td>
  </tr>
  `;
  return $dishTable;
};
