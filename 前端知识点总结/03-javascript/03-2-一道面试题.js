/**
 * 实现一个log函数,在控制台打印信息
 * log(msg)
 * */

//1.第一版
function log1(msg) {
    console.log(msg);
}
log1('message');

//2.第二版,传入多个参数?
function log2() {
    console.log.apply(console, arguments);
}
log2('hello', 'world');

//3.第三问: 在每句日志信息前面加上特定前缀,例如(app)?
function log() {
    var args = Array.prototype.slice.call(arguments);
    args.unshift('(app)');  //unshift从数组前端添加一个元素
    console.log.apply(console, args);
};
log('foo', 'bar');
log('nice log function');