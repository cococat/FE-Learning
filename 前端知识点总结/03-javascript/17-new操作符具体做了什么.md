#### new操作符具体干了什么呢?
```
   1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。

   2、属性和方法被加入到 this 引用的对象中。

   3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

var obj  = {};

obj.__proto__ = Base.prototype;

Base.call(obj);
```