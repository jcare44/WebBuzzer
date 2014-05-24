var express = require('express');
var hid = require('node-hid');
var config = require('../etc/config');
var router = require('./routes/router');
var BuzzerManager = require('./buzzer/buzzer_manager');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/*var manager = new BuzzerManager();
manager.startInit();
setTimeout(manager.stopInit.bind(manager),5000);*/

server.listen(config.server.port);

app.use('/',router());

io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
		console.log(data);
	});
});