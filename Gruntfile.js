module.exports = function(grunt) {

	// 1. All configuration goes here
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),



		sass: {
		    dist: {
				options: {
					style: 'expanded'
				},
				files: {
					"css/build/styles.css": "scss/style.scss"
				}
			}
		},

		stripmq: {
        		//Viewport options
			options: {
				width: 1024,
            		type: 'screen'
        		},
        		all: {
            		files: {
                		//follows the pattern 'destination': ['source']
                		'css/build/stripped/ie8.css': ['css/build/styles.css']
            		}
        		}
    		},

		autoprefixer: {
			options: {
				browsers: ['> 3%']
			},
			multiple_files: {
				expand: true,
				flatten: true,
				src: 'css/build/*.css',
				dest: 'css/build/prefixed/'
			}
		},

		cmq: {
		    options: {
		      log: true
		    },
		    your_target: {
		      files: {
		        'css/build/mq-d': ['css/build/prefixed/*.css']
		      }
			}
		},


		cssmin: {
			combine: {
				files: {
					'css/build/minified/styles.css': [
						'css/build/mq-d/styles.css',
						],
				},

				options:{
					report: 'min'
				}
			}
		},

		jshint: {
			options: {
				'-W014':true,
				'-W018':true,
				'-W024': true,
				'-W030':true,
				'-W032':true,
				'-W041':true,
				'-W058':true,
				'-W067':true,
				'-W099':true,
				'-W093':true,
				asi:true,
				eqnull: true,
				eqeqeq: false,
				smarttabs: true,
			},
			beforeconcat: ['js/script.js'],
			afterconcat:{
				options:{
					'-W014':true,
					'-W018':true,
					'-W024': true,
					'-W030':true,
					'-W032':true,
					'-W041':true,
					'-W058':true,
					'-W067':true,
					'-W099':true,
					'-W093':true,
					asi:true,
					smarttabs:true,
					shadow:true
				},
				files:{
					src:['js/build/production.js']
				}
			}
		},


		concat: {
			dist: {
				src: [
				'js/libs/fastclick.js',
				'js/libs/modernizr.js',
				'js/libs/owl.carousel.min.js',
				'js/libs/jquery.mediaWrapper.js',
				'js/libs/jquery.captionr.js',
				'js/libs/tableit.js',
				'js/script.js'
				],
				dest: 'js/build/production.js'
			}
		},

		uglify: {
			build: {
				src: 'js/build/production.js',
				dest: 'js/build/production.min.js'
			}
		},


		watch: {
			options: {
				//livereload: true,
			},

			scripts: {
				files: ['js/*.js','js/**/*.js'],
				tasks: ['jshint:beforeconcat','concat','uglify'],
				options: {
					spawn: false,
				}
			},

			css: {
				files: ['scss/*.scss','scss/**/*.scss','js/**/*.css'],
				tasks: ['sass', 'autoprefixer', 'cmq', 'stripmq', 'cssmin'],
				options: {
					spawn: false,
				}
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['jshint:beforeconcat','concat', 'uglify', 'sass', 'stripmq', 'autoprefixer', 'cmq', 'cssmin', 'watch']);

	grunt.registerTask('dev', ['watch']);
};
