var express = require('express');
var hid = require('node-hid');
var BuzzerController = require('./buzzer_manager');

var devices = [];
var tmp = hid.devices();

console.log(tmp);

/*for(var i=2;i<tmp.length;++i)
{
	devices[i] = hid.HID(tmp[i].path);
	devices[i].on('data',(function(i){
		return function(data){
			console.log('data from '+tmp[i].path+' : '+data);
		};
	})(i));
	devices[i].on('error',(function(i){
		return function(error){
			console.log('error from '+tmp[i].path+' : '+error);
		};
	})(i));
}*/
i=2;
devices[i] = new hid.HID(tmp[i].path);
devices[i].on('data',(function(i){
	return function(data){
		console.log(data.toJSON());
	};
})(i));
devices[i].on('error',(function(i){
	return function(error){
		console.log('error from '+tmp[i].path+' : '+error);
	};
})(i));

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

app.listen(8080);