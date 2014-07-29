module.exports = function(grunt) {

  // A list over all the files to be compiled
  var srcFiles = [
    'src/myfile.js',
    'src/myfile2.js',
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

    jasmine: {
      test: {
        src: 'src/*.js',
        options: {
          specs: 'test/*.spec.js',
          display: 'full'
        }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', [
    'jasmine'
  ]);

};
