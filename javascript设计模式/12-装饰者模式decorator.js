/***
 * 装饰者模式: 动态的给某些对象添加职责,而不会影响到这个类派生的其他对象。
 * 装饰者模式在不改变自身的基础上,在运行期间给对象动态的添加职责。
 * */

/**
 * 传统面向对象语言中实现装饰者模式,需要装饰者类和被装饰类实现相同的接口,装饰者对象和被装饰对象提供一致的对外接口!
 * java中的输入输出流是装饰者模式运用的最好的例子!
 * */

/***
 * javascript中可以很方便的给函数(对象)扩展属性和方法,但是却很难在不改变函数源码的情况下扩展新功能,
 * 在运行期间很难切入到某个函数的执行环境。
 */

//1. 保存原函数来进行扩展
/**
 * 这种做法在开发中使用的也很普遍。比如自定义了window.onload方法,又怕覆盖了别人在window.onload中的代码,
 * 就可以使用一个中间变量例如_onload来保存原来的函数。
 *
 * 缺点:
 * 1. 产生了新的中间变量,如果装饰的层次很多,难以维护
 * 2. 可能遇到this劫持的问题!!!(参考00-this的四种用法中的例子)
 * */
function a() {
    console.log('a....');
}

var _a = a;   //保存原函数的引用
a = function () {  //再对原函数进行扩展
    _a();
    console.log('extra...');
}

// a();  //调用


/**
 * 2. 使用AOP来实现装饰者模式,是js中最简洁的实现!!!
 * */
Function.prototype.before = function (beforeFn) {
    var self = this;
    return function () {
        beforeFn.apply(this, arguments);
        return self.apply(this, arguments);
    }
}

Function.prototype.after = function (afterFn) {
    var self = this;
    return function () {
        var result = self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return result;
    }
}

var func = function () {
    console.log('do some business...');
}

var log = function () {
    console.log('keep access log...');
}

var report = function () {
    console.log('report...');
}

func = func.before(log).after(report);

func();