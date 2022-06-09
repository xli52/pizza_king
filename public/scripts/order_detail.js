$(() => {
    // Listener for dynamically inserted "details" button on the orders page
    $('main').on('click','button.d-btn-admin', (event) => {
      const order_id = event.target.id;
      $.ajax({
        type:'GET',
        url: `/orders/${order_id}`,
        success: (details) => {
          $('main').empty();
          renderOrderDetailsLayout(details);
        }
      })
    })

});

/////////////////////////////////////////////////
// rendering functions for order_detail page
////////////////////////////////////////////////

const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const renderOrderDetailsLayout = (details) => {
  const $order_id = escapeText(details[0].order_id);
  const $user_name = escapeText(details[0].user_name);
  const $date = escapeText(details[0].date).substring(0, 10);
  let $totalPrice = 0;

  for (const eachDish of details) {
    $totalPrice += eachDish.price;
  };

  let $GST = (Math.round($totalPrice * 0.05 * 100) / 10000);
  let $PST = (Math.round($totalPrice * 0.07 * 100) / 10000);
  $totalPrice /= 100;

  const $finalPrice = Number($totalPrice + $GST + $PST).toFixed(2);
  $GST = Number($GST).toFixed(2);
  $PST = Number($PST).toFixed(2);

  const orderDetails = {};
  orderDetails['layout'] = $(`
    <article class="cart">
      <div class="cart-left">
        <table>
          <thead>
            <tr>
              <th scope="col">Order No. ${$order_id}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Customer: ${$user_name}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Date: ${$date}</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="col">Dish</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="cart-right">
        <div class="cart-bill">
          <h3>Billing Total</h3>
          <p>Sub-Total<span>$${$totalPrice}</span></p>
          <p>GST 5%<span>$${$GST}</span></p>
          <p>PST 7%<span>$${$PST}</span></p>
          <hr>
          <p>Total<span>$${$finalPrice}</span></p>
        </div>
        <div class="cart-placeorder">
            <button class="back-btn">Back to Orders</button>
        </div>
      </div>
    </article>
  `);

  for (const eachDish of details) {
    const $eachDish = createDishElement(eachDish);
    orderDetails['layout'].children('table').append($eachDish);
  };

  return $('main').append(orderDetails['layout']);
}


const createDishElement = (dish) => {
  const $url = escapeText(dish.url);
  const $dish_name = escapeText(dish["dish_name"].toUpperCase());
  const $amount = escapeText(dish.amount);
  const $price = escapeText(dish.price / 100);

  const $dishRow = $(`
    <tr>
      <td><img class="cart-image" src="${$url}" alt=""></td>
      <td>${$dish_name}</td>
      <td>${$amount}</td>
      <td>${$price}</td>
    </tr>
  `);

  return $dishRow;
};



