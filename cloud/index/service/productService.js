const model = require('../models/BaseModel.js')
const { PRODUCT ,PRODUCT_CATEGORY } = require('../config/tableConfig.js')
const { PRODUCTFIELD } = require('../fields/productField.js')
const { PRODUCT_CATEGORY_FIELD } = require('../fields/productCategoryField.js')
const { PRODUCTTHEMEFIELD } = require('../fields/productThemeField.js')

const create = (productData, userInfo) => {
  
  let create_time = new Date()
  let update_time = new Date()
   // 订单信息
   let params_product = {
    category_type :productData.category_type,
    product_id:productData.product_id,
    product_description : productData.product_description,
    product_name: productData.product_name,
    product_sell_price: productData.product_sell_price,
    product_price:productData.product_price,
    product_status:productData.product_status,
    product_stock: productData.stock,
    product_img: productData.product_img,
    create_time: create_time,
    update_time: update_time
}
  // 商品生成
  let product = model.add(PRODUCT, params_product);
  return product
}
/**
 * 获取商品
 * @param options 条件
 * @param page    
 * @param size
 * @return 
 */
const getProduct = (options , page = 0, size = 10 , order = {} ) => {
  //options.product_status = 0
  order.name = 'creat_time'
  order.orderBy= 'asc'
  return model.query(PRODUCT, PRODUCTFIELD, options, page,size,order)
}

/**
 * 获取单个商品
 * @param product_id 条件
 * @return 
 */
const getProductById = (product_id) => {
  console.log(product_id)
  return model.findById(PRODUCT, PRODUCTFIELD, product_id)
}

/**
 * 获取商品分类
 * @return 
 */
const getCategoryMenu = () =>{
  return model.query(PRODUCT_CATEGORY,PRODUCT_CATEGORY_FIELD)
}

/**
 * 根据商品分类获取商品
 * @param {*} options 
 */
const getCategoryProduct = (options) => {
  options.product_status = 0 
  return model.query(PRODUCT, PRODUCTFIELD, options)
}

const getThemeProduct = (product_theme) => {
  console.log(product_theme)
  let options = {product_theme:product_theme}
  var result = model.query(PRODUCT, PRODUCTFIELD, options)
  console.log(result)
  return  result
}



module.exports = {
  create,
  getProduct,
  getProductById,
  getCategoryMenu,
  getCategoryProduct,
  getThemeProduct

}