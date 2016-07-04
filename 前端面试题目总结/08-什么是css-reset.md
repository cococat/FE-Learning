
#### 什么是CSS Reset。
```
HTML标签在浏览器中都有默认的样式，例如p标签有上下边距，strong标签有字体加粗样式等。
不同浏览器的默认样式之间存在差别，例如ul默认带有缩进样式，在IE下，它的缩进是由margin实现的，
而在Firefox下却是由padding实现的。开发时浏览器的默认样式可能会给我们带来多浏览器兼容性问题，
影响开发效率。现在很流行的解决方法是一开始就将浏览器的默认样式全部覆盖掉，这就是CSS reset。
```

```
部分CSS reset内容如下
html {color:#000;background:#FFF;}t5
body,div,dl,dt,dd,ul,ol,li,
h1,h2,h3,h4,h5,h6,
pre,code,form,fieldset,legend,
input,textarea,p,blockquote,th,td{margin:0;padding:0;}
table {border-collapse:collapse;border-spacing:0;}
fieldset,img {border:0;}
address,caption,cite,code,dfn,em,strong,th,var {font-style:normal;font-weight:normal;}
li {list-style:none;}
caption,th {text-align:left;}
h1,h2,h3,h4,h5,h6 {font-size:100%;font-weight:normal;}
q:before,q:after {content:'';}
abbr,acronym {border:0;font-variant:normal;}
sup {vertical-align:text-top;}
sub {vertical-align:text-bottom;}
input,textarea,select {font-family:inherit;font-size:inherit;font-weight:inherit;}
input,textarea,select {*font-size:100%;}
legend {color:#000;}
```