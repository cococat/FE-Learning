/**
 * 堆排序
 *
 * 堆排序适合于数据量非常大的场合（百万数据）。

 * 堆排序不需要大量的递归或者多维的暂存数组。这对于数据量非常巨大的序列是合适的。
 * 比如超过数百万条记录，因为快速排序，归并排序都使用递归来设计算法，在数据量非常大的时候，可能会发生堆栈溢出错误。

 * 堆排序会将所有的数据建成一个堆，最大的数据在堆顶，然后将堆顶数据和序列的最后一个数据交换。
 * 接下来再次重建堆，交换数据，依次下去，就可以排序所有的数据。
 */

var generateTestData = require('./00-TestDataGenerator');

/*方法说明：调整堆,维护堆的性质
 @param  arr 数组
 @param  x   数组下标
 @param  len 堆大小*/
function adjustHeap(arr, x, len) {
    var l = 2 * x, r = 2 * x + 1, largest = x, temp;
    if (l < len && arr[l] > arr[largest]) {
        largest = l;
    }
    if (r < len && arr[r] > arr[largest]) {
        largest = r;
    }
    if (largest != x) {
        temp = arr[x];
        arr[x] = arr[largest];
        arr[largest] = temp;
        adjustHeap(arr, largest, len);
    }
}

/*方法说明：堆排序
 @param  array 待排序数组*/
function heapSort(array) {
    //建堆
    var heapSize = array.length, temp;
    for (var i = Math.floor(heapSize / 2); i >= 0; i--) {
        adjustHeap(array, i, heapSize);
    }

    //堆排序
    for (var j = heapSize - 1; j >= 1; j--) {
        temp = array[0];
        array[0] = array[j];
        array[j] = temp;
        adjustHeap(array, 0, --heapSize);
    }

    return array;
}

var data = generateTestData(20000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = heapSort(data);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);
