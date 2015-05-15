(function() {
  'use strict';

  // 文件内容服务
  angular.module('app.file')
    .factory('fileService', fileService);

  fileService.$inject = ['$q', '$rootScope', 'fileBean', 'dataService'];
  function fileService ($q, $rootScope, fileBean, dataService) {
    var service = {
      'getFileById': getFileById,
      'getHtmlById': getFileHtmlById,
      'download': downloadFileById,
      'getNowFile': getNowFile,
      'resolvePath': resolvePath
    };
    var priv = {
      'presentFile': {}
    };
    priv.presentFileId = null; // 当前文件id
    return service;

    /**
     * 通过id获取文件实体
     * @param  {Number} fileId 根据id查找文件
     * @return {Promise} 承诺回调
     */
    function getFileById (fileId) {
      var params = {'fileId': fileId};
      return dataService.get('fileInfo', params)
        .then(function(source) {

          // 错误处理问题???
          if (source.errorMessage) { return $q.reject(source.errorMessage); }

          var file = fileBean.parse(source);
          if (file.fileId !== priv.presentFile.FileId) {
            // 更改当前文件id
            priv.presentFile = file;
            // 执行文件id的改变, 进行通知
            fileIdChange(file.fileId);
          }
          return file;
        });
    }

    /**
     * 获取该文件的html
     * @param  {Number} fileId 文件id
     * @return {Promise} 承诺回调
     */
    function getFileHtmlById (fileId) {
      var params = {'fileId': fileId};
      params.format = 'html';
      return dataService.get('fileHtml', params)
        .then(function(html) {
          // 错误处理问题???
          if (html.errorMessage) { return $q.reject(html.errorMessage); }

          return html;
        });
    }

    /**
     * 用data服务下载文件, 无回调的
     * @param  {Number} fileId
     */
    function downloadFileById (fileId) {
      var params = {'fileId': fileId};
      return dataService.get('downloadValid', params)
        .then(function(message) {
          if (message && message.errorMessage === 'OK') {
            dataService.download('downloadFile', params);
          }
        });
    }

    /**
     * 获取当前文件, 会返回内部当前文件信息
     */
    function getNowFile () {
      return priv.presentFile;
    }

    /**
     * 解析路径获取文件id登陆
     * @param  {String} path 解析的字符
     * @return {Object}      解析结果
     */
    function resolvePath (path, absUrl) {
      // 做数字匹配, 防止没有地址
      var match = [];
      match = path && path.match(/(\d+)/);
     
       if (match.length) { return match[1]; }
      return null;
    }

    /**
     * 通知哥几个改朝换代了
     * @param  {Number} fileId
     */
    function fileIdChange (fileId) {
      $rootScope.$broadcast('onFileIdChange', fileId);
    }
  }
})();