//app.js
const app = getApp()
App({
  globalData:{
    isAdmin:false,
    userInfo:null,
    env:'',
    openid: '',
    
  },

  
  // 随机数生成函数
  RndNum: function(){
    return Math.random().toString(32).substr(2, 15);
  },
  onLaunch: function () {
    
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
     // wx.cloud.init({
     //   env: 'release-prod',
     //   traceUser: true
     // })
	  wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
      // wx.cloud.callFunction({
      //   name: "login",
      //   data: {  
      //   },
      //    success:function(result){
      //      console.log(result)
      //      if(result.result.openid="oymTJ5SXBPmBj3cbxJuimG7DTYwg"){
      //        app.globalData.isAdmin = true
      //      }
      //      console.log(app.globalData.isBusiness)
      //    },
      //    fail:function(error){console.log(error)}
         
      //  })
    }

    
  }
})
