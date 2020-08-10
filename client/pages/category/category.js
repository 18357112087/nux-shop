// pages/category/category.js
import { CategoryModel } from '../../models/CategoryModel.js'
let category = new CategoryModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuCategories: [
                    { category_name:'面膜类（片状）',category_type:1},
                    { category_name: '面膜类（涂抹式）', category_type: 2 },
                    { category_name: '粉底液/气垫/BB', category_type: 3 },
                    { category_name: '卸妆类', category_type: 4 },
                    { category_name: '洗面奶类', category_type: 5 },
                    { category_name: '隔离/妆前乳', category_type: 6 },
                    { category_name: '单水乳', category_type: 7 },
                    { category_name: '套盒', category_type: 8 },
                    { category_name: '爽肤水/喷雾', category_type: 9 },
                    { category_name: '精华', category_type: 10 },
                    { category_name: '面霜/素颜霜', category_type: 11 },
                    { category_name: '眼霜', category_type: 12 },
                    { category_name: '粉饼/散粉', category_type: 13 },
                    { category_name: '眉笔/睫毛膏/眼线', category_type: 14 },
                    { category_name: '腮红/修容/遮瑕/高光', category_type: 15 },
                    { category_name: '眼影', category_type: 16 },
                    { category_name: '防晒', category_type: 17 },
                    { category_name: '唇部护理', category_type: 18 },
                    { category_name: '身体护理/洗护类', category_type: 19 },
                    { category_name: '眼部护理', category_type: 20 },
                    { category_name: '美妆工具/其他', category_type: 21 },
                    { category_name: '药膏/药制品', category_type: 22 },
                    { category_name: '保健品', category_type: 23 },
                    { category_name: '小样', category_type: 24 },
                    ],
    menuSelect:1,
    menuName:'',
    products:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._init()
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
  _init:function(){
    category.getCateGory(res=>{
      console.log(res.result)
      let menuCategories = res.result.data.data
      let menuSelect =  menuCategories[0].category_type
      let menuName = menuCategories[0].category_name
      this.setData({
        menuCategories,
        menuSelect,
        menuName       
      })
      this._getCateGory(menuSelect)
    })
   
  },
  // 菜单切换
  menu: function (event){
    let index = category.getDataSet(event, "index")
    let menuCategories = this.data.menuCategories
    let menuSelect = menuCategories[index].category_type
    let menuName = menuCategories[index].category_name
    this._getCateGory(menuSelect)
    this.setData({
      menuSelect,
      menuName
    })
  },
  // 跳转商品详情
  productDetails:function(e){
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + e.detail.productId,
    })
    
  },
  _getCateGory:function(type){
    var that = this
    category.getCateGoryProduct(type, data => {
      console.log(data.result.data)
      that.setData({
        products: data.result.data.data
      })
    })
  }
})