var gulp = require('gulp');
var glob = require('glob');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')();

// 检测和生成报告
module.exports = function (config) {

  /**
   * 审查代码并创建覆盖率报告
   * @return {Stream}
   */
  gulp.task('vet', function() {
    config.log('JSHint分析源代码');

    return gulp
      .src(config.alljs)
      .pipe($.if(args.verbose, $.print())) // 判断打印文件流
      .pipe($.jshint()) // 分析
      .pipe($.jshint.reporter('jshint-stylish')) // 指定样式
      .pipe($.jshint.reporter('fail')); // 错误
  });

  /**
   * 创建Plato检查报告
   */
  gulp.task('plato', function(done) {
    config.log('Plato分析源码');
    config.log('浏览/report/plato/index.html查看分析结果');

    startPlatoVisualizer(done);
  });

  /**
   * 用Plato开始观察, 生成报告
   */
  function startPlatoVisualizer (done) {
    config.log('运行Plato');

    var files = glob.sync(config.plato.js); // 拿到匹配文件
    var excludeFiles = /.*\.spec\.js/; // 排除的文件
    var plato = require('plato');

    var options = {
      title: 'Plato 检查报告',
      exclude: excludeFiles
    };
    var outputDir = config.report + '/plato';
    plato.inspect(files, outputDir, options, platoCompleted); // 开始检查

    // 完成后回调
    function platoCompleted (report) {
      var overview = plato.getOverviewReport(report); // 概要
      if (args.verbose) {
        config.log(overview.summary);
      }
      if (done) { done(); }
    }
  }

};