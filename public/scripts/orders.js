
$(() => {
  console.log('ready');
  $('.nav-order').on('click', (event) => {
    loadOrders();
    console.log("orders rendered");
  });

  $('.menu-container').on('click', 'button.d-btn-admin', (event) => {

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
    $('.menu-container').empty();
    renderOrdersLayout(orders);

    console.log("add details listener");
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
            <th scope="col">Order_id</th>
            <th scope="col">Date</th>
            <th scope="col">Details</th>
            <th scope="col">Status</th>
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
  console.log("layout preped");
  return $('.menu-container').append(orderlist.layout);
}

const createOrderElement = (order) => {
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
    <td>${$id}</td>
    <td>${$date}</td>
    <td><button class="d-btn-admin" id="${$id}">Details</button></td>
    <td>Pending</td>
    </tr>
  `)
  return $order;
};

