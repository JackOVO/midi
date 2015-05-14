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

})();