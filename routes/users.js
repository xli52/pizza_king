/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
// const { getOrdersByID } = require('./lib/queries');

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id/orders", (req, res) => {
    const id = req.params.id

    db.query(`
    SELECT id, ordered_at AS date, is_completed AS status
    FROM orders
    WHERE guest_id = $1
    ORDER BY id DESC;
  `, [id])
      .then(results => {
        console.log(results.rows);
        res.send(results.rows);})
      .catch(e => e.message);
  });

  return router;
};
