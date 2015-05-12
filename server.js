var express = require('express'),
	api		= require('./api'),
	users	= require('./accounts'),
	app		= express(); // Instantiate the Express application.

app
	.use(express.static('./bower_components')) // Express middleware - Statically server all file inside bower_components directory.
	.use(users)
	.use('/api', api) // Prefix all the routes within the api object with '/api'. 
	.get('*', function (req, res) {
		if (!req.user) {
			res.redirect('/login.html');
		} else {
			res.sendfile('bower_components/main.html'); // Response method for all responses not caught up until the GET method.
		}
	})
	.listen(3000); // Start the application.