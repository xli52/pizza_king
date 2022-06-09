// order page rendering functions here

export const renderOrdersLayout = (orders) => {
  $('main').empty();
  const $ordersTable = $(`
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
        <tbody class="table-body">

        </tbody>
      </table>
    </article>`);

  $('main').append($ordersTable);

  for (const order of orders) {
    $('.table-body').append(createOrderElement(order));
  }
}

const createOrderElement = (order) => {
  const photo = escapeText(order.photo);
  const id = escapeText(order.id);
  const date = escapeText(order.date.substring(0, 10));
  let status;

  if (order.status === true) {
    status = 'Completed';
  } else {
    status = 'Pending';
  }

  const $orderRow = $(`
    <tr>
      <td><img src="${photo}" alt="" class="cart-image"></td>
      <td>${id}</td>
      <td>${date}</td>
      <td><button class="d-btn-admin" id="${id}">Details</button></td>
      <td>${status}</td>
      <td></td>
    </tr>
  `)
  return $orderRow;
};

const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
