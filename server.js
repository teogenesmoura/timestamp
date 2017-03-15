var express = require('express');
var app = express();
var chrono = require('chrono-node');
var moment = require('moment');
var obj = [];
var unixTimeStamp = [];

app.set('view engine', 'ejs');

app.get('/', function(req,res){
	res.render('index');
});

app.get('/:date',function(req,res){
	var naturalDate = chrono.parseDate(req.params.date);
	var isUnixTimeStamp = false;

	if(+req.params.date >= 0){
		isUnixTimeStamp = true;
	}
	if(isUnixTimeStamp && (naturalDate == null)){
		var naturalDate = moment.unix(req.params.date).format('ll');
		obj = JSON.stringify({unix : req.params.date, natural: naturalDate});
	}
	if(naturalDate != null && !isUnixTimeStamp){
		var unixTimeStamp = new Date(naturalDate).getTime() / 1000;
		obj = JSON.stringify({unix : unixTimeStamp, natural : req.params.date});
	}
	if((naturalDate == null) && !isUnixTimeStamp){
		obj = JSON.stringify({unix : null, natural : null});
	}
	res.send(obj);
});

app.listen(process.env.PORT || 3000);