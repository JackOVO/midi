var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();

module.exports = function(config) {
  gulp.task('scripts', ['vet'], function () {
    return gulp.src(config.alljs)
      .pipe(browserSync.reload({stream:true}))
      .pipe($.size());
  });
};
