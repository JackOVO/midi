(function() {
  'use strict';

  // 获取数据模块
  angular.module('app.core')
    .factory('dataService', dataService);

  var baseUrl = 'http://dfms.dfinder.cn/';
  var map = {
    'fileInfo': 'profile.do',
    'fileHtml': 'htmlfile.do',
    'fileRecmd': 'recmd.do',
    'downloadValid': 'dl.valid',
    'downloadFile': 'download.do'
  };

  dataService.$inject = ['$http'];
  function dataService ($http) {
    var service = {
      'get': get,
      'post': post,
      'download': download
    };
    return service;

    /**
     * 指定action名获取数据
     * @param  {String} name   action映射名称
     * @param  {Object} params 对应参数
     * @return {Promise}       承诺
     */
    function get (name, params) {
      var url = map[name];
      var options = {'params': params};
      url = baseUrl + url;

      return $http.get(url, options)
        .then(completeCallBack)
        .catch(failedCallBack);
    }

    /**
     * 就是对angularjs的post封装
     * @param  {String} name   action映射名称
     * @param  {Object} params 对应参数
     * @return {Promise}       承诺
     */
    function post (name, params) {
      var url = map[name];
      var options = {'params': params};
      url = baseUrl + url;

      return $http.get(url, options)
        .then(completeCallBack)
        .catch(failedCallBack);
    }

    /**
     * 用location.href做下载啊亲, 拼接参数
     * @param  {String} name   action映射名称
     * @param  {Object} params 对应参数
     */
    function download (name, params) {
      var url = map[name];
      url = baseUrl + url;
      var urlAfter = '';

      angular.forEach(params, function(value, key){
        urlAfter += key + '=' + params[key] + '&';
      });
      urlAfter = urlAfter.substring(0, urlAfter.length - 1);
      window.location.href = url + (urlAfter && '?' + urlAfter);
    }

    // 完成后的回调
    function completeCallBack (response) {
      console.info(response);
      return response.data; // 注意返回
    }

    // 失败后的回调
    function failedCallBack (error) {
      console.error('dataError', error);

      switch (error.status) {
        case 600: // 未登录
          window.location.href = 'http://login.dfinder.cn/login.html?url=' + location.href;
          break;
        case 650: // 没权限
          window.alert('你没有权限进行此项操作!');
          break;
        default:
          window.alert(error.status);
          break;
      }

      return null; // 返回前台错误对象?
    }
  }

})();