var bodyParser = require('body-parser');
var express = require('express');
var app = express();

// 設置handlebars視圖引擎
var handlebars = require('express3-handlebars').create({
    defaultLayout: 'main-layout',
    extname: '.hbs',
    helpers: {
       section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
       }
    }
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// set server port
app.set('port', process.env.PORT || 3000);

// set parsers
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// static resources
app.use(express.static(__dirname + '/public'));

// routes
require('./controllers/page-routes.js')(app);

// 404 Page
app.use(function(req, res){ 
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

// 500 Page
app.use(function(err, req, res, next){ 
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
     console.log( 'Express started on http://localhost:' +
     		app.get('port') + '; press Ctrl-C to terminate.' );
});