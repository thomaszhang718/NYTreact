// dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
// Notice: Our scraping tools are prepared, too
var request = require('request');
var cheerio = require('cheerio');

// use morgan and bodyparser with our app
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// make public a static dir
app.use(express.static('public'));

// set up handlebars default layout and view engine
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');





// Database configuration with mongoose
mongoose.connect('mongodb://heroku_0nmczq32:t09nppt89g14cvgn92c39t3okd@ds057476.mlab.com:57476/heroku_0nmczq32');
//mongoose.connect('mongodb://localhost/nytreacthw');

var db = mongoose.connection;

// show any mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});


// And we bring in our Article model
var Article = require('./models/Article.js');


// Routes
// ======

// Simple index route
app.get('/', function(req, res) {
  //render home.handlebars
  res.render('home');
});




// This is the route we will send GET requests to retrieve our saved articles.
// We will call this route the moment our page gets rendered
app.get('/api/saved', function(req, res) {

  // This GET request will search for all the Articles
    Article.find({})
    	.exec(function(err, doc){

        if(err){
        	console.log(err);
        }
      	else {
        	res.send(doc);
      	}
    });
});

// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.post('/api/saved', function(req, res){

	console.log("got to save");

  console.log(req.body);

  var newArticle = new Article(req.body);

	// and save the new note the db
	newArticle.save(function(err, doc){
		// log any errors
		if(err){
			console.log(err);
		}
		// otherwise
		else {
			//send doc, which is the data of the new note
			res.send(doc);
		}
	});
});



// This is the route we will send POST requests to save each click.
// We will call this route the moment the "click" or "reset" button is pressed.
app.delete('/api/saved', function(req, res){

	console.log("got to delete");

	console.log(req.body);
	console.log(req.body.id);

	Article.remove({'_id': req.body._id})
	// execute the above query
	.exec(function(err, doc){
		// log any errors
		if (err){
			console.log(err);
		} else {
			// or send the document to the browser
			//console.log(doc)
			res.send(doc);
		}
	});	





});





// set up port for heroku
var PORT = process.env.PORT || 3000;
// listen on port 3000
app.listen(PORT, function() {
  console.log('App running on port 3000!');
});