//Get price based on the table
exports.getPrice = function (kWh) {
  var table = [0.12919, 0.22143, 0.332114, 0.36906],
      kwh   = parseFloat(kWh),
      price, range;

  if (kwh < 30) {
    price = table[0];
    range = 1;

  } else if (kwh >= 30 && kwh < 100) {
    price = table[1];
    range = 2;

  } else if (kwh >= 100 && kwh < 220) {
    price = table[2],
    range = 3;

  } else {
    price = table[3];
    range = 4;
  }

  return {
    price: price,
    range: range
  };
};


//Calculate balance
exports.calcBalance = function (price, balance, consume) {
  var newBalance = (balance - (consume * price)).toFixed(2);

  if (newBalance <= 0) {
    newBalance = 0;
  }

  return newBalance;
};


//Calculate price
exports.calcPrice = function (consume, price) {
  return (consume * price).toFixed(2);
};


//Generate consume
exports.generateConsume = function (kwh) {
  var kWh = parseFloat(kwh);

  return parseFloat((Math.random() * 3 + 2).toFixed(1));
};


//Convert money to kwh
exports.moneyTOkwh = function (balance, kwh) {
  var price  = this.getPrice(kwh),
      result = 0,
      range  = price.range;

  while (balance > 0) {
    if (range === 1) {
      if (balance >= 3.87) {
        balance -= 3.87;
        result += 30;
        range++;

      } else {
        break;
      }
    } else if (range === 2) {
      if (balance >= 15.50) {
        balance -= 15.50;
        result += 70;
        range++;

      } else {
        break;
      }
    } else if (range === 3) {
      if (balance >= 44.28) {
        balance -= 44.28;
        result += 120;
        range++;

      } else {
        break;
      }
    } else {
      break;
    }
  }

  price   = this.getPrice(kwh + result);
  result += (balance / price.price);

  return result.toFixed(1);
};
