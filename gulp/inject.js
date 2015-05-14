var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;

module.exports = function (config) {
  config.inject = inject;

  /**
   * 向html中注入css文件
   * @return {Stream}
   */
  gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function() {
    config.log('文件处理好后, 注入css到html');

    return gulp
      .src(config.index)
      .pipe(inject(config.css))
      .pipe(gulp.dest(config.app));
  });

  /**
  * bower依赖注入
  * @return {Stream}
  */
  gulp.task('wiredep', function() {
   config.log('写入bower依赖到html');

   var js = config.js;
   var options = config.getWiredepDefaultOptions();

   return gulp
     .src(config.index)
     .pipe(wiredep(options)) // 根据配置注入依赖到页面
     .pipe(inject(js, '', config.jsOrder))
     .pipe(gulp.dest(config.app));
  });

  /**
   * 创建模板缓存服务
   * @return {Stream}
   */
   gulp.task('templatecache', ['clean-code'], function() {
    config.log('创建AngularJS模板服务');

    return gulp
      .src(config.htmltemplates)
      .pipe($.minifyHtml({empty: true})) // 删除空属性
      .pipe($.angularTemplatecache(
        config.templateCache.file,
        config.templateCache.options
      ))
      .pipe(gulp.dest(config.temp));
   });

   /**
    * 清空构建及临时
    * @param {Function} 结束
    */
   gulp.task('clean-code', function (done) {
     var files = [].concat(
       config.temp + '**/*.js',
       config.build + 'js/**/*.js',
       config.build + '**/*.html'
     );
     config.clean(files, done);
   });

  /**
   * 注入指定的文件并排序
   * @param  {Array} src 源文件
   * @param  {String} label 标签名后缀
   * @param  {Array} order 排序文件
   * @return {Stream}
   */
  function inject (src, label, order) {
    var options = {read: false};
    if (label) {
      options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
  }

  /**
   * 排序流
   * @param  {Stream} src gulp.src 流
   * @param  {Array} order 排序数组
   * @return {Stream} 排序后的流
   */
  function orderSrc (src, order) {
    return gulp
      .src(src)
      .pipe($.if(order, $.order(order)));
  }

};