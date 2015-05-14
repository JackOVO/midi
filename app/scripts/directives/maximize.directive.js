(function() {
  'use strict';

  // 最大化
  angular
    .module('app.directives')
    .directive('maximize', maximizeDirective);

  function maximizeDirective () {
    return {
      restrict: 'EA',
      scope: {'isMax': '=?', 'eventOrz': '=eventorz'},
      link: function(scope, element, attr) {
        var btn = $(element).children(attr.maximize);
        btn.click(function() {
          scope.isMax = !scope.isMax;
          scope.$apply();
        });

        scope.$watch('isMax', function(isMax) {
          if (isMax) {
            // 最大化前
            if (scope.eventOrz && scope.eventOrz.onMaxBefore) {
              scope.eventOrz.onMaxBefore();
            }

            // 动画前处理100%无法识别
            $(element).css({
              'top': $(element).position().top,
              'left': $(element).position().left,
              'width': $(element).innerWidth() + 2,
              'height': $(element).innerHeight() + 2
            });
            setTimeout(function(){ $(element).addClass('maximize'); }, 1);
          } else {
            // 还原前
            if (scope.eventOrz && scope.eventOrz.onReduceBefore) {
              scope.eventOrz.onReduceBefore();
            }
            $(element).attr('style', '');
            $(element).removeClass('maximize');
          }
        });
      }
    };
  }
})();