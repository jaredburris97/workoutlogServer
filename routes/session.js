var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');

router.post('/', function(req, res){	//changed app.post to router.post (module 10)
	User.findOne( { where: { username:req.body.user.username } } ).then(
		function(user) {
			if (user) {
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
					if (matches) {
						var token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
							res.json({
										user: user,
										message: 'Successfully authenticated.',
										sessionToken: token
							});
					} else {
					res.status(500).send({ error: "Failed to authenticate."});
					}
				});
			} else {
					res.status(500).send({ error: "Failed to authenticate."});
			}
		},
		function(err) {
				res.json(err);
		}
	);
});

module.exports = router;