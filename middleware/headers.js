module.exports = function(req,res,next){
	res.header('access-control-allow-origin', '*');
	res.header('access-control-allow-methods','GET,POST,PUT,DELETE');
	res.header('access-control-allow-headers','Origin, X-Requested-With,Content-Type,Accept,Authorization');
	next();
}

//first line allows Cross Origin Requests
//second line allows headers to use those methods
//third line sets what will be happening within the header to handle auth in our app
//next(); tells our server to either go to the next middleware or keep the request going until it becomes handled