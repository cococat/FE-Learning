/***
 * 命令模式以一种松耦合的方式来设计程序,使得请求的发送者和接受者能够消除彼此的耦合关系。
 * 另外,相对于过程化的调用,命令对象具有更长的生命周期。
 * 除此之外,命令模式还支持撤销、排队等操作。
 *
 * javascript使用高阶函数可以很方便的实现命令模式,命令模式在javascript中是一种隐形模式。
 * */

/***
 * 例子1: 假设在一个GUI程序的开发中,一个程序员负责绘制按钮,另一个程序员负责实现按钮的功能,
 * 最后来设置哪个按钮需要完成哪个功能,但是开发时并不知道某个按钮具体是做什么功能的,所以需要用一种松耦合的方式来开发程序。
 *
 * 以下是传统的面向对象的命令模式的实现,但在javascript中一般不这样做!!
 * */
//1. Buttons
var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');

//2. 按钮的功能实现
var buttonAdd = {
    add: function () {
        //新增文件
    }
}

var buttonRefresh = {
    refresh: function () {
        //刷新操作
    }
}

var deleteButton = {
    del: function () {
        //删除
    }
}

//3. 将操作封装到命令对象
var AddCommand = function (receiver) {
    this.receiver = receiver;
}
AddCommand.prototype.execute = function () {
    this.receiver.add();
}

var RefreshCommand = function (receiver) {
    this.receiver = receiver;
}
RefreshCommand.prototype.execute = function () {
    this.receiver.refresh();
}

//4. 提供一个方法用于给按钮设置命令
var setCommand = function (button, command) {
    button.onclick = function () {
        command.execute();
    }
}

//5. 安装命令
var addCommand = new AddCommand(buttonAdd);
var refreshCommand = new RefreshCommand(buttonRefresh);
setCommand(button1, addCommand);
setCommand(button2, refreshCommand);


/***
 * 例子2: 命令模式将过程式的方法调用封装在命令对新的execute方法中,而在javascript中,函数也是对象,
 * 所以同策略模式一样,我们不需要复杂的对象来封装操作,可以封装在普通函数中。函数作为一等公民,本身就可以被四处传递!!!
 * */
var RefreshCommand = function (receiver) {
    return {
        execute: function () {
            receiver.refresh();
        }
    }
}

var setCommand = function (button, command) {
    button.onclick = function () {
        command.execute();
    }
}

var refreshCmd = RefreshCommand(buttonRefresh);
setCommand(button1, refreshCmd);


/***
 * 撤销操作
 *
 * 在命令对象中添加一个undo方法,在该方法中记录execute的反向操作
 * **/