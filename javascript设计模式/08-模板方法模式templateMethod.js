/***
 * 模板方法:是一种基于继承的设计模式。
 *
 * 在javascript开发中用到继承的场景其实并不多,很多时候使用mix-in的方式扩展对象。
 * 但这不代表继承没有用武之地,虽然没有真正的类继承机制,但是可以通过原型变相实现继承。
 *
 * 模板方法模式由两个部分组成:
 * 1. 抽象父类(抽象父类提供抽象方法,不能被实例化)
 * 2. 具体的实现子类。
 *
 * 其中,父类封装了算法框架,包括方法及其执行顺序!子类继承整个算法结构,也可以选择重写父类方法。
 * */

/***
 * 模板方法模式的使用场景:
 * 1. 大的方面讲,常被架构师用来搭建整个项目的骨架,然后开发者有选择的实现方法(例如HttpServlet类)
 * 2. 小的方面讲,web开发中很多场景都能用到,例如构建一系列UI主组件,过程一般如下:
 *  > 初始化容器
 *  > ajax请求获取数据
 *  > 把数据渲染到div容器
 *  > 通知用户组件渲染完毕
 * */


/***
 * 例子: 泡茶喝泡咖啡
 *
 * 泡咖啡步骤:
 * 1. 把水煮沸
 * 2. 用沸水泡咖啡
 * 3. 把咖啡倒进杯子
 * 4. 加糖或加牛奶
 *
 * 泡茶的步骤:
 * 1. 把水煮沸
 * 2. 用沸水泡茶叶
 * 3. 把茶水倒进杯子
 * 4. 加柠檬
 *
 * 可以看到,两个算法个数和步骤都一致,只是原料不同,所以可以抽取为共同父类Beverage(饮料类)
 * */

//1. 父类
function Beverage() {
};

Beverage.prototype.boilWater = function () {
    console.log('把水煮沸...');
}

/**
 * 在静态语言中,编译器错误会保证开发者实现抽象父类的抽象方法。
 * 但在js中,无法保证。可以通过在抽象方法中抛出异常来得到运行时错误!!!实现简单,缺憾是得到错误信息的时间靠后。
 * */
Beverage.prototype.brew = function () {  //由具体子类重写
    throw new Error('子类应该重写该方法-brew');
}

Beverage.prototype.pourIntoCup = function () {  //由具体子类重写
    throw new Error('子类应该重写该方法-pourIntoCup');
}

Beverage.prototype.addCondiments = function () {  //由具体子类重写
    throw new Error('子类应该重写该方法-addCondiments');
}

/**
 * 可以在父类放置钩子方法,提供默认实现,让子类有选择性的复写,从而实现某些控制
 * */
Beverage.prototype.needToAddCondiments = function () {
    return true;
}

//封装算法框架和执行顺序,该方法即模板方法!!!
Beverage.prototype.init = function () {
    this.boilWater();
    this.brew();
    this.pourIntoCup();
    if (this.needToAddCondiments()) {
        this.addCondiments();
    }
}

//2. 子类-咖啡类
function Coffee() {
};
Coffee.prototype = new Beverage(); //继承父类
Coffee.prototype.brew = function () {
    console.log('用水泡咖啡...');
}
Coffee.prototype.pourIntoCup = function () {
    console.log('把咖啡倒进杯子...');
}
Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶...');
}

//3. 子类-茶
function Tea() {
};
Tea.prototype = new Beverage(); //继承父类
Tea.prototype.brew = function () {
    console.log('用水泡茶...');
}
Tea.prototype.pourIntoCup = function () {
    console.log('把茶倒进杯子...');
}
Tea.prototype.addCondiments = function () {
    console.log('加柠檬...');
}
Tea.prototype.needToAddCondiments = function () {
    return false;  //泡茶时不加调料
}


/**
 * 使用
 * */
var c = new Coffee();
c.init();

console.log('---------------------------------');

var t = new Tea();
t.init();

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

/**
 * javascript中,不需要按照静态语言那样依葫芦画瓢去实现模板方法,
 * 使用高阶函数来实现模板方法模式更简洁!!!!
 * */

var Beverage = function (param) {
    var boilWater = function () {
        console.log('把水煮沸...');
    };

    var brew = param.brew || function () {
            throw new Error('必须实现brew方法');
        };

    var pourIntoCup = param.pourIntoCup || function () {
            throw new Error('必须实现pourIntoCup方法');
        };

    var addCondiments = param.addCondiments || function () {
            throw new Error('必须实现addCondiments方法');
        };

    var F = function () {
    };
    F.prototype.init = function () {
        boilWater();
        brew();
        pourIntoCup();
        addCondiments();
    }

    return F;
}

var Coffee = Beverage({
    brew: function () {
        //....
    },
    pourIntoCup: function () {
        //...
    },
    addCondiments: function () {
        //...
    }
});

var f = new Coffee();
f.init();