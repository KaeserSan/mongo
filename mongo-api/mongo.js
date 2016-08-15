/*jshint esversion:6 */
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

var url="mongodb://localhost:27017/test";
var $ = require('jquery');

exports.getRestaurants = function ( req, query, params, callback ){
  mongo.connect(url, function(err, db) {

  var result = db.collection('restaurants');
  var myQuery = getQuery( result, {}, query );

  myQuery.results.toArray(function(err, data){
      if (err) { console.log( err);}
      callback( data );
    });
    // db.close();
  });
};

exports.getRestaurantsId = function ( req, query, params, callback ){
  mongo.connect(url, function(err, db) {

  var searchId = params.id;
  var filter = {
    _id: ObjectId(searchId)
  };
  console.log(filter);
  console.log( searchId );
  var result = db.collection('restaurants');
  var myQuery = getQuery( result, filter, query );

  myQuery.results.toArray(function(err, data){
      if (err) { console.log( err);}
      callback( data );
    });
    // db.close();
  });
};

exports.getRestaurantsBorough = function ( req, query, params, callback ){
  console.log('querying restaurants by borough...');

  mongo.connect(url, function(err, db) {
    var searchBorough = params.borough;
    var filter = {
      borough: searchBorough
    };

    var result = db.collection('restaurants');
    var myQuery = getQuery( result, filter, query );

    myQuery.results.toArray(function(err, data){
      if (err) { console.log( err);}
      callback( data );
    });
    // db.close();
  });
};

exports.getRestaurantsCuisine = function ( req, query, params, callback ){
  console.log('querying restaurants by cuisine...');
  console.log(req.originalUrl);
  mongo.connect(url, function(err, db) {

    var searchCuisine = params.cuisine;
    if (req.originalUrl.indexOf('/not/') != -1){
      var filter = {
        cuisine: {$ne: searchCuisine}
      };
    }
    else{
      var filter = {
        cuisine: searchCuisine
      };
    }

    var result = db.collection('restaurants');
    var myQuery = getQuery( result, filter, query );

    myQuery.results.toArray(function(err, data){
      if (err) { console.log( err);}
      callback( data );
    });
    // db.close();
  });
};




function getQuery( db, filter, myQuery ){
  var filter = filter || {};
  var project = {};
  // console.log( query );
  var strTemp = "";
  var resLimit = "";
  var resPage = "";


  for (var property in myQuery) {
    if (myQuery.hasOwnProperty(property)) {
      var aProp = myQuery[property].split(',');
      for ( let elem in aProp){
        var prop = aProp[elem];
        if (property === 'show' || property === 'hide'){
          project[prop] = (property === 'show' ? 1: ( property === 'hide' ? 0: '') );
        } else {
          if (property === 'limit'){
            resLimit = myQuery.limit;
          }
          else {
            if (property==='page'){
              resPage = myQuery.page;
            }
          }
        }
      }
    }
  }
  // console.log(filter);
  // console.log( project );
  // console.log( resLimit );
  // console.log( resPage );

  if (Object.keys(project).length > 0){
    var res = db.find(filter, project);
  }
  else {
    var res = db.find(filter);
  }
  if (resPage){
      res.skip((parseInt(resPage,10)-1) * parseInt(resLimit,10));
      res.limit(parseInt(resLimit,10));
  }
  else {
    if (resLimit){
      res.limit(parseInt(resLimit,10));
    }
  }


  return {
      // filter: filter,
      // resLimit: resLimit,
      // resPage: resPage
      results: res
  };



}






