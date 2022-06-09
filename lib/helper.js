// Helper functions

const countAllDishes = function(cart) {
  let count = 0;
  for (const index in cart) {
    count += cart[index];
  }
  return count;
};

module.exports = { countAllDishes };
