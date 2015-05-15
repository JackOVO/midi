(function() {
  'use strict';
  // 搜索建议服务

  angular
    .module('app.search')
    .factory('searchService', searchService);

  searchService.$inject = ['dataService'];
  function searchService (dataService) {
    var service = {
      'search': searchByInput
    };
    return service;

    /**
     * 好吧就是搜索, 没有想扩展
     * @param  {String} input 输入项
     * @param  {Number} size 请求个数
     * @return {Promise} 承诺
     */
    function searchByInput (input, size) {
      var params = {'input': input, 'size': size};
      return dataService.get('search', params)
        .then(function(response) {
          return response.keywords;
        });
    }
  }

})();