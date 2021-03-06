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
					'ngconstant',
					'jshint:backend',
				],
				options: {
					spawn: false,
					interrupt: true,
				},
			},
			frontjs: {
				files: [
					'frontend/js/*.js',
					'frontend/js/**/*.js',
					],
				tasks: [
					'uglify:'+config.server.mode,
					'jshint:frontend'
				],
				options: {
					spawn: false,
					interrupt: true,
					livereload: true,
				},
			},
			less: {
				files: [
					'frontend/less/*.less'
					],
				tasks: [
					'less:'+config.server.mode
				],
				options: {
					spawn: false,
					interrupt: true,
					livereload: true,
				},
			},
			fronthtml: {
				files: [
					'frontend/views/*.html',
					'frontend/views/**/*.html'
					],
				tasks: [
					'copy:views'
				],
				options: {
					spawn: false,
					interrupt: true,
					livereload: true,
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
			frontend: [
				'frontend/js/*.js',
				'frontend/js/**/*.js'
			],
		},
		copy: {
			bootstrapfonts: {
				expand: true,
				flatten: true,
				src: 'frontend/bower_components/bootstrap/fonts/*',
				dest: 'frontend/public/fonts/'
			},
			views: {
				expand: true,
				flatten: true,
				src: 'frontend/views/*',
				dest: 'frontend/public/'
			},
			images: {
				expand: true,
				flatten: true,
				src: 'frontend/images/*',
				dest: 'frontend/public/images/'
			},
		},
		less: {
			dev: {
				options: {
					paths: ["css"]
				},
				files: {
					"frontend/public/css/default.css": [
						"frontend/less/default.less",
						"frontend/bower_components/angular-loading-bar/build/loading-bar.css",
					]
				}
			},
			prod: {
				options: {
					paths: ["css"],
					cleancss: true,
				},
				files: {
					"frontend/public/css/default.css": [
						"frontend/less/default.less",
						"frontend/bower_components/angular-loading-bar/build/loading-bar.css",
					]
				}
			}
		},
		uglify: {
			options: {
				mangle: false,
			},
			dev: {
				options: {
					beautify: {
						width: 80,
						beautify: true
					}
				},
				files: {
					'frontend/public/js/index.min.js': ['frontend/js/index.js'],
					'frontend/public/js/angular.min.js': [
						'frontend/bower_components/angular/angular.js',
						'frontend/bower_components/angular-socket-io/socket.js',
						'frontend/bower_components/angular-loading-bar/build/loading-bar.js',
					],
					'frontend/public/js/socket.io.min.js': [
						'frontend/bower_components/socket.io-client/dist/socket.io.js'
					],
				}
			},
			prod: {
				files: {
					'frontend/public/js/index.min.js': ['frontend/js/index.js'],
					'frontend/public/js/angular.min.js': [
						'frontend/bower_components/angular/angular.js',
						'frontend/bower_components/angular-socket-io/socket.js',
						'frontend/bower_components/angular-loading-bar/build/loading-bar.js',
					],
					'frontend/public/js/socket.io.min.js': [
						'frontend/bower_components/socket.io-client/dist/socket.io.js'
					],
				},
			},
		},
		ngconstant: {
			options: {
				name: 'WebBuzzer.config',
				dest: 'frontend/public/js/config.js',
			},
			all: {
				constants: {
					server: config.server,
				},
			},
		},
	});

	// Load the plugin that provides the task.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-ng-constant');

	grunt.registerTask('backend', [
		'ngconstant',
		//'jshint:backend',
	]);

	grunt.registerTask('frontend', [
		'jshint:frontend',
		'less:'+config.server.mode,
		'uglify:'+config.server.mode,
		'copy',
	]);

		// Default task(s).
	grunt.registerTask('default', [
		'backend',
		'frontend',
	]);
};
