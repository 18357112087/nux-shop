// components/product-column/index.js
let productBehavior = require('../behaviors/product-behavior.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    

  },
  behaviors: [productBehavior],
  /**
   * 组件的初始数据
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
      ]

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
