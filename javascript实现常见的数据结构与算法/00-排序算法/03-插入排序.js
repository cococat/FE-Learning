/**
 * 插入排序
 *
 * 假设在新生报到的时候，我们将新生按照身高排好队(也就是排序)。如果这时有一名学生加入，我们将该名学生加入到队尾。
 * 如果这名学生比前面的学生低，那么就让该学生和前面的学生交换位置。这名学生最终会换到应在的位置。这就是插入排序的基本原理。

 对于起始数组来说，我们认为最初，有一名学生，也就是最左边的元素(i=0)，构成一个有序的队伍。

 随后有第二个学生(i=1)加入队伍，第二名学生交换到应在的位置；随后第三个学生加入队伍，第三名学生交换到应在的位置……
 当n个学生都加入队伍时，我们的排序就完成了。
 */

var generateTestData = require('./00-TestDataGenerator');

var insertSort = function (data) {
    var l = data.length;

    for (var i = 1; i <= l; i++) {
        var j = i - 1;
        while ((j >= 0) && (data[j] < data[j - 1])) {
            //交换
            var tmp = data[j];
            data[j] = data[j - 1];
            data[j - 1] = tmp;

            j--;  //j--
        }
    }
    return data;
}

var data = generateTestData(20000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = insertSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);
