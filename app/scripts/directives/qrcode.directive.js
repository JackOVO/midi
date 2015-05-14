(function() {
  'use strict';
  // 二维码指令

  angular
    .module('app.directives')
    .directive('qrcode', qrcodeDirective);

  qrcodeDirective.$inject = ['$templateCache'];
  function qrcodeDirective ($templateCache) {
    return {
      replace: true,
      restrict: 'EA',
      scope: {'text': '=?', 'show': '=?'},
      template: $templateCache.get('directive/qrcode.html'),
      link: function(scope, element, attr) {
        var body = $(element).children('#qrcode-body');

        scope.$watch('text', function(text) {
          $(body).empty();
          $(body).qrcode({text: text});
        });
      }
    };
  }

})();