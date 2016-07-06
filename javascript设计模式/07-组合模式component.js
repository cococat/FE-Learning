/**
 * 组合模式: 将对象组合成树形结构,以表示"部分-整体"的层次结构。
 * > 1.表示树形结构
 * > 2.利用多态性统一对待组合对象和单个对象
 *
 * 注意:
 * > 1.组合模式不是父子关系,而是HAS-A的关系
 * > 2.组合模式中组合对象和叶对象具有相同的对外接口
 * */


/***
 * 例子: 扫描文件夹。
 *
 * 文件夹里面既可以包含文件,也可以包含其他文件夹,最终可以组合成一棵树,这非常适合使用组合模式来实现。
 * */

// Folder类
var Folder = function (name) {
    this.name = name;
    this._fileList = [];

    // this.parent=null;  //在某些情况下可能从叶节点向根节点传递,可以增加一个指向父元素的指针
}

Folder.prototype.add = function (file) {
    this._fileList.push(file);
}

Folder.prototype.scan = function () {
    console.log('扫描文件夹::' + this.name + '...');
    for (var i = 0, l = this._fileList.length; i < l; i++) {
        var file = this._fileList[i];
        file.scan();
    }
}

//File类
var File = function (name) {
    this.name = name;
}

File.prototype.add = function (file) {   //叶子对象中不能实现的方法可以抛出错误来处理
    throw new Error('文件中不能添加新文件!');
}

File.prototype.scan = function () {
    console.log('扫描文件--' + this.name + '...');
}

//使用
var folder1 = new Folder('javascript资料');
var file1 = new File('javascript高级程序设计');
var file2 = new File('javascript设计模式');
var file3 = new File('javascript语言精粹');
folder1.add(file1);
folder1.add(file2);
folder1.add(file3);

var folder2 = new Folder('css资料');
var file4 = new File('精通css');
var file5 = new File('css权威指南');
folder2.add(file4);
folder2.add(file5);

var folder3 = new Folder('学习资料');
var file6 = new File('mongdodb权威指南');

folder3.add(folder1);
folder3.add(folder2);
folder3.add(file6);

folder3.scan();

// folder2.scan();