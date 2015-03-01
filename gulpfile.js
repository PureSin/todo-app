// Load some modules which are installed through NPM.
var gulp = require('gulp');
var browserify = require('browserify');  // Bundles JS.
var reactify = require('reactify');  // Transforms React JSX to JS.
var source = require('vinyl-source-stream');
 
// Define some paths.
var paths = {
  js: ['src/js/*.*'],
};
  
// Our JS task. It will Browserify our code and compile React JSX files.
gulp.task('js', function() {
  // Browserify/bundle the JS.
  return browserify({
        entries: ['./src/js/app.jsx'],
        extensions: ['.jsx'],
        paths: ['./node_modules','./src/js/']
    })
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});
 
// Rerun tasks whenever a file changes.
gulp.task('watch', function() {
  gulp.watch(paths.js, ['js']);
});
 
// The default task (called when we run `gulp` from cli)
gulp.task('default', ['watch']);