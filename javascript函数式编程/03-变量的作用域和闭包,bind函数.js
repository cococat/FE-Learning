/**
 * Created by Edgar.yjb on 16/6/30.
 */

/***
 * 什么是闭包?
 *
 * 闭包是一个函数,用于捕获作用域内的外部绑定。
 */

/***
 * 例一
 * @param FACTOR
 * @returns {Function}
 */
//factor是createScaleFunction函数内的变量,却能在该函数返回后仍然使用
//它从高阶函数中return实现"越狱"
function createScaleFunction(FACTOR) {
    var factor = FACTOR;
    return function (array) {
        return array.map(function (item) {
            return item * factor;
        })
    }
}

var scale10 = createScaleFunction(10);
console.log(scale10([1, 2, 3, 4, 5]));

var scale2 = createScaleFunction(2);
console.log(scale2([1, 2, 3, 4, 5]));

/***
 * 例二
 * @returns {Function}
 */
//利用闭包封装私有数据
//实现一个自增计数器
function increment() {
    var counter = 0;
    return function () {
        return ++counter;
    }
}

// console.log(counter);  //error,访问不到
var counter = increment();
console.log(counter());
console.log(counter());
console.log(counter());

/***
 * 例三
 * 实现bind函数
 */
Function.prototype.bind = function () {
    var args = [].slice.apply(arguments);
    var context = args.shift();
    var self = this;   //保存原函数
    return function () {
        var args2 = args.concat([].slice.apply(arguments));
        return self.apply(context, args2);
    }
}

var func = function (a, b, c, d) {
    console.log(this.name);
    console.log([a, b, c, d]);
}.bind({name: 'hhhhhhhh'}, 3, 4);

func(1, 2);