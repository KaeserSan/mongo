var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var app = express();

// Connection URL
var url = 'mongodb://localhost:27017/test';

// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {

	if (err) throw new Error("something failed in the connection");

	app.get('/tasks', function(req,res) {
		console.log("Connected correctly to server");
		findDocuments(db, function( data ) {
				res.json(data);
        db.close();
		});
	})

	app.listen(3000, function() {
		console.log ("listening to port 3000");
	})

  //db.close();
});


function findDocuments(db, callback) {
  // Get the documents collection
  var collection = db.collection('tasks');

  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.dir(docs);
    callback(docs);
  });

}
