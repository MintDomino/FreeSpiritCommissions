// REQUIRED PACKAGES
//==============================================================================
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//INITIAL SETUP
//==============================================================================
var server = express();
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

var port = process.env.PORT || 0869;  //Sets the port for the site
server.use(express.static(__dirname + '/'));


//MODELS
//==============================================================================



//API ROUTES
//==============================================================================
var router = express.Router();

///Middleware for requests
router.use(function(req, res, next){
  console.log('Request made! ' + req.url);
  next();
});

var express = require('express')
  , router = express.Router();

router.get('*',function(req, res){
    res.sendFile(__dirname + "/index.html");
  });


///Route Registration
server.use('/',router);


//START THE server
//==============================================================================
server.listen(port);
console.log('Now listening on port ' + port);
