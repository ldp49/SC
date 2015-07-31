// BASE SETUP
// =======================================

//CALL THE PACKAGES ----------------------------
var express = require("express"); //call express 
var app = express(); // define 
var bodyParser = require("body-parser");
var morgan = require('morgan');
var path = require("path");
var mongoose = require("mongoose"); //for working with our database
var config = require("./config");

//APP CONFIGURATION =======================
// ==========================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
//configure our app to handle CORS requests
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

//log all requests to the console
app.use(morgan('dev'));

//connect to our databse (hosted on modulus.io)
mongoose.connect(config.database);

//set static files location
//used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));


// ROUTES FOR API ==================
//===================


//API ROUTES
var apiRoutes = require('./app/routes/api')//(app, express);
app.use('/api', apiRoutes);

//MAIN CATCHALL ROUTE =------------------
//SEND USERS TO FRONTEND --------------
//has to be registered after API ROUTES
// set up our one route to the index.html file
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

//START THE SERVER
// =================
app.listen(config.port);
console.log('Magic happens on port .' + config.port);