(function() {
  'use strict';
  // 分享啊

  angular
    .module('app.share')
    .controller('ShareController', ShareController);

  ShareController.$inject = ['$location', 'shareService', 'fileService'];
  function ShareController ($location, shareService, fileService) {
    var vm = this;
    vm.share = share;
    vm.shareUrl = '';
    vm.showQrcode = false;

    function share (firm) {
      var absUrl = $location.absUrl();
      var nowFile = fileService.getNowFile();
      var attrs = {
        'url': absUrl.replace(/#\/(\d+)/, function(p, t1){ return '?fileId=' + t1; }),
        'title': nowFile.toString()
      };
console.info(nowFile);


      // 二维码分享
      if (firm === 'weixin') {
        vm.shareUrl = attrs.url;
        vm.showQrcode = true;
      } else {
        // 窗口分享
        var window = shareService.share(firm, attrs);
      }
    }
  }

})();