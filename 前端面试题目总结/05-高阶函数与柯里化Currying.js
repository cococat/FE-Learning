/***
 * currying又称为部分求值。
 * 一个currying函数接受了一些参数后,并不会立即求值,而是继续返回另外一个函数,并利用闭包将刚才传入的参数保存起来。
 * 等到函数需要真正求值的时候,之前传入的参数会被一次性用于求值。
 * */

/***
 * 例子1:加入要编写一个函数,计算每个月的开销。每天需要将当天的花销也保存下来。
 * 下面代码中,虽然是要计算月底花销,但实际每天都计算了一次,而实际上我们不关心每天开销了多少,只需要在月底做一次计算即可
 * */
// var monthCost = 0;
// var cost = function (dayCost) {
//     monthCost += dayCost;
// }
//
// cost(100);  //第一天开销
// cost(80);   //第二天开销
// cost(120);  //第三天开销
// //....
// cost(200);  //当月最后一天开销
// console.log(monthCost);  //总共500


/***
 * cost柯里化的简陋实现
 * **/

var cost = (function () {
    var args = [];  //使用闭包来记录每次传入的参数

    return function () {
        if (arguments.length === 0) {  //没有传递参数时,求值
            var total = 0;
            for (var i = 0; i < args.length; i++) {
                total += args[i];
            }
            return total;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();

cost(100);  //未求值
cost(200);  //未求值
cost(300, 400, 500);  //未求值
console.log(cost());  //求值!


/***
 * 通用的currying函数,接受一个函数作为参数,并将该函数柯里化
 * */
var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
}

var cost = (function () {
    var money = 0;

    return function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        }
        return money;
    }
})();

var cost = currying(cost);  //柯里化cost函数
cost(100);
cost(200);
cost(300, 400);
console.log(cost());


/***
 * 反柯里化uncurrying:
 * 使用call和apply时,能够把任意对象当做this传入某个方法,这样,方法中用到的this就不再局限于原来规定的对象,
 * 而是加以泛化而得到更广的适用性。
 *
 * 有没有办法把泛化this的过程提取出来? 这就是uncurrying要做的事情!
 *
 * 下面是uncurrying的一种实现:
 * */
Function.prototype.uncurrying = function () {
    var self = this;
    return function () {
        var context = Array.prototype.shift.call(arguments);
        return self.apply(context, arguments);
    }
}
//下面就可以将Array.prototype.push.call转换成一个泛化得函数
var push = Array.prototype.push.uncurrying();
var slice = Array.prototype.slice.uncurrying();

(function () {
    push(arguments, 4);
    console.log(slice(arguments));
})(1, 2, 3);


/***
 * 下面是uncurrying的另一种实现
 * */
Function.prototype.uncurrying2 = function () {
    var self = this;
    return function () {
        return Function.prototype.call.apply(self, arguments);
    }
}

