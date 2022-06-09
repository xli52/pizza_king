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

  router.get('/:order_id', (req,res) => {
    const order_id = req.params.order_id;
    db.query((`
      SELECT u.name AS user_name, o.id AS order_id, o.started_at AS date, d.name as dish_name, od.amount AS amount, d.price AS price, d.photo_url AS url
      FROM users u
        JOIN orders o ON u.id = o.guest_id
        JOIN orders_dishes od ON o.id = od.order_id
        JOIN dishes d ON d.id = od.dish_id
      WHERE o.id = $1;
      `), [order_id])
      .then(results => res.send(results.rows))
      .catch(e => e.message);
  });

  return router;
}

module.exports = orderRouter;
