
$(() => {
  $('.nav-order').on('click', (event) => {
    loadOrders();
  });

  $('main').on('click', 'button.d-btn-admin', (event) => {
    console.log('1234');
    const id = event.target.id;
    $.ajax({
      url: `users/orders/${id}`,
      success: function() {
        console.log("hello");
      }
    })
  })

});


const loadOrders = () => {
  $.get('/users/orders', (orders) => {
    $('main').empty();
    renderOrdersLayout(orders);
  })
};

const renderOrdersLayout = (orders) => {

  const orderlist = {};
  orderlist['layout'] = $(`
      <article>
      <h2>Orders</h2>

      <table class="table">
        <thead class="table-head">
          <tr>
            <th scope="col"></th>
            <th scope="col">Order_id</th>
            <th scope="col">Date</th>
            <th scope="col">Details</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body>
        123
        </tbody>
      </table>
    </article>`);

  for (const order of orders) {
    const $order = createOrderElement(order);
    orderlist['layout'].children('table').append($order);
  }
  return $('main').append(orderlist.layout);
}

const createOrderElement = (order) => {
  const $photo = escapeText(order.photo);
  const $id = escapeText(order.id);
  const $date = escapeText(order.date.substring(0, 10));
  let $status;

  if (order.status === 'true') {
    $status = 'Completed';
  } else {
    $status = 'Pending';
  }

  const $order = $(`
    <tr>
    <td><img src="${$photo}" alt="" class="cart-image"></td>
    <td>${$id}</td>
    <td>${$date}</td>
    <td><button class="d-btn-admin" id="${$id}">Details</button></td>
    <td>Pending</td>
    <td></td>
    </tr>
  `)
  return $order;
};

