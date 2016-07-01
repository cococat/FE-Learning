/***
 * 代理模式: 为某个对象提供一个代用品或占位符,以便控制对它的访问。
 * 1. 代理对象收到请求,做出一些处理后,再决定是否将请求转发给本体对象。
 * 2. 代理对象与本体对象具有一致的对外方法,所以客户端的访问是透明性的。
 *
 *
 * 保护代理: 控制对本体对象的访问。
 * 虚拟代理: 把一些开销很大的对象,延迟到真正需要的时候才去创建。(js中最常使用的方式)
 * */

/**
 * 例子1: 虚拟代理实现图片的预加载
 * */
//本体对象
/*var myImage = (function () {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);

    return {
        setSrc: function (src) {
            imgNode.src = src;
        }
    }
})();
// myImage.setSrc("http://images/xxxx.jpg");

//代理对象
var proxyImage = (function () {
    var img = document.createElement('img');
    img.onload = function () {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function (src) {
            myImage.setSrc('本地loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('http://xxxxx.jpg');*/


/***
 * 例子2: 虚拟代理合并HTTP请求
 * */


/***
 * 例子3: 缓存代理
 * */
var multiply = function () {
    console.log('开始计算...');
    var result = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
        result *= arguments[i];
    }
    return result;
}

//两个参数一样,但是每次都会执行
console.log(multiply(1, 2, 3));
console.log(multiply(1, 2, 3));

var proxyMultiply=(function(){
    var cache={};
    return function(){
        var key=[].join.call(arguments,',');
        if(key in cache){
            return cache[key];
        }else{
            return cache[key]=multiply.apply(this,arguments);
        }
    }
})();
//下面两个只会执行一次
console.log(proxyMultiply(1,2,3));
console.log(proxyMultiply(1,2,3));
