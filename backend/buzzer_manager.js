var util = require('util');
var events = require('events');
var hid = require('node-hid');
var BuzzerController = require('./buzzer_controller');

function BuzzerManager(){
	this.players = [];
	this.devices = hid.devices();
	this.controllers = [];
	for(var i=0;i<this.devices.length;++i)
	{
		this.controllers[i] = BuzzerController(this.devices[i].path);
	}

	events.EventEmitter.call(this);
}
util.inherits(BuzzerManager, events.EventEmitter);

/**
 * Callback for player registration
 * @param int _controllerId The id of the controller
 */
function registerPlayer(_controllerId){
	return function(_buzzerNumber,_buttonNumber,_state){
			//if red button, register buzzer as player
		if(_buttonNumber == 1 && _state === true)
		{
			this.players.push({
				controllerId: _controllerId,
				buzzerNumber: _buzzerNumber
			});

			this.controllers[_controllerId].led(_buzzerNumber,true);
		}
	};
}

/**
 * Launch init sequence
 * Every player can register his buzzer with the red button
 */
BuzzerManager.prototype.startInit = function(){
	for(var i=0;i<this.controllers.length;++i)
	{
		this.controllers[i].on('button',registerPlayer(i));
	}
};

/**
 * Stop the init sequence
 */
BuzzerManager.prototype.stopInit = function(){
	for(var i=0;i<this.controllers.length;++i)
	{
		this.controllers[i].removeListener('button',registerPlayer(i));
		this.controllers[i].leds(false);
	}
};

module.exports = BuzzerManager;