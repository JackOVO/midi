var gulp = require('gulp'); // 自动化任务管理
var del = require('del'); // 删除文件
var $ = require('gulp-load-plugins')(); // 自动加载gulp包
var wrench = require('wrench');

/***********路径配置***********/
var app    = './app/';
var script = app + 'scripts/';
var templates = app + 'templates/';
var temp = './.tmp/';
var report = './report/';
var bower = {
  json: require('./bower.json'),
  directory: './bower_components/',
  ignorePath: '..' // 忽视的目录
};
var wiredep = require('wiredep'); //包裹依赖控制
var bowerFiles = wiredep({devDependencies: true})['js']; //拿到依赖路径

var config = {
  alljs : [ app + '**/*.js'], // , './*.js' 

  index : app + 'index.html',
  sass  : app + 'sass/styles.scss',
  css   : temp + 'styles.css',
  images: app + 'images/**/*.*',
  js    : [
    script + '**/*.module.js',
    script + '**/*.js',
    '!' + script + '**/*.spec.js' // 测试文件
  ],
  htmltemplates:  templates + '**/*.html', // 模板模块在一起
  //jsOrder: [script + '**/*.module.js', script + '**/*.js'],

  app   : app,
  temp  : temp,
  build : './build/',
  report: report,
  bower : bower,

  /**优化输出文件**/
  optimized: {
    app: 'app.js',
    lib: 'lib.js'
  },
  /**模板缓存配置**/
  templateCache: {
    file: 'templates.js',
    options: {
      module: 'app.templates',
      standalone: true // 创建独立的模块
    }
  },
  /**plato**/
  plato: { js: script + '**/*.js' }
};
config.log = log;
config.clean = clean;
config.errLog = errLog;
config.getWiredepDefaultOptions = getWiredepDefaultOptions;

module.exports = function() {
  var inter = {};
  inter.karma = getKarmaOptions();
  return inter;
};

/*********文件处理导入任务*********/
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(config);
});


/**
 * 获取wiredep参数
 */
function getWiredepDefaultOptions() {
  var options = {
    bowerJson: config.bower.json,
    directory: config.bower.directory,
    ignorePath: config.bower.ignorePath
  };
  return options;
}

/**
 * 获取Karma参数
 */
function getKarmaOptions () {
  var options = {
    // 需要加载的文件
    files: [].concat(
      bowerFiles,
      script + '**/*.module.js',
      script + '**/*.js'
    ),
    exclude: [], // 忽略
    coverage: { // 覆盖率报告参数
      dir: report + 'coverage',
      reporters: [ // 报告
        // reporters not supporting the `file` property
        {type: 'html', subdir: 'report-html'},
        {type: 'lcov', subdir: 'report-lcov'},
        {type: 'text-summary'}
      ]
    },
    preprocessors: {} // 预处理?
  };

  options.preprocessors[script + '**/!(*.spec)+(.js)'] = ['coverage'];
  return options;
}

/**
 * 控制台输出
 * @param  {[type]} msg [description]
 */
function log (msg) {
  if (typeof(msg) === 'object') {
    for (var item in msg) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

/**
 * 错误控制台输出
 * @param  {String} title 错误类型
 */
function errLog (title) {
    return function(err) {
      $.util.log($.util.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
}

/**
 * 删除所有文件在指定的目录
 * @param {Array} path - 删除数组的路径
 * @param {Function} done - 回调完成时
 */
function clean (path, done) {  
  log('删除文件: ' + $.util.colors.blue(path));
  del(path, done);
}



