var Personaje;
exports.setModel = function(modelo){
	Personaje = modelo;
};
exports.index = function(req, res){
	Personaje.find({}, function(error, personajes){
		if(error){
			res.send('Ha surgido un error.');
		}else{
			res.render('personajes/index', {
				personajes: personajes
			});
		}
	})
};
exports.create = function(req, res){
	res.render('personajes/save', {
		put: false,
		action: '/personajes/',
		personaje: new Personaje({
			nombre: '',
			apellido: '',
			biografia: ''
		})
	});
};
exports.store = function(req, res){
	var personaje = new Personaje({
		nombre: req.body.nombre,
		apellido: req.body.apellido,
		biografia: req.body.biografia
	});
	personaje.save(function(error, documento){
		if(error){
			res.send('Error al intentar guardar el personaje.');
		}else{	
			res.redirect('/personajes');
		}
	});
};
exports.show = function(req, res){
	Personaje.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.render('personajes/show', {
				personaje: documento
			});
		}
	});
};
exports.edit = function(req, res){
	Personaje.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			res.render('personajes/save', {
				put: true,
				action: '/personajes/' + req.params.id,
				personaje: documento
			});
		}
	});
};
exports.update = function(req, res){
	Personaje.findById(req.params.id, function(error, documento){
		if(error){
			res.send('Error al intentar modificar el personaje.');
		}else{
			var personaje = documento;
			personaje.nombre = req.body.nombre;
			personaje.apellido = req.body.apellido;
			personaje.biografia = req.body.biografia;
			personaje.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el personaje.');
				}else{	
					res.redirect('/personajes');
				}
			});
		}
	});
};
exports.destroy = function(req, res){
	Personaje.remove({_id: req.params.id}, function(error){
		if(error){
			res.send('Error al intentar eliminar el personaje.');
		}else{	
			res.redirect('/personajes');
		}
	});
};
