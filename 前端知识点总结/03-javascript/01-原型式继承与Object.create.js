/***
 * 动态类型语言的缺点是无法在编译期间保证变量的类型,而只能在运行时才能确定。
 * 就像在商店买了一包牛肉味辣条,等到真正吃到嘴里才知道它到底是不是牛肉味。O(∩_∩)O
 */

/***
 * 原型式继承: 对象是通过克隆另一个对象而来的
 * javascript得到一个对象,就是要找到一个对象,然后克隆它。
 * 只不过引擎内部屏蔽了细节,暴露给我们的是一个 new Object() 或 var obj={} 指令
 */


//模拟Object.create方法的实现
var clone = function (obj) {
    var F = function () {
    };

    F.prototype = obj;

    return new F();
}

var obj = {name: 'jack', age: 22};
var obj2 = clone(obj);
console.log(obj2.name + '-' + obj2.age);