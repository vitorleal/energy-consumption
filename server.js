var express    = require('express'),
    bodyParser = require('body-parser'),
    path       = require('path'),
    routes     = require('./routes/routes'),
	  app        = express();

app.use(bodyParser());
app.use(express.static(path.resolve(__dirname, 'public')));


//Main root
app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/credit', routes.addCredit);


app.listen(5000);
console.log('Server running at http://127.0.0.1:5000/');
