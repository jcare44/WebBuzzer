var express = require('express');
var hid = require('node-hid');
var config = require('../etc/config');
var router = require('./routes/router');
var BuzzerManager = require('./buzzer/buzzer_manager');

var app = express();

app.use('/',router());

app.listen(config.server.port);