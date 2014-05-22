//Get price based on the table
exports.getPrice = function (kWh) {
  var table = [0.12919, 0.22143, 0.332114, 0.36906],
      kwh   = parseFloat(kWh),
      price;

  if (kwh <= 30) {
    price = table[0];

  } else if (kwh > 30 && kwh <= 100) {
    price = table[1];

  } else if (kwh > 100 && kwh <= 220) {
    price = table[2];

  } else {
    price = table[3];
  }

  return price;
};


//Calculate balance
exports.calcBalance = function (price, balance, consume) {
  var newBalance = (balance - (consume * price)).toFixed(2);

  if (newBalance <= 0) {
    newBalance = 0;
  };

  return newBalance;
};


//Calculate price
exports.calcPrice = function (consume, price) {
  return (consume * price).toFixed(2);
};


//Generate consume
exports.generateConsume = function () {
  return parseFloat((Math.random() * 3 + 2).toFixed(1));
}
