module.exports = function(grunt) {

  // A list over all the files to be compiled
  var srcFiles = [
  ];


  // The top  banner
  var banner = [
      '/**',
      ' * <%= pkg.name %> - v<%= pkg.version %>',
      ' * Copyright (c) 2014, Carl Mowday',
      ' * <%= pkg.homepage %>',
      ' *',
      ' * Compiled: <%= grunt.template.today("yyyy-mm-dd") %>',
      ' *',
      ' * <%= pkg.name %> is licensed under the <%= pkg.license %> License.',
      ' * <%= pkg.licenseUrl %>',
      ' */',
      ''
  ].join('\n')

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: banner
      },
      build: {
        src: srcFiles,
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },


    jshint: {
      source: {
        src: srcFiles
      }
    },


    copy: {
      main: {
        files: [
          { src: '../vendor/pixi/bin/pixi.js', dest: 'build/pixi.js' }
        ]
      }
    },


    compress: {
      release: {
        options: {
          archive: 'dist/release.zip',
          mode: 'zip'
        },
        files: [
          {src: ['**/*'], cwd: 'build/', expand: true}
        ]
      }
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', [
    'uglify',
    'jshint:source',
    'copy:main',
    'compress:release'
  ]);

};