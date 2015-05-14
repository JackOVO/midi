(function() {
  'use strict';
  // 分享服务

  angular
    .module('app.share')
    .factory('shareService', shareService);

  function shareService () {
     var service = {
      'share': shareByFirm
    };
    var priv = {
      'features': {
        'width': 650, 'height': 400, 'top': 0, 'left': 0,
        'toolbar': true, 'location': true, 'directories': false, 'status': false,
        'menubar': true, 'scrollbars': true, 'resizable': true, 'copyhistory': true
      },
      'shareMap': {
        'weibo': {'baseUrl': 'http://service.weibo.com/share/share.php'},
        'tweibo': {
          'baseUrl': 'http://share.v.t.qq.com/index.php',
          'constant': {'c': 'share', 'a': 'index'}
        },
        'douban': {
          'baseUrl': 'http://www.douban.com/share/service',
          'constant': {'name': 'DFinder文件'},
          'keyMap': {'url': 'href', 'title': 'text'}
        },
        'qzone': {
          'baseUrl': 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey'
        }
      }
    };
    return service;

    /**
     * 根据厂商创建分享链接啊
     * @param  {String} firm 厂商名
     * @param  {Object} attrs 属性对象(可以key映射)
     * @return {Window} 打开的窗口
     */
    function shareByFirm (firm, attrs) {
console.info(firm);
      var firmConfig = priv.shareMap[firm];
      var shareUrl = firmConfig.baseUrl;
      var constant = firmConfig.constant;
      var keyMap = firmConfig.keyMap;

      if (!shareUrl) { console.error('没有相匹配的分享地址' + firm); return; }
      if (constant) { attrs = angular.extend({}, constant, attrs); }
console.info(attrs);

      var paramStr = '';
      // 拼接参数, 映射键
      angular.forEach(attrs, function(value, key){
        // key的映射判断
        if(keyMap) { key = keyMap[key] ? keyMap[key] : key; }
        paramStr += key + '=' + value + '&';
      });
      paramStr = paramStr.substring(0, paramStr.length - 1);
      shareUrl += paramStr && '?' + paramStr;
console.info(shareUrl);
      return openWindow(shareUrl);
    }

    /**
     * 封装打开的窗口
     * @param  {String} url 打开的链接
     * @param  {Object} features 特征参数对象
     * @return {Window}  打开的窗口对象
     */
    function openWindow (url, features) {
      var featuresStr = '';
      // 覆盖默认参数
      features = angular.extend({}, priv.features, features || {});

      // 如果为0, 计算居中位置
      features.top = features.top || (window.screen.height - features.height) / 2;
      features.left =  features.left || (window.screen.width - features.width) / 2;

      // 生成窗口特征字符串
      angular.forEach(features, function(value, key){
        featuresStr += key + '=' + 
          (value === false || value === true ?
            (value === true ? 'yes' : 'no') : 
            (value)) + ',';
      });
      featuresStr = featuresStr.substring(0, featuresStr.length - 1);

      url = encodeURI(url);
      return window.open(url, 'share', featuresStr);
    }
  }

})();