var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var karma = require('karma').server;

module.exports = function (config) {

  /**
   * 运行一次测试
   */
   gulp.task('test', ['vet'], function(done) {
    startTests(true /*singleRun*/ , done);
   });

  /**
   * 自动测试
   */
   gulp.task('auto-test', ['vet'], function (done) {
    startTests(false /*singleRun*/ , done);
   });

  /**
   * 启动测试用Karma
   * @param {Boolean} singleRun 单次运行是否
   */
  function startTests (singleRun, done) {
    var excludeFiles = [];

    karma.start({
      configFile: __dirname + '/../karma.conf.js',
      exclude: excludeFiles,
      singleRun: !!singleRun
    }, karmaCompleted);

    function karmaCompleted (karmaResult) {
      config.log('Karma 编译');
      if (karmaResult === 1) {
        done('Karma: 测试失败的代码' + karmaResult);
      } else {
        done();
      }
    }
  }
};