//云开发实现支付
const cloud = require('wx-server-sdk')
cloud.init();

//1，引入支付的三方依赖
const tenpay = require('tenpay');
//2，配置支付信息
const config = {
    appid: 'wx1f79f1ed951a8f0a', //
    mchid: '1577726501', //
    partnerKey: 'YFcjbergdjad0cgc4n1VAyzktcfKullL', //
    notify_url: 'https://mp.weixin.qq.com', //支付回调网址,这里可以先随意填一个网址
    spbill_create_ip: '127.0.0.1'
};

exports.main =  (event, context) => {
    const wxContext = cloud.getWXContext()
    let {
        orderid,
        money
    } = event;
    console.log(event)
    console.log(orderid)
    console.log(money)
    //3，初始化支付
    // const api = tenpay.init(config);
    // 调试模式(传入第二个参数为true, 可在控制台输出数据)
    const api = new tenpay(config, true);
console.log(wxContext.OPENID)
    let result = api.getPayParams({
        out_trade_no: orderid,
        body: 'aaaaa',
        total_fee: money, //订单金额(分),
         openid: wxContext.OPENID //付款用户的openid
        // openid:'o1UP-417R4DheVKT-KFxDHcX8iS0'
    });
    return result;
}