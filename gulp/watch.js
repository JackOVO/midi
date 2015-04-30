
var gulp = require('gulp');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

module.exports = function(config) {

  gulp.task('watch', ['inject'], function () {

    gulp.watch([config.app + '/*.html', 'bower.json'], ['inject']);

    gulp.watch([config.app + 'sass/**/*.scss'], function(event) {
      console.info('sc');
      if (isOnlyChange(event)) {
        gulp.start('styles');
      } else {
        gulp.start('inject');
      }
    });

    gulp.watch(config.app + '**/*.html', function(event) {
      browserSync.reload(event.path);
    });
  });
};