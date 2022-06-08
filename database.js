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
    SELECT id, ordered_at AS date, is_completed AS status
    FROM orders
    WHERE guest_id = $1
    ORDER BY id DESC;
  `, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((e) => {
      console.log(e.message);
    })
}

exports.getOrdersByID = getOrdersByID;
