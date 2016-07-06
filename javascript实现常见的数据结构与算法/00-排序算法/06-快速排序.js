/**
 * 快速排序: 快速排序通常被认为是高效，快速等特点是使用V8引擎的实现Array.prototype.sort()上有超过23个项目的数组。
 * 对于少于23个项目，V8采用插入排序法。
 *
 * 快排是处理大数据集最快的算法之一。它是一种分而治之的算法,通过递归的方式将数据集依次分解为包含较小元素和包含
 * 较大元素的不同子序列。不断重复这个步骤直至所有数据有序。
 *
 * 这个算法首先要在数据集中选择一个基准值(pivot),数据排序围绕基准值进行。
 * 将列表中小于基准值的数据移动到一侧,将大于基准值的数据移动到另一侧。
 *
 * 快速排序非常适用于大数据集,处理小数据集反而性能下降。
 *
 *
 * 考虑按照身高给学生排序。在快速排序中，我们随便挑出一个学生，以该学生的身高为参考(pivot)。
 * 然后让比该学生高的站在该学生的右边，剩下的站在该学生的左边。
 * 很明显，所有的学生被分成了两组。该学生右边的学生的身高都大于该学生左边的学生的身高。
 * 我们继续，在低身高学生组随便挑出一个学生，将低身高组的学生分为两组(很低和不那么低)。
 * 同样，将高学生组也分为两组(不那么高和很高)。
 * 如此继续细分，直到分组中只有一个学生。当所有的分组中都只有一个学生时，则排序完成。
 */

var generateTestData = require('./00-TestDataGenerator');


function swap(items, firstIndex, secondIndex) {
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)],
        i = left,
        j = right;
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }

    }
    return items;
}

var data = generateTestData(20000);
// console.log(data);

var start = new Date().getTime();
console.log('start sorting....');

var result = quickSort(data, 0, data.length - 1);

var end = new Date().getTime();
console.log('耗时: ' + (end - start) + ' ms');

// console.log(result);