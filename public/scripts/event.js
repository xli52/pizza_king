import { renderCart, renderEmptyCart, renderOrderSuccessPage, updateBillDetails } from "./cart_page.js";
import { renderOrdersLayout } from './order_page.js'
import { countAllDishes, getIDFromAttr } from "./tools.js";
import { loadMenus } from "./app.js";
import { renderOrderDetailsLayout } from "./order_detail.js";

//  Setup click order button event listener
export const setOrderButtonEventListener = function() {
  $('.nav-order').click(function() {
    $.get('/orders', (orders) => {
      renderOrdersLayout(orders);
    });
  });

  $('main').on('click', '.back-btn', () => {
    $.get('/orders', (orders) => {
      renderOrdersLayout(orders);
    });
  });
};

/*
 * All home page event listeners below
*/

//  Setup click cart button event listener
export const setCartButtonEventListener = function() {
  $('.nav-cart').click(function() {
    $.get('/cart', (dishes) => {
      if (dishes.length === 0) {
        renderEmptyCart();
        setBackButtonEventListener();
      } else {
        renderCart(dishes);
        setCartReduceEventListener();
        setCartAddEventListener();
        setCartDeleteEventListener();
        setPlaceOrderButtonEventListner();
      }
    });
  });
};

//  Setup add to cart event listener
export const setAddToCartEventListener = function() {
  // When click add to cart button, send POST /cart/id request
  $('.add-to-cart').click(function() {
    const id = getIDFromAttr($(this).attr('id'));
    const url = `/cart/${id}`;
    $.post(url, (cart) => {
      // Update nav bar cart counter
      const count = countAllDishes(cart);
      $('.cart-counter').text(count);
    })
  });
};

/*
 * All cart page event listeners below
*/

//  Setup reduce cart amount event listener
const setCartReduceEventListener = function() {
  $('.cart-minus-button').click(function() {
    const id = getIDFromAttr($(this).attr('id'));
    const url = `/cart/reduce/${id}`;
    $.post(url, (data) => {
      //  Render empty cart page if cart is empty
      if (data.dishes.length === 0) {
        $('.cart-counter').text(0);
        renderEmptyCart();
        setBackButtonEventListener();
        return;
      }

      //  Update cart amount counter
      if (!data.cart[id]) {
        $(`#cart-table-id-${id}`).remove();
      } else {
        //  Update cart dish amount and price
        $(`#cart-amount-id-${id}`).text(data.cart[id]);
        for (const dish of data.dishes) {
          if (dish.id === Number(id)) {
            $(`#cart-price-id-${id}`).text(`$${dish.price * dish.amount / 100} CAD`)
          }
        }
      }

      //  Update bill details
      updateBillDetails(data.dishes)

      //  Update nav bar cart counter
      const count = countAllDishes(data.cart);
      $('.cart-counter').text(count);

    });
  });
}

//  Setup add cart amount event listener
const setCartAddEventListener = function() {
  $('.cart-add-button').click(function() {
    const id = getIDFromAttr($(this).attr('id'));
    const url = `/cart/add/${id}`;
    $.post(url, (data) => {
      //  Update cart dish amount and price
      $(`#cart-amount-id-${id}`).text(data.cart[id]);
      for (const dish of data.dishes) {
        if (dish.id === Number(id)) {
          $(`#cart-price-id-${id}`).text(`$${dish.price * dish.amount / 100} CAD`)
        }
      }

      //  Update bill details
      updateBillDetails(data.dishes)

      //  Update nav bar cart counter
      const count = countAllDishes(data.cart);
      $('.cart-counter').text(count);

    });
  });
}

//  Setup delete cart amount event listener
const setCartDeleteEventListener = function() {
  $('.cart-trash-button').click(function() {
    const id = getIDFromAttr($(this).attr('id'));
    const url = `/cart/delete/${id}`;
    $.post(url, (data) => {
      //  Render empty cart page if cart is empty
      if (data.dishes.length === 0) {
        $('.cart-counter').text(0);
        renderEmptyCart();
        setBackButtonEventListener();
        return;
      }

      //  Remove cart dish item
      $(`#cart-table-id-${id}`).remove();

      //  Update bill details
      updateBillDetails(data.dishes)

      //  Update nav bar cart counter
      const count = countAllDishes(data.cart);
      $('.cart-counter').text(count);

    });
  });
}

//  Set up back to menu button click listener
export const setBackButtonEventListener = function() {
  $('.back-to-menu').click(function() {
    loadMenus();
  });
};

//  Set up place order button click listener
const setPlaceOrderButtonEventListner = function() {
  $('.cart-place-order').click(function() {
    $.post('/orders', (order) => {
      $('.cart-counter').text(0);
      renderOrderSuccessPage();
      setViewOrderButtonEventListener(order);
      //  Send SMS to owner and guest...
    });
  });
};

//  Setup view orders button click listener
const setViewOrderButtonEventListener = function(order) {
  $('.view-order').click(function() {
    const url = `/orders/${order.id}`
    $.get(url, (dishes) => {
      renderOrderDetailsLayout(dishes);
    });
  });
};
