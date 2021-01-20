const dfilter ={
    addZeroTwo: function(value) {
        if (value > 0 && value < 0.1) {
          return value;
        }
        var value = Math.round(parseFloat(value) * 100) / 100; //一定要用var声明，let会报错
        var arr = value.toString().split('.');
    
        if (arr.length === 1) { //个位数
          return value.toString() + '.00';
        } else {
          if (arr[1].length === 1) { //只有一位小数
            return value.toString() + '0';
          } else {
            return value;
          }
        }
    },
    
      addZeroOne: function(value) {
        if (value > 0 && value < 0.1) {
          return value;
        }
        var value = Math.round(parseFloat(value) * 100) / 100;
        var arr = value.toString().split('.');
    
        if (arr.length === 1) {
          return value.toString() + '.0';
        } else {
          if (arr[1].length === 1) {
            return value.toString() + '0';
          } else {
            return value;
          }
        }
    }
}

export default dfilter;