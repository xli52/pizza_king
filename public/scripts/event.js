// import rendering functions



//  Setup click home button event listener
export const setHomeButtonEventListener = function() {
  $('.nav-logo').click(function() {
    $.get('/', () => {
      console.log('Back or refresh home page...')
    });
  });
};

//  Setup click cart button event listener
export const setCartButtonEventListener = function() {
  $('.nav-cart').click(function() {
    $.get('/cart', (cart) => {
      console.log('Redering cart page...');
    });
  });
};

//  Setup click order button event listener
export const setOrderButtonEventListener = function() {
  $('.nav-order').click(function() {
    console.log('orders button clicked');
    const id = 1;
    $.ajax({
      url: `/users/${id}/orders`,
      success: (orders) => {
        $('.menu-container').empty();
        renderOrdersLayout(orders);
      }
    });
  });
};

//  Setup add to cart event listener
export const setAddToCartEventListener = function() {
  // When click add to cart button, send POST /cart/id request
  $('.quick-add-to-cart').click(function() {
    const dishID = $(this).attr('id').slice(8);
    const url = `/cart/${dishID}`;
    $.post(url, (data) => {
      // Update nav bar cart counter
      //
      console.log('cart: ', data);
      //
      const count = countAllDishes(data);
      $('.cart-counter').text(count);
    })
  });
};

//Helper functions

const countAllDishes = function(cart) {
  let count = 0;
  for (const index in cart) {
    count += cart[index];
  }
  return count;
};




// ////////////////////////////////


const renderOrdersLayout = (orders) => {
  console.log("rendering layout");
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
  $('.menu-container').append(orderlist.layout);
}

const createOrderElement = (order) => {
  console.log('creating order element');
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

const escapeText = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
