// orders page rendering functions here

export const renderOrdersLayout = (orders) => {
  $('main').empty();
  $(window).scrollTop(0);

  const $ordersTable = $(`
    <div style="padding: 20px 15%; font-family: 'Nunito', sans-serif;">
      <div style="text-align: center;">
        <h1>My Orders</h1>
      </div>
      <table style="font-size: 24px;width: 100%; margin-top: 60px">
        <thead>
          <tr>
            <th style="padding: 20px 0px;" scope="col">Order ID</th>
            <th scope="col">Date</th>
            <th scope="col">Details</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody class="table-body">
        </tbody>
      </table>
    </div>`);

  $('main').append($ordersTable);

  for (const order of orders) {
    $('.table-body').append(createOrderElement(order));
  }
}

const createOrderElement = (order) => {
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
      <td style="padding: 20px 0px;">${id}</td>
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
