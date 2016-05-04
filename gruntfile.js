module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cwd: process.cwd(),

    //Watch and live reload
    watch: {
      images: {
        files: ['src/src-img/**/*.{png,jpg,gif,svg}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      },
      jekyll: {
        files: ['src/**/*.*'],
        tasks: ['shell:build'],
        options: {
          spawn: false,
          livereload: true,
        }
      }
    },

    //Optimize images
    imagemin: {
      options: {
        optimizationLevel: 7,
        svgoPlugins: [{
          removeViewBox: false
        }],
      },
      files: {
        expand: true,
        cwd: 'img',
        src: ['src/**/*.{png,jpg,gif,svg}'],
        dest: 'img',
        cache: false
      },
    },

    // Shell tasks
    shell: {
      serve: {
        command: 'cd <%= cwd %> && node server'
      },
      build: {
        command: 'cd <%= cwd %>/src && jekyll build'
      },
      prod: {
        command: 'cd <%= cwd %>/src && JEKYLL_ENV=production jekyll build'
      }
    }
  });

  //Load tasks
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  //Asset management tasks
  grunt.registerTask('image', ['imagemin']);

  //Shell tasks
  grunt.registerTask('serve', ['shell:serve']);
  grunt.registerTask('build', ['shell:build']);
  grunt.registerTask('prod', ['shell:prod']);

  //Watch task
  grunt.registerTask('dev', ['build','watch']);

};
