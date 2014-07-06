var util = require('util');
var events = require('events');
var hid = require('node-hid');
var buzzers = require('node-hid/src/buzzers');

function BuzzerController(_path){
	events.EventEmitter.call(this);

	this.path = _path;
	this.hid = new hid.HID(_path);
	this.oldBits = 0;
	this.leds = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00];

	// Initialize buzzers
	this.hid.write(this.leds);
	this.hid.read(this.buzzerData.bind(this));
}
util.inherits(BuzzerController, buzzers.BuzzerController);

/**
 * Turn on or off every led
 * @param boolean state  True to turn on, false to turn off
 */
BuzzerController.prototype.setLeds = function(state) {
	if(state)
	{
		this.leds = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
	}
	else
	{
		this.leds = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
	}
	this.hid.write(this.leds);
};

BuzzerController.prototype.originalBuzzerData = BuzzerController.prototype.buzzerData;

BuzzerController.prototype.buzzerData = function(error,data){
	if(!error)
	{
		BuzzerController.prototype.originalBuzzerData.call(this,error,data);
	}
};

module.exports = BuzzerController;