$(() => {
  $('.nav-cart').on('click', () => {
    // $.get('/users/cart', () => {
      $('.menu-container').empty();
      // need another line here to grab session data
      loadFakePage();
    // })
  })
});

//////////////////////////////////////
// Redering
/////////////////////////////////////

const loadFakePage = () => {
  const $fake = $(`
    <article class="cart">
      <div class="cart-left">
        <table>
          <thead>
            <tr>
              <th scope="col">Order No. 1</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Customer: John Doe</th>
              <th scope="col">Date: Jun 5, 2022</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
            <tr>
              <th scope="col">Dish</th>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td><img class="cart-image" src="https://d1ralsognjng37.cloudfront.net/0c9767c4-442b-4715-ab37-476a61ba2aaf.jpeg" alt=""></td>
                  <td>THE ORIGINAL BBQ SHICKEN PIZZA</td>
                  <td><input class="dish_id" type="number" min="0" value="2" name="amount"></td>
                  <td>$19.99</td>
                  <td><button id="dish_id">Update</button></td>
                  <td><button class="dish_id" id="delete">Remove</button></td>
                </tr>

                <tr>
                  <td><img class="cart-image" src="https://d1ralsognjng37.cloudfront.net/d1bf464f-7121-4002-97f1-84b0fd55d815.jpeg" alt=""></td>
                  <td>HAWAIIAN</td>
                  <td><input class="dish_id" type="number" min="0" value="2" name="amount"></td>
                  <td>$22.99</td>
                  <td><button id="dish_id">Update</button></td>
                  <td><button class="dish_id" id="delete">Remove</button></td>
                </tr>
          </tbody>
        </table>
      </div>


      <div class="cart-right">
        <div class="cart-bill">
          <h3>Billing Total</h3>
          <p>Sub-Total<span>$85.96</span></p>
          <p>GST 5%<span>$4.30</span></p>
          <p>PST 7%<span>$6.02</span></p>
          <hr>
          <p>Total<span>$96.28</span></p>
        </div>
        <div class="cart-placeorder">
          <form action="/user/orders" method="GET">
            <button>Place Order!</button>
          </form>
        </div>
      </div>
    </article>
  `);

  return $('.menu-container').append($fake);
}



const loadCartOrders = () => {

}

const loadCartLayout = () => {

}

const renderCard = (data) => {
  load
}
