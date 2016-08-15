/*jshint esversion:6 */
var mongo = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

var url="mongodb://localhost:27017/toDo";
// var $ = require('jquery');

var _tasks = {};
var counter = 0;

function getCompleted ( param1, callback ){
  console.log("getCompleted: ");
  var filter = { completed: true };
  var project = {};
  var tasksCompleted = getTasks(filter, project, data => callback(data) );
}

function getIncompleted ( param1, callback ){
  console.log("getIncompleted: ");
  var filter = { completed: false };
  var project = {};
  var tasksIncompleted = getTasks(filter, project, data => callback(data) );
}

function addTask ( task, callback ){
  console.log("deleteTask: ");

  mongo.connect(url, function(err, db) {
    if (err) { console.log( "Error conecting DB: " + error );} //db.remove(){ status: 'D'}
    var result = db.collection("tasks").insertOne( task );
    getIncompleted( 0, callback);
  });
}

function delTask ( id, callback ){
  console.log("deleteTask: ");
  var filter = filter || { "_id": ObjectId( id )};

  mongo.connect(url, function(err, db) {
    if (err) { console.log( "Error conecting DB: " + error );} //db.remove(){ status: 'D'}
    var result = db.collection("tasks").deleteOne( filter );
    getIncompleted( 0, callback);
  });
}

exports.getIncompleted = getIncompleted;
exports.addTask = addTask;
exports.delTask = delTask;
exports.getCompleted = getCompleted;

exports.markCompleted = function( id, callback ){
  console.log("markTask: ");
  var filter="";
  if (id==='*'){
    filter = {};
  }
  else{
    filter = { "_id": ObjectId( id )};
  }
  console.log( filter );
  var data = {
    $set:{
      completed: true,
      timeDateCompletion: new Date()
    }
   };

  mongo.connect(url, function(err, db) {
    if (err) { console.log( "Error conecting DB: " + error );} //db.remove(){ status: 'D'}
    var result = db.collection("tasks").updateOne( filter, data );
    getIncompleted( 0, callback);
  });
};





function getTasks ( filter, project, callback ){
  filter = filter || {};
  project = project || {};

  console.log( filter );
  console.log( project );
  mongo.connect(url, function(err, db) {
    if (err) { console.log( "Error conecting DB: " + error );}
    var result = db.collection("tasks").find( filter, project );
    result.toArray(function(error, data){
      if (error) { console.log("Error en los datos..." + err);}
      callback( data );
    });
  });
}


exports.markAllCompleted = function( ){
  for (let item in _tasks){
    _tasks[item].completed = true;
    _tasks[item].timeDateCompletion = Date.now();
  }
  taskLog();
};



exports.tasks = _tasks;
exports.counter = counter;




















// var _tasks = [
//   {
//     id: 1,
//     name: "my first task",
//     completed: false,
//     timeDateCreation: new Date("01/01/2000"),
//     timeDateCompletion: undefined
//   },
//   {
//     id: 2,
//     name: "another task",
//     completed: false,
//     timeDateCreation: new Date("01/01/2001"),
//     timeDateCompletion: undefined
//   },
//   {
//     id: 3,
//     name: "and another task one more time",
//     completed: false,
//     timeDateCreation: new Date("01/01/2002"),
//     timeDateCompletion: undefined
//   }
// ];
// var counter = 100;