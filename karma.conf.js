
module.exports = function(config) {
  var gulpConfig = require('./gulpfile')();

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    // 使用的框架
    // some available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai'],

    // list of files / patterns to load in the browser
    // 加载的文件列表
    files: gulpConfig.karma.files,

    // 需要忽略的文件
    exclude: gulpConfig.karma.exclude,

    // 代理
    proxies: {
      '/': 'http://localhost:8888/'
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    // 为他们提供服务到浏览器之前预处理匹配的文件
    preprocessors: gulpConfig.karma.preprocessors,

    // 报告配置
    reporters: ['progress', 'coverage'],

    //覆盖率报告配置
    coverageReporter: {
      dir: gulpConfig.karma.coverage.dir, // 路径
      reporters: gulpConfig.karma.coverage.reporters // 报告类型
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    // 输出等级
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome', 'ChromeCanary', 'FirefoxAurora', 'Safari', 'PhantomJS'],
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};