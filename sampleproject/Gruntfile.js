module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'node_modules/jquery/dist/', src: ['jquery.min.js'], dest: 'dist/js/'},
          {expand: true, cwd: '', src: ['*.html'], dest: 'dist'},
          {expand: true, cwd: '', src: ['*.css'], dest: 'dist/css'},
          {expand: true, cwd: '', src: ['*.js','!Gruntfile.js'], dest: 'dist/js'}
        ]
      }
    },
    connect: {
      server: {
        options: {
          hostname: '0.0.0.0',
          livereload: true,
          base: [
            'dist'
          ],
          port: 8888
        }
      }
    },
    watch: {
      copy: {
        files: ['*.html', '*.css', '*.js'],
        tasks: ['copy']
    },
      livereload: {
        files: ['*.html']
      },
      options: {
        livereload: true
      }
    }
  });

  grunt.registerTask('build', [
    'copy'
  ]);

  grunt.registerTask('serve', [
    'connect:server',
    'watch'
  ]);

  grunt.registerTask('default', ['build']);
 }
