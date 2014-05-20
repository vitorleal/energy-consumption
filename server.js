var express    = require('express'),
    bodyParser = require('body-parser')
	  app        = express();

app.use(bodyParser());
app.use(express.static('public'));


//Main root
app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});


app.listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
