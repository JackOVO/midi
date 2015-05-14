(function() {
  'use strict';
  //

  angular
    .module('app.search')
    .controller('SearchController', SearchController);

    function SearchController () {
      var vm = this;
      vm.isTradeTypeShow = false;
      vm.input = '';
      vm.event = {'dataTypeEvent': {}, 'tradeTypeEvent': {}};

      vm.event.dataTypeEvent.change  = dataTypeSelectChange;
      vm.event.tradeTypeEvent.change  = tradeTypeSelectChange;

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
    }
})();
