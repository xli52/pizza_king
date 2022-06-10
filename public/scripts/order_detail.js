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
  $(window).scrollTop(0);

  const orderHeading = getOrderHeading(dishes);
  let status;

  if(orderHeading.status === 'true') {
    status = 'Completed';
  } else {
    status = 'Pending';
  }

  const billDetails = getBillDetails(dishes);

  const $orderContainer = $(`
    <div class="cart-container">
      <div class="cart-title">
        <h1>Order No. ${orderHeading.orderID}</h1>
      </div>
      <article class="cart">
        <div class="cart-left">
          <table class="cart-table">
            <thead>
              <tr style="font-size: 22px;">
                <th scope="col" style="padding: 20px 0;">Customer: ${orderHeading.userName}</th>
                <th scope="col">Date: ${orderHeading.date}</th>
                <th scope="col">Status: ${status}</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <thead>
              <tr class="cart-table-header">
                <th scope="col" class="cart-table-column">Dish</th>
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
            <h3 class="bill-title">Billing Total</h3>
            <p class="bill-detail">Sub-Total<span class="cart-sub-total">$${billDetails.subTotal} CAD</span></p>
            <p class="bill-detail">GST 5%<span class="cart-gst">$${billDetails.gst} CAD</span></p>
            <p class="bill-detail">PST 7%<span class="cart-pst">$${billDetails.pst} CAD</span></p>
            <hr>
            <p class="bill-detail">Total<span class="cart-total">$${billDetails.total} CAD</span></p>
          </div>
          <div class="cart-place-order-box">
              <button class="back-btn">Back to Orders</button>
          </div>
        </div>
      </article>
    </div>
  `);

  $('main').append($orderContainer);

  for (const dish of dishes) {
    $('.order-dish-table').append(createDishElement(dish));
  };
}

const createDishElement = (dish) => {

  const orderDetails = getOrderDetails(dish);

  const $dishRow = $(
  `
  <tr>
    <td><img class="cart-image" src=${orderDetails.url} alt=${orderDetails.dishName}></td>
    <td>
      <div class="cart-dish-name">
        ${orderDetails.dishName.toUpperCase()}
      </div>
    </td>
    <td>
      <div style="text.align: center;">
        <div class="cart-amount-text" >${orderDetails.amount}</div>
      </div>
    </td>
    <td>
      <div class="cart-price">
        $${orderDetails.price} CAD
      </div>
    </td>
  </tr>
  `);

  return $dishRow;
};



