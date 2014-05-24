var express = require('express');
var hid = require('node-hid');
var config = require('../etc/config');
var router = require('./routes/router');
var BuzzerManager = require('./buzzer/buzzer_manager');
var MainController = require('./main_controller');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var manager = new BuzzerManager();

server.listen(config.server.port);

app.use('/',router());

io.sockets.on('connection', function (socket) {
	var controller = new MainController(manager,socket);
});