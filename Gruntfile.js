module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            dist: {
                src: [
                    'js/lib/angular.min.js',
                    'js/lib/angular-route.js',
                    'js/lib/jquery.min.js',
                    'js/lib/bootstrap.js',
                    'js/app.js',
                    'js/services/*.js',
                    'js/controllers/*.js'
                ],
                dest: 'public/built.js',
            },
        },
        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat'],
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
}
