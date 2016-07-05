/**
 * 散列表
 * 1. 存储数据的数组长度,通常取为质数,并且为了让散列更均匀,数组长度应该大于100? (why?)
 * 2. 散列函数的选择,依赖于键值得数据类型:
 *  > 若键值是整型,最简单常见的散列函数就是用数组长度对键值取余(除留余数法);
 *  > 键是字符串类型,散列函数选择比较难,需要慎重考虑
 * */

function HashTable() {
    this._data = new Array(137);
}

HashTable.prototype = {
    constructor: HashTable,

    //键是字符串类型,最简单的hash算法: 将每个字符的ASCII code相加,总和对数组总长度取余
    _simpleHash: function (key) {
        key = key + '';
        var total = 0;
        for (var i = 0, l = key.length; i < l; i++) {
            total += key.charCodeAt(i);
        }

        return total % this._data.length;
    },

    //更好的hash算法:霍纳算法。仍然要取各个字符的ASCII值,不过每次求和时乘以一个质数,
    // 大多数算法书建议一个较小的质数
    _betterHash: function (key) {
        key = key + '';
        const H = 31;
        var total = 0;
        for (var i = 0, l = key.length; i < l; i++) {
            total += H * total + key.charCodeAt(i);
        }

        return total % this._data.length;
    },

    _showHashTableInfo: function () {
        for (var i = 0, l = this._data.length; i < l; i++) {
            if (this._data[i]) {
                console.log(i + ": " + this._data[i]);
            }
        }
    },

    put: function (ele) {
        // var hashCode = this._simpleHash(ele);
        var hashCode = this._betterHash(ele);
        this._data[hashCode] = ele;
    },

    get: function (ele) {

    }


}

var hashTable = new HashTable();
hashTable.put('hello');
hashTable.put('lleoh');
hashTable.put('world');
hashTable.put('hashTable');
hashTable.put('hashMap');
hashTable._showHashTableInfo();