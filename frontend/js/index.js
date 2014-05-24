angular.module('WebBuzzer.factories', ['WebBuzzer.config','btford.socket-io'])
.factory('socket', ['socketFactory','server',function (socketFactory,server) {
	return socketFactory();
}]);

angular.module('WebBuzzer.controllers', ['WebBuzzer.config','WebBuzzer.factories'])
.controller('MainController',['$scope','server','socket',function($scope,server,socket){
	console.log(socket);
	/*var socket = io('http://'+server.domain+':'+server.port);
	socket.on('connect', function(){
		socket.on('event', function(data){});
		socket.on('disconnect', function(){});
	});*/
}]);

angular.module('WebBuzzer', ['WebBuzzer.controllers','WebBuzzer.config']);