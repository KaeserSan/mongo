
var url="mongodb://localhost:27017/learnyoumongo";
var mongo = require('mongodb').MongoClient;
mongo.connect(url, function(err, db) {
  // db gives access to the database
  //       Use the parrots collection to find all documents where age
  // is greater than the first argument passed to your script.
  // console.log( db );
  var object = {
    firstName: process.argv[2],
    lastName: process.argv[3]
  };


  var parrots = db.collection('parrots');
  parrots.insertOne( object , function(err, data){
    console.log( JSON.stringify( object ) );
    db.close();
  });
});

