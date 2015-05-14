(function() {
  'use strict';
  // 滚动条指令

  angular
    .module('app.directives')
    .directive('scrollbar', scrollbarDirectives);

  function scrollbarDirectives () {
    return {
      restrict: 'EA',
      link: function(scope, element, attr) {
        $(element).perfectScrollbar();

        // 触犯焦点改变大小更新滚动条
        $(element).focus(function() {
          $(element).perfectScrollbar('update');
        });
      }
    };
  }
})();