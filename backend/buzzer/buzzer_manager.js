var util = require('util');
var events = require('events');
var hid = require('node-hid');
var BuzzerController = require('./buzzer_controller');

function BuzzerManager(){
	this.players = new Array();
	this.devices = hid.devices(1356,2);
	this.controllers = [];
	for(var i=0;i<this.devices.length;++i)
	{
		this.controllers[i] = new BuzzerController(this.devices[i].path);
	}

	events.EventEmitter.call(this);

	return this;
}
util.inherits(BuzzerManager, events.EventEmitter);

/**
 * Callback for player registration
 * @param int _controllerId The id of the controller
 */
function registerPlayer(_controllerId){
	return function(_buzzerNumber,_buttonNumber,_state){
		console.log('Button pressed');
			//if red button, register buzzer as player
		if(_buttonNumber == 1 && _state === true)
		{
			console.info('Registered buzzer '+_buzzerNumber
				+' of controller '+_controllerId);
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
	console.info('Initialisation start');
	for(var i=0;i<this.controllers.length;++i)
	{
		console.log(i);
		this.controllers[i].on('button',registerPlayer(i).bind(this));
	}
};

/**
 * Stop the init sequence
 */
BuzzerManager.prototype.stopInit = function(){
	console.info('Initialisation stop');
	for(var i=0;i<this.controllers.length;++i)
	{
		this.controllers[i].removeListener('button',registerPlayer(i).bind(this));
		this.controllers[i].setLeds(false);
	}
};

module.exports = BuzzerManager;