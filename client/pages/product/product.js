// pages/product/product.js
import {  ProductModel } from '../../models/ProductModel.js'
import { CartModel } from '../../models/CartModel.js'
let productModel = new ProductModel()
let cartmodel = new CartModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,      // tab选项卡
    product:{'product_img':'../../images/temp/category.png'}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product_id = options.product_id
    this._init(product_id)
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
  // 详情和参数切换
  clickTab: function (e) {
    const currentTab = e.currentTarget.dataset.current
    this.setData({
      currentTab
    })
  },
  _init:function(product_id){
    var that = this
    // 获取商品信息
    productModel.getProductById(product_id,res=>{
      console.log(res)
      // res.result.data.data.forEach(temp=>{
      //   console.log(temp)
      //   temp.product_img = temp.product_img.replace("cloud://release-prod.7265-release-prod","")
      //   console.log(temp)
      // })
      res.result.data.data.product_img = res.result.data.data.product_img.replace("cloud://release-prod.7265-release-prod","")
      that.setData({
        product:res.result.data.data
      })
      
      console.log('product img',that.data.product.product_img)
    })
  },
  // 购物车
  goCart:function(){   
    wx.switchTab({    
      url: '/pages/cart/cart',
    })
  },
  // 回到首页
  goHome:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  // 关注
  focus:function(e){
      wx.showToast({
        icon: 'none',
        title: '暂未开通'
      })
  },
  // 添加到购物车
  joinCart:function(){
    cartmodel.add(this.data.product,1,res=>{
      wx.showToast({
        icon:"success",
        context:"添加成功"
      })
    })
  },
  // 立即购买
  immediately:function(){
    // 数量默认为1
    let count = 1
    wx.navigateTo({
      url: '../order/order?count=' + count + '&productId='+this.data.product._id+ '&from=product'
    });
  }
})