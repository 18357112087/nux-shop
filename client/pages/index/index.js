// pages/index/index.js
import {MenueCategories} from "../../utils/menuCategories.js"
let menuCategories = new MenueCategories()
const db = wx.cloud.database()
import { IndexModel } from "../../models/IndexModel.js"
let indexModel = new IndexModel()
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //自动轮播
    interval: 3000, // 自动切换时间间隔
    duration: 1000, // 滑动动画时长
    circular: true,//是否采用衔接滑动 
    themes: [
      { theme_icon: 'images/theme@1.png', theme_name: '新品上市', theme_type: 1 },
      { theme_icon: 'images/theme@2.png', theme_name: '精品推荐', theme_type: 2 },
      { theme_icon: 'images/theme@3.png', theme_name: '店主挑选', theme_type: 3 },
      { theme_icon: 'images/theme@4.png', theme_name: '优质推荐', theme_type: 4 },
    ],
    banners: [],
    isBusiness:false,
    products: [
    //   {
    //   _id: "5cf526aaa87a1a18b6624ae6",
    //   product_description: "",
    //   product_img: "cloud://release-prod.7265-release-prod/product/product-nux@1.png",
    //   product_name: "花生 300g",
    //   product_price: 0.1,
    //   product_sell_price: 0.1,
    //   product_stock: 100
    // },
    // {
    //   _id: "5cf526aaa87a1a18b6624ae8",
    //   product_description: "",
    //   product_img: "cloud://release-prod.7265-release-prod/product/product-nux@2.png",
    //   product_name: "夏威夷果 120g",
    //   product_price: 0.1,
    //   product_sell_price: 0.1,
    //   product_stock: 100
    // },
    // {
    //   _id: "5cf526aaa87a1a18b6624aea",
    //   product_description: "",
    //   product_img: "cloud://release-prod.7265-release-prod/product/product-nux@3.png",
    //   product_name: "杏仁 120g",
    //   product_price: 0.1,
    //   product_sell_price: 0.1,
    //   product_stock: 100
    // },
    // {
    //   _id: "5cf526aaa87a1a18b6624aec",
    //   product_description: "",
    //   product_img: "cloud://release-prod.7265-release-prod/product/product-nux@4.png",
    //   product_name: "黑桃 180g",
    //   product_price: 0.1,
    //   product_sell_price: 0.1,
    //   product_stock: 100
    // }
]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log (menuCategories.getCategoryType("面膜类（片状）"))
    var arr = "123456";

    console.log(arr.slice(1,4));

    this._init()
    var that = this
   
      
    // db.collection('product')
    // .get().then(product => {
    //   console.log(product.data)
    //   that.setData({
    //     products: product.data
    //   })
    // })
    // db.collection('banner')
    // .get().then(banner => {
    //   console.log(banner)
    //   that.setData({
    //     banners: banner.data
    //   })
    // })
    
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
    this._init()

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  themeNavigation: function (event) {
    let theme_type = indexModel.getDataSet(event, "themetype")
    wx.navigateTo({
      url: '../theme/theme?theme_type=' + theme_type,
    })
  },
  _init: function () {
    //轮播图
    indexModel.getBanner(res => {
      //console.log(res)
      this.setData({
        banners: res.result.data.data
      })
    })
    // 主题
    indexModel.getTheme(res => {
      //console.log(res)
      this.setData({
        themes: res.result.data.data
      })
    })
    // 最新商品
    indexModel.getProductNew(res => {
      //console.log(res)
      //console.log(res.result.data.data)
      this.setData({
        products: res.result.data.data
      })
    })
  },
  // 跳转商品详情
  productDetails: function (event) {
    this._navProductDetail(event.detail.productId)
  },
  productBanner: function (event) {
    console.log(event)
    let product_id = indexModel.getDataSet(event, "productid")
    this._navProductDetail(product_id)
  },
  // 跳转详情
  _navProductDetail: function (product_id) {
    wx.navigateTo({
      url: '/pages/product/product?product_id=' + product_id,
    })
  }
})