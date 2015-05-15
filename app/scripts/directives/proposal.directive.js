(function() {
  'use strict';
  // 搜索建议

  angular
    .module('app.directives')
    .directive('proposal', proposalDirective);

    proposalDirective.$inject = ['$templateCache', '$timeout'];
    function proposalDirective ($templateCache, $timeout) {
      return {
        replace: true,
        restrict: 'EA',
        template: $templateCache.get('directive/proposal.html'),
        scope: {'input': '=?', 'data': '=?', 'query': '=?', 'change': '=?'},
        link: function(scope, element, attr) {
          var inputEle = element.children('input');
          var timeout = null;

          scope.isOpen = false;
          scope.clcik = function (index, option) {
            inputEle.val(option); //?
            if (scope.change) { scope.change(index, inputEle.val()); }
            scope.isOpen = false;
          };

          scope.$watch('input', function(input) {
            if (input && scope.query) {
                scope.query(input);
            } else {
              scope.isOpen = false;
            }
          });

          scope.$watch('data', function(data) {
            if (data.length) { scope.isOpen = true; }
          });

          $(window).click(function() {
            scope.isOpen = false;
          });
        }
      };
    }

})();