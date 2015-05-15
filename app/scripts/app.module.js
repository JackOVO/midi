(function() {
  'use strict';

  var startApp = angular
                  .module('app', [
                    'app.directives',
                    'app.file',
                    'app.share',
                    'app.search',
                    'app.recommend'
                  ]);

  angular.element().ready(function() {
    angular.bootstrap(document, [startApp.name]);
  });

  startApp.controller('AppController', AppController);

  AppController.$inject = ['$scope', 'fileService', 'dataService'];
  function AppController ($scope, fileService, dataService) {
    var vm = this;
    vm.title = '';
    vm.userName = '';
    vm.exit = exit;
    vm.login = login;

    $scope.$on('onFileIdChange', function(e, fileId) {
      vm.title = fileService.getNowFile().title;
    });

    // 初始用户信息
    dataService.get('userInfo')
      .then(function(response) {
        if (response) { vm.userName = response.userName; }
          else { vm.userName = ''; }
      });

    // 破登录
    function login () {
      window.location.href = 'http://login.dfinder.cn/login.html?url=' + location.href;
    }

    // 破退出
    function exit () {
      $.ajax({
        dataType: 'jsonp',
        jsonp: 'jsonp_callback',
        url: 'http://login.dfinder.cn/logout.do',
        complete: function () { location.href = 'http://www.dfinder.cn'; }
      });
    }
  }

})();