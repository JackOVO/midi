var gulp = require('gulp');
var browserSync = require('browser-sync');

module.exports = function (config) {

  function browserSyncInit (baseDir) {

    var routes = null; // 路由

    var server = {
      baseDir: baseDir,
      routes: routes
    };

    // routes = {'/bower_components': 'bower_components'};

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      injectChanges: true,
      logFileChanges: true,
      reloadDelay: 0
    });
  }

  gulp.task('serve', ['watch'], function() {
    browserSyncInit(['./app', './']);
  });

  // gulp.task('serve:dist', ['build'], function () {
  //   browserSyncInit(options.dist);
  // });

  // gulp.task('serve:e2e', ['inject'], function () {
  //   browserSyncInit([options.tmp + '/serve', options.src], []);
  // });

  // gulp.task('serve:e2e-dist', ['build'], function () {
  //   browserSyncInit(options.dist, []);
  // });

};
