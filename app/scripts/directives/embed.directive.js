(function() {
  // 嵌入指令

  angular
    .module('app.directives')
    .directive('embed', embedDirectives);

  embedDirectives.$inject = ['$templateCache'];
  function embedDirectives ($templateCache) {
    return {
      replace: true,
      restrict: 'EA',
      controller: embedController,
      template: $templateCache.get('directive/embed.html'),
      scope: {},
      link: function(scope, element, attr, ctrl) {
        // 指令反向控制当前区域
        ctrl.setDirScope(scope);
        scope.$watch('fileId', function(fileId){
          if(fileId) {
            // 获取html(body)
            ctrl.getHtml(fileId)
              .then(function(html) {
                // 返回的html处理, 关于找不到id的错误处理
                element.html(html);

var tableWidth = backside(html);
if (tableWidth) { element.children('table').width(tableWidth); }

                element.focus(); // 触发更新大小
              });
          }
        });
      }
    };
  }

  embedController.$inject = ['$scope', 'fileService'];
  function embedController ($scope, fileService) {
    var vm = this;
    // 指令作用域
    var dirScope = null;

    vm.getHtml = fileService.getHtmlById;
    vm.setDirScope = function(scope){ dirScope = scope; };

    $scope.$on('onFileIdChange', function(e, fileId){
      dirScope.fileId = fileId;
    });
  }

  // 根据colgroup得到总宽度
  function backside (html) {
    var body = $(html), count = 0;
    var colgroup = body.find('colgroup');

    colgroup.children('col').each(function(i, e){
      var width = $(e).attr('width');
      count += width - 0;
    });
    return count;
  }
})();