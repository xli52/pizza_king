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
      url: `/orders`,
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
