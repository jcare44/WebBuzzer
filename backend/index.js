var forever = require('forever-monitor');

var child = new (forever.Monitor)(__dirname + '/server.js', {
	max: 10
});

child.on('exit', function () {
	console.log('server.js has exited after 10 restarts');
});

child.start();