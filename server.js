var express    = require('express'),
    bodyParser = require('body-parser'),
    routes     = require('./routes/routes'),
	  app        = express();

app.use(bodyParser());
app.use(express.static('public'));


//Main root
app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/credit', routes.addCredit);


app.listen(3333);
console.log('Server running at http://127.0.0.1:3333/');
