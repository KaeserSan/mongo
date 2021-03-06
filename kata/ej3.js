
var url="mongodb://localhost:27017/learnyoumongo";
var mongo = require('mongodb').MongoClient;
mongo.connect(url, function(err, db) {
  // db gives access to the database
  //       Use the parrots collection to find all documents where age
  // is greater than the first argument passed to your script.
  // console.log( db );
  var parrots = db.collection('parrots');
  parrots.find(
    { age: {$gt: +process.argv[2]} },
    { _id: 0, name: 1, age: 1}
  )
  .toArray(function(err, result){
      console.log( result );
  });
  db.close();
});
