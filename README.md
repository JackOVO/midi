# 前端工程流记录

## 项目生成步骤
1. git初始化, 添加README.md文件.
2. 安装依赖的nodejs包.

  - **gulpjs**  任务自动管理工具(工作流, 管道思想, 配置比grunt容易)
  - **yargs**  nodejs命令参数解析
  - **BrowserSync**  多个设备文件同步(浏览器同步刷新)
  - **del**  删除文件
  - **glob**  根据正则匹配加载文件?
  - **gulp-load-plugins**  自动加载gulp包
  - **gulp-util**  gulp工具包
  - **gulp-if**  根据条件控制文件流 - **gulp-print**  打印管道中的文件流
  - **gulp-jshint**  Javascript代码验证工具(改进意见)
  - **jshint-stylish**  jshint输出样式配置
  - **gulp-plumber**  防止gulp管道破裂...(文件流错误处理)
  - **gulp-filter**  文件流过滤
  - **gulp-sass**  比(`gulp-ruby-sass`)编译速度快
  - **gulp-uglify**  Javascript压缩操作
  - **gulp-minify-css**  压缩css
  - **gulp-imagemin**  压缩图片
  - **gulp-minify-html**  缩小html
  - **gulp-header**  文件头处理
  - **gulp-rev**  通过内容追加hash值
  - **gulp-rev-replace**  hash值重写
  - **gulp-ng-annotate**  angularjs依赖注入注释
  - **gulp-angular-templatecache** 并置AngularJS模板缓存服务
  - **gulp-inject**  向html中自动注入js和css(app)
  - **gulp-order**  对文件流排序
  - **gulp-useref**  合并压缩html文件中的文件

  - **wiredep**  包裹bower(js, css)依赖到你的html(相当于lib)
  - **plato**  检查代码质量,并创建报告, 持续观察者
  - **Karma**  自动化测试框架(提供测试环境, 关注于单元测试)
  - **Mocha**  单元测试框架
  - **chaijs**  TDD/BDD断言库(可以结合Mocha使用)
  - **Sass**  CSS预编译器
  - **Compass**  Sass的超集, 提供一些简便的方法
  
3. 安装依赖的js文件.bower
  - **angular**
  - **angular-cookies**

  - **gulp-sourcemaps**   生成源映射文件

