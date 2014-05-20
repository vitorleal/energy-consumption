var mongo  = require('mongodb'),
    Server = mongo.Server,
    Db     = mongo.Db,
    BSON   = mongo.BSONPure,
    server = new Server('localhost', 27017, {
      auto_reconnect: true,
      journal       : true,
      safe          : true
    }),
    db = new Db('light', server);


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
        credit  = parseFloat(req.body.credit);

    collection.update({ email: email }, { $set: { balance: balance + credit } }, function (err, user) {
      res.send({ message: 'Credito atualizado com sucess' });
    });
  });
};


//Remove Credit
exports.removeCredit = function (req, res) {
  var email   = req.body.email,
      kwh     = parseFloat(req.body.kwh),
      balance = parseFloat(req.body.balance),
      price   = 0.33214,
      consume = parseFloat((Math.random() * 3 + 2).toFixed(1));

  db.collection('user', function (err, collection) {
    collection.update({ email: email }, {
      $set: {
        balance: (balance - (consume * price)).toFixed(2),
        kwh    : (kwh + consume).toFixed(2)
      }
    }, function (err, user) {
      db.collection('history', function (err, collection) {
        collection.insert({
          email   : email,
          price   : (consume * price).toFixed(2),
          consumed: consume

        }, function (err, user) {
          res.send({ message: 'Credito debitado' });
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

    } else {
      collection.find({ email: email }).toArray(function (err, history) {
        if (!history) {
          res.send({ history: [] });

        } else {
          res.send({ history: history });
        }
      });
    }
  });
};


//Populate DB
var populateDB = function () {
  var user = {
    name: 'Pablo Larrieux',
    email: 'pablo@telefonica.com',
    pass : '1234',
    balance: 50,
    kwh  : 500
  };

  db.collection('user', function (err, collection) {
    collection.insert(user, { safe: true }, function (err, result) {});
  });
};
