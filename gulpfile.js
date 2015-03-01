// Load some modules which are installed through NPM.
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');  // Bundles JS.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
var watchify = require('watchify'); 

var bundler = watchify(browserify({
        entries: ['./src/js/app.jsx'],
        extensions: ['.jsx'],
        paths: ['./node_modules','./src/js/']
    }, watchify.args));
bundler.transform(reactify);

gulp.task('js', bundle); // so you can run `gulp js` to build the file
bundler.on('update', bundle); // on any dep update, runs the bundler
bundler.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    // optional, remove if you dont want sourcemaps
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
      .pipe(sourcemaps.write('./')) // writes .map file
    //
    .pipe(gulp.dest('./build/'));
}

// Define some paths.
var paths = {
  js: ['src/js/*.*'],
};
  
// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});
 
// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch']);