/***
 * 责任链模式: 使多个对象都有机会处理请求,从而避免请求的发送者和接收者之间的耦合关系,将这些对象组成一条链,
 * 并沿着这条链传递请求,直到有一个对象处理它为止。
 *
 * 最大优点: 请求者只需要知道链中的第一个节点,从而弱化发送者和一组接收者之间的强联系。
 * */

/***
 * 例子: 假设某个电商网站经过分别缴纳500元定金和200元定金的两轮预定后,进入到正式购买阶段。
 * 公司针对已付过定金的用户有一定优惠政策,已付500定金的用户将收到100元商城优惠券;已付200元定金的用户将收到50元优惠券;
 * 而未付定金的用户只能进入普通购买模式,并且库存有限的情况下不一定能买到。
 *
 * 购买页面是后端生成的模板,其中后端吐出了3个参数:
 * orderType:1,表示已付500定金; 2,表示200定金;3,表示普通购买者
 * pay:是否已经支付定金。如果用户是定金用户但实际未支付,则降级到普通用户购买
 * stock:库存。只针对普通购买者,已付定金的不受此限制。
 * */

//1. 新手写出来的代码! 不要使用!!!!!!!!!庞大臃肿,无法维护!!!!!
function order(orderType, pay, stock) {
    if (orderType === 1) {
        if (pay === true) {
            console.log('已付500定金,获得100优惠券');
        } else {
            if (stock > 0) {
                console.log('普通用户,无优惠券');
            } else {
                console.log('库存不足,购买失败');
            }
        }
    } else if (orderType === 2) {
        if (pay === true) {
            console.log('已付200定金,获得50优惠券');
        } else {
            if (stock > 0) {
                console.log('普通用户,无优惠券');
            } else {
                console.log('库存不足,购买失败');
            }
        }
    } else if (orderType === 3) {
        if (stock > 0) {
            console.log('普通用户,无优惠券');
        } else {
            console.log('库存不足,购买失败');
        }
    }
}

// order(1, true, 3);

//2. 使用责任链模式重构第一版
/***
 * 将500原定金、200元定金、普通购买分为3个函数,先将参数传递给500函数,如果不能处理则传递给200函数,
 * 如果还不能处理则传递给普通函数。
 * */
function order500(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('已付500定金,获的100优惠券');
    } else {
        order200(orderType, pay, stock);
    }
}

function order200(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('已付200定金,获的50优惠券');
    } else {
        orderNormal(orderType, pay, stock);
    }
}

function orderNormal(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通用户,无优惠券');
    } else {
        console.log('库存不足,购买失败');
    }
}

// order500(1, false, 200);
// order500(2, true, 200);


//3. 重构第二版
/**
 * 上述的重构不算好的重构,因为传递请求的代码被写死了,如果新增加几种情况就得深入去修改传递代码!!
 * 违反了"开放-封闭"原则!!!
 *
 * 下面实现灵活可拆分的责任链节点
 * */

//1.定义函数
function order_500(orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('已付500定金,获的100优惠券');
    } else {
        return 'next';  //不知道应该传递给谁,只知道应该往后传递
    }
}

function order_200(orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('已付200定金,获的50优惠券');
    } else {
        return 'next';
    }
}

function order_Normal(orderType, pay, stock) {
    if (stock > 0) {
        console.log('普通用户,无优惠券');
    } else {
        console.log('库存不足,购买失败');
    }
}

//2.定义责任链的节点
var Chain = function (fn) {
    this.fn = fn;
    this.next = null;
}

Chain.prototype.setNext = function (next) {
    return this.next = next;
}

Chain.prototype.passRequest = function () {
    var result = this.fn.apply(this, arguments);

    if (result === 'next') {
        return this.next && this.next.passRequest.apply(this.next, arguments);
    }

    return result;
}

//3.把函数包装进节点
var order500Node = new Chain(order_500);
var order200Node = new Chain(order_200);
var orderNormalNode = new Chain(order_Normal);
//4.设置节点顺序
order500Node.setNext(order200Node);
order200Node.setNext(orderNormalNode);
//5.调用
// order500Node.passRequest(1, false, 200);
// order500Node.passRequest(2, true, 200);
// order200Node.passRequest(2, false, 20);


/***
 * 4. js中使用AOP来实现责任链模式,最简洁的方法!!!
 * */
Function.prototype.after = function (afterFn) {
    var self = this;
    return function () {
        var result = self.apply(this, arguments);
        if (result === 'next') {
            return afterFn.apply(this, arguments);
        }

        return result;
    }
}

//设置链条!!!
var order = order_500.after(order_200).after(order_Normal);
order(1, false, 2);
order(2, true, 3);
