const express = require('express');
const router = express.Router();

const getMenusQuery = function() {
  let query =
  `
  SELECT * FROM dishes
  `;
  return query;
};

const menusRouter = (db) => {
  // GET /menus/
  router.get('/', (req, res) => {
    console.log(req);
    db.query(getMenusQuery())
      .then((results) => {
        res.send(results.rows);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // GET /menus/:id

  // return router
  return router;
};

module.exports = menusRouter;
