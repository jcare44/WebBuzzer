function MainController(manager,sockets){
	this._manager = manager;
	this._sockets = sockets;
	this.state = {};

	var self = this;

	self._sockets.on('connection', function (socket) {
		socket.on('ask',self.update.bind(self));
		socket.on('initTime',self.initTime.bind(self));
		socket.on('initPlayers',self.initPlayers.bind(self));
	});

	self._manager.on('button',function(playerId,buttonId){
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
			default:
				self.state.players[playerId].class = '';
		}

		self.update.call(self);
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
		},10000);
	});
};

MainController.prototype.initTime = function(){
	this.state.startDate = new Date().getTime();
	this.state.players = [];
	for(var i=0;i<this._manager.getNbPlayers();++i)
	{
		this.state.players.push({
			id: i
		});
	}

	this.update();
};

MainController.prototype.update = function(){
	this._sockets.emit('update',this.state);
	console.log('update');
};

module.exports = MainController;