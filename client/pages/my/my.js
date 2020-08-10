// pages/my/my.js
import {
  OrderModel
} from '../../models/OrdelModel.js'
//import { userInfo } from 'os';
//import { userInfo } from 'os';
//import { userInfo } from 'os';
let orderModel = new OrderModel();
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    defaultImg: '../../images/my/header.png',
    orders: [],
    isBusiness:false,
    isBusinessName:"切换到订单管理",
    ordersBusiness:[],
    isAdmin:false,
    openid:'',
    admins:["oymTJ5SXBPmBj3cbxJuimG7DTYwg","oymTJ5dtOJqDDkMVfqAXtuUo8Egc","oymTJ5WO10N2BSfc_o_eLik6Etgo"],
    adminsNames:["Andy陈栋栋","一片小叶子"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //权限验证
    wx.getStorage({
      key: 'userInfo',
      success:(res)=>{
        console.log(res)
        this.setData({
          userInfo:res.data
        })
      }
    })
    wx.getStorage({
      key: 'openid',
      success:(res)=>{
        console.log(res)
        this.setData({
          openid:res.data
        })
      }
    })
    for(var admin in this.data.admins){
      if(this.data.openid==admin)
      this.setData({
        isAdmin:true
      })
    }
    
    
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._init();
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this
    wx.showNavigationBarLoading() //在标题栏中显示加载
    setTimeout(function () {
    that._init();
    // complete
    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
    }, 1000);

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 初始化
  _init: function () {
    var that = this
    wx.getSetting({
      success:(res)=> {
        if (res.authSetting['scope.userInfo']) {
          // 获取订单信息
          orderModel.getOrderList(res => {
            this.setData({
              orders: res.result.data.data
            })
          })

          // 获取用户信息  
          wx.getUserInfo({
            success: (res) =>{
             this.setData({
              userInfo:res.userInfo
             })
             wx.setStorage({
               data: res.userInfo,
               key: 'userInfo',
             })
             if(this.data.adminsNames.includes(res.userInfo.nickName)){
              console.log('isAdmin')
               that.setData({
              isAdmin :true
            })}
            else{
            console.log('not Admin')}
             }

            //  wx.cloud.callFunction({
            //   name: "login",
            //   data: {
                
            //   },
            //    success:function(result){
            //      console.log(result)
            //      wx.setStorage({
            //        data: result.result.openid,
            //        key: 'openid',
            //      })
            //      if(result.result.openid=="oymTJ5SXBPmBj3cbxJuimG7DTYwg"||result.result.openid=="oymTJ5dtOJqDDkMVfqAXtuUo8Egc"||result.result.openid=="oymTJ5WO10N2BSfc_o_eLik6Etgo"){
            //        that.setData({
            //          isAdmin :true
            //        })
            //      }

            //    }
            //  })
            
          })
        }
      }
    })
  },
  // 订单页面
  pay: function (event) {
    let id = orderModel.getDataSet(event, 'id')
    wx.navigateTo({
      url: '/pages/order/order?id=' + id
    })
  },
  //
  getOrderListAll:function(event){
     // 获取订单信息
     orderModel.getOrderListAll(res => {
       console.log(res)
      this.setData({
        orders: res.result.data.data
      })
    })
  },
  // 用户信息获取
  getuserinfo:function(event){
    // wx.cloud.callFunction({
    //   name: "login",
    //   data: {   
    //   },
    //    success:function(result){
    //      console.log(result)
    //      if(result.result.openid=="oymTJ5SXBPmBj3cbxJuimG7DTYwg"){
    //        that.setData({
    //          isAdmin :true
    //        })
    //      }
    //    }
    //  })
    var that = this 
     
    this.setData({
      userInfo:event.detail.userInfo
    })
    wx.setStorage({
      data: event.detail.userInfo,
      key: 'userInfo',
    })
    console.log(this.data.userInfo)
    
   
      if(this.data.adminsNames.includes(event.detail.userInfo.nickName)){
            console.log('isAdmin')
             that.setData({
            isAdmin :true
          })}
          else{
          console.log('not Admin')}
    
  },
    // tab切换
    clickTab: function (e) {
      const currentTab = e.currentTarget.dataset.current
      this.setData({
        currentTab
      })
    },

})