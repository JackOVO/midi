(function() {
  'use strict';
  //

  angular
    .module('app.search')
    .controller('SearchController', SearchController);

    SearchController.$inject = ['searchService'];
    function SearchController (searchService) {
      var vm = this;
      vm.jump = jump;
      vm.input = '';
      vm.query = query;
      vm.keywords = [];
      vm.isTradeTypeShow = false;

      vm.event = {'dataTypeEvent': {}, 'tradeTypeEvent': {}};
      vm.event.dataTypeEvent.change  = dataTypeSelectChange;
      vm.event.tradeTypeEvent.change  = tradeTypeSelectChange;
      vm.selectedChange = selectedChange;

      var dataTypeValue = '', tradeTypeValue = '';

      vm.dataTypeList = [
        {'value': 15, 'text': '全部数据'},
        {'value': 1, 'text': '地区数据'},
        {'value': 2, 'text': '行业数据'},
        {'value': 4, 'text': '国际数据'},
        {'value': 8, 'text': '贸易数据'}
      ];
      dataTypeValue = vm.dataTypeList[0].value;

      vm.tradeTypeList = [
        {'value': -1, 'text': '全部资源'},
        {'value': 4, 'text': '商品贸易'},
        {'value': 5, 'text': '行业贸易'},
        {'value': 7, 'text': '贸易指数'}
      ];
      tradeTypeValue = vm.tradeTypeList[0].value;

      // 数据类型选中改变事件
      function dataTypeSelectChange (index, obj) {
        if(obj.value === 8) { vm.isTradeTypeShow = true; }
        else { vm.isTradeTypeShow = false; }
        dataTypeValue = obj.value;
      }

      // 贸易类型选中改变事件
      function tradeTypeSelectChange (index, obj) {
        tradeTypeValue = obj.value;
        console.info(vm.input);
      }

      // 下拉选中改变
      function selectedChange (index, option) {
        jump(option);
      }

      function jump (value) {
        if (!value) { return; }
        var tradeVal = tradeTypeValue;
        var productVal = dataTypeValue;

        var url = encodeURI('http://dss.dfinder.cn/result.html?keyword='+value+'&proid='+productVal+'&cubeid='+tradeVal);

        window.open(url);
      }


      var callbackTime = 0;
      // 查啊查啊
      function query (value) {
        var time = new Date().getTime();
        callbackTime = time; // 最后覆盖

        return searchService.search(value, 10)
          .then(function(list) {
            if (time === callbackTime) {
              vm.keywords = list;
            }
            return list;
          });
      }
    }
})();
