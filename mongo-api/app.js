/*jshint esversion:6 */
var express = require('express');
var path = require('path');
var db = require('./mongo.js');
var bodyParser = require('body-parser');
var app = express();

/*

GET /restaurants
GET /restaurants?show=_id,name,borough,cuisine
GET /restaurants?hide=_id => http://localhost:3000/restaurants?hide=_id&show=name,cuisine
GET /restaurants/borough/:borough => http://localhost:3000/restaurants/borough/Bronx
GET /restaurants?limit=5
GET /restaurants?limit=5&page=2
GET /restaurants/cuisine/:cuisine => http://localhost:3000/restaurants/cuisine/Bakery
GET /restaurants/cuisine/not/:cuisine => http://localhost:3000/restaurants/cuisine/not/Bakery
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/restaurants', function (req, res) {
  var query = req.query || {};
  var params = req.params || {};
  db.getRestaurants( req, query, params, function( data ){
    // console.log( data );
    res.send( data );
  });
});

app.get('/restaurants/:id', function (req, res) {
  var query = req.query || {};
  var params = req.params || {};
  db.getRestaurantsId( req, query, params, function( data ){
    // console.log( data );
    res.send( data );
  });
});

app.get('/restaurants/borough/:borough', function (req, res) {
  var query = req.query || {};
  var params = req.params || {};
  db.getRestaurantsBorough( req, query, params, function( data ){
    // console.log( data );
    res.send( data );
  });
});

app.get('/restaurants/cuisine/:cuisine', function (req, res) {
  var query = req.query || {};
  var params = req.params || {};
  console.log(req.originalUrl);
  db.getRestaurantsCuisine( req, query, params, function( data ){
    // console.log( data );
    res.send( data );
  });
});

app.get('/restaurants/cuisine/not/:cuisine', function (req, res) {
  var query = req.query || {};
  var params = req.params || {};
  db.getRestaurantsCuisine( req, query, params, function( data ){
    // console.log( data );
    res.send( data );
  });
});



app.listen(3000);

app.on("listening", function () {
  console.log('Example app listening on port 3000!');
});

