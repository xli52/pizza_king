-- Drop and recreate dish table

DROP TABLE IF EXISTS dishes CASCADE;
CREATE TABLE dishes (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  calorie INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255),
  description TEXT
);
