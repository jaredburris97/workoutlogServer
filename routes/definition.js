var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');
var Definition = sequelize.import('../models/definition.js');

router.post('/', function(req,res) {				//post method
	//variables
	var description = req.body.definition.desc;
	var logType = req.body.definition.type;
	var owner = req.user.id;

	//object create methods
	Definition
				//objects must match the model
		.create({
			description: description,
			logType: logType,
			owner: owner
		})
			.then(
				function createSuccess(definition) {	//createSuccess function

					res.json({							//send a response as json
						definition: definition
					});
				},

				function createError(err) {				//createError function
					res.send(500, err.message);
				}
			);
});

router.get('/', function(req,res) {	
	var userid = req.user.id;							//user variable
	Definition
	.findAll({											//findAll by owner method
		where: { owner: userid }
	})

	.then(
		//success
		function findAllSuccess(data) {
			// console.log(data);
			res.json(data);
		},
		//error
		function findAllError(err) {
			res.send(500, err.message);
		}
	);
});

module.exports = router;