angular.module('WebBuzzer.factories', ['WebBuzzer.config','btford.socket-io'])
.factory('socket', ['socketFactory','server',function (socketFactory,server) {
	return socketFactory();
}]);

angular.module('WebBuzzer.controllers', ['WebBuzzer.config','WebBuzzer.factories','cfp.loadingBar'])
.controller('MainController',
	['$scope','$interval','server','socket','cfpLoadingBar',
	function($scope,$interval,server,socket,cfpLoadingBar){
		$scope.displayTime = server.displayTime;

		$interval(function(){
			if($scope.startDate)
			{
				$scope.timer = new Date() - new Date($scope.startDate);
			}
			else
			{
				$scope.timer = new Date(0);
			}
		},500);

		socket.on('connect', function(){
			console.info('connected');

			socket.on('update', function(data){
				$scope.startDate = data.startDate;
				$scope.players = data.players;
			});

			socket.emit('ask');

			socket.on('disconnect', function(){
				console.info('disconnected');
			});
		});

		$scope.initPlayers = function(){
			console.log('player init');
			socket.emit('initPlayers');

			cfpLoadingBar.start();
			var loadStart = new Date().getTime();

			$interval(function(){
				cfpLoadingBar.set(
					(new Date().getTime() - loadStart)/10000);
			},1000,9);
			socket.once('update',function(){
				cfpLoadingBar.complete();
				console.log('player init complete');
			});
		};

		$scope.initTime = function(){
			console.log('time init');
			socket.emit('initTime');
		};
	}]);

angular.module('WebBuzzer', ['WebBuzzer.controllers','WebBuzzer.config']);