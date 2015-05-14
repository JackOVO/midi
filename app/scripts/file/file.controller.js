(function() {
  'use strict';
  // 文件控制器

  angular.module('app.file')
    .controller('FileController', FileController);

  FileController.$inject = ['$scope', '$location', 'fileService'];
  function FileController ($scope, $location, fileService) {
    var vm = this;
    vm.fileId = null;
    vm.title = '';
    vm.attrs = {};
    vm.desc = null;

    vm.alterPath = function(fileId) { $location.path('/' + fileId); };
    vm.download = function(fileId) { fileService.download(fileId); };

    vm.maximizeEvent = {
      'onMaxBefore': function () {},
      'onReduceBefore': function () {}
    };

    // 监听地址栏
    $scope.$watch(function(){
      // console.info('-watch-'); 这个监听???
      return $location.path();
    }, function(path){

      // 不是可识别的路径, 该死的分享, 取id跳转
      if (!path) {
        var match = $location.absUrl().match(/\?fileId=(\d+)/);
        if (match && match[1]) {
          var h = $location.absUrl().replace(/\?fileId=(\d+)/, '');
          window.location.href = (h + '#/' + match[1]);
        }
        return;
      }

      var fileId = fileService.resolvePath(path);
      if (fileId) { getFile(fileId); }
    });

    /**
     * 获取文件的基本信息
     * @param  {Number} fileId
     * @return {Promise}
     */
    function getFile (fileId) {
      return fileService.getFileById(fileId).then(function(file) {
        vm.fileId = file.fileId;
        vm.title = file.title;
        vm.attrs = file.attrs;
        vm.desc = file.desc;
      }, function(error) {
        console.error(error);
      });
    }
  }

})();