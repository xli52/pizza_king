-- Drop and recreate order-dish relationship table

DROP TABLE IF EXISTS orders_dishes CASCADE;
CREATE TABLE orders_dishes (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  dish_id INTEGER NOT NULL REFERENCES dishes(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 1
);
