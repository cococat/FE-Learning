/***
 * 策略模式: 将实现某一目标的不同方式定义成一系列的算法,将它们封装起来,
 * 并且这些算法之间可以随意相互替换。
 * */

/***
 * 例子1: 使用策略模式计算奖金
 * 假设某个公司的员工的年终奖是根据绩效和一个基数来计算的,绩效为S的员工年终奖为4倍工资,
 * 绩效为A的员工年终奖为3倍工资,绩效为B的员工年终奖为2倍工资
 * */

/**
 * 1. 最low的做法
 * 算法中充满了if-else分支,如果以后要加入不同等级,或者计算工资的基数改变,需要不断修改这个函数,
 * 而且if-else会使函数变得越来越庞大。
 * */
var calculateBonus = function (performance, salary) {
    if (performance === 'S') {
        return salary * 4;
    } else if (performance === 'A') {
        return salary * 3;
    } else if (performance === 'B') {
        return salary * 2;
    }
}
console.log(calculateBonus('S', 10000));
console.log(calculateBonus('A', 8000));
console.log(calculateBonus('B', 12000));


/**
 * 2. 使用传统面向对象方式的策略模式来重构代码
 * 策略模式需要一个Context对象接受请求,然后代理到对应的策略类上进行实际计算!
 */

//定义一组策略类
var PerformanceS = function () {
}
PerformanceS.prototype.calculate = function (salary) {
    return salary * 4;
}

var PerformanceA = function () {
}
PerformanceA.prototype.calculate = function (salary) {
    return salary * 3;
}

var PerformanceB = function () {
}
PerformanceB.prototype.calculate = function (salary) {
    return salary * 2;
}

//定义一个Context类接受用户请求
var BonusCalculator = function () {
    this.salary = null;
    this.strategy = null;
}
BonusCalculator.prototype = {
    constructor: BonusCalculator,
    setSalary: function (salary) {
        this.salary = salary;
    },
    setStrategy: function (strategy) {
        this.strategy = strategy;
    },
    calculate: function () {
        return this.strategy.calculate(this.salary);
    }
}

//Context代理到具体策略类进行计算
var calculator = new BonusCalculator();
// calculator.setSalary(20000);
// calculator.setStrategy(new PerformanceS());
calculator.setSalary(5000);
calculator.setStrategy(new PerformanceA());
console.log(calculator.calculate());


/***
 * javascript版本的策略模式:
 * 在传统的面向对象语言中的策略模式实现中,策略类和Context类最后都要定义为对象,
 * 而在javascript中,函数也是对象!!!所以js中不用定义这么复杂。
 * */
var strategies = {
    "S": function (salary) {
        return salary * 4;
    },
    "A": function (salary) {
        return salary * 3;
    },
    "B": function (salary) {
        return salary * 2;
    }
}

//同理,Context对象也可以使用函数来实现
var calculateBonus2 = function (salary, strategy) {
    return strategies[strategy](salary);
}

console.log(calculateBonus2(7000, 'A'));


/***
 * 例子2: 使用策略模式来校验表单!
 * */

//定义一系列策略算法
var validateStrategies = {
    isNotEmpty: function (value, errMsg) {
        //校验代码...
    },
    isPhoneNumber: function (value, errMsg) {
        //校验代码...
    },
    isEmail: function (value, errMsg) {
        //校验代码...
    },
}

//定义Context
var Validator = function () {
    this.cache = [];
}
Validator.prototype = {
    constructor: Validator,
    addRule: function (dom, rule, msg) {
        return validateStrategies[rule](dom.value, msg);
        //具体实现略....
    },
    start: function () {
        //遍历所有添加的校验规则,开始校验....
    }
}


/**
 *  总结: 在函数作为一等公民的语言中,策略模式是隐形的!策略对象就是值为函数的变量!!!
 * */