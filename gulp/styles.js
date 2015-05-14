var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(config) {

  /**
   * 编译Sass
   * @return {String}
   */
  gulp.task('styles', ['clean-styles'], function() {
    config.log('编译Sass --> CSS');

    return gulp
      .src(config.sass) // 只输出一个?
      .pipe($.plumber()) // 文件流错误处理
      .pipe($.sass()).on('error', config.errLog('Sass'))
      .pipe(gulp.dest(config.temp))
      .pipe(browserSync.reload({stream: true}));
  });

  /**
   * 删除所有的样式文件(build 和 temp)
   * @param {Function} done - 完成时的回调
   */
  gulp.task('clean-styles', function(done) {
    var files = [].concat(
      config.temp + '**/*.css',
      config.build + 'styles/**/*.css'
    );
    config.clean(files, done);
  });
};