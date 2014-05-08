var config = require('./etc/config.js');
//var server = require('./backend/server');

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			backend: {
				files: [
					'*.js',
					'etc/*.js',
					'backend/*.js',
					'backend/**/*.js'
				],
				tasks: [
					'jshint:backend',
				],
				options: {
					spawn: false,
					interrupt: true,
				},
			},
		},
		jshint: {
			backend: [
				'*.js',
				'etc/*.js',
				'backend/*.js',
				'backend/**/*.js'
			],
		},
	});

	// Load the plugin that provides the task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

		// Default task(s).
	grunt.registerTask('default', [
		'jshint:backend',
		//'jshint:frontend',
	]);

	grunt.registerTask('backend', [
		'jshint:backend',
	]);
};