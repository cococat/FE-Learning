#### exports和module.exports的区别

        在浏览器端js里面，为了解决各模块变量冲突等问题，往往借助于js的闭包把所有模块相关的代码都包装在一个匿名函数里。
        而Node.js编写模块相当的自由，开发者只需要关注require，exports，module等几个变量就足够，
        而为了保持模块的可读性，很推荐把不同功能的代码块都写成独立模块，减少各模块耦合。
        开发者可以在“全局”环境下任意使用var申明变量（不用写到闭包里了），通过exports暴露接口给调用者。
        
        我们经常看到类似export.xxx = yyy或者module.exports = xx这样的代码，可实际在通过require函数引入模块时会出现报错的情况，
        这是什么原因导致的呢？


Node.js在模块编译的过程中会对模块进行包装，最终会返回类似下面的代码：

        (function (exports, require, module, __filename, __dirname) {
            // module code...
        });

其中，module就是这个模块本身，require是对Node.js实现查找模块的模块Module._load实例的引用，
__filename和__dirname是Node.js在查找该模块后找到的模块名称和模块绝对路径，这就是官方API里头这两个全局变量的来历。

关于module.exports与exorts的区别，了解了下面几点之后应该就完全明白：

模块内部大概是这样：
`
exports = module.exports = {};  
exports是module.exports的一个引用
`

        require引用模块后，返回给调用者的是module.exports而不是exports
        
        exports.xxx，相当于在导出对象上挂属性，该属性对调用模块直接可见
        
        exports =相当于给exports对象重新赋值，调用模块不能访问exports对象及其属性
        
        如果此模块是一个类，就应该直接赋值module.exports，这样调用者就是一个类构造器，可以直接new实例


假如有模块a.js代码如下：

        exports.str = 'a';  
        exports.fn = function() {};  
        对a模块的调用：

        var a = require('./a');  
        console.log(a.str);  
        console.log(a.fn());  
        
这样用是对的，如果改造a如下：

        exports.str = 'a';  
        exports = function fn() {};  
在调用a模块时自然没用fn属性了。

再改造下a模块：

        exports.str = 'a';  
        module.exports = function fn() {};  
这时a模块其实就是fn函数的引用，也就是说可以require('./a')()这样使用，而同时不再有str属性了。


下面直接导出一个类：

        module.exports = function A() {};  
        调用：
        
        var A = require('./a');  
        var a = new A();  
总结下，有两点：

1. 对于要导出的属性，可以简单直接挂到exports对象上

2. 对于类，为了直接使导出的内容作为类的构造器可以让调用者使用new操作符创建实例对象，
应该把构造函数挂到module.exports对象上，不要和导出属性值混在一起