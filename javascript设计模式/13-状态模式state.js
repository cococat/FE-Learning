/***
 * 状态模式: 把事物的每种状态都封装成单独的类,跟此种状态有关的行为都封装在这个类的内部。
 *
 * 状态模式是一种非常优秀的模式!!!
 * 它不是那么一目了然,而且会带来代码量的增加,但是弄懂它会带来无与伦比的好处!!!
 * */

/**
 * 例子: 电灯。
 * 亮的状态下按下开关则变暗,暗的状态下按下开关则变亮。
 * */
var Light = function (state) {
    this.state = 'off';
}

Light.prototype.buttonPress = function () {
    if (this.state === 'off') {
        console.log('开灯');
        this.state = 'on';
    } else if (this.state === 'on') {
        console.log('关灯');
        this.state = 'off';
    }
}

var l = new Light();
l.buttonPress();
l.buttonPress();
l.buttonPress();
l.buttonPress();

/**
 * 但是,世界上的电灯并不只有开关两种状态。还可能有强光,弱光,红光,黄光,绿光......
 * 如果每增加一个状态就去修改Light类,显示违反了开闭原则!!!
 * */
/**
 * 使用状态模式重构代码
 * */