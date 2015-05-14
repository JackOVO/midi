(function() {
  'use strict';
  // 推荐服务

  angular
    .module('app.recommend')
    .factory('recommendService', recommendService);
  
  recommendService.$inject = ['$q', 'dataService', 'recommendBean'];
  function recommendService ($q, dataService, recommendBean) {
    var service = {
      'getFileRecomd': getFileRecommendById
    };
    return service;

    /**
     * 获取指定文件的推荐文件
     * @param  {Number} fileId 文件id
     * @return {Promise}        [description]
     */
    function getFileRecommendById (fileId) {
      var params = {'fileId': fileId};
      return dataService.get('fileRecmd', params)
        .then(function(recommends) {
          // 错误处理问题???
          // if (recommends.errorMessage) { return $q.reject(recommends.errorMessage); }

          var recmdArray = createRecomdArray(recommends);

          return recmdArray;
        });
    }

    /**
     * 根据后台源数据创建一个推荐列表
     * @param  {Array} sources 后台源数据
     * @return {Array} recmdArray 处理后的推荐列表
     */
    function createRecomdArray (sources) {
      var recmdArray = [];
      // 遍历推荐列表
      angular.forEach(sources, function(source, index) {
        var recommend = recommendBean.parse(source);
        recmdArray.push(recommend);
      });
      return recmdArray;
    }
  }
})();