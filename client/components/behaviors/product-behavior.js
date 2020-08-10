module.exports = Behavior({
  behaviors: [],
  properties: {
    product: { // 属性名
      type: Object,
      value: '', // 属性初始值（可选），如果未指定则会根据类型选择一个
      observer: function (product) {
      }
    },
    
    
  },
  methods: {
    // 商品详情
    productDetails: function () {
      this.triggerEvent("productDetails", {
        productId: this.data.product._id,
      }, {})
    },
    onlineOffline: function () {
      this.triggerEvent("onlineOffline", {
        productId: this.data.product._id,
        product_status:this.data.product.product_status
      }, {})
    }
    

  }
})
