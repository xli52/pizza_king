const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2', 'key3']
}));

const cartRouter = (db) => {
  //  GET /cart/
  router.get('/', (req, res) => {
    //  Get cart from cookie
    const cart = req.session.cart;

    //  Get data of all dishes in the cart from the database
    const queryParam = Object.keys(cart).map( x => Number(x) );
    let queryString =
    `
    SELECT * FROM dishes
    WHERE id IN (
    `;
    for (let i = 0; i < queryParam.length; i++) {
      queryString += (i === queryParam.length - 1) ? `$${i + 1});` : `$${i + 1}, `;
    }
    db.query(queryString, queryParam)
      .then((results) => {
        const dishes = results.rows;
        for (let i = 0; i < dishes.length; i++) {
          dishes[i]['amount'] = cart[dishes[i]['id']];
        }
        res.send(dishes);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  //  POST /cart/
  router.post('/:id', (req, res) => {

    //  Update dish id and amount stored in cookie
    if (!req.session.cart) {
      req.session.cart = {};
    }
    const cart = req.session.cart;
    if (!cart[req.params.id] && cart[req.params.id] !== 0) {
      cart[req.params.id] = 1;
    } else {
      cart[req.params.id] += 1;
    }
    res.send(cart);
  });

  // return router
  return router;
}

module.exports = cartRouter;
