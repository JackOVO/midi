var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function (config) {

  /**
   * 压缩图片
   * @return {Stream}
   */
  gulp.task('images', ['clean-images'], function() {
    config.log('压缩并复制图片到构建目录');

    return gulp
      .src(config.images)
      .pipe($.imagemin({optimizationLevel: 4})) // 压缩等级
      .pipe(gulp.dest(config.build + 'images'));
  });

  /**
   * 优化所有文件
   */
  gulp.task('optimize', ['inject'], function() {
    config.log('优化js, css, html');

    // 返回与从HTML内构建块级联资产文件的流(依赖的流)
    var assets = $.useref.assets({searchPath: './'});
    // 通过过滤获取文件流
    var cssFilter = $.filter('**/*.css');
    var jsAppFilter = $.filter('**/' + config.optimized.app);
    var jslibFilter = $.filter('**/' + config.optimized.lib);
    var templateCache = config.temp + config.templateCache.file;

    return gulp
      .src(config.index)
      .pipe($.plumber()) // 防止爆炸
      .pipe(config.inject(templateCache, 'templates')) // 根据路径注入指定标签 
      .pipe(assets) // 解析html中build:{type}块,将里面引用到的文件合并传过来
      .pipe(cssFilter)
      // 从文件流中得到css
      .pipe($.minifyCss())
      .pipe(cssFilter.restore()) // 还原
      .pipe(jsAppFilter)
      // 从文件流中得到常用js
      .pipe($.ngAnnotate({add: true})) // angular依赖注释
      .pipe($.uglify())
      .pipe(getHeader())
      .pipe(jsAppFilter.restore()) // 还原
      // 获取依赖(供应)js
      .pipe(jslibFilter)
      .pipe($.uglify()) // 可以直接用min, wiredpe事件更改?
      .pipe(jslibFilter.restore()) // 还原
      .pipe($.rev()) // 内容hash头
      .pipe(assets.restore()) // 还原
      .pipe($.useref()) // 合并添加?
      .pipe($.revReplace()) // 向html中重写hash文件名
      .pipe(gulp.dest(config.build));
  });

  /**
   * 删除bulid里的全部图片
   * @param {Function} done - 回调处理
   */
  gulp.task('clean-images', function (done) {
    config.clean(config.build + 'images/**/*.*', done);
  });

  /**
   * 返回格式化的头文件
   * @return {String} 格式化的头文件
   */
  function getHeader() {
    var pkg = require('../package.json');
    var template = ['/**',
      ' * <%= pkg.name %> - <%= pkg.description %>',
      ' * @authors <%= pkg.authors %>',
      ' * @version v<%= pkg.version %>',
      ' * @link <%= pkg.homepage %>',
      ' * @license <%= pkg.license %>',
      ' */',
      ''
    ].join('\n');
    return $.header(template, {
        pkg: pkg
    });
  }

};