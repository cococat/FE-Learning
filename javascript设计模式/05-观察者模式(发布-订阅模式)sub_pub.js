/***
 * 发布订阅模式
 *
 * 1. 广泛应用于异步编程,是一种代替回调函数的方案
 * 2. 取代对象之间硬编码的通知机制,一个对象不用再显式调用另一个对象的接口。这样可以消除对象之间的耦合。
 * */

// 模拟实现一个简单的发布-订阅模块
var Events = function () {
    this.clients = [];
}

Events.prototype = {
    constructor: Events,

    on: function (event, callback) {
        var obj = {
            event: event,
            callback: callback
        };
        this.clients.push(obj);
    },

    emit: function (event) {
        for (var i = 0, l = this.clients.length; i < l; i++) {
            var obj = this.clients[i];
            if (obj.event === event) {
                obj.callback.apply(this, arguments);
            }
        }
    },

    remove: function () {
        //移除订阅...
    }
}

//继承Events模块
var Person = function () {
};
Person.prototype = new Events();


//使用"订阅-发布"功能
var p = new Person();
p.on('ring', function () {
    console.log('下课了!!!');
});

p.on('haha', function () {
    console.log('哈哈哈哈...');
    // console.log(arguments);
    console.log(Array.prototype.slice.call(arguments, 1));
})

p.emit('ring');
p.emit('haha', {param1: '参数1', param2: '参数2'});


/***
 * 必须要先订阅再发布吗???
 *
 * 如何做到先发布,再订阅?
 * 要做到这一点,需要建立一个存放离线事件的栈(或队列),当事件发布时,如果还没有订阅者,则先把发布事件的动作包裹在一个函数里,
 * 这些包裹函数将被存入堆栈(或队列),等到有订阅者来订阅时,就遍历堆栈来依次执行这些函数,也就是重新发布里面的事件。
 * */

/***
 * 发布-订阅模式的优点总结:
 * 1. 对象间解耦
 * 2. 时间上解耦
 * 3. 可以用于帮助完成一些其他的设计模式,例如中介者模式
 * 4. 从架构上看,无论是MVC还是MVVM,都离不开发布-订阅模式的参与,并且js本身是一种基于事件驱动的语言
 * */