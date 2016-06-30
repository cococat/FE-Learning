/**
 * Created by Edgar.yjb on 16/6/30.
 */

/*
 Applicative编程: 将函数作为参数传递给另外一个函数,并且调用它。
 最常见的有数组的 map、reduce、filter函数等。
 */

/***
 * 例子1: 实现一个函数,查找出某个数组中所有数字,可能实现一个findNumber方法,
 那如果后面又有查找字母、查找大于10的数字...这些需求呢? 难道每个需求都要添加一个函数?
 可以使用高阶函数,将一个条件判断的函数当做参数传递到一个通用的find函数中!
 */
/**
 *
 function find(array, pred/!*function*!/) {
    var result = [];
    array.forEach(function (item, index) {
        if (pred(item)) {
            result.push(item);
        }
    })
    return result;
    }
 var result = find([1, 2, 3, 4, 'a', 'c', 5], function (item) {
        // return item >= 0 && item <= 9;   //查找数字
        return item >= 'a' && item <= 'c';   //查找字母
    });
 console.log(result);
 *
 */


/***
 * 例子1的代码还可以写成如下形式,通过返回函数来定制不同行为
 * @param pred
 * @returns {Function}
 */
function find(pred) {
    return function (array) {
        var result = [];
        array.forEach(function (item, index) {
            if (pred(item)) {
                result.push(item);
            }
        })
        return result;
    }
}
//1.查找数组中的数字
var findNumber = find(function (x) {
    return x >= 0 && x <= 9
});
console.log(findNumber([1, 2, 3, 'a', 'v', 'b', 4, 'kkk', 'rrr', 'sb', '2b']));

//2.查找数组中除数字外的元素
var findNotNumber = find(function (x) {
    return !(x >= 0 && x <= 9);
})
console.log(findNotNumber([1, 2, 3, 'a', 'v', 'b', 4, 'kkk', 'rrr', 'sb', '2b']));

//3.查找数组中的小写字母
var findLowerCaseLetters = find(function (x) {
    return x >= 'a' && x <= 'z'
});
console.log(findLowerCaseLetters([1, 2, 3, 'a', 'v', 'b', 4]));


/***
 * 例二: 写一个函数,来判断传入的参数是不是某种类型的数据
 */
var isType = function (Type) {
    return function (data) {
        return Object.prototype.toString.call(data) === '[object ' + Type + ']';
    }
}

//1.判断是不是Number类型数据
var isNumber = isType('Number');
console.log(isNumber(0));

//2.判断数据是不是字符串类型
var isString = isType('String');
console.log(isString('123'));
console.log(isString(123));