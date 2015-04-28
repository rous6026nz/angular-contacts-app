var express 	= require('express'),
	Bourne		= require('bourne'),
	bodyParser 	= require('body-parser'),

	db			= new Bourne('data.json'),
	router		= express.Router(); // Instantiate a new router object.

router
	.use(function (req, res, next) {
		if (!req.user) req.user = { id: 1 }; // If their is no request user data, set user id:1.
		next();
	})
	.use(bodyParser.json())
	.route('/contact')
		.get(function (req, res) {
			db.find({ userId: parseInt(req.user.id, 10) }, function (err, data) { // Return all records of the userId.
				res.json(data);
			});
		})
		.post(function (req, res) { // User trying to create a new contact record.
			var contact = req.body;
			contact.userId = req.user.id;
			
			db.insert(contact, function(err, data) { // Insert post data into the database.
				res.json(data); // Return the results back to the user.
			});
		});

router
		.param('id', function(req, res, next) {
			req.dbQuery = { id: parseInt(req.params.id, 10) } // The query object.
		})
		.route('/contact/:id')
			.get(function (req, res) {
				db.findOne(req.dbQuery, function (err, data) {
					res.json(data); // Send data as json to the browser.
				});
			})
			.put(function (req, res) { // Method for when the user is trying to update these records.
				var contact = req.body;
				delete contact.$promise;
				delete contact.$resolved;
				
				db.update(req.dbQuery, contact, function(err, data) {
					res.json(data[0]); // Single item returned.
				});
			})
			.delete(function(req, res) {
				db.delete(req.dbQuery, function() {
					res.json(null); // Nothing to send back.
				});
			});
			
			module.exports = router; // Export the route object.