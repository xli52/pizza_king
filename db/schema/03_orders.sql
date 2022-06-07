-- Drop and recreate order table

DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  guess_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  ordered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  started_at TIMESTAMP,
  preperation_time INTEGER,
  is_accepted BOOLEAN,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE
);
