var util = require('util');
var events = require('events');
var hid = require('node-hid');
var BuzzerController = require('./buzzer_controller');

function BuzzerManager(){
	this.RED_BUTTON = 0;
	this.YELLOW_BUTTON = 1;
	this.GREEN_BUTTON = 2;
	this.ORANGE_BUTTON = 3;
	this.BLUE_BUTTON = 4;

	this.devices = hid.devices(1356,2);
	this.controllers = [];

	events.EventEmitter.call(this);

	for(var i=0;i<this.devices.length;++i)
	{
		this.controllers[i] = new BuzzerController(this.devices[i].path);
	}
}
util.inherits(BuzzerManager, events.EventEmitter);

/**
 * Callback for firing event
 * @param  int _controllerId	Id of the watched controller
 */
function fireEvent(_controllerId){
	return function(_buzzerId,_buttonId,_state){
		if(_state === true)
		{
			var playerId = this.getPlayerId(_controllerId,_buzzerId);
			if(playerId !== false)
			{
				this.emit('button',playerId,_buttonId);
			}
			else
			{
				console.info('Manager - Unregistered Player');
			}
		}
	};
}

/**
 * Callback for player registration
 * @param int _controllerId The id of the controller
 */
function registerPlayer(_controllerId){
	return function(_buzzerId,_buttonId,_state){
		console.log('Manager - Button '+_buttonId+' pressed of '+_buzzerId);
			//if red button, register buzzer as player
		if(_buttonId === this.RED_BUTTON && _state === true)
		{
			if(this.getPlayerId(_controllerId,_buzzerId) === false)
			{
				console.info('Manager - Registered buzzer '+_buzzerId+
					' of controller '+_controllerId);
				this.players.push({
					controllerId: _controllerId,
					buzzerId: _buzzerId
				});

				this.controllers[_controllerId].led(_buzzerId,true);
			}
			else
			{
				console.info('Manager - Buzzer '+_buzzerId +' of controller '+
					_controllerId+' already registered');
			}
		}
	};
}

/**
 * Launch init sequence
 * Every player can register his buzzer with the red button
 */
BuzzerManager.prototype.startInit = function(callback){
	this.players = [];
	console.info('Initialisation start');
	for(var i=0;i<this.controllers.length;++i)
	{
		console.log(i);
		this.controllers[i].on('button',registerPlayer(i).bind(this));
	}

	if(callback)
	{
		callback.call(this);
	}
};

/**
 * Stop the init sequence
 */
BuzzerManager.prototype.stopInit = function(callback){
	console.info('Initialisation stop');
	for(var i=0;i<this.controllers.length;++i)
	{
		this.controllers[i].removeAllListeners();
		this.controllers[i].setLeds(false);
		this.controllers[i].on('button',fireEvent(i).bind(this));
	}

	if(callback)
	{
		callback.call(this);
	}
};

/**
 * Search for the id of a player
 * 
 * @param  int _controllerId
 * @param  int _buzzerId
 * @return int|boolean			Return the id if found, else return false
 */
BuzzerManager.prototype.getPlayerId = function(_controllerId,_buzzerId){
	for(var i=0;i<this.players.length;++i)
	{
		if(this.players[i].controllerId == _controllerId
			&& this.players[i].buzzerId == _buzzerId)
		{
			return i;
		}
	}
	return false;
};

BuzzerManager.prototype.getNbPlayers = function(){
	return this.players.length;
};

module.exports = BuzzerManager;