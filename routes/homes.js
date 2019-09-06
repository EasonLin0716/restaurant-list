const express = require('express')
const router = express.Router()
// require restaurantList model
const Restaurants = require('../models/restaurantList')

// restaurants 首頁
router.get('/', (req, res) => {
  Restaurants.find((err, restaurant) => { // 取得所有餐廳資料
    if (err) return console.error(err)
    // 渲染至index.handlebars
    return res.render('index', { restaurant: restaurant })
  })
})

module.exports = router