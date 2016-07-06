```
jquery中$(document).ready()的作用类似于传统JavaScript中的window.onload方法，
不过与window.onload方法还是有区别的。
```

#### 1.执行时间 
```
window.onload必须等到页面内包括图片的所有元素加载完毕后才能执行。 
$(document).ready()是DOM结构绘制完毕后就执行，不必等到加载完毕。 
```

#### 2.编写个数不同 
```
window.onload不能同时编写多个，如果有多个window.onload方法，只会执行一个 
$(document).ready()可以同时编写多个，并且都可以得到执行 
```

#### 3.简化写法(针对jquery)
```
window.onload没有简化写法 
$(document).ready(function(){})可以简写成$(function(){});
```