// ./models/restaurantList.js
// This is model of restaurant list

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantListSchema = new Schema({
  name: {         // 餐廳中文名
    type: String,
    required: true
  },

  name_en: {      // 餐廳英文名
    type: String
  },

  category: {     // 餐廳類型
    type: String
  },

  image: {        // 餐廳照片
    type: String,
    required: true
  },

  location: {     // 餐廳位置
    type: String,
    required: true
  },

  phone: {        // 餐廳電話
    type: String,
    required: true
  },

  google_map: {
    type: String
  },

  rating: {
    type: Number
  },

  description: {
    type: String,
    required: true
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }

})

module.exports = mongoose.model('restaurantList', restaurantListSchema)