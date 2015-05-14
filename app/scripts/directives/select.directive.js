(function() {

  angular
    .module('app.directives')
    .directive('selectorz', selectDirective);

    selectDirective.$inject = ['$templateCache', '$timeout'];
    function selectDirective ($templateCache, $timeout) {
      return {
        replace: true,
        restrict: 'EA',
        scope: {'list': '=?', 'event': '=?'},
        template: $templateCache.get('directive/select.html'),
        link: function(scope, element, attr, ctrl) {
          scope.isOpen = false;
          scope.index = 0;
          scope.text = '请选择';

          scope.$watch('list', function(list) {
            if (list.length) {
              scope.text = list[scope.index].text;
            }
          });
 
          scope.toggle = function() {
           $timeout(function() {
              scope.isOpen = !scope.isOpen;
              console.info(scope.isOpen, !scope.isOpen);
            }, 1);
          };
          scope.select = function(index) {
            scope.index = index;
            scope.text = scope.list[index].text;
            scope.isOpen = false;

            if(scope.event && scope.event.change) {
              scope.event.change(index, scope.list[index]);
            }
          };

          $(window).click(function() {
            scope.isOpen = false;
            scope.$apply();
          });
        }
      };
    }

})();