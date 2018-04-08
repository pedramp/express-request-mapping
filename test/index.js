const requestmapping = require('../');
var app = require('express')()

// adding custom module to routing by `register` method
requestmapping.register('customLog', 
	(req, res, next) => {

		console.log('custom log::',  req.url);
		// do something... 
		// 
		// 
		next();
	});


// pre registred modules
var basicAuth = require('basic-auth');
var modules = {

	basicAuth: function(req, res, next){
		var user = basicAuth(req);
		if (user == null || user.name !== 'admin' || user.pass !== '123') 
		{
		    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		    return res.status(401).end('error!');
		}

		next();
	}
}

// init routing method
requestmapping(app, {register:modules, path:__dirname+'/controllers'})


app.listen(3000);