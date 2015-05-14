(function() {
  'use strict';
  // 推荐类
  
  angular
    .module('app.recommend')
    .factory('recommendBean', recommendBean);

    function recommendBean () {
      var service = {
        'parse': parse
      };
      return service;

      function Recommend (excelId, excelName, attrs) {
        this.fileId = excelId;
        this.title = excelName;
        this.attrs = attrs;
      }

      /**
       * 由后台源实体解析成前台实体
       * @param  {Object} source 后台源数据
       * @return {Object}        解析后的实体
       */
      function parse (source) {
        var fileId = source.excelId;
        var title = source.excelName;
        var attrs = {
          'viewTimes': source.viewTimes,
          'downloadTimes': source.downloadTimes
        };

        return new Recommend(fileId, title, attrs);
      }
    }
})();
