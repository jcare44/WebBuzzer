function MainController(manager,socket){
	this._manager = manager;
	this._socket = socket;
	this.state = {};

	var self = this;

	socket.on('ask',self.update.bind(self));
	socket.on('initTime',self.initTime.bind(self));
	socket.on('initPlayers',self.initPlayers.bind(self));

	manager.on('button',function(playerId,buttonId){
		switch(buttonId){
			case manager.GREEN_BUTTON:
				self.state.players[playerId].class = 'green';
				break;
			case manager.ORANGE_BUTTON:
				self.state.players[playerId].class = 'orange';
				break;
			case manager.RED_BUTTON:
				self.state.players[playerId].class = 'red';
				break;
		}

		self.update();
	});
}

MainController.prototype.initPlayers = function(callback){
	var self = this;
	this._manager.startInit(function(){
		setTimeout(function(){
			self._manager.stopInit(function(){
				self.state.players = [];
				for(var i=0;i<self._manager.getNbPlayers();++i)
				{
					self.state.players.push({
						id: i
					});
				}
				self.update();
				
				if(callback)
				{
					callback.call(this);
				}
			});
		},5000);
	});
};

MainController.prototype.initTime = function(){
	this.state.startDate = new Date().getTime();
	this.update();
};

MainController.prototype.update = function(){
	this._socket.emit('update',this.state);
	console.log('update');
};

module.exports = MainController;