/////////////////////////////////////
// Database connection
////////////////////////////////////
require("dotenv").config();

const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(() => {
  console.log('Connected to database.')
});

/////////////////////////////////////
// Database queries
////////////////////////////////////

const getMenusQuery = function() {

  return db.query(`
    SELECT * FROM dishes;`)
    .then((result) => {
      return result.rows;
    })
    .catch((e) => console.log(e.message));
};

exports.getMenusQuery = getMenusQuery;

const getOrdersByID = (id) => {
  return db.query(`
    SELECT o.id, o.ordered_at AS date, o.is_completed AS status, (SELECT photo_url FROM ) AS photo
    FROM orders_dishes od
      JOIN dishes d ON od.dish_id = d.id
      JOIN orders o ON o.id = od.order_id
    WHERE o.guest_id = $1
    ORDER BY date DESC;
  `, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((e) => {
      console.log(e.message);
    })
}

exports.getOrdersByID = getOrdersByID;
