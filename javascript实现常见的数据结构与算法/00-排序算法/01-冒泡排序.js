/***
 * 冒泡排序
 * */

var generateTestData = require('./00-TestDataGenerator');

var bubbleSort = function (data) {
    var l = data.length;
    for (var i = 0; i <= l - 1; i++) {
        for (var j = 1; j <= l; j++) {
            if (data[j] < data[j - 1]) {
                var tmp = data[j];
                data[j] = data[j - 1];
                data[j - 1] = tmp;
            }
        }
    }
    return data;
}

var data = generateTestData(20000);

var start = new Date().getTime();
console.log('start sorting....');

var result = bubbleSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);
