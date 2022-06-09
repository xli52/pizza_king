import { escapeText, getBillDetails, getOrderHeading, getOrderDetails } from "./tools.js";

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

export const renderOrderDetailsLayout = (dishes) => {
  $('main').empty();

  const orderHeading = getOrderHeading(dishes);

  const billDetails = getBillDetails(dishes);

  const $orderContainer = $(`
    <article class="cart">
      <div class="cart-left">
        <table>
          <thead>
            <tr>
              <th scope="col">Order No. ${orderHeading.orderID}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Customer:${orderHeading.userName}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Date: ${orderHeading.date}</th>
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
          <p>Sub-Total<span>$${billDetails.subTotal}</span></p>
          <p>GST 5%<span>$${billDetails.gst}</span></p>
          <p>PST 7%<span>$${billDetails.pst}</span></p>
          <hr>
          <p>Total<span>$${billDetails.total}</span></p>
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

  const orderDetails = getOrderDetails(dish);

  const $dishRow = $(`
    <tr>
      <td><img class="cart-image" src="${orderDetails.url}" alt=""></td>
      <td>${orderDetails.dishName}</td>
      <td>${orderDetails.amount}</td>
      <td>${orderDetails.price}</td>
    </tr>
  `);

  return $dishRow;
};



