const express = require('express');
const router = express.Router();



const menusRouter = (db) => {
  // GET /menus/
  router.get('/', (req, res) => {
    db.getMenusQuery()
      .then(results => res.send(results))
      .catch(e => console.log(e.message));
  });

  // GET /menus/:id

  // return router
  return router;
};

module.exports = menusRouter;
