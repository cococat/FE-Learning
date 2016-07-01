/***
 * javascript中this的指向有4种情况:
 *
 * 1.作为普通函数调用: this指向全局对象
 * 2.作为对象方法调用: this指向该对象
 * 3.构造器调用: this指向构造器返回的对象
 * 4.Function.prototype.call 和 Function.prototype.apply调用: this指向动态传入的对象
 */

/**
 * 丢失的this
 * 例子:
 * document.getElementById这个函数名字太长,可以使用一个短点的函数来代替,例如prototype.js做法:
 */
var getId = function (id) {
    return document.getElementById(id);
}
getId('div1');

/**
 * 注意: 使用下面的方式是错误的!!!!!!!
 * var getId=document.getElementById;   错误做法!!!
 * 因为document.getElementById这个方法的实现需要使用this指针,this指针期望指向document对象,
 * 而这种做法作为普通函数调用,this指向了全局对象,即window,所以会出错!!
 */
// 可以使用apply传入document来帮助修正this:
document.getElementById = (function (func) {
    return function () {
        return func.apply(document, arguments);
    }
})(document.getElementById);
var getId = document.getElementById;  //这样就不会再报错