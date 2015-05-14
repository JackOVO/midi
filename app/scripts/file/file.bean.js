(function() {
  'use strict';

  // 文件类
  angular.module('app.file')
    .factory('fileBean', fileBean);



  function fileBean () {
    var service = {
      'parse': parse
    };

    function File (fileId, title, attrs, desc) {
      this.fileId = fileId;
      this.title = title;
      this.attrs = attrs;
      this.desc = desc;
    }
    File.prototype.toString = spliceShare;

    return service;

    /**
     * 由后台源实体解析成前台实体
     * @param  {Object} source 后台源数据
     * @return {Object}        解析后的实体
     */
    function parse (source) {
      var fileId = source.fileId;
      var title = source.title;
      var desc = source.desc;
      var attrs = {
        'freq': source.freqInfo,
        'source': source.almanac,
        'volume': source.dataVolume,
        'endDate': source.endDate,
        'startDate': source.startDate,
        'viewTimes': source.viewTimes,
        'downloadTimes': source.downloadTimes
      };

      return new File(fileId, title, attrs, desc);
    }

    /**
     * 拼接分享内容
     * @return {String} 内容啊内容啊
     */
    function spliceShare () {
      /*jshint validthis:true */
      var content = '';
      content += 'DFinder文件分享: ';
      content += this.title;
      if (this.attrs.source) { content += ' 来源:' + this.attrs.source; }
      if (this.attrs.volume) { content += ' 数据量:' + this.attrs.volume; }
      if (this.attrs.freq) { content += ' '+ this.attrs.freq +'数据'; }
      if (this.attrs.startDate || this.attrs.endDate) {
        content += ' '+ this.attrs.startDate + '-' + this.attrs.endDate;
      }
      return content+'.';
    }

  }
})();