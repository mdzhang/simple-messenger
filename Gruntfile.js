var _ = require('lodash');
var path = require('path');

module.exports = function(grunt) {

  var bowerjs = [
    'lodash/lodash.js',
    'angular/angular.js',
    'angular-ui-router/release/angular-ui-router.js'
  ];

  var bowercss = [
    'font-awesome/css/font-awesome.min.css'
  ];

  var rewrite = function(b) {
    return 'bower_components/' + b;
  };

  bowerjs = _.map(bowerjs, rewrite);
  bowercss = _.map(bowercss, rewrite);

  grunt.initConfig({
    sass: {
      options: {
        trace: true,
        cacheLocation: '.sass-cache',
        sourcemap: 'none'
      },
      dist: {
        src: ['client/**/*.scss'],
        dest: 'public/tmp/client.css'
      }
    },
    // join all bower css/js components into a single css and a single js file
    concat: {
      options: {
        separator: '\n',
      },
      js: {
        files: {
          'public/js/bower.min.js': bowerjs,
          'public/tmp/client.js': ['client/{,*/}*.js']
        }
      },
      css: {
        src: bowercss,
        dest: 'public/tmp/bower.css'
      }
    },
    // process css e.g. adding vendor prefixes
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({
            browsers: 'last 2 versions'
          }) // add vendor prefixes
        ]
      },
      dist: {
        src: 'public/tmp/client.css'
      }
    },
    // minify css files
    cssmin: {
      target: {
        files: {
          'public/css/client.min.css': 'public/tmp/client.css',
          'public/css/bower.min.css': 'public/tmp/bower.css'
        }
      }
    },
    // check js code correctness
    jshint: {
      options: {
        jshintrc: true
      },
      server: {
        src: 'server/**/*.js'
      },
      client: {
        src: 'client/**/*.js'
      }
    },
    // check js code style
    jscs: {
      options: {
        config: ".jscsrc"
      },
      server: {
        src: 'server/**/*.js'
      },
      client: {
        src: 'client/**/*.js'
      }
    },
    // minify js files
    uglify: {
      target: {
        files: {
          // 'public/js/bower.min.js': 'public/tmp/bower.js',
          'public/js/client.min.js': 'public/tmp/client.js'
        }
      }
    },
    html2js: {
      options: {
        rename: function(name) {
          return path.basename(name);
        },
        module: 'templates',
      },
      default: {
        src: ['client/**/*.html'],
        dest: 'public/js/client.templates.js'
      }
    },
    // clean temporary build files
    clean: {
      tmp: 'public/tmp'
    },
    // watch for edits and rebuild accordingly
    watch: {
      options: {
        livereload: true
      },
      config: {
        files: ['.jscsrc', '.jshintrc', 'Gruntfile.js', 'bower.json'],
        tasks: ['build']
      },
      client: {
        files: ['client/**/*.*'],
        tasks: ['build']
      },
      server: {
        files: ['server/**/*.*'],
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-contrib-csslint'); // TODO
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('code_quality', ['jshint', 'jscs']);
  grunt.registerTask('build_client', ['sass', 'concat', 'postcss', 'cssmin', 'uglify', 'html2js', 'clean']);
  grunt.registerTask('build', ['code_quality', 'build_client', 'clean']);
  grunt.registerTask('default', ['build', 'watch']);
};