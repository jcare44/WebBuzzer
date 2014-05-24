var env = require('getenv');
var ip = require('ip');

module.exports = {
	server: {
		name: env('NODE_SERVER_NAME','WebBuzzer'),
		domain: env('NODE_SERVER_DOMAIN',ip.address()),
		port: env.int('NODE_SERVER_PORT',8080),
		mode: env('SERVER_MODE','prod')
	}
};