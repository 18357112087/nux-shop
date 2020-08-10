// client/pages/orderManage/orderManage.js
import {
  OrderModel
} from '../../models/OrdelModel.js'
//import { userInfo } from 'os';
let orderModel = new OrderModel();
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    ordersBusiness:[],
    isAdmin:false,
    currentTab:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getOrderListAll()

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this._init()
    wx.stopPullDownRefresh({
      success: (res) => {},
    })

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
   // tab切换
   clickTab: function (e) {
    const currentTab = e.currentTarget.dataset.current
    console.log(currentTab)
    this.setData({
      currentTab:currentTab
    })
  },

  getOrderListAll:function(event){
    // 获取订单信息
    orderModel.getOrderListAll(res => {
      console.log(res)
     this.setData({
      ordersBusiness: res.result.data.data
     })
   })
 },
 sendProduct:function(event){
   var that = this
  // console.log(event.currentTarget.dataset.id)
  // var orderData = event.currentTarget.dataset.id
  // delete orderData['_id']
  // orderData.order_status = 2
  // orderData.buyer_name = '李四'
  // orderModel.updateOrder(orderData, res => {
  //   console.log(res.result.data.stats)
  // })
  wx.cloud.callFunction({
    name:'update',
    data:{
      id:event.currentTarget.dataset.id
    },
    success:function(res){
      console.log(res)
      wx.showToast({
        title: '发货成功',
      })
      that.getOrderListAll()
    },
    fail:function(res){
      console.log(res)
    }
  })
 },
 
})