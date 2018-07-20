// Various helper modules
var gulp = require("gulp");
var plug = require("gulp-load-plugins")();
var path = require('path');

// paths
var paths = {
    localhost: "http://localhost:8080/index.html",
    scripts: '/**/*.js'
};

// WebServer
gulp.task('webserver', function() {
    return gulp.src('app')
        .pipe(plug.webserver({
            livereload: true,
            directoryListing: true,
            open: paths.localhost,
            port: 8080,
        }));
});

// The default task is 'watch'
gulp.task("default", ["webserver"]);