// miniprogram/pages/bgInfo/bgInfo.js
import {MenueCategories} from "../../utils/menuCategories.js"
let menuCategories = new MenueCategories()
const app = getApp()
// import DatabaseService from '../../api/DataBaseService.js'
// import CartService from '../../api/CartService.js'
// const Time = require('../../class/utils/Time.js')
// const databaseService = new DatabaseService()
// const cartService = new CartService()
const db = wx.cloud.database()
import { IndexModel } from "../../models/IndexModel.js"
let indexModel = new IndexModel()
import { ProductModel } from '../../models/ProductModel'
let productModel = new ProductModel()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    menu:[],
    onlineProducts:[],
    offlineProducts:[],
    menuCategories: menuCategories.menuCategories,
    fruitInfo: {},
    tmpUrlArr: [],
    delfruitID: "",
    cardNum: 2,
    files: [],
    time:0,
    manageList:[], //管理页面信息列表

    // 上传的信息
    product_id:'000', //水果编号
    product_name:'a',    //水果名称
    price:0,   //价格
    unit:'个',    //单位
    detail:"a",    //描述
    category_type:0,
    product_img:"",
    myClass:0,    //今日特惠
    recommend:0,  //店主推荐
    onShow:true,  //上架
    product_status:0,
    product_stock:0,
    product_sell_price:0,


    myClass_Arr: [
      '否',
      '是'
    ],
    recommend_Arr: [
      '否',
      '是'
    ],
    reFresh:null
  },

  //------------------------!!! 获取信息 !!!------------------------
  // 获取水果编号
  getProductID: function (e) {
    this.setData({
      product_id: e.detail.value
    })
  },

  // 获取商品名称
  getName: function (e) {
    this.setData({
      product_name: e.detail.value
    })
  },

  // 获取价格
  getPrice: function (e) {
    this.setData({
      price: e.detail.value
    })
  },
   // 获取售卖价格
   getSellPrice: function (e) {
    this.setData({
      product_sell_price: e.detail.value
    })
  },

  // 获取单位
  getUnit: function (e) {
    this.setData({
      unit: e.detail.value
    })
  },
  getCategoryType:function(e){
    console.log(e.detail.value)
    this.setData({
      category_type: parseInt(e.detail.value)+1
    })
    console.log(this.data.category_type)
  },
  getProductStock:function(e){
    console.log(e.detail.value)
    this.setData({
      product_stock:e.detail.value
    })
  },
  

  //选择照片并预览（预览地址在files，上传后的地址在tmpUrlArr）
  chooseImage: function (e) {
    var that = this;
    //判断商品类型是否为空
    console.log(this.data.category_type)
    console.log(this.data.product_name)
    if(that.data.category_type&&that.data.product_name){
     wx.chooseImage({
      success: function (res) {
        console.log(res)
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
          //选择图片后可以在这里上传
          //获取格式
          var format = res.tempFilePaths[0].slice(res.tempFilePaths[0].length-3,res.tempFilePaths[0].length)
          wx.cloud.uploadFile({
            cloudPath: "product/" + menuCategories.getCategoryName(that.data.category_type)+"/"+that.data.product_name+'.'+format,//云储存的路径及文件名
            filePath : res.tempFilePaths[0], //要上传的图片/文件路径 这里使用的是选择图片返回的临时地址
            success : (uploadres) => { //上传图片到云储存成功
              console.log(uploadres)
              //截取文件的路径
              var temp = uploadres.fileID.slice(49)
              console.log(temp)
              that.setData({
                product_img:temp
              })
              //console.log(uploadres)
              wx.showLoading({ //显示加载提示框 不会自动关闭 只能wx.hideLoading关闭
                title : "图片上传中", //提示框显示的提示信息
                mask : true, //显示透明蒙层，防止触摸。为true提示的时候不可以对屏幕进行操作，不写或为false时可以操作屏幕
                success : function () {
                    wx.hideLoading() //让提示框隐藏、消失
                }
              });
            },
            fail : (err) => {
              console.log(err)
            }
          })
       // console.log(res.tempFilePaths)
        // databaseService.upToClound("petFood", that.data.name + Math.random().toString(), 
        // res.tempFilePaths["0"], tmpUrl => {
        //    console.log(tmpUrl)
        //   that.data.tmpUrlArr.push(tmpUrl)
        //   // console.log(getCurrentPages())
        // })
      }
    })
   }
   else{
     wx.showToast({
       title: '请先选择商品类型和填写商品名称',
     })
   }
    // console.log(getCurrentPages())
  },

  //预览图片
  previewImage: function (e) {
    var that = this
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: that.data.tmpUrlArr // 需要预览的图片http链接列表
    })
  },

  //水果详细信息
  getInfoText: function (e) {
    var that = this
    that.setData({

    })
    this.data.detail = e.detail.value;
  },

  // 今日特惠
  getMyClass: function (e) {
    var that = this
    this.setData({
      myClass: e.detail.value.toString()
    })
  },

  // 店主推荐
  getRecommend: function (e) {
    var that = this
    this.setData({
      recommend: e.detail.value.toString()
    })
  },

  // --------------------!!!  选项卡切换  !!!----------------------
  tapTo1: function() {  //添加
    var that = this
    that.setData({
      cardNum: 1
    })
  },
  tapTo2: function () { //修改和删除
    var that = this
    that.setData({
      cardNum: 2
    })
    // console.log(getCurrentPages())
  }, 
  tapTo3: function () {
    var that = this
    that.setData({
      cardNum: 3
    })
  },

  // ----------------------!!!  提交操作  !!!---------------------
  // 添加水果信息表单
  addProductInfo: function(e){
     

    const that = this
    if (that.data.product_name && that.data.price){
      new Promise((resolve, reject) => {
        const { product_id, product_name, price, unit, detail, myClass, recommend, tmpUrlArr, onShow } = that.data
        const theInfo = { product_id, product_name, price, unit, detail, myClass, recommend, tmpUrlArr, onShow }
        theInfo['imgUrl'] = that.data.tmpUrlArr[0]
        // theInfo['time'] = parseInt(Time.CurrentTime())
        resolve(theInfo)
      }).then(theInfo => {
        // 创建产品数据
     let productData = {}
     productData.category_type = this.data.category_type
     productData.product_description = this.data.detail
     productData.product_id = this.data.product_id
     console.log(this.data.product_id)
     productData.product_img = this.data.product_img
     productData.product_name = this.data.product_name
     productData.product_price = this.data.price
     productData.product_sell_price = this.data.product_sell_price
     productData.product_status = this.data.product_status
     productData.product_stock = this.data.product_stock
     console.log(productData)

     // 创建订单
     productModel.create(productData, res => {
       console.log(res)
       if (res.result.code == 0) {
         wx.showToast({
           title: '商品创建成功',
         })
          //     订单编号返回
         console.log(res)
         var temp = res
         console.log(temp.result.data._id)
     

       }
     })


      })
  
    }
    else{
      wx.showToast({
        title: '信息不完全',
      })
    }
    
  },

  // ----------------------!!!  修改水果参数  !!!----------------------
  // 上架水果
  upToLine:function(e){
    var that = this
    // console.log(e.currentTarget.id)
    databaseService.updateInfo('products', e.currentTarget.id,{
      onShow: true
    },e=>{
      that.getManageList()
      wx.showToast({
        title: '已上架',
      })
    })
  },

  // 下架水果
  downFromLine: function (e) {
    var that = this
    // console.log(e.currentTarget.id)
    databaseService.updateInfo('products', e.currentTarget.id, {
      onShow: false
    }, e => {
      that.getManageList()
      wx.showToast({
        title: '已下架',
      })
    })
  },

  // 绑定删除水果名称参数
  getDelfruitID: function(e) {
    var that = this
    databaseService.getInfoWhere('products',{
      product_name: e.detail.value
    },res=>{
      that.setData({
        delfruitID: res.data["0"]._id
      })
    })
  },

  // 删除水果
  deleteFruit: function() {
    // app.deleteInfoFromSet('products',"葡萄")
    var that = this
    console.log(that.data.delfruitID)
    new Promise((resolve,reject)=>{
      databaseService.deleteInfoFromSet('products', that.data.delfriutID)
    })
    .then(that.getManageList())
  },

  // 程序下线打烊
  offLine: function () {
    var that = this
    databaseService.getInfoWhere('setting', {
      option: "offLine"
    }, res => {
      console.log(res)
      var tmp = this.stringArrayToJSONArray(res.result.data)
      // tmp is array.默认第一个，有待修改根据shopId
      console.log(tmp)
      let ch = !tmp[0].offLine
      console.log(ch)
      databaseService.updateInfo('setting', tmp[0]._id,{
        offLine: ch
      },e=>{
        wx.showToast({
          title: '操作成功',
        })
      })
      // console.log(res)
    })
  },

  //将string array 转换成JSON arrau
  stringArrayToJSONArray(array) {
    var jsonArray = []
    for (var i = 0; i < array.length; i++) {
      jsonArray.push(JSON.parse(array[i]))
    }
    return jsonArray
  },
  /**
   * ----------------------!!!  生命周期函数--监听页面加载  !!!----------------------
   */
  
  _init:function(){
    console.log('aa')
    // 最新商品
    indexModel.getProductNew(res => {
      console.log(res)
      var arr1=[]
      var arr2 = []
      //console.log(res.result.data.data)
      res.result.data.data.forEach(function(product){
        if(product.product_status==0){
          arr1.push(product)
        }
        if(product.product_status==1)
        {
          arr2.push(product)
        }
      })
      this.setData({
        onlineProducts:arr1,
        offlineProducts:arr2
      })
       
    })

  },

  onLoad: function (options) {
    
    this._init()
    // 对象转成数组方式二
    var arr = []
    for (let key in this.data.menuCategories) {
      // 每遍历一次，就创建一个字典对象
      let dict = {};
      // key分别为未开工、已开工、进行中、已完成。不是0，1，2,3
      arr.push(this.data.menuCategories[key].category_name);
    }
    this.setData({
      menu:arr
    })
    console.log(this.data.menu);
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
    //this.getManageList()
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
    // (timer = setTimeout(function () {
    //   wx.stopPullDownRefresh()
    // }, 500));
    this._init()
    wx.stopPullDownRefresh()

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
  // 跳转商品详情
  productDetails: function (event) {
    this._navProductDetail(event.detail.productId)
  },
  productBanner: function (event) {
    let product_id = indexModel.getDataSet(event, "productid")
    this._navProductDetail(product_id)
  },
  // 跳转详情
  _navProductDetail: function (product_id) {
    wx.navigateTo({
      url: '/pages/productEditDetail/productEditDetail?product_id=' + product_id,
    })
  },
  onlineOffline:function(event){
    console.log(event.detail.productId)
    console.log(event)
    var status = event.detail.product_status
    console.log(status)
    if(status==1){
      status--
      console.log(status)
    }
    else if(status==0){
      status++
      console.log(status)
    }
    wx.cloud.callFunction({
      name:'updateProduct',
      data:{
        id:event.detail.productId,
        product_status:status
      },
      success:res=>this._init()
    })
  }

})