(function() {
  'use strict';
   // 推荐控制器
  
  angular
    .module('app.recommend')
    .controller('RecommendController', RecommendController);

  RecommendController.$inject = ['$scope', '$location', 'recommendService'];
  function RecommendController ($scope, $location, recommendService) {
    var vm = this;
    vm.list = [];
    vm.selectRecomd = function(fileId) { $location.path('/' + fileId); };

    // 监听文件服务id改变事件
    $scope.$on('onFileIdChange', function(e, fileId) {
      recommendService.getFileRecomd(fileId)
        .then(function(recomds) {
          vm.list = recomds;
        });
    });


  }

})();