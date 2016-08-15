var express = require('express');
// var pug = require('pug');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var hbs = require('hbs');
var path = require('path');
//var template = require('pug').compileFile( path.join(__dirname, '/views/layout.jade'));
var jade = require('jade');
var dateFormat = require('date-format');

var _tasks = require('./tasks');

var app = express();

app.locals.moment = require('moment');

app.set('views', path.join(__dirname, '/views'));
console.log(path.join(__dirname, '/views'));
app.set('view engine', 'jade');

app.use( express.static('public') );

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('stylus').middleware('public'));



app.get('/tasks', function(req, res, next) {
  tasks: _tasks.getIncompleted(0, function( data ) {
    console.log( data );
    res.render('tasks', { tasks: data, path: req.path });
  });
});

app.delete('/tasks/:id', function(req, res, next){
  _tasks.delTask( req.params.id , function( data ){
    res.render('tasks', { tasks: data, path: req.path });
  });
});

app.post('/tasks', function(req,res) {
  if ( !req.body || !req.body.name ) res.send ("error!");
  var taskName = req.body.name;
  var newTask = {
    name: taskName,
    completed: false,
    timeDateCreation: new Date(),
    timeDateCompletion: null
  };
  _tasks.addTask(newTask, function( data ){
    res.redirect('/tasks');
  });
});

app.get('/completed', function(req, res, next) {
  _tasks.getCompleted( 0, function( data ){
    console.log( data );
    res.render('completed', { title: 'Completed', tasks: data, path: req.path });
  });
});

app.post('/completeAll', function( req, res, next){
  _tasks.markCompleted( '*', function ( data ){
  res.status(200).send('task deleted!');
  } );
});





app.post('/complete/:id', function( req, res, next){
  _tasks.markCompleted( req.params.id,function ( data ){
  res.status(200).send('task deleted!');
  } );
});



app.listen(3000, function() {
	console.log("Listening on port 3000");
});