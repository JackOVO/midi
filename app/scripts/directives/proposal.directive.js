(function() {
  'use strict';
  // 搜索建议

  angular
    .module('app.directives')
    .directive('proposal', proposalDirective);

    function proposalDirective () {
      return {
        restrict: 'EA',
        scope: {'input': '=?', 'data': '=?', 'request': '=?'},
        link: function(scope, element, attr) {

          scope.$watch('input', function(input) {
            if (input) {
              // 请求操作
              scope.request(input);
            }
          });

          scope.$watch('data', function(data) {

          });
        }
      };
    }
})();