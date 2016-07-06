/**
 * Created by Edgar.yjb on 16/7/1.
 */

/***
 * Function.prototype.call 和 Function.prototype.apply 的作用:
 *
 * 1. 改变this指向
 * 2. 借用借他对象的方法
 */

/***
 * Function.prototype.bind 函数用于指定函数内部this的指向
 *
 * 实现原理:
 * */

Function.prototype.bind = function () {
    var self = this;  //保存原函数
    var args = [].slice.call(arguments);
    var context = args.shift();

    return function () {
        var argsArr = [].slice.call(arguments);
        return self.apply(context, args.concat(argsArr));
    }
}

var bindTest = function (age, grade) {
    console.log(this.name);
    console.log([age, grade]);
}.bind({name: 'Jack'}, 22);

bindTest(95.0);