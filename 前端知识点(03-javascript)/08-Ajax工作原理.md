#### Ajax工作原理
 
```
   1.使用CSS和XHTML来表示。
   2. 使用DOM模型来交互和动态显示。
   3.使用XMLHttpRequest来和服务器进行异步通信。
   4.使用javascript来绑定和调用。
```
 
#### ajax原理和XmlHttpRequest对象
```
Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。
这其中最关键的一步就是从服务器获得请求数据。要清楚这个过程和原理，我们必须对 XMLHttpRequest有所了解。
XMLHttpRequest是ajax的核心机制，它是在IE5中首先引入的，是一种支持异步请求的技术。简单的说，也就是javascript可以及时向服务器提出请求和处理响应，
而不阻塞用户。达到无刷新的效果。
```


　首先，我们先来看看XMLHttpRequest这个对象的属性。
```
　　onreadystatechange  每次状态改变所触发事件的事件处理程序。
　　responseText     从服务器进程返回数据的字符串形式。
　　responseXML    从服务器进程返回的DOM兼容的文档数据对象。
　　status           从服务器返回的数字代码，比如常见的404（未找到）和200（已就绪）
　　status Text       伴随状态码的字符串信息
　　readyState       对象状态值
　　　　0 (未初始化) 对象已建立，但是尚未初始化（尚未调用open方法）
　　　　1 (初始化) 对象已建立，尚未调用send方法
　　　　2 (发送数据) send方法已调用，但是当前的状态及http头未知
　　　　3 (数据传送中) 已接收部分数据，因为响应及http头不全，这时通过responseBody和responseText获取部分数据会出现错误，
　　　　4 (完成) 数据接收完毕,此时可以通过通过responseXml和responseText获取完整的回应数据
```

但是，由于各浏览器之间存在差异，所以创建一个XMLHttpRequest对象可能需要不同的方法。这个差异主要体现在IE和其它浏览器之间。
下面是一个比较标准的创建XMLHttpRequest对象的方法。

```
function CreateXmlHttp() {

    //非IE浏览器创建XmlHttpRequest对象
    if (window.XmlHttpRequest) {
        xmlhttp = new XmlHttpRequest();
    }

    //IE浏览器创建XmlHttpRequest对象
    if (window.ActiveXObject) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
            try {
                xmlhttp = new ActiveXObject("msxml2.XMLHTTP");
            }
            catch (ex) { }
        }
    }
}
```

```
function ajax() {
    var data = document.getElementById("username").value;
    CreateXmlHttp();
    if (!xmlhttp) {
        alert("创建xmlhttp对象异常！");
        return false;
    }

    xmlhttp.open("POST", url, false);

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            document.getElementById("user1").innerHTML = "数据正在加载...";
            if (xmlhttp.status == 200) {
                document.write(xmlhttp.responseText);
            }
        }
    }
    xmlhttp.send();
}
```


如上所示，函数首先检查XMLHttpRequest的整体状态并且保证它已经完成（readyStatus=4），即数据已经发送完毕。
然后根据服务器的设定询问请求状态，如果一切已经就绪（status=200），那么就执行下面需要的操作。
对于XmlHttpRequest的两个方法，open和send,其中:

open方法指定了：
a、向服务器提交数据的类型，即post还是get。
b、请求的url地址和传递的参数。
c、传输方式，false为同步，true为异步。默认为true。如果是异步通信方式(true)，客户机就不等待服务器的响应；
如果是同步方式(false)，客户机就要等到服务器返回消息后才去执行其他操作。我们需要根据实际需要来指定同步方式，在某些页面中，
可能会发出多个请求，甚至是有组织有计划有队形大规模的高强度的request，而后一个是会覆盖前一个的，这个时候当然要指定同步方式。

Send方法用来发送请求。
 
```
知道了XMLHttpRequest的工作流程，我们可以看出，XMLHttpRequest是完全用来向服务器发出一个请求的，它的作用也局限于此，
但它的作用是整个ajax实现的关键，因为ajax无非是两个过程，发出请求和响应请求。并且它完全是一种客户端的技术。
而XMLHttpRequest正是处理了服务器端和客户端通信的问题所以才会如此的重要。
现在，我们对ajax的原理大概可以有一个了解了。我们可以把服务器端看成一个数据接口，它返回的是一个纯文本流，当然，这个文本流可以是XML格式，
可以是Html，可以是Javascript代码，也可以只是一个字符串。
这时候，XMLHttpRequest向服务器端请求这个页面，服务器端将文本的结果写入页面，这和普通的web开发流程是一样的，不同的是，
客户端在异步获取这个结果后，不是直接显示在页面，而是先由javascript来处理，然后再显示在页面。至于现在流行的很多ajax控件，
比如magicajax等，可以返回DataSet等其它数据类型，只是将这个过程封装了的结果，本质上他们并没有什么太大的区别。
```
 
#### ajax的优点
```
   Ajax的给我们带来的好处大家基本上都深有体会，在这里我只简单的讲几点：
    1、最大的一点是页面无刷新，在页面内与服务器通信，给用户的体验非常好。
　 2、使用异步方式与服务器通信，不需要打断用户的操作，具有更加迅速的响应能力。
　 3、可以把以前一些服务器负担的工作转嫁到客户端，利用客户端闲置的能力来处理，减轻服务器和带宽的负担，节约空间和宽带租用成本。并且减轻服务器的负担，ajax的原则是“按需取数据”，可以最大程度的减少冗余请求，和响应对服务器造成的负担。
    4、基于标准化的并被广泛支持的技术，不需要下载插件或者小程序。
```

#### ajax的缺点
```
　　下面所阐述的ajax的缺陷都是它先天所产生的。
   　1、ajax干掉了back按钮，即对浏览器后退机制的破坏。后退按钮是一个标准的web站点的重要功能，但是它没法和js进行很好的合作。
   这是ajax所带来的一个比较严重的问题，因为用户往往是希望能够通过后退来取消前一次操作的。那么对于这个问题有没有办法？
   答案是肯定的，用过Gmail的知道，Gmail下面采用的ajax技术解决了这个问题，在Gmail下面是可以后退的，但是，它也并不能改变ajax的机制，
   它只是采用的一个比较笨但是有效的办法，即用户单击后退按钮访问历史记录时，通过创建或使用一个隐藏的IFRAME来重现页面上的变更。
   （例如，当用户在Google Maps中单击后退时，它在一个隐藏的IFRAME中进行搜索，然后将搜索结果反映到Ajax元素上，以便将应用程序状态恢复到当时的状态。）
但是，虽然说这个问题是可以解决的，但是它所带来的开发成本是非常高的，和ajax框架所要求的快速开发是相背离的。这是ajax所带来的一个非常严重的问题。

     2、安全问题。技术同时也对IT企业带来了新的安全威胁，ajax技术就如同对企业数据建立了一个直接通道。这使得开发者在不经意间会暴露比以前更多的数据
     和服务器逻辑。ajax的逻辑可以对客户端的安全扫描技术隐藏起来，允许黑客从远端服务器上建立新的攻击。
     还有ajax也难以避免一些已知的安全弱点，诸如跨站点脚步攻击、SQL注入攻击和基于credentials的安全漏洞等。
     
     3、对搜索引擎的支持比较弱。
     
     4、破坏了程序的异常机制。至少从目前看来，像ajax.dll，ajaxpro.dll这些ajax框架是会破坏程序的异常机制的。
     
     5、另外，像其他方面的一些问题，比如说违背了url和资源定位的初衷。
     例如，我给你一个url地址，如果采用了ajax技术，也许你在该url地址下面看到的和我在这个url地址下看到的内容是不同的。这个和资源定位的初衷是相背离的。
     
     6、一些手持设备（如手机、PDA等）现在还不能很好的支持ajax，比如说我们在手机的浏览器上打开采用ajax技术的网站时，
     它目前是不支持的，当然，这个问题和我们没太多关系。
```
 