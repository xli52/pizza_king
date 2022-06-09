import { escapeText } from "./tools.js";

$(() => {
    // Listener for dynamically inserted "details" button on the orders page
    $('main').on('click','button.d-btn-admin', (event) => {
      const orderID = event.target.id;
      $.ajax({
        type:'GET',
        url: `/orders/${orderID}`,
        success: (details) => {
          renderOrderDetailsLayout(details);
        }
      })
    })

});

/////////////////////////////////////////////////
// rendering functions for order_detail page
////////////////////////////////////////////////

const renderOrderDetailsLayout = (dishes) => {
  $('main').empty();

  const orderID = escapeText(dishes[0].order_id);
  const userName = escapeText(dishes[0].user_name);
  const date = escapeText(dishes[0].date).substring(0, 10);
  let totalPrice = 0;

  for (const dish of dishes) {
    totalPrice += dish.price;
  };

  let GST = (Math.round(totalPrice * 0.05 * 100) / 10000);
  let PST = (Math.round(totalPrice * 0.07 * 100) / 10000);
  totalPrice /= 100;

  const finalPrice = Number(totalPrice + GST + PST).toFixed(2);
  GST = Number(GST).toFixed(2);
  PST = Number(PST).toFixed(2);

  const $orderContainer = $(`
    <article class="cart">
      <div class="cart-left">
        <table>
          <thead>
            <tr>
              <th scope="col">Order No. ${orderID}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Customer:${userName}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Date: ${date}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th scope="col">Dish</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody class="order-dish-table">
          </tbody>
        </table>
      </div>
      <div class="cart-right">
        <div class="cart-bill">
          <h3>Billing Total</h3>
          <p>Sub-Total<span>$${totalPrice}</span></p>
          <p>GST 5%<span>$${GST}</span></p>
          <p>PST 7%<span>$${PST}</span></p>
          <hr>
          <p>Total<span>$${finalPrice}</span></p>
        </div>
        <div class="cart-placeorder">
            <button class="back-btn">Back to Orders</button>
        </div>
      </div>
    </article>
  `);

  $('main').append($orderContainer);

  for (const dish of dishes) {
    $('.order-dish-table').append(createDishElement(dish));
  };
}

const createDishElement = (dish) => {
  const url = escapeText(dish.url);
  const dishName = escapeText(dish['dish_name'].toUpperCase());
  const amount = escapeText(dish.amount);
  const price = escapeText(dish.price / 100);

  const $dishRow = $(`
    <tr>
      <td><img class="cart-image" src="${url}" alt=""></td>
      <td>${dishName}</td>
      <td>${amount}</td>
      <td>${price}</td>
    </tr>
  `);

  return $dishRow;
};



