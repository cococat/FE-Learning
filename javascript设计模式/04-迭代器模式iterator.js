/***
 * 迭代器模式: 提供一种方法顺序访问一个聚合对象中的各个元素,而又不暴露该对象的内部表示。
 * 在js中已经是内部实现
 * */

//实现迭代器
var each = function (array, callback) {
    for (var i = 0, l = array.length; i < l; i++) {
        callback(i, array[i]);
    }
}

each(['hello', 1, 'nice'], function (index, item) {
    console.log(index + ': ' + item);
});

/***
 * 内部迭代器与外部迭代器:
 * 1.内部迭代器: 迭代器内部已经定义好了迭代规则,它完全接手整个迭代过程,外部只需要一次初始调用,如上面定义的each函数;
 * 2.外部迭代器: 必须显式请求下一个迭代元素,实现更复杂,但是适用面更广,能够满足更多需求
 *
 * 无论是内部迭代器还是外部迭代器,只要被迭代的对象具有length属性并且可以用下标访问,那它就应该可以被迭代!
 * 可以看jquery.each方法的实现
 * */

//显示迭代器实现原理
var Iterator = function (obj) {
    var current = 0;

    var isDone = function () {
        return current >= obj.length;
    }

    var next = function () {
        current += 1;
    }

    var getCurrentItem = function () {
        return obj[current];
    }

    return {
        isDone: isDone,
        next: next,
        getCurrentItem: getCurrentItem
    }
}

var iterator = Iterator([10, 20, 30, 40]);
while (!iterator.isDone()) {
    console.log(iterator.getCurrentItem());
    iterator.next();
}
