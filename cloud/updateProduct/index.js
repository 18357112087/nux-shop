// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()


const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  db.collection('product').doc(event.id).update({
    data:{
      product_status:event.product_status
    },success: function(res) {
      console.log(res)
      return(res)
    }
    ,fail: function(res) {
      console.log(res)
      return(res)
    }
  })
  
}