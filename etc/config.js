var env = require('getenv');

module.exports = {
	server: {
		name: env('NODE_SERVER_NAME','WebBuzzer'),
		port: env.int('NODE_SERVER_PORT',8080),
		mode: env('SERVER_MODE','dev')
	}
};