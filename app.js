
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var personajes = require('./routes/personajes');
mongoose.connect('mongodb://localhost/primer_base', function(error){
	if(error){
		throw error;		
	}else{
		console.log('Conectado a MongoDB');
	}
});
var PersonajeSchema = mongoose.Schema({
	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	biografia: {type: String, required: true}
});
var PersonajeModel = mongoose.model('Personaje', PersonajeSchema);
personajes.setModel(PersonajeModel);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.get('/personajes', personajes.index);
app.get('/personajes/create', personajes.create);
app.post('/personajes', personajes.store);
app.get('/personajes/:id', personajes.show);
app.get('/personajes/:id/edit', personajes.edit);
app.put('/personajes/:id', personajes.update);
app.delete('/personajes/:id', personajes.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
