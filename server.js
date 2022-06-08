// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');

// Helper functions
const { countAllDishes } = require('./lib/helper');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "./public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2', 'key3']
}));

// app.use(express.static("public"));
app.use("/public", express.static('./public/'));

//  Separated Routes for each Resource
//  Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users');
const menusRoutes = require('./routes/menus');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

//  Mount all resource routes
//  Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use('/menus', menusRoutes(db));
app.use('/cart', cartRoutes(db));
app.use('/orders', orderRoutes(db));
//  Note: mount other resources here, using the same pattern above

//  Home page
//  Warning: avoid creating more routes in this file!
//  Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  console.log('Refresh home page...');
  console.log(req.session.cart);
  const count = countAllDishes(req.session.cart);
  res.render('index', { count });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
