var helper = require('./helpers'),
    mongo  = require('mongodb'),
    Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure,
    server = new Server('localhost', 27017, {
      auto_reconnect: true,
      journal       : true,
      safe          : true
    }),
    db   = new Db('light', server),
    user = {
      name   : 'Pablo Larrieux',
      email  : 'pablo@telefonica.com',
      pass   : '1234',
      balance: '20.00',
      kwh    : 20,
      kwhBalance: helper.moneytoKwh(30, 20)
    };


//DB open
db.open(function (err, db) {
  if(!err) {
    db.collection('user', { strict: true }, function (err, collection) {
      if (err) {
        populateDB();
      }
    });
  }
});


//Index
exports.index = function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
};


//Login
exports.login = function (req, res) {
  var email = req.body.email,
      pass  = req.body.pass;

  db.collection('user', function (err, collection) {
    collection.findOne({ email: email }, function (err, user) {
      if (!user) {
        res.send({ error: 'Este email não está cadastrado' });

      } else {
        if (pass == user.pass) {
          res.send(user);

        } else {
          res.send({ error: 'Senha inválida' });
        }
      }
    });
  });
};


//Credit
exports.addCredit = function (req, res) {
  var email = req.body.email;

  db.collection('user', function (err, collection) {
    var balance = parseFloat(req.body.balance),
        credit  = parseFloat(req.body.credit),
        kwh     = parseFloat(req.body.kwh);

    collection.update({ email: email }, {
      $set: {
        balance   : (balance + credit).toFixed(2),
        kwhBalance: helper.moneytoKwh((balance + credit), kwh)
      }
    }, function (err, user) {
      res.send({ message: 'Crédito atualizado com sucesso' });
    });
  });
};


//Remove Credit
exports.removeCredit = function (req, res) {
  var email   = req.body.email,
      kwh     = parseFloat(req.body.kwh),
      balance = parseFloat(req.body.balance),
      price   = helper.getPrice(kwh),
      consume = helper.generateConsume(kwh);

  db.collection('user', function (err, collection) {
    var newBalance = helper.calcBalance(price, balance, consume);

    collection.update({ email: email }, {
      $set: {
        balance   : newBalance,
        kwh       : (kwh + consume).toFixed(1),
        kwhBalance: helper.moneytoKwh(newBalance, kwh)
      }
    }, function (err, user) {
      db.collection('history', function (err, collection) {
        helper.moneytoKwh(balance, kwh);
        collection.insert({
          email     : email,
          price     : (consume * price).toFixed(2),
          consumed  : consume,
          price_used: price,
          kwh_total : (kwh + consume).toFixed(1),
          created_at: new Date()

        }, function (err, user) {
          res.send({ message: 'Crédito debitado' });
        });
      });
    });
  });
};


//Get history
exports.showHistory = function (req, res) {
  var email = req.body.email;

  db.collection('history', function (err, collection) {
    if (err) {
      res.send({ error: 'Erro ao resgatar o histórico' });

    } else {
      collection.find({ email: email })
        .sort({ created_at: -1 })
        .limit(10)
        .toArray(function (err, history) {

        if (!history) {
          res.send({ history: [] });

        } else {
          var kWh = ['kWh'];

          history.forEach(function (k, v) {
            kWh.push(k.consumed);
          });

          res.send({
            history: history,
            graph  : {
              kWh: kWh
            }
          });
        }
      });
    }
  });
};


//Clean history
exports.resetUser = function (req, res) {
  var email = req.body.email;

  db.collection('user', function (err, collection) {
    collection.update({ email: email }, user, function (err, user) {
      db.collection('history', function (err, collection) {
        collection.drop(function () {
          res.send({ message: 'User reseted' });
        });
      });
    });
  });
};



//Populate DB
var populateDB = function () {
  db.collection('user', function (err, collection) {
    collection.insert(user, { safe: true }, function (err, result) {});
  });
};
