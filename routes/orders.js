const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
const { promiseImpl } = require('ejs');

router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2', 'key3']
}));

const orderRouter = (db, client, numbers) => {
  //  GET /orders/
  router.get('/', (req, res) => {
    //  Get all orders by user from database
    const queryString =
    `
    SELECT id, ordered_at AS date, is_completed AS status
    FROM orders
    WHERE guest_id = $1
    ORDER BY id DESC;
    `;
    const queryParam = [req.session.userID]

    db.query(queryString, queryParam)
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });

  });

  //  POST /orders/sms
  router.post('/sms', (req, res) => {

    const createQueryParam = (order) => {
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

      return queryParam;
    }


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

        const order = results.rows[0];

        //  After the order is inserted, insert the order-dish relationships into database

        queryString =
        `
        INSERT INTO orders_dishes (order_id, dish_id, amount)
        VALUES
        `;

        queryParam = createQueryParam(order);

        for (let i = 0; i < queryParam.length - 2; i += 3) {
          queryString += (i === queryParam.length - 3) ? `($${i + 1}, $${i + 2}, $${i + 3}); ` : `($${i + 1}, $${i + 2}, $${i + 3}), `;
        }

        db.query(queryString, queryParam)
          .then((results) => {
            console.log('query results: ', results);
          })
          .catch(err => console.log(err.message));

        const newQueryParam = [queryParam[0]];
        db.query(`SELECT od.order_id, d.name, od.amount
                  FROM orders_dishes od JOIN dishes d ON od.dish_id = d.id
                  WHERE od.order_id = $1`, newQueryParam)
          .then(results => {
            const orderDetails = results.rows;
            const order_id = newQueryParam[0];
            let textString = `Order_id: ${order_id}.\n`;

            for (const dish of orderDetails) {
              textString += `${dish.name} x ${dish.amount} \n`;
            }
            client.messages
              .create({
                // use loop to generate the order list string
                body: `You have received a new order: ${textString}\nPlease specify your response in the following format: {order_id}-{mins}`,
                from: numbers.twilioNum,
                to: numbers.recNum //send message to owner
              })
              .then((message) => {
                console.log(message.status)
              });
        req.session.cart = {};
        res.send(order);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch(err => console.log(err.message));
  });



  // POST /orders/sms/res --> send a message to customer after owner has specified how much preparation time is needed
  router.post('/sms/res', (req, res) => {
    //receives owner's response, query the database to get the order_id
    const content = req.body.Body.split('-');
    const order_id = content[0];
    const prepTime = content[1];

    const queryString =
      `SELECT phone
        FROM users u JOIN orders o
          ON u.id = o.guest_id
        WHERE o.id = $1;
      `;
    const queryParam = [ order_id ];

    db.query(queryString, queryParam)
      .then((results) => {
        const tel = `+1${results.rows[0].phone}`;

        client.messages
        .create({
          body: `Thank you for your order! Your order_id is ${order_id} and will be ready in ${prepTime} minutes!`,
          from: numbers.twilioNum,
          to: tel
        })
        .then(message => console.log(message.status))
        .then(() => {
          // after the prepTime is up, send a sms to the user reminder them to pick up their order.
          setTimeout(() => {
            client.messages
            .create({
              body: `Thank you for waiting. Your order is ready for pick up now!`,
              from: numbers.twilioNum,
              to: tel
            })
            .then(message => console.log(message.status))
            .then(() => {
              db.query(`
                UPDATE orders
                SET is_completed = $1
                WHERE id = $2
                RETURNING *;
                `, [true, order_id])
              .then((results) => {
                console.log(results.rows);
              })
              .catch((err) => {
                console.log(err.message)
              })
            })
            .catch(e => console.log(e.message));
          }, prepTime * 60000)
        })
        .catch(e => console.log(e.message));

        res.end();
      })
      .catch(e => console.log(e.message));
  })


  //  GET /orders/id/
  router.get('/:id', (req,res) => {
    const orderID = req.params.id;
    db.query((`
      SELECT u.name AS user_name, o.id AS order_id, o.ordered_at AS date, d.name as dish_name, od.amount AS amount, d.price AS price, d.photo_url AS url, o.is_completed AS status
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
