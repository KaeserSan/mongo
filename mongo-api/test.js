
var url="mongodb://localhost:27017/test";
var mongo = require('mongodb').MongoClient;
mongo.connect(url, function(err, db) {

  var restaurants = db.collection('restaurants');

  restaurants.find()
    .toArray(function(err, results ){
      return results;
    });

  
});
