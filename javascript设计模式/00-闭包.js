/***
 * 闭包的作用:
 * 1.封装变量
 * 2.延续局部变量的寿命
 * 3.闭包和面向对象设计:实现私有数据和方法的封装(本质还是1,封装变量)
 *
 * 闭包能使局部变量的生命期延长,这点与全局作用域的变量是一致的,不能算是内存泄漏!
 * 闭包与内存泄漏有关的部分是:
 * 使用闭包容易造成循环引用,如果闭包的作用域中保存着一些DOM节点,这时候有可能造成内存泄漏(互相引用导致内存
 * 无法释放)
 * */


/***
 * 例子1
 * */
var increment = function () {
    var count = 1;
    return {
        inc: function () {
            return count++;
        }
    }
}

// console.log(increment.count);   //undefined

var counter = increment();
console.log(counter.inc());
console.log(counter.inc());
console.log(counter.inc());

var counter2 = increment();
console.log(counter2.inc());
console.log(counter == counter2);  //false,注:闭包每次返回的对象都不一样!

/***
 * 例子2
 * */
var getTypeChecker = function () {
    var types = {};

    for (var i = 0, type; type = ['String', 'Number', 'Array'][i++];) {
        //使用闭包来封闭每次循环的变量
        (function (type) {

            types['is' + type] = function (obj) {
                return Object.prototype.toString.call(obj) === '[object ' + type + ']';
            }

        })(type);
    }

    return types;
}

var checker = getTypeChecker();
console.log(checker.isArray([]));   // true
console.log(checker.isString([]));   //false
console.log(checker.isString('hello'));  //true