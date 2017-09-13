require('dotenv').config();

var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // added in module 7
var sequelize = require('./db.js');		// added in module 9

var User = sequelize.import(__dirname + '\\models\\user');

//Create table

sequelize.sync();	//User.sync({force:true});	//WARNING: THIS DROPS(DELETES) USER TABLE

app.use(bodyParser.json());

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

//Creating a user
app.use('/api/user',require('./routes/user'));

//Logging in a user
app.use('/api/login', require('./routes/session'));
//localhost:3000/api/login/


app.use('/api/definition', require('./routes/definition'));

app.use('/api/log', require('./routes/log'));

app.use('/api/test', function(req,res){
	res.send('Hello World, from server app.js!')
});

app.listen(3000, function(){
	console.log("...App is listening (open) on 3000...");
});