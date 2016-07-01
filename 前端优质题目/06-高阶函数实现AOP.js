/***
 * 高阶函数是指满足如下两个条件之一或者两个的函数:
 * 1.函数作为参数传递给其它函数
 * 2.函数作为返回值返回
 * */

/***
 * 使用高阶函数实现AOP
 * 使用AOP动态给函数添加功能,这在js中非常方便,特别适用于装饰者模式!
 * */

Function.prototype.before = function (beforeFn) {
    var self = this;
    return function () {  //返回包含了原函数和新函数的"代理函数"
        // beforeFn(arguments);
        // self(arguments);

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
    console.log('业务逻辑处理...');
}

func = func.before(function () {
    console.log('调用前记录日志...');
}).after(function () {
    console.log('调用后执行清理工作...');
});

func();