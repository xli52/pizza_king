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
    SELECT * FROM orders
    WHERE guess_id = $1;
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

  // return router
  return router;
}

module.exports = orderRouter;
