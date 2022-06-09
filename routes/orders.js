const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2', 'key3']
}));

const orderRouter = (db) => {
  //  GET /orders/
  router.get('/', (req, res) => {
    //  Get all orders by user from database
    const queryString =
    `
    SELECT id, ordered_at AS date, is_completed AS status
    FROM orders
    WHERE guest_id = $1
    ORDER BY guest_id DESC;
    `;
    const queryParams = [req.session.userID]

    db.query(queryString, queryParams)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });

  });

  //  POST /orders/
  router.post('/', (req, res) => {
    //  Insert order into database first
    let queryString =
    `
    INSERT INTO orders (guest_id, ordered_at, is_completed)
    VALUES
    ($1, Now(), FALSE)
    RETURNING *;
    `;
    db.query(queryString, [Number(req.session.userID)])
      .then((results) => {

        //  After the order is inserted, insert the order-dish relationships into database
        const order = results.rows[0];
        queryString =
        `
        INSERT INTO orders_dishes (order_id, dish_id, amount)
        VALUES
        `;
        const queryParam = [];
        const cart = req.session.cart;
        const dishIDArray = Object.keys(cart).map( x => Number(x) );
        const amountArray = [];
        for (const key in cart) {
          amountArray.push(Number(cart[key]));
        }
        for (let i = 0; i < dishIDArray.length; i++) {
          queryParam.push(order.id);
          queryParam.push(dishIDArray[i]);
          queryParam.push(amountArray[i]);
        }
        for (let i = 0; i < queryParam.length - 2; i += 3) {
          queryString += (i === queryParam.length - 3) ? `($${i + 1}, $${i + 2}, $${i + 3}); ` : `($${i + 1}, $${i + 2}, $${i + 3}), `;
        }

        db.query(queryString, queryParam)
          .then(() => {
            //  Empty the cart
            req.session.cart = {};
            res.send(order);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  //  GET /orders/id/
  router.get('/:id', (req,res) => {
    const orderID = req.params.id;
    db.query((`
      SELECT u.name AS user_name, o.id AS order_id, o.started_at AS date, d.name as dish_name, od.amount AS amount, d.price AS price, d.photo_url AS url
      FROM users u
        JOIN orders o ON u.id = o.guest_id
        JOIN orders_dishes od ON o.id = od.order_id
        JOIN dishes d ON d.id = od.dish_id
      WHERE o.id = $1;
      `), [orderID])
      .then(results => res.send(results.rows))
      .catch(e => e.message);
  });

  return router;
}

module.exports = orderRouter;
